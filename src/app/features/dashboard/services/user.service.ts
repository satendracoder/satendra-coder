import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://your-api.com/api/user/profile';

  constructor(private http: HttpClient) {}

  // getProfile(): Observable<User> {
  //   return this.http.get<User>(this.apiUrl);
  // }

  getProfile(): Observable<User> {
    const mockUser: User = {
      id: '12',
      avatar: 'https://i.pravatar.cc/150?img=3',
      createdAt: '2024-01-20',
      designation: 'Senior Developer',
      email: 'demo@example.com',
      isActive: true,
      name: 'Satendra Kumar',
      phone: '9876543210',
      role: 'admin',
      updatedAt: '2024-02-01',
    };

    return of(mockUser);
  }
}
