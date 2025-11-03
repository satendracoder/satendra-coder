import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterPayload, LoginPayload } from '../model/User';
import { APIEndPoint } from '../../core/constants/constants';

// Set headers (adjust content-type based on your API)
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});

@Injectable({
  providedIn: 'root',
})
export class SAuth {
  constructor(private http: HttpClient) {}

  // Authenticates the user
  register(registerPayload: RegisterPayload): Observable<any> {
    return this.http.post(APIEndPoint.Auth.Register, registerPayload, {
      headers,
    });
  }

  // Login Api
  SignInUser(signInPayload: LoginPayload): Observable<any> {
    return this.http.post<LoginPayload>(APIEndPoint.Auth.Login, signInPayload, {
      headers,
    });
  }

  //Forgot Password Api
  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(
      APIEndPoint.Auth.forgotPassword,
      { email },
      { headers }
    );
  }

  // Reset Password Api
  resetPassword(token: string, newPassword: string): Observable<any> {
    //console.log('Resetting password with token:', token);

    return this.http.post<any>(
      APIEndPoint.Auth.resetPassword,
      { token, newPassword },
      { headers }
    );
  }

  // Change Password Api
  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post<any>(
      APIEndPoint.Auth.changePassword,
      { oldPassword, newPassword },
      { headers }
    );
  }

  // Fetch user info from backend after OAuth login
  getUserInfo(): Observable<any> {
    return this.http.get<any>(APIEndPoint.Auth.OAuth, { headers });
  }

  getAlluser(): Observable<any> {
    return this.http.get<any>(APIEndPoint.Auth.getAllUser, { headers });
  }

  // Redirect to Google login
  loginWithGoogle(): void {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }

  // Redirect to GitHub login
  loginWithGitHub(): void {
    window.location.href = 'http://localhost:8080/oauth2/authorization/github';
  }

  // Update Name
  updateName(newName: any) {
    return this.http.put<any>(
      APIEndPoint.Auth.updateName,
      { newName },
      { headers }
    );
  }

  // Update User Role (Admin only)
  updateUserRole(newRole: string): Observable<any> {
    return this.http.put<any>(
      APIEndPoint.Auth.updateRole,
      { newRole },
      { headers }
    );
  }

  //Update Designation
  updateDesignation(designation: any): Observable<any> {
    return this.http.put<any>(
      APIEndPoint.Auth.updateDesignation,
      { designation },
      { headers }
    );
  }

  //Update Phone
  updatePhone(phoneNumber: any): Observable<any> {
    return this.http.put<any>(
      APIEndPoint.Auth.updatePhone,
      { phoneNumber },
      { headers }
    );
  }
}
