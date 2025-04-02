import { Component, OnInit ,ViewChild,ElementRef,AfterViewInit} from '@angular/core';
import { Chart,ChartOptions,registerables } from 'chart.js';
import deviceData from '../../../assets/deviceData.json'
import { MatIconModule } from '@angular/material/icon';

Chart.register(...registerables);
@Component({
  selector: 'app-device-availability',
  standalone:true,
  imports: [MatIconModule],
  templateUrl: './device-availability.component.html',
  styleUrl: './device-availability.component.css'
})
export class DeviceAvailabilityComponent implements OnInit,AfterViewInit{

  @ViewChild('doughnutChartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;chart:Chart | undefined;
  ngAfterViewInit() {
    this.createChart();
  }


  chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: { 
      legend: { 
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 35,
          font:{
            weight:'bold',
            
          }
        },
        
      }
    },
    elements: {
      arc: {
        borderWidth: 0  
      }
    },
    cutout:'65%',
    layout: {
      padding: {
        bottom: 20  
      }
    }
  };


  createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.doughnutChartLabels,
          datasets: [{
            data: this.doughnutChartData,
            backgroundColor: ['green', 'red'],
            borderWidth:0
          }]
        },
        options: this.chartOptions
      });
    }
  }


  onlineCount = 0;
  offlineCount = 0;
  doughnutChartLabels: string[] = ['Online', 'Offline'];
  doughnutChartData: number[] = [];
  doughnutChartColors = [{ backgroundColor: ['green', 'red'] }]; 
  

  ngOnInit(): void {
    this.calculateDeviceStatus();
  }

  calculateDeviceStatus() {
    this.onlineCount = 0;
    this.offlineCount = 0;
  
    deviceData.forEach((device, index) => {
      const status = device.deviceDetails?.connectionStatus;
      if (!status) {
        console.log(`Device ${index}: No connection status → OFFLINE`);
        this.offlineCount++;
        return;
      }
  
      const connectedTime = status.connected ? new Date(status.connected) : null;
      const disconnectedTime = status.disconnected ? new Date(status.disconnected) : null;
  
      console.log(`Device ${index}: Connected at ${connectedTime}, Disconnected at ${disconnectedTime}`);
  
      if (connectedTime && (!disconnectedTime || disconnectedTime < connectedTime)) {
        console.log(`Device ${index}: ONLINE`);
        this.onlineCount++;
      } else {
        console.log(`Device ${index}: OFFLINE`);
        this.offlineCount++;
      }
    });
  
    console.log(`Final Count → Online: ${this.onlineCount}, Offline: ${this.offlineCount}`);
  
    this.doughnutChartData = [this.onlineCount, this.offlineCount];
  }
  
  

  downloadChart() {
    const canvas = this.chartCanvas.nativeElement;
    const image = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = image;
    link.download = 'device_availability_chart.png';
    link.click();
  }

}
