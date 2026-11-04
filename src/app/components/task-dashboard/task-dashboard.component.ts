import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { GarageTask } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskStatusPipe } from '../../pipes/task-status.pipe';
import { PitHighlightDirective } from '../../directives/pit-highlight.directive';

/**
 * TaskDashboardComponent
 * Main view for managing pit lane tasks, consuming TaskService via Async Pipe.
 */
@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskStatusPipe, PitHighlightDirective],
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css']
})
export class TaskDashboardComponent implements OnInit {
  // Task observable stream processed in HTML via async pipe
  tasks$!: Observable<GarageTask[]>;

  // Form input model properties
  newTitle: string = '';
  newDescription: string = '';
  newPriority: 'Low' | 'High' | 'CRITICAL' = 'High';
  newDueDate: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // Bind tasks observable stream
    this.tasks$ = this.taskService.tasks$;
  }

  /**
   * Dispatches new task creation to service
   */
  onAddTask(): void {
    if (!this.newTitle.trim()) return;

    this.taskService.addTask({
      title: this.newTitle,
      description: this.newDescription,
      priority: this.newPriority,
      dueDate: this.newDueDate || new Date().toISOString().slice(0, 16),
      completed: false
    });

    // Reset form inputs
    this.newTitle = '';
    this.newDescription = '';
    this.newPriority = 'High';
    this.newDueDate = '';
  }

  toggleCompletion(id: number): void {
    this.taskService.toggleTaskCompletion(id);
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }
}