import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthServiceStub } from '../../../../testing/auth-service-stub';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			imports: [
				ReactiveFormsModule,
				RouterTestingModule
			],
			declarations: [LoginComponent],
			providers: [
				{ provide: AuthService, useClass: AuthServiceStub }
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('debe validar la deteccion de cambios', () => {
		const passwordInput: HTMLInputElement = fixture.debugElement.query(By.css('[formControlName=password]')).nativeElement;
		component.hide = false;
		fixture.detectChanges();
		expect(passwordInput.type).toBe('text');
	});

	it('debe loguear un usuario con credenciales validas', () => {

		const emailInput: HTMLInputElement = fixture.debugElement.query(By.css('[formControlName=email]')).nativeElement;
		const passwordInput: HTMLInputElement = fixture.debugElement.query(By.css('[formControlName=password]')).nativeElement;
		const loginButton: HTMLButtonElement = fixture.debugElement.query(By.css('[type=submit]')).nativeElement;

		const router: Router = TestBed.get(Router);
		const navigateSpy = spyOn(router, 'navigate');

		spyOn(TestBed.get(AuthService), 'login').and.returnValue(of(true));

		const fakeEmail = 'fake@email.com';
		const fakePassword = 'fake-pass-1234';

		emailInput.value = fakeEmail;
		emailInput.dispatchEvent(new Event('input'));

		passwordInput.value = fakePassword;
		passwordInput.dispatchEvent(new Event('input'));

		loginButton.click();

		// Mi expectativa es navegar a '/'
		expect(navigateSpy).toHaveBeenCalledWith(['/']);
	});

	it('debe loguear un usuario con credenciales validas (sin usar el DOM)', () => {

		const navigateSpy = spyOn(TestBed.get(Router), 'navigate');
		spyOn(TestBed.get(AuthService), 'login').and.returnValue(of(true));

		const fakeEmail = 'fake@email.com';
		const fakePassword = 'fake-pass-1234';

		component.form.setValue({
			email: fakeEmail,
			password: fakePassword
		});

		component.login();

		expect(navigateSpy).toHaveBeenCalledWith(['/']);
	});

	it('no debe loguear un usuario con credenciales incompletas', () => {

		const emailInput: HTMLInputElement = fixture.debugElement.query(By.css('[formControlName=email]')).nativeElement;
		const loginButton: HTMLButtonElement = fixture.debugElement.query(By.css('[type=submit]')).nativeElement;

		const router: Router = TestBed.get(Router);
		const navigateSpy = spyOn(router, 'navigate');

		spyOn(TestBed.get(AuthService), 'login').and.returnValue(of(true));

		const fakeEmail = 'fake@email.com';

		emailInput.value = fakeEmail;
		emailInput.dispatchEvent(new Event('input'));

		loginButton.click();

		// Mi expectativa es navegar a '/'
		expect(navigateSpy).not.toHaveBeenCalledWith(['/']);

	});
});
