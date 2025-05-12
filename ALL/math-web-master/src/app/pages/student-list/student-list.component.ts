import { Component, EventEmitter, Output, inject, OnInit } from '@angular/core';
import { Database, ref, get, update } from '@angular/fire/database';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
  private db = inject(Database);
  private auth = inject(AuthService);

  students: any[] = [];
  loading = true;
  teacherUID = '';
  searchQuery = '';
  selectedGroup = '';
  groupList: string[] = [];
  qrPreview: string | null = null;
  private page = inject(DashboardComponent);
  private studentService = inject(StudentService);

  @Output() sectionSelected = new EventEmitter<string>();

  editStudent(uid: string) {
    this.studentService.setStudentToEdit(uid);
    this.page.onSectionSelected('edit-student');
  }

  viewStudent(uid: string) {
    this.studentService.setStudentToEdit(uid);
    this.page.onSectionSelected('view-student');
  }

  ngOnInit(): void {
    this.auth.getCurrentUserWithRole().subscribe(async (user) => {
      if (!user || user.role !== 'Teacher') return;

      this.teacherUID = user.uid;
      const snapshot = await get(ref(this.db, 'users'));

      if (snapshot.exists()) {
        const allUsers = snapshot.val();
        const allStudents = Object.values(allUsers).filter((u: any) =>
          u.role === 'Student' && u.linkedTeacherId === this.teacherUID
        );

        this.students = allStudents;
        const grades = allStudents.map((s: any) => s.schoolGrade).filter(Boolean);
        this.groupList = [...new Set(grades)];
      }

      this.loading = false;
    });
  }

  get filteredStudents() {
    return this.students.filter(s =>
      (!this.selectedGroup || s.schoolGrade === this.selectedGroup) &&
      (s.firstName + ' ' + s.lastName).toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  showQr(url: string) {
    this.qrPreview = url;
  }

  async unlinkStudent(uid: string) {
    try {
      await update(ref(this.db, `users/${uid}`), {
        linkedTeacherId: null
      });
      this.students = this.students.filter(s => s.uid !== uid);
    } catch (error) {
      console.error('Error unlinking student:', error);
    }
  }
}
