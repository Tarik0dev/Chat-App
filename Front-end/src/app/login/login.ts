import { Component } from '@angular/core';
import { AuthApiService } from '../services/auth-api.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  error = '';

  constructor(private apiService: AuthApiService, private router: Router) {}

  onSubmit() {
    const credentials = {
      email: this.email,
      password: this.password,
    };

    this.apiService.login(credentials).subscribe({
      next: (res) => {
        //localStorage.setItem('token', res.token);

        alert('Vous êtes bien connecté');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        alert('Mauvais identifiants');
      },
    });
  }
}
