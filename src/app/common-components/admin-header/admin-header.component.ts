import { Component } from '@angular/core';
import { HeaderNavComponent } from '../header-nav/header-nav.component';

@Component({
  selector: 'app-admin-header',
  imports: [HeaderNavComponent],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss',
})
export class AdminHeaderComponent {}
