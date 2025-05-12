import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { RoleManagementComponent } from '../role-management/role-management.component';
import { NavBarComponent } from '../../shared/nav-bar/nav-bar.component';
import { StudentRegistrationComponent } from '../student-registration/student-registration.component';
import { StudentListComponent } from '../student-list/student-list.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { TestCreationComponent } from '../test-creation/test-creation.component';
import { TestListComponent } from '../test-list/test-list.component';
import { TeacherHomeComponent } from '../teacher-home/teacher-home.component';
import { EditStudentComponent } from '../edit-student/edit-student.component';
import { ViewStudentComponent } from '../view-student/view-student.component';
import { ParentListComponent } from '../parent-list/parent-list.component';
@Component({
  selector: 'app-dashboard',
  imports: [NgIf, NavBarComponent,ViewStudentComponent,EditStudentComponent,ParentListComponent, TeacherHomeComponent, SidebarComponent, RoleManagementComponent, StudentRegistrationComponent, StudentListComponent, TestCreationComponent, TestListComponent, EditStudentComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userRole: string | null = null;
  loading = true;
  selectedSection = 'teacher-home'; 

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.getCurrentUserWithRole().subscribe(user => {
      if (user) this.userRole = user.role;
      this.loading = false;
    });
  }

  onSectionSelected(section: string) {
    this.selectedSection = section;
  }
    
}