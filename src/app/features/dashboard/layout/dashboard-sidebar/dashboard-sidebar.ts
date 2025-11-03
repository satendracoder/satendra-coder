import { Component } from '@angular/core';
import { Sidebar_data } from '../../utils/sidebar';
import { Router } from '@angular/router';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist-module';
import { SSafeStorage } from '../../../../core/service/global/safe-storage/s-safe-storage';

@Component({
  selector: 'app-dashboard-sidebar',
  imports: [MateriallistModule],
  templateUrl: './dashboard-sidebar.html',
  styleUrl: './dashboard-sidebar.scss',
})
export class DashboardSidebar {
  isCollapsed = false;

  Sidebar_data_list = Sidebar_data; // Get Utils Files for Sidebar list render

  constructor(private router: Router, private storage: SSafeStorage) {}

  ngOnInit(): void {
    const storedState = this.storage.getItem('sidebarCollapsed');
    if (storedState !== null) {
      this.isCollapsed = JSON.parse(storedState);
    }
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    this.storage.setItem('sidebarCollapsed', JSON.stringify(this.isCollapsed));
  }

  onContainerClick(event: MouseEvent) {
    const containerWidth = 240;
    const clickableEdge = 20;
    if (event.offsetX > containerWidth - clickableEdge) {
      //console.log('Clicked on the right edge (pseudo-element).');
    } else {
      //console.log('Clicked somewhere else in container.');
    }
  }

  positionOptions: TooltipPosition[] = ['right'];
  position = new FormControl(this.positionOptions[0]);

  getRouter() {
    this.router.navigateByUrl('/');
  }
}
