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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Route } from '@angular/router';
import { LanguagesListComponent } from './languages/languages-list/languages-list.component';
import { LanguageDetailComponent } from './languages/language-detail/language-detail.component';
import { LanguagesUpsertComponent } from './languages/languages-upsert/languages-upsert.component';

registerLocaleData(localeEsAr);

const appRoutes: Route[] = [
	{
		path: 'languages',
		children: [
			{ path: '', component: LanguagesListComponent },
			{ path: 'add', component: LanguagesUpsertComponent },
			{ path: 'edit/:id', component: LanguagesUpsertComponent },
			{ path: 'details/:id', component: LanguageDetailComponent }
		]
	},
	{ path: '', redirectTo: '/languages', pathMatch: 'full' },
	{ path: '**', redirectTo: '/languages' }
];

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		LanguagesModule,
		HttpClientModule,
		CoreModule,
		BrowserAnimationsModule,
		RouterModule.forRoot(appRoutes)
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'es-AR' },
		// Agregamos un interceptor que nos permite mockear una web API para test
		{ provide: HTTP_INTERCEPTORS, useClass: MockApi, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
