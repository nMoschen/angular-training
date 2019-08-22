import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LanguagesService } from '../services/languages.service';
import { Language } from '@shared/models';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class LanguageResolverService implements Resolve<Observable<Language>> {

	constructor(private languagesService: LanguagesService, private router: Router) { }

	resolve(route: ActivatedRouteSnapshot) {
		const id = route.paramMap.get('id');
		return this.languagesService.getOne(id)
			.pipe(
				catchError(error => this.handleError(error))
			);
	}

	private handleError(error) {
		this.router.navigate(['/']);
		return of(error);
	}
}
