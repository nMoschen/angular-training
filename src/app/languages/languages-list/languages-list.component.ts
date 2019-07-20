import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Language } from '../../../shared/models';

@Component({
	selector: 'app-languages-list',
	templateUrl: './languages-list.component.html',
	styleUrls: ['./languages-list.component.css']
})
export class LanguagesListComponent {

	@Input() languages: Language[];
	@Output() languageSelect = new EventEmitter<Language>();

	onSelect(language: Language) {
		this.languageSelect.emit(language);
	}

}
