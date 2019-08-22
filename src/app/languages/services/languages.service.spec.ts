import { TestBed } from '@angular/core/testing';
import { LanguagesService } from './languages.service';
import { ApiService } from '../../core/services/api.service';

describe('LanguagesService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		providers: [
			{ provide: ApiService, useValue: {} }
		]
	}));

	it('should be created', () => {
		const service: LanguagesService = TestBed.get(LanguagesService);
		expect(service).toBeTruthy();
	});
});
