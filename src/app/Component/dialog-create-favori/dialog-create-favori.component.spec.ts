import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateFavoriComponent } from './dialog-create-favori.component';

describe('DialogCreateFavoriComponent', () => {
  let component: DialogCreateFavoriComponent;
  let fixture: ComponentFixture<DialogCreateFavoriComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCreateFavoriComponent]
    });
    fixture = TestBed.createComponent(DialogCreateFavoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
