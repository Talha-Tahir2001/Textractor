import { Component, inject, input, Input } from '@angular/core';
import { GeminiService } from '../../services/gemini.service';


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

  isSpeaking = false;
  speechSynthesis: SpeechSynthesis = window.speechSynthesis;
  currentUtterance: SpeechSynthesisUtterance | null = null;
  
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

  handleTextToSpeech() {
    if (this.isSpeaking) {
      this.speechSynthesis.cancel();
      this.isSpeaking = false;
      return;
    }

    const utterance = new SpeechSynthesisUtterance(this.extractedText);
    utterance.onend = () => {
      this.isSpeaking = false;
    };
    
    this.currentUtterance = utterance;
    this.isSpeaking = true;
    this.speechSynthesis.speak(utterance);
  }

  async handleDownloadPDF() {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    
    const splitText = doc.splitTextToSize(this.extractedText, 180);
    doc.text(splitText, 15, 15);
    doc.save('extracted-text.pdf');
  }

  handleCopy() {
    navigator.clipboard.writeText(this.extractedText);
  }

}
