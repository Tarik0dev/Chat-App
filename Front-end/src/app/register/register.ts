import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthApiService } from '../services/auth-api.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, RouterModule, CommonModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = ''

  constructor(private apiService: AuthApiService, private router: Router) {}
  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('❌ Les mots de passe ne correspondent pas !');
      return;
    }

    const credentials = {
      email: this.email,
      password: this.password,
      username: this.username
    };

    this.apiService.register(credentials).subscribe({
      next: (res) => {
        console.log('✅ Réponse API :', res);
        alert('✅ Utilisateur créé avec succès');
        this.router.navigate(['/']);
      },
      error: (err) => {
       // alert("❌ Erreur lors de l'inscription : " + err.message);
        this.errorMessage = err.message
      },
    });
  }
}
