import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import analyticsData from '../../../../assets/analyticsData.json';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

Chart.register(...registerables);

interface DataEntry {
  hour: number;
  data: number;
}

interface DateEntry {
  date: string;
  data0: DataEntry[];
  data1: DataEntry[];
}

interface DeviceEntry {
  device_id: string | {}; 
  dates: DateEntry[];
}

@Component({
  selector: 'app-traffic-metric',
  standalone: true,
  imports: [MatIconModule, CommonModule, MatCardModule],
  templateUrl: './traffic-metric.component.html',
  styleUrl: './traffic-metric.component.css'
})
export class TrafficMetricComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('trafficChartCanvas', { static: true }) chartRef!: ElementRef;
  @Input() selectedDate: Date | null = null;
  
  chartInstance: Chart | null = null;
  data0: number[] = [];
  data1: number[] = [];
  combinedData: number[] = [];

  ngOnInit() {
    this.loadChartData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDate']) {
      this.loadChartData();
      this.updateChart();  
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.createChart();
    }, 100);
  }

  loadChartData() {
    if (!this.selectedDate) return; 

    const selectedDateString = this.selectedDate.toISOString().split('T')[0];

    const devices: DeviceEntry[] = analyticsData as DeviceEntry[];
    if (devices.length > 0) {
      const device = devices[0]; 
      const dateEntry = device.dates.find(d => d.date === selectedDateString);

      if (dateEntry) {
        this.data0 = dateEntry.data0.map(item => item.data);
        this.data1 = dateEntry.data1.map(item => item.data);
        this.combinedData = this.data0.map((value, index) => value + this.data1[index]);
      } else {
        this.data0 = [];
        this.data1 = [];
        this.combinedData = [];
      }
    }
  }

  updateChart() {  
    if (this.chartInstance) {
      this.chartInstance.data.datasets[0].data = this.data0;
      this.chartInstance.data.datasets[1].data = this.data1;
      this.chartInstance.data.datasets[2].data = this.combinedData;
      this.chartInstance.update();
    }
  }

  createChart() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 24 }, (_, i) => `${i}`),
        datasets: [
          {
            label: 'data0',
            data: this.data0,
            borderColor: '#f44336',
            backgroundColor: '#f44336',
            borderWidth: 2,
            fill: false,
            pointRadius: 4,
            pointBackgroundColor: '#f44336',
          },
          {
            label: 'data1',
            data: this.data1,
            borderColor: '#4CAF50',
            backgroundColor: '#4CAF50',
            borderWidth: 2,
            fill: false,
            pointRadius: 4,
            pointBackgroundColor: '#4CAF50',
          },
          {
            label: 'data2',
            data: this.combinedData,
            borderColor: '#36A2EB',
            backgroundColor: '#36A2EB',
            borderWidth: 2,
            fill: false,
            pointRadius: 4,
            pointBackgroundColor: '#36A2EB',
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            align: 'center',
            labels: {
              color: '#999',
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 20,
              font: {
                size: 12
              },
              boxWidth: 6,
              boxHeight: 6
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderWidth: 1
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#fff'
            }
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            suggestedMin: 0,
            suggestedMax: 250,
            ticks: {
              color: '#fff',
              stepSize: 50
            }
          }
        }
      }
    });
  }

  downloadChart() {
    const chartCanvas = this.chartRef.nativeElement as HTMLCanvasElement;
    const imageUrl = chartCanvas.toDataURL('image/png'); 
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'traffic-metrics.png'; 
    link.click();
  }
}
