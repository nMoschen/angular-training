import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './core/components/login/login.component';

const appRoutes: Route[] = [
	{
		path: 'languages',
		canLoad: [AuthGuard],
		loadChildren: () => import('./languages/languages.module').then(modulo => modulo.LanguagesModule)
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: '',
		redirectTo: '/languages',
		pathMatch: 'full'
	},
	{
		path: '**',
		redirectTo: '/languages'
	}
];

@NgModule({
	declarations: [],
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
