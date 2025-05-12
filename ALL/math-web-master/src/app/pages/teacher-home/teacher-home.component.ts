import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-teacher-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './teacher-home.component.html',
  styleUrl: './teacher-home.component.css'
})
export class TeacherHomeComponent {
  constructor() {
    console.log('TeacherHomeComponent initialized');
  }


}
