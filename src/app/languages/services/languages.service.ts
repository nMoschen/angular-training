import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Language } from 'src/shared/models';

@Injectable({
	providedIn: 'root'
})
export class LanguagesService {

	private resource = environment.api.languages;

	constructor(private apiService: ApiService) { }

	delete(id: number | string) {
		return this.apiService.delete(this.resource, id);
	}

	get() {
		return this.apiService
			.get(this.resource)
			.pipe(
				map((resp: any[]) => resp.map((data: any) => new Language(data.id, data.name)))
			);
	}

	getOne(id: number | string) {
		return this.apiService
			.getOne(this.resource, id)
			.pipe(
				map((resp: Language) => new Language(resp.id, resp.name, resp.creationDate, resp.popularity))
			);
	}
}
