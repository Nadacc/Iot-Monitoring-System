import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import deviceData from '../../../assets/deviceData.json'
import { Router } from '@angular/router';

@Component({
  selector: 'app-offline-devices',
  standalone:true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './offline-devices.component.html',
  styleUrl: './offline-devices.component.css'
})
export class OfflineDevicesComponent implements OnInit {
  devices: any[] = deviceData;
  offlineDevices:any[]=[]

  constructor(private router: Router) {}  

  ngOnInit() {
    this.getOfflineDevices();
  }

  getOfflineDevices() {
    this.offlineDevices = this.devices
      .filter(device => {
        const connectionStatus = device.deviceDetails?.connectionStatus;
        if (!connectionStatus) return true; 
  
        const connected = connectionStatus.connected ? new Date(connectionStatus.connected) : null;
        const disconnected = connectionStatus.disconnected ? new Date(connectionStatus.disconnected) : null;
  
        return disconnected && (!connected || disconnected > connected);
      })
      .map(device => {
        const disconnectedTime = device.deviceDetails?.connectionStatus?.disconnected
          ? new Date(device.deviceDetails.connectionStatus.disconnected)
          : null;
  
        return {
          device: device.deviceDetails?.deviceName,
          store: device.store?.storeName || 'Unknown Store',
          city: device.store?.location?.city || 'Unknown City',
          poc: device.user?.name || 'Unknown PoC',
          lastSeen: disconnectedTime ? this.formatLastSeen(disconnectedTime) : 'Unknown',
          disconnectedTime: disconnectedTime || new Date(0) 
        };
      });
  
   
    this.sortOfflineDevices(false);
  }
  
  
  formatLastSeen(disconnectedTime: Date): string {
    const now = new Date();
    const timeDiff = now.getTime() - disconnectedTime.getTime();
  
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    const formattedDate = disconnectedTime.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const formattedTime = disconnectedTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  
    return `Last seen on ${formattedDate} at ${formattedTime} (${days} days ${hours} hours ${minutes} minutes ago)`;
  }
  


  isAscending = false; 

 

  sortOfflineDevices(toggleOrder: boolean = true) {
    if (toggleOrder) {
      this.isAscending = !this.isAscending; 
    }
  
    this.offlineDevices.sort((a, b) => {
      const timeA = a.disconnectedTime.getTime(); 
      const timeB = b.disconnectedTime.getTime();
  
      return this.isAscending ? timeA - timeB : timeB - timeA;
    });
  }
  


  goToDevice(deviceName: string) {
    this.router.navigate(['/devices', deviceName]); 
  }



}
