import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoDeEscapeRoomPage } from './juego-de-escape-room.page';

describe('JuegoDeEscapeRoomPage', () => {
  let component: JuegoDeEscapeRoomPage;
  let fixture: ComponentFixture<JuegoDeEscapeRoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuegoDeEscapeRoomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuegoDeEscapeRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
