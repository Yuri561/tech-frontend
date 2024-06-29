export interface WorkOrder {
  id: string;
  icon?: React.ComponentType<any>; // Assuming icon is a React component
  type: string;
  description: string;
  nte?: number;
  requestDate: string | Date;
  assignedTo: string;
  status: string;
  priority: string;
  location: string;
  comments?: string[];
}
