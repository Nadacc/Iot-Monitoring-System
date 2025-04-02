import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceAvailabilityComponent } from './device-availability.component';

describe('DeviceAvailabilityComponent', () => {
  let component: DeviceAvailabilityComponent;
  let fixture: ComponentFixture<DeviceAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceAvailabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
