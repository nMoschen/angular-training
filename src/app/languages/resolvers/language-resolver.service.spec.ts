import { TestBed } from '@angular/core/testing';
import { LanguageResolverService } from './language-resolver.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LanguagesService } from '../services/languages.service';

describe('LanguageResolverService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			RouterTestingModule
		],
		providers: [
			{ provide: LanguagesService, useValue: {} }
		]
	}));

	it('should be created', () => {
		const service: LanguageResolverService = TestBed.get(LanguageResolverService);
		expect(service).toBeTruthy();
	});
});
