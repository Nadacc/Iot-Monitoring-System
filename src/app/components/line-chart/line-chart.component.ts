import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartOptions, registerables ,ChartConfiguration,TooltipModel} from 'chart.js';
import data0Json from '../../../assets/data_0.json';
import data1Json from '../../../assets/data_1.json';
import { MatIconModule } from '@angular/material/icon';


Chart.register(...registerables);

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  @ViewChild('lineChartCanvas', { static: true }) chartRef!: ElementRef;

  data0: number[] = [];
  data1: number[] = [];
  data2: number[] = [];
  chartInstance: Chart | null = null; 

  constructor() {}

  ngOnInit() {
    this.loadData();
  }

  aggregateHourlyData(data: any): number[] {
    const hourlyData = new Array(24).fill(0);
    data.forEach((entry: any) => {
      hourlyData[entry.hour] = entry.data;
    });
    return hourlyData;
  }

  loadData() {
    this.data0 = this.aggregateHourlyData(data0Json);
    this.data1 = this.aggregateHourlyData(data1Json);
    this.data2 = this.data0.map((val, i) => val + this.data1[i]);

    this.renderChart();
  }

  

  renderChart() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const config: ChartConfiguration<'line', number[], unknown> = { 
      type: 'line',
      data: {
        labels: Array.from({ length: 24 }, (_, i) => i),
        datasets: [
          {
            label: 'Data 2',
            data: this.data2,
            borderColor: '#36A2EB',
            backgroundColor: '#36A2EB',
            borderWidth: 2,
            fill: false,
            tension: 0,
            pointRadius: 2,
            pointHoverRadius: 6
          },
          {
            label: 'Data 1',
            data: this.data1,
            borderColor: 'green',
            backgroundColor: 'green',
            borderWidth: 2,
            fill: false,
            tension: 0,
            pointRadius: 2,
            pointHoverRadius: 6
          },
          {
            label: 'Data 0',
            data: this.data0,
            borderColor: 'red',
            backgroundColor: 'red',
            borderWidth: 2,
            fill: false,
            tension: 0,
            pointRadius: 2,
            pointHoverRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 30,
            bottom: 20
          }
        },
        scales: {
          x: {
            display:true,
            grid: {
              //color: 'rgba(255, 255, 255, 0.1)',
              drawTicks: false,
              display:false
            },
            ticks: {
              color: '#999',
              font: {
                size: 12
              },
              maxRotation: 0,
              minRotation: 0,
              autoSkip: false
            }
          },
          y: {
            display:true,
            grid: {
              color: 'rgba(255, 255, 255, 0.65)',
              drawTicks: false,
              lineWidth:0.5,
              display:true,
            },
            ticks: {
              color: '#999',
              font: {
                size: 12
              },
              stepSize: 50,
              
            },
            min: 0,
            max: 250,
            
          }
        },
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              title: (tooltipItems) => `Hour: ${tooltipItems[0].label}`,
              label: (context) => {
                const datasetLabel = context.dataset.label;
                const value = context.parsed.y;
                return `${datasetLabel}: ${value}`;
              }
            },
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 10,
            titleColor: '#fff',
            titleFont: {
              size: 14,
              weight: 'bold'
            },
            bodyColor: '#fff',
            bodyFont: {
              size: 13
            }
          },
          legend: {
            position: 'top',
            align: 'center',
            labels: {
              color: '#999',
              usePointStyle: true,
              pointStyle:'circle',
              padding: 20,
              font: {
                size: 12
              },
              boxWidth:6,
              boxHeight:6
            }
          },
          title: {
            display: true,
            text: 'Traffic Metrics',
            color: '#fff',
            font: {
              size: 16,
              weight: 'normal'
            },
            padding: {
              top: 20,
              bottom: 20
            },
            align: 'start'
          }
        }
      }
    };
    
    
    this.chartInstance = new Chart(this.chartRef.nativeElement, config);
    
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
