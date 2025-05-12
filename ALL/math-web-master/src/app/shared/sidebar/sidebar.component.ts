import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  userRole: string | null = null;
  selectedSection: string = 'teacher-home';

  @Output() sectionSelected = new EventEmitter<string>();

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.getCurrentUserWithRole().subscribe(user => {
      if (user) this.userRole = user.role;
    });
  }

  select(section: string) {
    this.selectedSection = section;
    this.sectionSelected.emit(section);
  }
}