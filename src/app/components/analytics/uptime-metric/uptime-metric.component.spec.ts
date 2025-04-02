import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UptimeMetricComponent } from './uptime-metric.component';

describe('UptimeMetricComponent', () => {
  let component: UptimeMetricComponent;
  let fixture: ComponentFixture<UptimeMetricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UptimeMetricComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UptimeMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
