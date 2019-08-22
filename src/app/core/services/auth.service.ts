import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private apiService: ApiService) { }

	login(data): Observable<any> {
		return this.apiService.login('auth', data).pipe(tap(resp => {
			this.setToken(resp.token);
		}));
	}

	logout() {

	}

	isAuthenticated(): boolean {
		return !!this.getToken();
	}

	getToken(): string {
		return localStorage.getItem('token');
	}

	private setToken(token: string) {
		localStorage.setItem('token', token);
	}
}
