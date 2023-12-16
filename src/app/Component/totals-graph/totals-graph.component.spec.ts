import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalsGraphComponent } from './totals-graph.component';

describe('TotalsGraphComponent', () => {
  let component: TotalsGraphComponent;
  let fixture: ComponentFixture<TotalsGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalsGraphComponent]
    });
    fixture = TestBed.createComponent(TotalsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
