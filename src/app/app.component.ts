import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from "./components/theme-toggle/theme-toggle.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { UploadAreaComponent } from "./components/upload-area/upload-area.component";
import { TypewriterDirective } from './directives/typewriter.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, UploadAreaComponent, TypewriterDirective],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'Textractor';
}
