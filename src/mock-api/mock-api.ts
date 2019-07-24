import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class MockApi implements HttpInterceptor {

	languages = [
		{ id: 1, name: 'javascript', creationDate: new Date(1990, 10, 21).toISOString(), popularity: 'high' },
		{ id: 2, name: 'c++', creationDate: new Date(1980, 9, 22).toISOString(), popularity: 'low' },
		{ id: 3, name: 'python', creationDate: new Date(1991, 8, 10).toISOString(), popularity: 'high' }
	];

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const url = req.url;

		return this.isApiRequest(url)
			? this.getResponse(req.method, url).pipe(delay(1500))
			: next.handle(req);
	}

	private isApiRequest(url: string): boolean {
		const baseUrl = url.split('/')[0];
		return baseUrl === 'mock-api';
	}

	private getResponse(method: string, url: string): Observable<HttpResponse<any>> {
		const splittedUrl = url.split('/');
		const resource = splittedUrl[1];
		const id = splittedUrl[2];

		return new Observable<HttpResponse<any>>(observer => {
			switch (resource) {
				case 'languages':
					const response = new HttpResponse({ body: this.getResponseForLanguages(method, id), status: 200 });
					observer.next(response);
			}
		});
	}

	private getResponseForLanguages(method: string, id: string): any {
		switch (method) {
			case 'GET':
				return !id ? this.getAllLanguages() : this.getOneLanguage(id);
		}
	}

	private getAllLanguages(): any[] {
		return this.languages;
	}

	private getOneLanguage(id: string): any {
		return this.languages.find(language => language.id === +id);
	}
}
