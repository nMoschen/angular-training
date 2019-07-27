import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeEsAr from '@angular/common/locales/es-AR';
import { AppComponent } from './app.component';
import { LanguagesModule } from './languages/languages.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MockApi } from '../mock-api/mock-api';
import { CoreModule } from './core/core.module';

registerLocaleData(localeEsAr);

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		LanguagesModule,
		HttpClientModule,
		CoreModule
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'es-AR' },
		// Agregamos un interceptor que nos permite mockear una web API para test
		{ provide: HTTP_INTERCEPTORS, useClass: MockApi, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
