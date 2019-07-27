import { Component, OnInit } from '@angular/core';
import { Language } from '../shared/models';
import { LanguagesService } from './languages/services/languages.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	languages: Language[];
	selectedLanguage: Language;

	constructor(private languagesService: LanguagesService) { }

	ngOnInit() {
		this.getLanguages();
	}

	getLanguages() {
		this.languagesService.get().subscribe(languages => this.languages = languages);
	}

	onClean() {
		this.selectedLanguage = null;
	}

	onRemove(removed: Language) {
		this.languagesService
			.delete(removed.id)
			.subscribe(() => {
				this.getLanguages();
				this.onClean();
			});
	}

	onSelect(language: Language) {
		this.selectedLanguage = language;
	}
}
