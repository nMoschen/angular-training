import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanguagesListComponent } from './languages-list/languages-list.component';
import { LanguagesUpsertComponent } from './languages-upsert/languages-upsert.component';
import { LanguageDetailComponent } from './language-detail/language-detail.component';
import { LanguagesComponent } from './languages/languages.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { LanguageResolverService } from './resolvers/language-resolver.service';

const routes: Routes = [
	{
		path: '',
		component: LanguagesComponent,
		canActivate: [AuthGuard],
		canActivateChild: [AuthGuard],
		children: [
			{
				path: '',
				component: LanguagesListComponent
			},
			{
				path: 'add',
				component: LanguagesUpsertComponent
			},
			{
				path: 'edit/:id',
				component: LanguagesUpsertComponent,
				resolve: {
					language: LanguageResolverService
				}
			},
			{
				path: 'details/:id',
				component: LanguageDetailComponent,
				resolve: {
					language: LanguageResolverService
				}
			}
		]
	},
];

@NgModule({
	declarations: [],
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class LanguagesRoutingModule { }
