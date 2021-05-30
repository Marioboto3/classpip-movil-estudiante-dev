import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MochilaPage } from './mochila.page';

describe('MochilaPage', () => {
  let component: MochilaPage;
  let fixture: ComponentFixture<MochilaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MochilaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MochilaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
