import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import analyticsData from '../../../../assets/analyticsData.json';

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
  selector: 'app-engagment-metric',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './engagment-metric.component.html',
  styleUrl: './engagment-metric.component.css'
})
export class EngagmentMetricComponent implements OnInit, OnChanges {
  @Input() selectedDate: Date | null = null;
  public progressData0 = 0;
  public progressData1 = 0;
  public progressData2 = 0;
  public targetValue = 100;

  ngOnInit(): void {
    this.calculateEngagement();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDate'] && this.selectedDate) {
      this.calculateEngagement();
    }
  }

  calculateEngagement() {
    if (!this.selectedDate) return;

    const formattedDate = this.selectedDate.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
    console.log("Calculating engagement for:", formattedDate);

    const devices = analyticsData as DeviceEntry[];
    if (devices.length === 0) return;

    const matchingDateEntry = devices[0].dates.find(d => d.date === formattedDate);
    if (!matchingDateEntry) {
      console.warn("No data available for selected date:", formattedDate);
      this.progressData0 = this.progressData1 = this.progressData2 = 0;
      return;
    }

    const data0Values = matchingDateEntry.data0.map(item => item.data);
    const data1Values = matchingDateEntry.data1.map(item => item.data);
    const data2Values = data0Values.map((val, index) => val + data1Values[index]);

    const totalData2 = data2Values.reduce((sum, val) => sum + val, 0);
    const totalData0 = data0Values.reduce((sum, val) => sum + val, 0);
    const totalData1 = data1Values.reduce((sum, val) => sum + val, 0);

    if (totalData2 > 0) {
      this.progressData0 = Math.round((totalData0 / totalData2) * 100);
      this.progressData1 = Math.round((totalData1 / totalData2) * 100);
    } else {
      this.progressData0 = this.progressData1 = 0;
    }

    this.progressData2 = Math.min(100, Math.round((totalData2 / this.targetValue) * 100));
  }
}
