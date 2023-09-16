import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCategoriesComponent } from './my-categories.component';

describe('MyCategoriesComponent', () => {
  let component: MyCategoriesComponent;
  let fixture: ComponentFixture<MyCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCategoriesComponent]
    });
    fixture = TestBed.createComponent(MyCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
