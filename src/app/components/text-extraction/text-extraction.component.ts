import { Component, inject, input, Input } from '@angular/core';
import { GeminiService } from '../../services/gemini.service';
import { ExtractedText } from '../../models/file-details';

@Component({
  selector: 'app-text-extraction',
  standalone: true,
  imports: [],
  templateUrl: './text-extraction.component.html',
  styles: ``,
})
export class TextExtractionComponent {
  extractedText: string = '';
  isLoading: boolean = false;
  error: string | null = null;
  
  geminiService: GeminiService = inject(GeminiService);

  @Input() 
  set imageData(data: string | null) {
    if (data) {
      this.extractText(data);
    }
  }

  private async extractText(imageData: string) {
    this.isLoading = true;
    this.error = null;
    try {
      this.extractedText = await this.geminiService.extractContent(imageData);
    } catch (error) {
      this.error = 'Error extracting text. Please try again.';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

}
