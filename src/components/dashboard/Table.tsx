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
    <div class="relative rounded-xl overflow-auto">
   <div class="shadow-sm my-8">
   <table class="border-collapse table-auto w-full text-sm">
        <thead>
          <tr>
          <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-100 dark:text-slate-600 text-left"> No.</th>
          <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-100 dark:text-slate-600 text-left"> First Name</th>
          <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-100 dark:text-slate-600 text-left"> Last Name</th>
          <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-100 dark:text-slate-600 text-left"> Email</th>
          <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-100 dark:text-slate-600 text-left"> Salary</th>
          <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-100 dark:text-slate-600 text-left"> Date</th>
          <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-100 dark:text-slate-600 text-center" colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody class="bg-slate-800">
          <For each={store.employees} fallback={<tr><td colSpan={7}></td></tr>}>
            {(employee, i) => (
              <tr>
                  <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"> {i() + 1}</td>
                  <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"> {employee.firstName}</td>
                  <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"> {employee.lastName}</td>
                  <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"> {employee.email}</td>
                  <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"> {formatter.format(employee.salary)}</td>
                  <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"> {employee.date}</td>
                  <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"> 
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleEdit(employee.id)}>Edit</button>
                </td>
                <td class="text-left">
                  <button  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(employee.id)} >Delete</button>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Table;
