import { Component, createEffect } from 'solid-js';
import Swal from 'sweetalert2';
import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import { store, setStore } from '../../store'; // Adjust the import path to your store file

const Dashboard: Component<{ setIsAuthenticated: (auth: boolean) => void }> = (props) => {
  // Load employees data from localStorage on component mount
  createEffect(() => {
    const data = localStorage.getItem('employees_data');
    if (data) {
      setStore('employees', JSON.parse(data));
    }
  });

  const handleEdit = (id: number) => {
    const employee = store.employees.find((e) => e.id === id);
    if (employee) {
      setStore('selectedEmployee', employee);
      setStore('isEditing', true);
    }
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedEmployees = store.employees.filter((employee) => employee.id !== id);
        setStore('employees', updatedEmployees);
        localStorage.setItem('employees_data', JSON.stringify(updatedEmployees));

        Swal.fire('Deleted!', 'The employee has been deleted.', 'success');
      }
    });
  };

  return (
    <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
    <div class="rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 bg-slate-100">
      <Header setIsAdding={(value) => setStore('isAdding', value)} setIsAuthenticated={props.setIsAuthenticated} />
      
      {!store.isAdding && !store.isEditing && (
        <Table employees={store.employees} handleEdit={handleEdit} handleDelete={handleDelete} />
      )}

      {store.isAdding && <Add />}
      {store.isEditing && store.selectedEmployee && <Edit employeeId={store.selectedEmployee.id} />}
    </div>
    </div>
  );
};

export default Dashboard;
