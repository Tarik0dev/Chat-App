import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthApiService } from '../services/auth-api.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private apiService: AuthApiService, private router: Router) {}
  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('❌ Les mots de passe ne correspondent pas !');
      return;
    }

    const credentials = {
      email: this.email,
      password: this.password,
    };

    this.apiService.register(credentials).subscribe({
      next: (res) => {
        console.log('✅ Réponse API :', res);
        alert('✅ Utilisateur créé avec succès');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('❌ Erreur API :', err);
        alert("❌ Erreur lors de l'inscription");
      },
    });
  }
}
