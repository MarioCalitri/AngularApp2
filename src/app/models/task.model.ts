/**
 * GarageTask Model
 * Defines the structure for CAL-TECH Motorsports pit crew and garage tasks.
 */
export interface GarageTask {
  id: number;
  title: string;
  description: string;
  priority: 'Low' | 'High' | 'CRITICAL';
  dueDate: string;
  completed: boolean;
}