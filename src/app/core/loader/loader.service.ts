import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LoaderService {

	private loadingSource = new Subject<boolean>();
	loading$ = this.loadingSource.asObservable();

	constructor() { }

	showLoader() {
		this.loadingSource.next(true);
	}

	hideLoader() {
		this.loadingSource.next(false);
	}
}
