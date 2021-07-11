import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscogerAvatarPage } from './escoger-avatar.page';

describe('EscogerAvatarPage', () => {
  let component: EscogerAvatarPage;
  let fixture: ComponentFixture<EscogerAvatarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscogerAvatarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscogerAvatarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
