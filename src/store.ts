import { createStore } from 'solid-js/store';

export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  salary: number;
  date: string;
};

type Store = {
  employees: Employee[];
  isAdding: boolean;
  isEditing: boolean;
  selectedEmployee: Employee | null;
  isAuthenticated: boolean;
};

export const [store, setStore] = createStore<Store>({
  employees: [],
  isAdding: false,
  isEditing: false,
  selectedEmployee: null,
  isAuthenticated: false,
});
