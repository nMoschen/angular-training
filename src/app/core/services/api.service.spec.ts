import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { LoaderService } from '../loader/loader.service';
import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

class LoaderServiceStub {
	showLoader() { }
	hideLoader() { }
}

describe('ApiService', () => {

	const baseUrl = environment.api.base;
	let apiService: ApiService;
	let loaderService: LoaderService;
	let httpTestingController: HttpTestingController;

	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			HttpClientTestingModule
		],
		providers: [
			{ provide: LoaderService, useClass: LoaderServiceStub }
		]
	}));

	beforeEach(() => {
		apiService = TestBed.get(ApiService);
		loaderService = TestBed.get(LoaderService);
		httpTestingController = TestBed.get(HttpTestingController);
	});

	afterEach(() => {
		httpTestingController.verify();
	});

	it('should be created', () => {
		expect(apiService).toBeTruthy();
	});

	it('debe crear un recurso', () => {

		const fakeResource = 'fake-resource';
		const fakeData = { data: 'fake-data' };
		const fakeUrl = `${baseUrl}/${fakeResource}`;

		const showLoaderSpy = spyOn(loaderService, 'showLoader');
		const hideLoaderSpy = spyOn(loaderService, 'hideLoader');

		apiService
			.create(fakeResource, fakeData)
			.subscribe((resp) => {
				expect(resp.data.id).toBe(1);
				expect(resp.data.name).toBe('fake-created-name');
				// 3. Tiene que esconderse el loader al finalizar la llamada a la API
				expect(hideLoaderSpy).toHaveBeenCalledTimes(1);
			});

		// 1. Tiene que mostrarse el loader al iniciar la llamada a la API
		expect(showLoaderSpy).toHaveBeenCalledTimes(1);
		// 2. Tiene que realizar una llamada POST a la URL del recurso y con cierta data
		const req = httpTestingController.expectOne(fakeUrl);
		expect(req.request.method).toBe('POST');

		req.flush({ data: { id: 1, name: 'fake-created-name' } }, { status: 201, statusText: 'Created' });
	});

	it('debe manejar un error cuando un recurso no es creado', () => {

		const fakeResource = 'fake-resource';
		const fakeData = { data: 'fake-data' };
		const fakeUrl = `${baseUrl}/${fakeResource}`;

		const showLoaderSpy = spyOn(loaderService, 'showLoader');
		const hideLoaderSpy = spyOn(loaderService, 'hideLoader');

		const alertSpy = spyOn(window, 'alert');

		apiService
			.create(fakeResource, fakeData)
			.subscribe(
				() => { },
				(error: HttpErrorResponse) => {
					// 3. Tiene que escoderse el loader al finalizar la llamada a la API
					expect(hideLoaderSpy).toHaveBeenCalledTimes(1);
					// 4. Tiene que mostrarse un alert
					expect(alertSpy).toHaveBeenCalledTimes(1);
					// 5. El status y statusText sean 500 e 'Internal Server Error'
					expect(error.status).toBe(500);
					expect(error.statusText).toBe('Internal Server Error');
				}
			);

		// 1. Tiene que mostrarse el loader al iniciar la llamada a la API
		expect(showLoaderSpy).toHaveBeenCalledTimes(1);
		// 2. Tiene que realizar una llamada POST a la URL del recurso y con cierta data
		const req = httpTestingController.expectOne(fakeUrl);
		expect(req.request.method).toBe('POST');

		req.flush({}, { status: 500, statusText: 'Internal Server Error' });
	});
});
