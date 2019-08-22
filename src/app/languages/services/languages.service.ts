import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Language } from '@shared/models';
import { Popularity } from '@shared/definitions';

@Injectable({
	providedIn: 'root'
})
export class LanguagesService {

	private resource = environment.api.languages;

	constructor(private apiService: ApiService) { }

	create(language: Language) {
		return this.apiService.create(this.resource, language);
	}

	delete(id: number | string) {
		return this.apiService.delete(this.resource, id);
	}

	get(params?) {
		return this.apiService
			.get(this.resource, params)
			.pipe(
				map((resp: any[]) => resp.map((data: any) => new Language(data)))
			);
	}

	getOne(id: number | string) {
		return this.apiService
			.getOne(this.resource, id)
			.pipe(
				map((resp: Language) => new Language({
					id: resp.id,
					name: resp.name,
					creationDate: new Date(resp.creationDate),
					popularity: Popularity[resp.popularity]
				}))
			);
	}

	update(language: Language) {
		return this.apiService.update(this.resource, language.id, language);
	}
}
