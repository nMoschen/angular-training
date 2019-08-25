import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoaderService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		schemas: [NO_ERRORS_SCHEMA]
	}));

	it('should be created', () => {
		const service: LoaderService = TestBed.get(LoaderService);
		expect(service).toBeTruthy();
	});
});
