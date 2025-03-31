import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ItensPerRowHolderService {
  private _photosPerRow: number = 4;

  get photosPerRow(): number {
    return this._photosPerRow;
  }

  set photosPerRow(photosPerRow: number) {
    this._photosPerRow = photosPerRow;
  }
}
