import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskStatusPipe } from '../../pipes/task-status.pipe';
import { PitHighlightDirective } from '../../directives/pit-highlight.directive';

@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, PitHighlightDirective],
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css']
})
  export class TaskDashboardComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  
  // Filtering
  selectedSectionFilter: string = 'All';

  // New Task Form
  newTaskTitle: string = '';
  newTaskPriority: 'Low' | 'Medium' | 'High' = 'Medium';
  newTaskSection: 'General' | 'Chassis' | 'Tires' | 'Engine' = 'General';
  newTaskAssignedTo: string = '';

  // Edit State
  editingTaskId: number | null = null;
  editingTaskBuffer: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks$ = this.taskService.tasks$;
  }

  setSectionFilter(section: string): void {
    this.selectedSectionFilter = section;
  }

  getFilteredTasks(): Observable<Task[]> {
    if (this.selectedSectionFilter === 'All') {
      return this.tasks$;
    }
    return this.tasks$.pipe(
      map(tasks => tasks.filter(t => t.section === this.selectedSectionFilter))
    );
  }

  onAddTask(): void {
    if (!this.newTaskTitle || !this.newTaskTitle.trim()) return;

    this.taskService.addTask({
      title: this.newTaskTitle.trim(),
      priority: this.newTaskPriority,
      status: 'Pending',
      section: this.newTaskSection,
      assignedTo: this.newTaskAssignedTo.trim() || 'Unassigned'
    });

    this.newTaskTitle = '';
    this.newTaskAssignedTo = '';
    this.newTaskPriority = 'Medium';
    this.newTaskSection = 'General';
  }

  startEdit(task: Task): void {
    this.editingTaskId = task.id;
    this.editingTaskBuffer = { ...task };
  }

  cancelEdit(): void {
    this.editingTaskId = null;
    this.editingTaskBuffer = null;
  }

  saveEdit(): void {
    if (this.editingTaskBuffer && this.editingTaskBuffer.title.trim()) {
      this.taskService.updateTask(this.editingTaskBuffer);
      this.cancelEdit();
    }
  }

  onDeleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }
}