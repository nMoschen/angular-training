import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeEsAr from '@angular/common/locales/es-AR';
import { AppComponent } from './app.component';
import { LanguagesModule } from './languages/languages.module';

registerLocaleData(localeEsAr);

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		LanguagesModule
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'es-AR' }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
