export interface Task {
  id: number;
  title: string;
  section: 'General' | 'Chassis' | 'Tires' | 'Engine';
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In Progress' | 'Completed';
  assignedTo: string;
}