// src/types.ts

export interface UserAuthState {
  email: string | null;
  uid: string | null;
  displayName?: string | null;
}


export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}