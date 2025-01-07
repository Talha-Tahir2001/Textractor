import { Injectable } from '@angular/core';
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai'; // Adjust the import path as necessary
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  genAI = new GoogleGenerativeAI(environment.API_KEY);
  generationConfig = {
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
      },
    ],
    temperature: 0.9,
    top_p: 1,
    top_k: 32,
    maxOutputTokens: 100, // limit output
  };
  model = this.genAI.getGenerativeModel({
    model: 'gemini-1.5-flash', // or 'gemini-pro-vision'
    ...this.generationConfig,
  });

  async extractContent(image: string): Promise<string> {
 

    const prompt = `Act like a Text Scanner. 
      Extract text as it is without analyzing it and without summarizing it. 
      Treat all images as a whole document and analyze them accordingly. 
      Think of it as a document with multiple pages, each image being a single a page. 
      Understand page to page flow logically and semantically.
      Preserve original document styling with headers, subheadings, and bullet points
      `;
    const result = await this.model.generateContent([
      prompt,
      {
        inlineData: {
          data: image,
          mimeType: 'image/jpeg',
        },
      },
    ]);
    const response = result.response;
    return response.text();
  }

  constructor() {}
}
