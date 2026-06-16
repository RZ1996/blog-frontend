import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  onRegister(): void {
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (response) => {
        this.authService.login(this.email, this.password).subscribe({
          next: (loginResponse) => {
            this.authService.logout();
            this.authService.saveToken(loginResponse.token);
            this.authService.saveUser(loginResponse);
            window.location.href = '/posts';
          },
          error: () => {
            this.router.navigate(['/login']);
          }
        });
      },
      error: (err) => {
        this.notificationService.error('Registrace selhala');
      }
    });
  }
}