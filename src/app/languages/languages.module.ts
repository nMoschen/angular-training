import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagesListComponent } from './languages-list/languages-list.component';
import { LanguageDetailComponent } from './language-detail/language-detail.component';



@NgModule({
	declarations: [LanguagesListComponent, LanguageDetailComponent],
	imports: [
		CommonModule
	],
	exports: [LanguagesListComponent, LanguageDetailComponent]
})
export class LanguagesModule { }
