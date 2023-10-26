import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateSousCategorieComponent } from './dialog-create-sous-categorie.component';

describe('DialogCreateSousCategorieComponent', () => {
  let component: DialogCreateSousCategorieComponent;
  let fixture: ComponentFixture<DialogCreateSousCategorieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCreateSousCategorieComponent]
    });
    fixture = TestBed.createComponent(DialogCreateSousCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
