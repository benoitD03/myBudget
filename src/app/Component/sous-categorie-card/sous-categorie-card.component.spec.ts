import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousCategorieCardComponent } from './sous-categorie-card.component';

describe('SousCategorieCardComponent', () => {
  let component: SousCategorieCardComponent;
  let fixture: ComponentFixture<SousCategorieCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SousCategorieCardComponent]
    });
    fixture = TestBed.createComponent(SousCategorieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
