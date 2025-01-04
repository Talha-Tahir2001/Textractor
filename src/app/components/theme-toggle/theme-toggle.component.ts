import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [],
  templateUrl: './theme-toggle.component.html',
  styles: ``
})
export class ThemeToggleComponent {
  isDark = true;

  constructor() {
    this.isDark = document.documentElement.classList.contains('dark');
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    document.documentElement.classList.toggle('dark');
  }
}
