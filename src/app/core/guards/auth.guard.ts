import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

	constructor(private authService: AuthService, private router: Router) { }

	canActivate(): boolean {
		console.log('canActivate');

		if (this.authService.isAuthenticated()) {
			return true;
		} else {
			this.router.navigate(['/login']);
			return false;
		}
	}

	canActivateChild(): boolean {
		return this.canActivate();
	}

	canLoad(): boolean {
		return this.canActivate();
	}
}
