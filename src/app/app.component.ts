import { Component } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { UploadAreaComponent } from "./components/upload-area/upload-area.component";
import { TextExtractionComponent } from './components/text-extraction/text-extraction.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, UploadAreaComponent, TextExtractionComponent],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'Textractor';
  extractionData: string | null = null;
  imagePreview: string | null = null;

  handleTextExtraction(data: string) {
    this.extractionData = data;
  }

  handleImageUpload(preview: string) {
    this.imagePreview = preview;
  }
}
