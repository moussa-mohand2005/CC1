import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentToEdit = new BehaviorSubject<string>('');
  currentStudent = this.studentToEdit.asObservable();

  setStudentToEdit(studentId: string) {
    this.studentToEdit.next(studentId);
  }
}