import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimerEscenarioPage } from './primer-escenario.page';

describe('PrimerEscenarioPage', () => {
  let component: PrimerEscenarioPage;
  let fixture: ComponentFixture<PrimerEscenarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimerEscenarioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimerEscenarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
