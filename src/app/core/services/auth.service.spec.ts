import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			HttpClientTestingModule
		],
		providers: [
			{ provide: ApiService, useValue: {} }
		]
	}));

	it('should be created', () => {
		const service: AuthService = TestBed.get(AuthService);
		expect(service).toBeTruthy();
	});
});
