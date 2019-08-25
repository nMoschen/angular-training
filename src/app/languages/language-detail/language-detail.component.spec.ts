import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageDetailComponent } from './language-detail.component';
import { LanguagesService } from '../services/languages.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LanguageDetailComponent', () => {
	let component: LanguageDetailComponent;
	let fixture: ComponentFixture<LanguageDetailComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			imports: [
				RouterTestingModule
			],
			declarations: [LanguageDetailComponent],
			providers: [
				{ provide: LanguagesService, useValue: {} },
				{ provide: Location, useValue: {} },
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LanguageDetailComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	xit('should create', () => {
		expect(component).toBeTruthy();
	});
});
