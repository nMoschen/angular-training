import { Component, OnInit } from '@angular/core';
import { Language } from '../../../shared/models';
import { LanguagesService } from '../services/languages.service';

@Component({
	selector: 'app-languages-list',
	templateUrl: './languages-list.component.html',
	styleUrls: ['./languages-list.component.css']
})
export class LanguagesListComponent implements OnInit {

	languages: Language[];

	constructor(private languagesService: LanguagesService) { }

	ngOnInit() {
		this.getLanguages();
	}

	getLanguages() {
		this.languagesService.get().subscribe(languages => this.languages = languages);
	}

}
