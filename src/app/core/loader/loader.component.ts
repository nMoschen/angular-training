import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
	selector: 'app-loader',
	templateUrl: './loader.component.html',
	styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

	loading = false;

	constructor(public loaderService: LoaderService) { }

	ngOnInit() {
		this.loaderService.loading$.subscribe(loading => this.loading = loading);
	}

}
