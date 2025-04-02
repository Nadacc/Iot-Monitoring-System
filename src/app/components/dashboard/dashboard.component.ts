import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatCard} from '@angular/material/card';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { DeviceActivityComponent } from '../device-activity/device-activity.component';
import { DeviceAvailabilityComponent } from '../device-availability/device-availability.component';
import { OfflineDevicesComponent } from '../offline-devices/offline-devices.component';


@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [MatCard,LineChartComponent,ProgressBarComponent,DeviceActivityComponent,DeviceAvailabilityComponent,OfflineDevicesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
