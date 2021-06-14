import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PistasMochilaPage } from './pistas-mochila.page';

describe('PistasMochilaPage', () => {
  let component: PistasMochilaPage;
  let fixture: ComponentFixture<PistasMochilaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PistasMochilaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PistasMochilaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
