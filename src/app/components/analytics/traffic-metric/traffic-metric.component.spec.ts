import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficMetricComponent } from './traffic-metric.component';

describe('TrafficMetricComponent', () => {
  let component: TrafficMetricComponent;
  let fixture: ComponentFixture<TrafficMetricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrafficMetricComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrafficMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
