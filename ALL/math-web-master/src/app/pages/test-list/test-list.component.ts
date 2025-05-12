import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Database, ref, get, remove } from '@angular/fire/database';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';

interface Test {
  id: string;
  idTeacher: string;
  title: {
    ar: string;
    en: string;
    fr: string;
  };
  description: {
    ar: string;
    en: string;
    fr: string;
  };
  class: string;
  games: string[];
  configurations: {
    [key: string]: {
      time: number;
      attemptsAllowed: number;
      number: number;
      solution: number[] | string[] | {
        units: number;
        tens: number;
        hundreds: number;
        thousands: number;
      };
    };
  };
  createdAt: number;
}

@Component({
  selector: 'app-test-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {
  tests: Test[] = [];
  filteredTests: Test[] = [];
  selectedGrade: string = '';
  loading = false;
  error = '';
  success = '';
  grades = [1, 2, 3, 4, 5, 6];

  constructor(
    private db: Database,
    private auth: AuthService
  ) {}

  async ngOnInit() {
    await this.loadTests();
  }

  private async loadTests() {
    try {
      this.loading = true;
      this.error = '';
      const user = await firstValueFrom(this.auth.getCurrentUserWithRole());

      if (!user) {
        this.error = 'Please log in first';
        return;
      }

      const testsRef = ref(this.db, 'tests');
      const snapshot = await get(testsRef);

      if (snapshot.exists()) {
        const allTests = Object.entries(snapshot.val())
          .map(([id, data]) => ({
            id,
            ...(data as any)
          }))
          .filter(test => test.idTeacher === user.uid)
          .sort((a, b) => b.createdAt - a.createdAt) as Test[];

        this.tests = allTests;
        this.applyFilter();
      }
    } catch (error) {
      console.error('Error loading tests:', error);
      this.error = 'Failed to load tests';
    } finally {
      this.loading = false;
    }
  }

  applyFilter() {
    this.filteredTests = this.tests.filter(test =>
      !this.selectedGrade || test.class === this.selectedGrade
    );
  }

  getGameCount(test: Test): number {
    return test.games?.length || 0;
  }

  getGameName(game: string): string {
    const gameNames: { [key: string]: string } = {
      'findcomposition': 'Find the composition',
      'WritetheFollowingNumberinLetters': 'Write numbers in letters',
      'IdentifthUnitsTensHundredsandThousands': 'Identify digit places'
    };
    return gameNames[game] || game;
  }

  formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  async deleteTest(testId: string) {
    if (!confirm('Are you sure you want to delete this test?')) return;

    try {
      this.loading = true;
      await remove(ref(this.db, `tests/${testId}`));
      this.tests = this.tests.filter(test => test.id !== testId);
      this.applyFilter();
      this.success = 'Test deleted successfully';
      setTimeout(() => this.success = '', 3000);
    } catch (error) {
      console.error('Error deleting test:', error);
      this.error = 'Failed to delete the test';
      setTimeout(() => this.error = '', 3000);
    } finally {
      this.loading = false;
    }
  }
}
