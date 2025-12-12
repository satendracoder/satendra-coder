import { Component, effect, signal } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { User } from '../../../model/admin.model';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist-module';
import { SSafeStorage } from '../../../../core/service/global/safe-storage/s-safe-storage';
import { SAuth } from '../../../../auth/service/s-auth';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-user',
  imports: [MateriallistModule],
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.scss',
})
export class AdminUserComponent {
  // ---------- SIGNALS ----------
  user = signal<User>({} as User);
  originalUser = signal<User>({} as User);
  isUpdating = signal(false);
  isEditing = signal(false);
  showDeleteConfirmation = signal(false);
  deleteConfirmation = signal('');
  previewAvatar = signal<string | null>(null);

  stats = signal({ tutorials: 0, courses: 0, blogs: 0 });

  constructor(
    private adminService: AdminService,
    private authapi: SAuth,
    private safe: SSafeStorage
  ) {}

  ngOnInit() {
    const userdata = this.safe.getItem('userdata');
    this.user.set(userdata);
    this.originalUser.set({ ...userdata });
    setTimeout(() => {
      this.loadStats();
    }, 100);

    // Reset preview if user data changes externally
    effect(() => {
      this.loadStats();
    });
  }

  // ---------- ACTIONS ----------
  enableEditing() {
    this.isEditing.set(true);
  }

  cancelEditing() {
    this.isEditing.set(false);
    this.user.set(this.safe.getItem('userdata'));
  }

  saveProfile() {
    this.isUpdating.set(true);

    const updated = this.user();

    forkJoin([
      this.authapi.updateName(updated.name),
      this.authapi.updatePhone(updated.phone),
      this.authapi.updateDesignation(updated.designation),
    ]).subscribe(
      () => {
        this.isUpdating.set(false);
        this.isEditing.set(false);

        // Update local storage safely
        this.safe.setItem('userdata', updated);
        this.originalUser.set({ ...updated });
      },
      () => {
        this.isUpdating.set(false);
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewAvatar.set(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  deleteAccount() {
    if (this.deleteConfirmation() === 'DELETE') {
      this.showDeleteConfirmation.set(false);
      // Call delete API
    }
  }

  // ---------- LOAD STATS ----------
  private loadStats() {
    forkJoin([
      this.adminService.getTutorials(),
      this.adminService.getCourses(),
      this.adminService.getBlogs(),
    ]).subscribe(([t, c, b]) => {
      this.stats.set({
        tutorials: t.length,
        courses: c.length,
        blogs: b.length,
      });
    });
  }
}
