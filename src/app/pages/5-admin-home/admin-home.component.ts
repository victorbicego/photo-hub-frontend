import { Component } from '@angular/core';
import { AdminHeaderComponent } from '../../common-components/admin-header/admin-header.component';

@Component({
  selector: 'app-admin-home',
  imports: [AdminHeaderComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss',
})
export class AdminHomeComponent {}
