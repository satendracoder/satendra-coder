import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Observable } from 'rxjs';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist-module';
import { User } from '../../../model/admin.model';

@Component({
  selector: 'app-admin-dashboard',
  imports: [MateriallistModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  currentUser!: User;
  stats = {
    tutorials: 0,
    courses: 0,
    blogs: 0,
    quizzes: 0,
  };

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.currentUser = this.adminService?.getCurrentUser();
    //console.log('AdminService:', this.adminService);
    //console.log('Current User:', this.adminService?.getCurrentUser());
    this.loadStats();
  }

  private loadStats() {
    this.adminService.getTutorials().subscribe((tutorials) => {
      this.stats.tutorials = tutorials.length;
    });

    this.adminService.getCourses().subscribe((courses) => {
      this.stats.courses = courses.length;
    });

    this.adminService.getBlogs().subscribe((blogs) => {
      this.stats.blogs = blogs.length;
    });

    this.adminService.getQuizzes().subscribe((quizzes) => {
      this.stats.quizzes = quizzes.length;
    });
  }
}
