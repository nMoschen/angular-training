import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy, OnInit } from '@angular/core';
import { Language } from '../../../shared/models';

@Component({
	selector: 'app-language-detail',
	templateUrl: './language-detail.component.html',
	styleUrls: ['./language-detail.component.css']
})
export class LanguageDetailComponent implements OnInit, OnChanges, OnDestroy {

	@Input() selectedLanguage: Language;
	@Output() clean = new EventEmitter<void>();
	@Output() remove = new EventEmitter<Language>();
	changesCount = 0;

	ngOnInit() {
		console.log('On init');
	}

	ngOnChanges(changes: SimpleChanges) {
		console.log('On changes');
		if (changes.selectedLanguage) {
			this.increaseCuonter();
		}
	}

	ngOnDestroy() {
		console.log('On destroy');
	}

	increaseCuonter() {
		this.changesCount++;
	}

	onClean() {
		this.clean.emit();
	}

	onRemove() {
		this.remove.emit(this.selectedLanguage);
	}
}
