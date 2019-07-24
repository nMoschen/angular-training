import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
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

		return this.isApiRequest(req.url)
			? this.getResponse(req).pipe(delay(1000))
			: next.handle(req);
	}

	private isApiRequest(url: string): boolean {
		const baseUrl = url.split('/')[0];
		return baseUrl === 'mock-api';
	}

	private getResponse(req: HttpRequest<any>): Observable<HttpResponse<any>> {
		const url = req.url;
		const method = req.method;
		const body = req.body;

		const splittedUrl = url.split('/');
		const resource = splittedUrl[1];
		const id = splittedUrl[2];

		return new Observable<HttpResponse<any>>(observer => {
			switch (resource) {
				case 'languages':

					const responseForLanguages = this.getResponseForLanguages(method, id, body);

					const hasError = responseForLanguages instanceof Error;
					if (hasError) {
						observer.error((responseForLanguages as Error).message);
						return;
					}

					observer.next(new HttpResponse({ body: responseForLanguages, status: 200 }));
					observer.complete();
			}
		});
	}

	private getResponseForLanguages(method: string, id: string, data?: any): any {
		switch (method) {
			case 'GET':
				return !id ? this.getAllLanguages() : this.getOneLanguage(id);
			case 'POST':
				return this.createLanguage(data);
			case 'PUT':
				return this.updateLanguage(id, data);
			case 'DELETE':
				return this.deleteLanguage(id);
		}
	}

	private getAllLanguages(): any[] {
		return this.languages;
	}

	private getOneLanguage(id: string): any {
		return this.languages.find(language => language.id === +id);
	}

	private createLanguage(data: any): Error | void {

		const { id, name, creationDate, popularity } = data;

		if (id || !name || !creationDate || !popularity) {
			return new Error('Los parámetros name, creationDate, popularity y id son requeridos');
		}

		const lastId = this.languages.reduce((higherId, l) => higherId < l.id ? l.id : higherId, this.languages[0].id);
		const language = { id: lastId + 1, name, creationDate, popularity };

		this.languages.push(language);
	}

	private updateLanguage(id: string, data: any): Error | void {

		const { name, creationDate, popularity } = data;
		if (!name || !creationDate || !popularity) {
			return new Error('Los parámetros name, creationDate y popularity son requeridos');
		}

		const index = this.languages.findIndex(l => l.id === +id);
		if (index === -1) {
			return new Error('El lenguaje que se intenta actualizar no existe');
		}

		this.languages[index] = { ...this.languages[index], name, creationDate, popularity };
	}

	private deleteLanguage(id: string): Error | void {

		const index = this.languages.findIndex(l => l.id === +id);
		if (index === -1) {
			return new Error('El lenguaje que se intenta borrar no existe');
		}

		this.languages = this.languages.filter(language => language.id !== +id);
	}
}
