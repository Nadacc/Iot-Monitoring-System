import { Component, OnInit } from '@angular/core';
import data0 from '../../../assets/data_0.json';
import data1 from '../../../assets/data_1.json';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [MatProgressBarModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent implements OnInit {
  public progressData0 = 0;
  public progressData1 = 0;
  public progressData2 = 0;
  public targetValue = 100; 

  ngOnInit(): void {
    this.calculateEngagement();
  }

  calculateEngagement() {
    const data0Values = data0.map(item => item.data);
    const data1Values = data1.map(item => item.data);
    const data2Values = data0Values.map((val, index) => val + (data1Values[index] || 0));

    const totalData2 = data2Values.reduce((sum, val) => sum + val, 0);
    const totalData0 = data0Values.reduce((sum, val) => sum + val, 0);
    const totalData1 = data1Values.reduce((sum, val) => sum + val, 0);

    if (totalData2 > 0) {
      this.progressData0 = Math.round((totalData0 / totalData2) * 100);
      this.progressData1 = Math.round((totalData1 / totalData2) * 100);
    }

   
    this.progressData2 = Math.min(100, Math.round((totalData2 / this.targetValue) * 100));
  }
}
