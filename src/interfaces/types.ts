
// User Auth State interface type for formatting
export interface UserAuthState {
  email: string | null;
  uid: string | null;
  displayName?: string | null;
}

// TodoItem interface type for formatting and keeping consistent formatting across the app
export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}