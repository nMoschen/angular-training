import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguagesListComponent } from './languages-list.component';
import { LanguagesService } from '../services/languages.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LanguagesListComponent', () => {
	let component: LanguagesListComponent;
	let fixture: ComponentFixture<LanguagesListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			imports: [
				RouterTestingModule
			],
			declarations: [LanguagesListComponent],
			providers: [
				{ provide: LanguagesService, useValue: {} }
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LanguagesListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	xit('should create', () => {
		expect(component).toBeTruthy();
	});
});
