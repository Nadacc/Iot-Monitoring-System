import { Component, OnInit } from '@angular/core';
import deviceData from '../../../assets/deviceData.json';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [
    MatCard, MatCardHeader, MatCardTitle, MatCardContent,
    CommonModule, MatIcon, MatFormField, MatInputModule,
    MatSelectModule, FormsModule, MatRadioGroup, MatRadioButton
  ],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css'
})
export class DevicesComponent implements OnInit {
  devices: any[] = []; 
  filteredDevices: any[] = []; 
  selectedFilter: string | null = null;
  showDropdown: boolean = false;


  constructor(private router: Router) {}

  ngOnInit() {
    this.devices = deviceData;
    this.filteredDevices = [...this.devices];
  }

  
  filterDevices(event: Event) {
    const searchText = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredDevices = this.devices.filter(device =>
      device.deviceDetails.deviceName.toLowerCase().includes(searchText) ||
      device.store.storeName.toLowerCase().includes(searchText) ||
      device.fmcg.productName.toLowerCase().includes(searchText) ||
      device.user.name.toLowerCase().includes(searchText)
    );
  }

  
  deviceStatus(connectionStatus: { connected: string; disconnected: string }): string {
    return new Date(connectionStatus.connected) > new Date(connectionStatus.disconnected) ? 'Online' : 'Offline';
  }

  
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }


  applySort(type: string) {
    if (this.selectedFilter === type) {
      this.selectedFilter = null;
      this.filteredDevices = [...this.devices];
    } else {
      this.filteredDevices = [...this.filteredDevices];

      if (type === 'deviceName') {
        this.filteredDevices.sort((a, b) => 
          a.deviceDetails.deviceName.localeCompare(b.deviceDetails.deviceName)
        );
      } else if (type === 'battery') {
        this.filteredDevices.sort((a, b) => {
          const batteryA = parseInt(a.deviceDetails.hw_data.battery.percentage);
          const batteryB = parseInt(b.deviceDetails.hw_data.battery.percentage);
          return batteryB - batteryA;
        });
      }

      this.selectedFilter = type;
    }
  }

  navigateToDevice(deviceName:string){
    this.router.navigate(['/devices',deviceName])
  }
  
}
