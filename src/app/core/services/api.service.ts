import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../loader/loader.service';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	private baseUrl = environment.api.base;

	constructor(private httpClient: HttpClient, private loaderService: LoaderService) { }

	private execute(fn: Observable<any>): Observable<any> {
		this.loaderService.showLoader();
		return fn
			.pipe(
				tap(() => this.loaderService.hideLoader()),
				catchError(error => {
					alert(error);
					this.loaderService.hideLoader();
					return throwError(error);
				})
			);
	}

	create(resource: string, data: any) {
		return this.execute(this.httpClient.post(`${this.baseUrl}/${resource}`, data));
	}

	delete(resource: string, id: number | string) {
		return this.execute(this.httpClient.delete(`${this.baseUrl}/${resource}/${id}`));
	}

	get(resource: string, params?) {
		return this.execute(this.httpClient.get(`${this.baseUrl}/${resource}`, { params }));
	}

	getOne(resource: string, id: number | string) {
		return this.execute(this.httpClient.get(`${this.baseUrl}/${resource}/${id}`));
	}

	login(resource: string, data: any) {
		return this.execute(this.httpClient.post(`${this.baseUrl}/${resource}`, data));
	}

	update(resource: string, id: string | number, data: any) {
		return this.execute(this.httpClient.put(`${this.baseUrl}/${resource}/${id}`, data));
	}
}
