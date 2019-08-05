import { Component, OnDestroy, OnInit } from '@angular/core';
import { Language } from '../../../shared/models';
import { LanguagesService } from '../services/languages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'app-language-detail',
	templateUrl: './language-detail.component.html',
	styleUrls: ['./language-detail.component.css']
})
export class LanguageDetailComponent implements OnInit, OnDestroy {

	selectedLanguage: Language;

	constructor(
		private languagesService: LanguagesService,
		private route: ActivatedRoute,
		private location: Location,
		private router: Router
	) { }

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			const id = +params.get('id');
			this.getLanguage(id);
		});
	}

	ngOnDestroy() {
		console.log('On destroy');
	}

	private getLanguage(id: number) {
		this.languagesService.getOne(id).subscribe(language => this.selectedLanguage = language);
	}

	goBack() {
		this.location.back();
	}

	goToEdit() {
		this.router.navigate(['../../edit', this.selectedLanguage.id], { relativeTo: this.route });
	}

	onRemove() {
		this.languagesService.delete(this.selectedLanguage.id).subscribe(() => this.goBack());
	}
}
