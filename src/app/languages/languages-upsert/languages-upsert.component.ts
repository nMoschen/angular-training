import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguagesService } from '../services/languages.service';
import { Location } from '@angular/common';
import { Language } from '@shared/models';
import { popularities, Popularity } from '@shared/definitions';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-languages-upsert',
	templateUrl: './languages-upsert.component.html',
	styleUrls: ['./languages-upsert.component.css']
})
export class LanguagesUpsertComponent implements OnInit {

	form: FormGroup;
	id: number;
	popularities = popularities;

	get name() {
		return this.form.get('name');
	}

	get creationDate() {
		return this.form.get('creationDate');
	}

	get popularity() {
		return this.form.get('popularity');
	}

	constructor(
		private formBuilder: FormBuilder,
		private languagesService: LanguagesService,
		private location: Location,
		private route: ActivatedRoute
	) { }

	private initForm() {
		this.form = this.formBuilder.group({
			name: [null, [Validators.required, Validators.minLength(5)]],
			creationDate: [null, Validators.required],
			popularity: [null, Validators.required]
		});
	}

	private getLanguage() {
		this.route.paramMap.subscribe(params => {
			this.id = +params.get('id');
			if (this.id) {
				this.languagesService.getOne(this.id).subscribe(this.fillForm);
			}
		});
	}

	private fillForm = (language: Language) => {
		const popularity = this.popularities.find(p => p.value === language.popularity);
		this.form.setValue({
			name: language.name,
			creationDate: language.creationDate,
			popularity: popularity.key
		});
	}

	ngOnInit() {
		this.getLanguage();
		this.initForm();
	}

	goBack() {
		this.location.back();
	}

	submit() {

		if (this.form.invalid) {
			return;
		}

		const form = this.form.value;
		const language = new Language({
			name: form.name,
			popularity: form.popularity,
			creationDate: form.creationDate
		});

		if (!this.id) {
			this.languagesService
				.create(language)
				.subscribe(() => this.goBack());
		} else {
			this.languagesService
				.update(new Language({ ...language, id: this.id }))
				.subscribe(() => this.goBack());
		}
	}
}
