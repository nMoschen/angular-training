import { Component, OnInit } from '@angular/core';
import { Language } from '../../../shared/models';
import { LanguagesService } from '../services/languages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'app-language-detail',
	templateUrl: './language-detail.component.html',
	styleUrls: ['./language-detail.component.css']
})
export class LanguageDetailComponent implements OnInit {

	selectedLanguage: Language;

	constructor(
		private languagesService: LanguagesService,
		private route: ActivatedRoute,
		private location: Location,
		private router: Router
	) { }

	ngOnInit() {
		this.selectedLanguage = this.route.snapshot.data.language;
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
