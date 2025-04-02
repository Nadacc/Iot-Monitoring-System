import { Component, OnInit } from '@angular/core';
import deviceData from '../../../assets/deviceData.json';
import data1 from '../../../assets/data_1.json';
import { CommonModule } from '@angular/common';
import {  MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-activity',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './device-activity.component.html',
  styleUrl: './device-activity.component.css'
})
export class DeviceActivityComponent implements OnInit {
  devices: any[] = deviceData;
  activityCounts: any[] = [];
  isAscending:boolean=true;

  constructor(private router: Router) {}  

  ngOnInit() {
    this.computeActivityCount();
  }

  computeActivityCount() {
    this.activityCounts = this.devices.map(device => {
      const connectionStatus = device.deviceDetails?.connectionStatus;
      const store = device.store?.storeName || 'Unknown Store';
      const city = device.store?.location?.city || 'Unknown City';
      const poc = device.user?.name || 'Unknown PoC';
      if (!connectionStatus) return { device: device.deviceDetails?.deviceName, count: 0,store,city,poc };

      const connectedTime = new Date(connectionStatus.connected).getHours();
      const disconnectedTime = new Date(connectionStatus.disconnected).getHours();

      
      const activeHours = data1.filter(entry => 
        entry.hour >= disconnectedTime && entry.hour <= connectedTime
      );
      
     
      const activityCount = activeHours.reduce((sum, entry) => sum + entry.data, 0);
      
      return { device: device.deviceDetails?.deviceName, count: activityCount ,store,city,poc};

    });
    
  }

  sortDevices() {
    this.isAscending = !this.isAscending; 
    this.activityCounts.sort((a, b) =>
      this.isAscending ? a.count - b.count : b.count - a.count
    );
  }

  goToDevice(deviceName: string) {
    this.router.navigate(['/devices', deviceName]); 
  }

}
