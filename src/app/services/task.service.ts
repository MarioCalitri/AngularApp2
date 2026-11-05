import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private initialTasks: Task[] = [
    { id: 1, title: 'Check Tire Stagger & Pressures', priority: 'Low', status: 'In Progress', section: 'Tires', assignedTo: 'Mario' },
    { id: 2, title: 'Inspect Corner Weights & Cross Weight %', priority: 'Medium', status: 'Pending', section: 'Chassis', assignedTo: 'Crew Chief' },
    { id: 3, title: 'Shop Cleanup & Tool Inventory', priority: 'High', status: 'Completed', section: 'General', assignedTo: 'Team' }
  ];

  private tasksSubject = new BehaviorSubject<Task[]>(this.initialTasks);
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  getTasks(): Task[] {
    return this.tasksSubject.getValue();
  }

  addTask(task: Omit<Task, 'id'>): void {
    const currentTasks = this.getTasks();
    const newTask: Task = {
      ...task,
      id: currentTasks.length ? Math.max(...currentTasks.map(t => t.id)) + 1 : 1
    };
    this.tasksSubject.next([...currentTasks, newTask]);
  }

  updateTask(updatedTask: Task): void {
    const updatedList = this.getTasks().map(task =>
      task.id === updatedTask.id ? { ...updatedTask } : task
    );
    this.tasksSubject.next(updatedList);
  }

  deleteTask(id: number): void {
    const updatedTasks = this.getTasks().filter(task => task.id !== id);
    this.tasksSubject.next(updatedTasks);
  }
}