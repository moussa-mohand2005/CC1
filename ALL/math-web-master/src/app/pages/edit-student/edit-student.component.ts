import { Component, OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Database, ref, get, update } from '@angular/fire/database';
import { StudentService } from '../../services/student.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css'
})
export class EditStudentComponent implements OnInit {
  studentId: string = '';
  studentData: any = null;
  editForm: FormGroup;
  loading: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';
  private dab = inject(DashboardComponent)

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder,
    private db: Database
  ) {
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      birthday: ['', Validators.required],
      schoolGrade: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.studentService.currentStudent.subscribe(id => {
      if (id) {
        this.studentId = id;
        this.loadStudentData();
      }
    });
  }

  async loadStudentData() {
    try {
      this.loading = true;
      const studentRef = ref(this.db, `users/${this.studentId}`);
      const snapshot = await get(studentRef);

      if (snapshot.exists()) {
        this.studentData = snapshot.val();
        this.editForm.patchValue({
          firstName: this.studentData.firstName,
          lastName: this.studentData.lastName,
          birthday: this.studentData.birthday,
          schoolGrade: this.studentData.schoolGrade,
          gender: this.studentData.gender
        });
      } else {
        this.errorMessage = 'Student not found';
      }
    } catch (error) {
      console.error('Error loading student:', error);
      this.errorMessage = 'Error loading student data';
    } finally {
      this.loading = false;
    }
  }

  async saveChanges() {
    if (this.editForm.invalid) {
      this.errorMessage = 'Please fill all required fields correctly';
      return;
    }

    try {
      const updates = {
        ...this.editForm.value,
        updatedAt: Date.now()
      };

      await update(ref(this.db, `users/${this.studentId}`), updates);
      this.successMessage = 'Student information updated successfully';
      this.dab.onSectionSelected('student-list');
      await this.loadStudentData();
    } catch (error) {
      console.error('Error updating student:', error);
      this.errorMessage = 'Error updating student information';
    }
  }

  resetForm() {
    if (this.studentData) {
      this.editForm.patchValue({
        firstName: this.studentData.firstName,
        lastName: this.studentData.lastName,
        birthday: this.studentData.birthday,
        schoolGrade: this.studentData.schoolGrade,
        gender: this.studentData.gender
      });
    }
  }
}