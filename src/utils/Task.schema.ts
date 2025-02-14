export interface Task {
    id?: string;  // Optional, Firestore generates an ID by default
    todo: string;
    status: "not_started" | "in_progress" | "completed"; // Restricting possible values
    type: string;
    date: Date;
    description: string;
  }
  