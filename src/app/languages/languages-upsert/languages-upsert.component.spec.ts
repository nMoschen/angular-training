import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesUpsertComponent } from './languages-upsert.component';

describe('LanguagesUpsertComponent', () => {
  let component: LanguagesUpsertComponent;
  let fixture: ComponentFixture<LanguagesUpsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguagesUpsertComponent ]
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
