// Librarys
import { Injectable } from '@angular/core';

// Services
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`LocalStorageService: ${message}`);
  }

  storeString (key: string, data: string) {
    this.log('Storing: ' + key + ' with: ' + data);
    return localStorage.setItem(key, data);
  }

  getString(key: string) {
    return localStorage.getItem(key);
  }

  deleteItem(key: string) {
    return localStorage.removeItem(key);
  }
}
