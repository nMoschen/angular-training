import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoginComponent } from './components/login/login.component';
import { MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
	declarations: [LoaderComponent, LoginComponent],
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule,
		MatProgressBarModule,
		MatFormFieldModule,
		ReactiveFormsModule
	],
	exports: [LoaderComponent]
})
export class CoreModule { }
