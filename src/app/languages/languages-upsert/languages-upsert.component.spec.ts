import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguagesUpsertComponent } from './languages-upsert.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LanguagesService } from '../services/languages.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatSelectModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LanguagesUpsertComponent', () => {
	let component: LanguagesUpsertComponent;
	let fixture: ComponentFixture<LanguagesUpsertComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			imports: [
				BrowserAnimationsModule,
				MatSelectModule,
				MatFormFieldModule,
				MatInputModule,
				ReactiveFormsModule,
				RouterTestingModule
			],
			declarations: [LanguagesUpsertComponent],
			providers: [
				{ provide: LanguagesService, useValue: {} },
				{ provide: Location, useValue: {} },
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LanguagesUpsertComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
