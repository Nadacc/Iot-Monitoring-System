import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagmentMetricComponent } from './engagment-metric.component';

describe('EngagmentMetricComponent', () => {
  let component: EngagmentMetricComponent;
  let fixture: ComponentFixture<EngagmentMetricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngagmentMetricComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngagmentMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
