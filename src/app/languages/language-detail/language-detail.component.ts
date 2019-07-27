import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy, OnInit } from '@angular/core';
import { Language } from '../../../shared/models';
import { LanguagesService } from '../services/languages.service';

@Component({
	selector: 'app-language-detail',
	templateUrl: './language-detail.component.html',
	styleUrls: ['./language-detail.component.css']
})
export class LanguageDetailComponent implements OnInit, OnChanges, OnDestroy {

	@Input() selectedLanguage: Language;
	@Output() clean = new EventEmitter<void>();
	@Output() remove = new EventEmitter<Language>();

	constructor(private languagesService: LanguagesService) { }

	ngOnInit() {
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.selectedLanguage && changes.selectedLanguage.currentValue) {
			const language: Language = changes.selectedLanguage.currentValue;
			this.getLanguage(language.id);
		}
	}

	ngOnDestroy() {
		console.log('On destroy');
	}

	private getLanguage(id: number) {
		this.languagesService.getOne(id).subscribe(language => this.selectedLanguage = language);
	}

	onClean() {
		this.clean.emit();
	}

	onRemove() {
		this.remove.emit(this.selectedLanguage);
	}
}
