import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MatchedFaceHolderService {
  private _selectedFile: File | null = null;

  get selectedFile(): File | null {
    return this._selectedFile;
  }

  set selectedFile(file: File | null) {
    this._selectedFile = file;
  }
}
