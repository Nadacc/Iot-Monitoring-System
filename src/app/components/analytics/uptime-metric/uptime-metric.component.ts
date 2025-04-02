import { CommonModule } from '@angular/common';
import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import uptimeDataRaw from '../../../../assets/uptimeData.json';

const uptimeData: UptimeEvent[] = uptimeDataRaw as UptimeEvent[];

interface UptimeEvent {
  event: 'connected' | 'disconnected';
  duration: number;
  timestamp: string;
}

@Component({
  selector: 'app-uptime-metric',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uptime-metric.component.html',
  styleUrls: ['./uptime-metric.component.css']
})
export class UptimeMetricComponent implements OnInit, OnChanges {
  @Input() selectedDate: Date | null = null;
  hourBlocks: { hour: number; status: 'online' | 'offline' }[] = [];
  hourLabels = Array.from({ length: 24 }, (_, i) => i);

  ngOnInit() {
    this.processUptimeData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDate'] && !changes['selectedDate'].firstChange) {
      this.processUptimeData();
    }
  }

  processUptimeData() {
    
    this.hourBlocks = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      status: 'offline'
    }));

    if (!this.selectedDate) return;

    const selectedDateString = this.selectedDate.toISOString().split('T')[0];
    
    
    const allEvents = uptimeData.filter(event => {
      const eventTime = new Date(event.timestamp);
      const eventEndTime = new Date(eventTime.getTime() + (event.duration * 1000));
      const eventDate = eventTime.toISOString().split('T')[0];
      const eventEndDate = eventEndTime.toISOString().split('T')[0];
      
      return eventDate === selectedDateString || eventEndDate === selectedDateString;
    });
   
    for (let hour = 0; hour < 24; hour++) {
      const currentHourDate = new Date(selectedDateString);
      currentHourDate.setHours(hour, 0, 0, 0);
      
      
      const relevantEvents = allEvents.filter(event => {
        const eventTime = new Date(event.timestamp);
        const eventEndTime = new Date(eventTime.getTime() + (event.duration * 1000));
        return currentHourDate >= eventTime && currentHourDate < eventEndTime;
      });

      const relevantEvent = relevantEvents.length > 0 ? 
        relevantEvents[relevantEvents.length - 1] : null;

      if (relevantEvent) {
        this.hourBlocks[hour].status = relevantEvent.event === 'connected' ? 'online' : 'offline';
      } else {
        
        const previousEvents = allEvents
          .filter(event => new Date(event.timestamp) < currentHourDate)
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        
        const lastEventBeforeHour = previousEvents.length > 0 ? previousEvents[0] : null;
        
        if (lastEventBeforeHour) {
          this.hourBlocks[hour].status = lastEventBeforeHour.event === 'connected' ? 'online' : 'offline';
        }
      }
    }
}
}
