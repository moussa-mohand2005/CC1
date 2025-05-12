import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Database, ref, get, set } from '@angular/fire/database';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-test-creation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './test-creation.component.html',
  styleUrls: ['./test-creation.component.css']
})
export class TestCreationComponent implements OnInit {
  testForm!: FormGroup;
  selectedGameTypes: string[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private db: Database,
    private auth: AuthService
  ) {
    this.initForm();
  }

  private initForm() {
    this.testForm = this.fb.group({
      titleAr: ['', [Validators.required]],
      titleEn: ['', [Validators.required]],
      titleFr: ['', [Validators.required]],
      descriptionAr: ['', [Validators.required]],
      descriptionEn: ['', [Validators.required]],
      descriptionFr: ['', [Validators.required]],
      classroomId: ['', Validators.required],
      selectedGames: [[]],

      findcomposition: this.fb.group({
        time: [null, Validators.required],
        attemptsAllowed: [null, Validators.required],
        number: [null, Validators.required],
        solution: [[]]
      }),

      WritetheFollowingNumberinLetters: this.fb.group({
        time: [null, Validators.required],
        attemptsAllowed: [null, Validators.required],
        number: [null, Validators.required],
        solution: [[]]
      }),

      IdentifthUnitsTensHundredsandThousands: this.fb.group({
        time: [null, Validators.required],
        attemptsAllowed: [null, Validators.required],
        number: [null, Validators.required],
        solution: this.fb.group({
          units: [null, Validators.required],
          tens: [null, Validators.required],
          hundreds: [null, Validators.required],
          thousands: [null, Validators.required]
        })
      })
    });
  }

  ngOnInit() {}

  onCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
    if (checkbox.checked) {
      if (!this.selectedGameTypes.includes(value)) {
        this.selectedGameTypes.push(value);
      }
    } else {
      this.selectedGameTypes = this.selectedGameTypes.filter(g => g !== value);
    }
    this.testForm.get('selectedGames')?.setValue(this.selectedGameTypes);
  }

  updateNumberArray(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    const values = input.value.split(',').map(x => +x);
    this.testForm.get(field)?.get('solution')?.setValue(values);
  }

  updateStringArray(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    const values = input.value.split(',').map(x => x.trim());
    this.testForm.get(field)?.get('solution')?.setValue(values);
  }

  async submitTest() {
    console.log('Form submitted:', this.testForm.value);
    if (this.testForm.invalid) {
      this.errorMessage = 'Please fill all required fields correctly';
      return;
    }

    try {
      this.loading = true;
      const user = await firstValueFrom(this.auth.getCurrentUserWithRole());
      if (!user) {
        this.errorMessage = 'Unauthorized access';
        return;
      }

      const formValue = this.testForm.value;

      const testObject = {
        id: `test_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        idTeacher: user.uid,
        title: {
          ar: formValue.titleAr,
          en: formValue.titleEn,
          fr: formValue.titleFr
        },
        description: {
          ar: formValue.descriptionAr,
          en: formValue.descriptionEn,
          fr: formValue.descriptionFr
        },
        class: formValue.classroomId,
        games: this.selectedGameTypes,
        configurations: this.selectedGameTypes.reduce((acc, game) => {
          acc[game] = formValue[game];
          return acc;
        }, {} as Record<string, any>)
      };

      await set(ref(this.db, `tests/${testObject.id}`), testObject);
      this.successMessage = 'Test created successfully';
      this.testForm.reset();
      this.initForm();
    } catch (error) {
      console.error('Error creating test:', error);
      this.errorMessage = 'Failed to create test';
    } finally {
      this.loading = false;
    }
  }
}
