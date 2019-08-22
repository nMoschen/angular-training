import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { LoaderService } from '../loader/loader.service';

describe('ApiService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			HttpClientTestingModule
		],
		providers: [
			{ provide: LoaderService, useValue: {} }
		]
	}));

	it('should be created', () => {
		const service: ApiService = TestBed.get(ApiService);
		expect(service).toBeTruthy();
	});
});
