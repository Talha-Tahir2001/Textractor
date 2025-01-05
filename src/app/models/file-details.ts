export interface FileDetails {
    name: string;
    size: string;
    type: string;
    modified: string;
  }
  
  export interface ExtractedText {
    title?: string;
    content: string[];
    metadata?: {
      id?: string;
      date?: string;
      author?: string;
      position?: string;
    };
  }