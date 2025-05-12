import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Database, ref, get } from '@angular/fire/database';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-view-student',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.css'
})
export class ViewStudentComponent implements OnInit {
  studentId: string = '';
  studentData: any = null;
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private studentService: StudentService,
    private db: Database
  ) {}

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
}