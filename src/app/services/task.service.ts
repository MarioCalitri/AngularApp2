import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GarageTask } from '../models/task.model';

/**
 * TaskService
 * Handles task data storage and provides reactive updates via RxJS Observables.
 */
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // In-memory array initialized with short-track race setup tasks
  private initialTasks: GarageTask[] = [
    {
      id: 1,
      title: 'Check Right-Rear Tire Stagger',
      description: 'Measure hot pressure and stagger dimensions before heat race.',
      priority: 'CRITICAL',
      dueDate: '2026-11-05T14:30',
      completed: false
    },
    {
      id: 2,
      title: 'Adjust Panhard Bar Height',
      description: 'Lower rear roll center by 1/4 inch to fix mid-corner tight condition.',
      priority: 'High',
      dueDate: '2026-11-05T15:00',
      completed: false
    },
    {
      id: 3,
      title: 'Top Off Sunoco Spec Fuel',
      description: 'Fill fuel cell to minimum race weight requirements.',
      priority: 'Low',
      dueDate: '2026-11-05T16:00',
      completed: true
    }
  ];

  // BehaviorSubject maintains current task state for subscribers
  private tasksSubject = new BehaviorSubject<GarageTask[]>(this.initialTasks);
  
  // Public observable stream exposed to components
  public tasks$: Observable<GarageTask[]> = this.tasksSubject.asObservable();

  constructor() {}

  /**
   * Adds a new task to the observable stream.
   */
  addTask(task: Omit<GarageTask, 'id'>): void {
    const currentTasks = this.tasksSubject.value;
    const newTask: GarageTask = {
      ...task,
      id: currentTasks.length ? Math.max(...currentTasks.map(t => t.id)) + 1 : 1
    };
    this.tasksSubject.next([...currentTasks, newTask]);
  }

  /**
   * Toggles task completion state reactively.
   */
  toggleTaskCompletion(id: number): void {
    const updatedTasks = this.tasksSubject.value.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.tasksSubject.next(updatedTasks);
  }

  /**
   * Deletes a task by ID from the stream.
   */
  deleteTask(id: number): void {
    const filteredTasks = this.tasksSubject.value.filter(task => task.id !== id);
    this.tasksSubject.next(filteredTasks);
  }
}