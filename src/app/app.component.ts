import { Component, OnInit } from '@angular/core';
import { Popularity } from '../shared/definitions';
import { Language } from '../shared/models';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	languages: Language[];
	selectedLanguage: Language;

	ngOnInit() {
		this.languages = [
			new Language(1, 'javascript', new Date(1990, 10, 21), Popularity.high),
			new Language(2, 'c++', new Date(1980, 9, 22), Popularity.low),
			new Language(3, 'python', new Date(1991, 8, 10), Popularity.high),
		];
	}

	onClean() {
		this.selectedLanguage = null;
	}

	onRemove(removed: Language) {
		this.languages = this.languages.filter(language => language.id !== removed.id);
		this.onClean();
	}

	onSelect(language: Language) {
		this.selectedLanguage = language;
	}
}
