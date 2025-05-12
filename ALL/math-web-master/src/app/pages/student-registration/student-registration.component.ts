import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Database, ref, set } from '@angular/fire/database';
import { NgIf, NgFor } from '@angular/common';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './student-registration.component.html',
  styleUrl: './student-registration.component.css'
})
export class StudentRegistrationComponent implements OnInit {
  private fb = inject(FormBuilder);
  private db = inject(Database);

  constructor(private auth: AuthService) {}

  studentForm = this.fb.group({
    students: this.fb.array([this.createStudentGroup()])
  });

  successMessage = '';
  errorMessage = '';
  linkedTeacherId = '';
  linkedSchoolId = '';

  ngOnInit() {
    this.loadUserData();
  }

  async loadUserData() {
    try {
      const currentUser = await firstValueFrom(this.auth.getCurrentUserWithRole());
      if (currentUser) {
        this.linkedTeacherId = currentUser.uid;
        this.linkedSchoolId = currentUser.ecole || '';
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  get students(): FormArray {
    return this.studentForm.get('students') as FormArray;
  }

  createStudentGroup(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      schoolGrade: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]]
    });
  }

  addStudent() {
    this.students.push(this.createStudentGroup());
  }

  removeStudent(index: number) {
    this.students.removeAt(index);
  }

  async saveAllStudents() {
    if (this.studentForm.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }

    try {
      await this.loadUserData();

      if (!this.linkedTeacherId) {
        this.errorMessage = 'Teacher information not found. Please log in again.';
        return;
      }

      for (const group of this.students.controls) {
        const student = group.value;
        const uid = `stu_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
        const qrData = JSON.stringify({ uid, pin: student.password });
        const qrUrl = await QRCode.toDataURL(qrData);

        await set(ref(this.db, `users/${uid}`), {
          uid,
          ...student,
          qrCode: qrUrl,
          role: 'Student',
          linkedTeacherId: this.linkedTeacherId,
          linkedSchoolId: this.linkedSchoolId,
          createdAt: new Date().toISOString()
        });

        await this.generatePDF(student, qrUrl, uid);
      }

      this.successMessage = 'All students have been successfully registered!';
      this.errorMessage = '';
      this.studentForm.reset();
      this.students.clear();
      this.addStudent();
    } catch (error) {
      console.error('Error saving students:', error);
      this.errorMessage = 'An error occurred while saving student data.';
      this.successMessage = '';
    }
  }

  async generatePDF(student: any, qrUrl: string, uid: string) {
    const doc = new jsPDF();

    doc.setFillColor(30, 64, 175);
    doc.rect(0, 0, 210, 25, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text('Student Login Card', 105, 17, { align: 'center' });

    doc.setFillColor(245, 245, 245);
    doc.roundedRect(15, 35, 180, 75, 3, 3, 'F');

    doc.setTextColor(33, 37, 41);
    doc.setFontSize(12);
    const labels = [
      `First Name: ${student.firstName}`,
      `Last Name: ${student.lastName}`,
      `Grade: ${student.schoolGrade}`,
      `Birth Date: ${student.birthday}`,
      `Gender: ${student.gender}`,
      `PIN Code: ${student.password}`,
      `Student ID: ${uid}`
    ];

    let y = 45;
    labels.forEach(label => {
      doc.text(label, 20, y);
      y += 10;
    });

    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.text("Scan this QR code to log in:", 105, 120, { align: 'center' });

    doc.addImage(qrUrl, "PNG", 60, 130, 90, 90);

    const filename = `student-${student.firstName}-${student.lastName}-G${student.schoolGrade}.pdf`;
    doc.save(filename);
  }
}
