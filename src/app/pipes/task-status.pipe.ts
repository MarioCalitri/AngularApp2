import { Pipe, PipeTransform } from '@angular/core';

/**
 * TaskStatusPipe
 * Custom pipe that transforms priority values into race-themed alert codes.
 */
@Pipe({
  name: 'taskStatus',
  standalone: true
})
export class TaskStatusPipe implements PipeTransform {
  transform(priority: string): string {
    switch (priority?.toUpperCase()) {
      case 'CRITICAL':
        return '🚨 [BOX BOX - CRITICAL]';
      case 'HIGH':
        return '⚠️ [URGENT SETUP]';
      case 'LOW':
        return '🟢 [ROUTINE CHECK]';
      default:
        return '⚪ [GENERAL]';
    }
  }
}