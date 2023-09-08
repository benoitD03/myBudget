import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastMonthComponent } from './last-month.component';

describe('LastMonthComponent', () => {
  let component: LastMonthComponent;
  let fixture: ComponentFixture<LastMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LastMonthComponent]
    });
    fixture = TestBed.createComponent(LastMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
