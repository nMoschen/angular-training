import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagesListComponent } from './languages-list/languages-list.component';
import { LanguageDetailComponent } from './language-detail/language-detail.component';
import {
	MatButtonModule,
	MatListModule,
	MatIconModule,
	MatFormFieldModule,
	MatInputModule,
	MatSelectModule,
	MatDatepickerModule,
	MatNativeDateModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { LanguagesUpsertComponent } from './languages-upsert/languages-upsert.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
	declarations: [LanguagesListComponent, LanguageDetailComponent, LanguagesUpsertComponent],
	imports: [
		CommonModule,
		MatButtonModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatIconModule,
		MatListModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		ReactiveFormsModule,
		RouterModule.forChild([])
	],
	exports: [LanguagesListComponent, LanguageDetailComponent]
})
export class LanguagesModule { }
