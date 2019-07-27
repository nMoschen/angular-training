import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../loader/loader.service';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	private baseUrl = environment.api.base;

	constructor(private httpClient: HttpClient, private loaderService: LoaderService) { }

	delete(resource: string, id: number | string) {
		this.loaderService.showLoader();
		return this.httpClient
			.delete(`${this.baseUrl}/${resource}/${id}`)
			.pipe(
				tap(() => this.loaderService.hideLoader())
			);
	}

	get(resource: string) {
		this.loaderService.showLoader();
		return this.httpClient
			.get(`${this.baseUrl}/${resource}`)
			.pipe(
				tap(() => this.loaderService.hideLoader())
			);
	}

	getOne(resource: string, id: number | string) {
		this.loaderService.showLoader();
		return this.httpClient
			.get(`${this.baseUrl}/${resource}/${id}`)
			.pipe(
				tap(() => this.loaderService.hideLoader()),
				catchError(error => {
					alert(error);
					this.loaderService.hideLoader();
					return throwError(error);
				})
			);
	}
}
