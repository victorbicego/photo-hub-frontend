import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingHolderService {
  private _isLoading: boolean = false;

  get isLoading(): boolean {
    return this._isLoading;
  }

  set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;
  }
}
