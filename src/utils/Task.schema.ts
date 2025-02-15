export interface Task {
  id?: string; // Optional, Firestore generates an ID by default
  todo: string;
  status: 'not_started' | 'in_progress' | 'completed'; // Restricting possible values
  type: 'important' | 'not_important';
  description: string;
  userEmail: string;
  date: number;
}
