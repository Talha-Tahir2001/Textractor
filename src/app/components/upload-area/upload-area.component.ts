import { Component } from '@angular/core';
import { FileDetails } from '../../models/file-details';

@Component({
  selector: 'app-upload-area',
  standalone: true,
  imports: [],
  templateUrl: './upload-area.component.html',
  styles: [`
    .upload-area {
      border: 2px dashed #e2e8f0;
      border-radius: 0.5rem;
      padding: 2rem;
      text-align: center;
      transition: all 0.2s ease;
    }
    
    .upload-area.drag-active {
      border-color: #3b82f6;
      background-color: rgba(59, 130, 246, 0.05);
    }

    :host-context(.dark) .upload-area {
      border-color: #4b5563;
    }
    
    :host-context(.dark) .upload-area.drag-active {
      border-color: #3b82f6;
      background-color: rgba(59, 130, 246, 0.1);
    }
    `]
})
export class UploadAreaComponent {

  selectedFile: File | null = null;
  selectedImage: File | null = null;
  fileDetails: FileDetails | null = null;
  imagePreview: string | null = null;
  


  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const element = event.currentTarget as HTMLElement;
    element.classList.add('drag-active');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const element = event.currentTarget as HTMLElement;
    element.classList.remove('drag-active');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const element = event.currentTarget as HTMLElement;
    element.classList.remove('drag-active');

    const files = event.dataTransfer?.files;
    if (files?.length) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.handleFile(file);
    }
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }

  private handleFile(file: File) {
    if (file.size > 10 * 1024 * 1024) {
      console.error('File is too large. Maximum size is 10MB');
      return;
    }

    if (!['image/png', 'image/jpeg', 'application/pdf'].includes(file.type)) {
      console.error('Unsupported file type. Please upload PNG, JPG, or PDF');
      return;
    }

    this.selectedFile = file;
    
    // Create FileDetails object
    this.fileDetails = {
      name: file.name,
      size: this.formatFileSize(file.size),
      type: file.type,
      modified: new Date(file.lastModified).toLocaleDateString()
    };

    // Create image preview if it's an image
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.imagePreview = null;
    }
  }
}
