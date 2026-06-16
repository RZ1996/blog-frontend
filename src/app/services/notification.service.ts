import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notification$ = new BehaviorSubject<Notification | null>(null);

  getNotification() {
    return this.notification$.asObservable();
  }

  success(message: string): void {
    this.notification$.next({ message, type: 'success' });
    setTimeout(() => this.clear(), 3000);
  }

  error(message: string): void {
    this.notification$.next({ message, type: 'error' });
    setTimeout(() => this.clear(), 3000);
  }

  info(message: string): void {
    this.notification$.next({ message, type: 'info' });
    setTimeout(() => this.clear(), 3000);
  }

  clear(): void {
    this.notification$.next(null);
  }
}