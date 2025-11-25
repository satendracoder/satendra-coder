import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  User,
  Tutorial,
  Course,
  Quiz,
  Blog,
  Interview,
  Ebook,
  Roadmap,
} from '../model/admin.model';
import { SSafeStorage } from '../../core/service/global/safe-storage/s-safe-storage';
import { clear } from 'console';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private sidebarOpen = new BehaviorSubject<boolean>(true);
  public sidebarOpen$ = this.sidebarOpen.asObservable();

  private safe = inject(SSafeStorage);

  private mockUser: User = {
    id: '1',
    name: 'Satendra Rajput',
    email: 'admin@satendracoder.com',
    avatar: '/assets/images/global/sate_1.png',
    phone: '123-456-7890',
    role: 'admin',
    designation: 'Full Stack Developer',
    createdAt: new Date(),
  };

  private tutorials = new BehaviorSubject<Tutorial[]>([]);
  private courses = new BehaviorSubject<Course[]>([]);
  private quizzes = new BehaviorSubject<Quiz[]>([]);
  private blogs = new BehaviorSubject<Blog[]>([]);
  private interviews = new BehaviorSubject<Interview[]>([]);
  private ebooks = new BehaviorSubject<Ebook[]>([]);
  private roadmaps = new BehaviorSubject<Roadmap[]>([]);

  constructor(private http: HttpClient) {}

  toggleSidebar() {
    this.sidebarOpen.next(!this.sidebarOpen.value);
  }

  getCurrentUser(): User {
    return this.mockUser;
  }

  updateUser(user: Partial<User>): Observable<User> {
    this.mockUser = { ...this.mockUser, ...user };
    return new BehaviorSubject(this.mockUser).asObservable();
  }

  // Tutorial CRUD
  getTutorials(): Observable<Tutorial[]> {
    return this.tutorials.asObservable();
  }

  createTutorial(
    tutorial: Omit<Tutorial, 'id' | 'createdAt' | 'updatedAt'>
  ): void {
    const newTutorial: Tutorial = {
      ...tutorial,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const current = this.tutorials.value;
    this.tutorials.next([...current, newTutorial]);
  }

  updateTutorial(id: string, tutorial: Partial<Tutorial>): void {
    const current = this.tutorials.value;
    const index = current.findIndex((t) => t.id === id);
    if (index !== -1) {
      current[index] = {
        ...current[index],
        ...tutorial,
        updatedAt: new Date(),
      };
      this.tutorials.next([...current]);
    }
  }

  deleteTutorial(id: string): void {
    const current = this.tutorials.value;
    this.tutorials.next(current.filter((t) => t.id !== id));
  }

  // Course CRUD
  getCourses(): Observable<Course[]> {
    return this.courses.asObservable();
  }

  createCourse(course: Omit<Course, 'id' | 'createdAt'>): void {
    const newCourse: Course = {
      ...course,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    const current = this.courses.value;
    this.courses.next([...current, newCourse]);
  }

  updateCourse(id: string, course: Partial<Course>): void {
    const current = this.courses.value;
    const index = current.findIndex((c) => c.id === id);
    if (index !== -1) {
      current[index] = { ...current[index], ...course };
      this.courses.next([...current]);
    }
  }

  deleteCourse(id: string): void {
    const current = this.courses.value;
    this.courses.next(current.filter((c) => c.id !== id));
  }

  // Quiz CRUD
  getQuizzes(): Observable<Quiz[]> {
    return this.quizzes.asObservable();
  }

  createQuiz(quiz: Omit<Quiz, 'id' | 'createdAt'>): void {
    const newQuiz: Quiz = {
      ...quiz,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    const current = this.quizzes.value;
    this.quizzes.next([...current, newQuiz]);
  }

  updateQuiz(id: string, quiz: Partial<Quiz>): void {
    const current = this.quizzes.value;
    const index = current.findIndex((q) => q.id === id);
    if (index !== -1) {
      current[index] = { ...current[index], ...quiz };
      this.quizzes.next([...current]);
    }
  }

  deleteQuiz(id: string): void {
    const current = this.quizzes.value;
    this.quizzes.next(current.filter((q) => q.id !== id));
  }

  // Blog CRUD
  getBlogs(): Observable<Blog[]> {
    return this.blogs.asObservable();
  }

  createBlog(blog: Omit<Blog, 'id' | 'createdAt'>): void {
    const newBlog: Blog = {
      ...blog,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    const current = this.blogs.value;
    this.blogs.next([...current, newBlog]);
  }

  updateBlog(id: string, blog: Partial<Blog>): void {
    const current = this.blogs.value;
    const index = current.findIndex((b) => b.id === id);
    if (index !== -1) {
      current[index] = { ...current[index], ...blog };
      this.blogs.next([...current]);
    }
  }

  deleteBlog(id: string): void {
    const current = this.blogs.value;
    this.blogs.next(current.filter((b) => b.id !== id));
  }

  // Interview CRUD
  getInterviews(): Observable<Interview[]> {
    return this.interviews.asObservable();
  }

  createInterview(interview: Omit<Interview, 'id' | 'createdAt'>): void {
    const newInterview: Interview = {
      ...interview,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    const current = this.interviews.value;
    this.interviews.next([...current, newInterview]);
  }

  updateInterview(id: string, interview: Partial<Interview>): void {
    const current = this.interviews.value;
    const index = current.findIndex((i) => i.id === id);
    if (index !== -1) {
      current[index] = { ...current[index], ...interview };
      this.interviews.next([...current]);
    }
  }

  deleteInterview(id: string): void {
    const current = this.interviews.value;
    this.interviews.next(current.filter((i) => i.id !== id));
  }

  // Ebook CRUD
  getEbooks(): Observable<Ebook[]> {
    return this.ebooks.asObservable();
  }

  createEbook(ebook: Omit<Ebook, 'id' | 'createdAt'>): void {
    const newEbook: Ebook = {
      ...ebook,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    const current = this.ebooks.value;
    this.ebooks.next([...current, newEbook]);
  }

  updateEbook(id: string, ebook: Partial<Ebook>): void {
    const current = this.ebooks.value;
    const index = current.findIndex((e) => e.id === id);
    if (index !== -1) {
      current[index] = { ...current[index], ...ebook };
      this.ebooks.next([...current]);
    }
  }

  deleteEbook(id: string): void {
    const current = this.ebooks.value;
    this.ebooks.next(current.filter((e) => e.id !== id));
  }

  // Roadmap CRUD
  getRoadmaps(): Observable<Roadmap[]> {
    return this.roadmaps.asObservable();
  }

  createRoadmap(roadmap: Omit<Roadmap, 'id' | 'createdAt'>): void {
    const newRoadmap: Roadmap = {
      ...roadmap,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    const current = this.roadmaps.value;
    this.roadmaps.next([...current, newRoadmap]);
  }

  updateRoadmap(id: string, roadmap: Partial<Roadmap>): void {
    const current = this.roadmaps.value;
    const index = current.findIndex((r) => r.id === id);
    if (index !== -1) {
      current[index] = { ...current[index], ...roadmap };
      this.roadmaps.next([...current]);
    }
  }

  deleteRoadmap(id: string): void {
    const current = this.roadmaps.value;
    this.roadmaps.next(current.filter((r) => r.id !== id));
  }

  uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http
      .post<{ url: any }>('/api/upload/image', formData)
      .toPromise()
      .then((res) => res?.url);
  }
}
