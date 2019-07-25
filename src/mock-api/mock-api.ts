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

					const response = this.getResponseForLanguages(method, +id, body);

					const hasError = response instanceof Error;
					if (hasError) {
						observer.error((response as Error).message);
						return observer.complete();
					}

					observer.next(new HttpResponse({ body: response, status: 200 }));
					return observer.complete();
			}
		});
	}

	private getResponseForLanguages(method: string, id: number, data: any): any {
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
		return this.languages.map(language => ({ id: language.id, name: language.name }));
	}

	private getOneLanguage(id: number): any {
		const language = this.languages.find(l => l.id === id);
		if (!language) {
			return new Error('El lenguaje solicitado no existe o fue borrado');
		}
		return language;
	}

	private createLanguage(data: any): Error | void {

		const { id, name, creationDate, popularity } = data;

		if (!name || !creationDate || !popularity) {
			return new Error('Los parámetros name, creationDate y popularity son requeridos');
		}

		if (id) {
			return new Error('El parámetro id no puede ser utilizado al crear un nuevo lenguaje');
		}

		const lastId = this.languages.reduce((higherId, l) => higherId < l.id ? l.id : higherId, this.languages[0].id);
		const language = { id: lastId + 1, name, creationDate, popularity };

		this.languages.push(language);
	}

	private updateLanguage(id: number, data: any): Error | void {

		const { name, creationDate, popularity } = data;

		if (!name || !creationDate || !popularity) {
			return new Error('Los parámetros name, creationDate y popularity son requeridos');
		}

		const index = this.languages.findIndex(l => l.id === id);
		if (index === -1) {
			return new Error('El lenguaje que se intenta actualizar no existe');
		}

		this.languages[index] = { ...this.languages[index], name, creationDate, popularity };
	}

	private deleteLanguage(id: number): Error | void {

		const index = this.languages.findIndex(l => l.id === id);
		if (index === -1) {
			return new Error('El lenguaje que se intenta borrar no existe');
		}

		this.languages = this.languages.filter(language => language.id !== id);
	}
}
