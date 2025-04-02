import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import deviceData from '../../../assets/deviceData.json';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TrafficMetricComponent } from "../analytics/traffic-metric/traffic-metric.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { EngagmentMetricComponent } from "../analytics/engagment-metric/engagment-metric.component";
import { UptimeMetricComponent } from "../analytics/uptime-metric/uptime-metric.component";
import { DateService } from '../../services/date.service'; 
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-device-details',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    TrafficMetricComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    EngagmentMetricComponent,
    UptimeMetricComponent,
    MatCardModule
  ],
  templateUrl: './device-details.component.html',
  styleUrl: './device-details.component.css'
})
export class DeviceDetailsComponent implements OnInit {
  device: any;
  deviceName: string = '';
  selectedDate: Date = new Date('2025-03-31');
  defaultMarchDate = new Date('2025-03-31'); 


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dateService: DateService 
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.deviceName = params['id'];
      this.device = deviceData.find(d => d.deviceDetails.deviceName === this.deviceName);
    });


    const initialDate = '2025-03-31';
    this.dateService.updateDate(initialDate);
    

    this.dateService.selectedDate$.subscribe(date => {
      this.selectedDate = new Date(date);
    });
  }

  onDateChange(event: any) {
    if (event.value) {
      let selectedDate = new Date(event.value);
      selectedDate.setHours(12, 0, 0, 0); 
  

      const formattedDate = selectedDate.toISOString().split('T')[0]; 
      this.dateService.updateDate(formattedDate);
  
      console.log('New date selected:', formattedDate);
    }
  }
  
  

  goBack() {
    this.router.navigate(['/devices']);
  }

  deviceStatus(connectionStatus: { connected: string; disconnected: string }): string {
    return new Date(connectionStatus.connected) > new Date(connectionStatus.disconnected) ? 'Online' : 'Offline';
  }

  usbStatus(usb: any): string {
    if (!usb) return 'disconnected';
    return new Date(usb.connected) > new Date(usb.disconnected) ? 'connected' : 'disconnected';
  }

  resetDate() {
    const initialDate = '2025-03-31';
    this.dateService.updateDate(initialDate);
  }
}
