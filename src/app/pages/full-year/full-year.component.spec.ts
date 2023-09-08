import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullYearComponent } from './full-year.component';

describe('FullYearComponent', () => {
  let component: FullYearComponent;
  let fixture: ComponentFixture<FullYearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FullYearComponent]
    });
    fixture = TestBed.createComponent(FullYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
