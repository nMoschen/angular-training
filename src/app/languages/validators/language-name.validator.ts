import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, switchMap, first } from 'rxjs/operators';
import { LanguagesService } from '../services/languages.service';

export const languageNameValidator = (languagesService: LanguagesService): AsyncValidatorFn => {

	return (control: AbstractControl): Observable<ValidationErrors | null> => {

		const error: ValidationErrors = { nameUnvailalable: true };
		return control
			.valueChanges
			.pipe(
				map(value => value.trim()),
				filter(value => !!value),
				switchMap(name => {
					return languagesService.get({ name });
				}),
				map(languages => !!languages.length ? error : null),
				first()
			);
	};

};
