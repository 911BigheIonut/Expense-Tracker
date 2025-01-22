import { Component } from '@angular/core';
import { WeekTabsComponent } from '../../components/week-tabs/week-tabs.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WeekTabsComponent], 
  templateUrl: './home.component.html',
})
export class HomeComponent {}
