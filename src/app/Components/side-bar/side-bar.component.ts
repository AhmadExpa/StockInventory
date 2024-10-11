import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {
  @Output() collapsed = new EventEmitter<boolean>(); // Emit the collapsed state

  // Track sidebar state (collapsed or expanded)
  isCollapsed: boolean = true;

  // Function to toggle sidebar state and emit the value
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.collapsed.emit(this.isCollapsed); // Emit the updated state
    // console.log(this.isCollapsed);
  }
}
