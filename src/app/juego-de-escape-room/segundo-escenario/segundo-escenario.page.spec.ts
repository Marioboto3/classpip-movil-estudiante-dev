import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegundoEscenarioPage } from './segundo-escenario.page';

describe('SegundoEscenarioPage', () => {
  let component: SegundoEscenarioPage;
  let fixture: ComponentFixture<SegundoEscenarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegundoEscenarioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegundoEscenarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
