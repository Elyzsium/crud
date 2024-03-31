// src/components/Table.tsx
import { Component, For } from 'solid-js';
import { store, setStore, Employee } from '../../store'; // Adjust the import path according to your project structure


type TableProps = {
    employees: Employee[];
    handleEdit: (id: number) => void;
    handleDelete: (id: number) => void;
  };



  const Table: Component<TableProps> = (props) => {
  // Intl.NumberFormat for formatting the salary
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const handleEdit = (id: number) => {
    const selectedEmployee = store.employees.find((employee) => employee.id === id);
    if (selectedEmployee) {
      setStore('selectedEmployee', selectedEmployee);
      setStore('isEditing', true);
    }
  };

  const handleDelete = (id: number) => {
    setStore('employees', store.employees.filter((employee) => employee.id !== id));
  };

  return (
    <div class="contain-table">
      <table class="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Date</th>
            <th colSpan={2} class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <For each={store.employees} fallback={<tr><td colSpan={7}>No Employees</td></tr>}>
            {(employee, i) => (
              <tr>
                <td>{i() + 1}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{formatter.format(employee.salary)}</td>
                <td>{employee.date}</td>
                <td class="text-right">
                  <button onClick={() => handleEdit(employee.id)} class="button muted-button">Edit</button>
                </td>
                <td class="text-left">
                  <button onClick={() => handleDelete(employee.id)} class="button muted-button">Delete</button>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
