import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	hide = true;
	form: FormGroup;

	get email() {
		return this.form.get('email');
	}

	get password() {
		return this.form.get('password');
	}

	constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

	ngOnInit() {
		this.form = this.formBuilder.group({
			email: [null, Validators.required],
			password: [null, Validators.required]
		});
	}

	login() {

		if (this.form.invalid) {
			return;
		}

		const form = this.form.value;
		this.authService
			.login(form)
			.subscribe(() => {
				this.router.navigate(['/']);
			});
	}

}
