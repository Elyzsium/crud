import { Component, createSignal } from 'solid-js';
import Swal from 'sweetalert2';
import { store, setStore } from '../../store';

const Edit: Component<{ employeeId: number }> = (props) => {
  const employeeIndex = store.employees.findIndex(e => e.id === props.employeeId);
  const employee = store.employees[employeeIndex];
  
  const [firstName, setFirstName] = createSignal(employee?.firstName || '');
  const [lastName, setLastName] = createSignal(employee?.lastName || '');
  const [email, setEmail] = createSignal(employee?.email || '');
  const [salary, setSalary] = createSignal(employee?.salary.toString() || '');
  const [date, setDate] = createSignal(employee?.date || '');

  const handleUpdate = async (e: Event) => {
    e.preventDefault();
    
    if (!firstName() || !lastName() || !email() || !salary() || !date()) {
      await Swal.fire('Error!', 'All fields are required.', 'error');
      return;
    }

    const updatedEmployee = {
      ...employee,
      firstName: firstName(),
      lastName: lastName(),
      email: email(),
      salary: parseFloat(salary()),
      date: date(),
    };

    // Update employee in the store
    setStore('employees', (prevEmployees) => {
      const newEmployees = [...prevEmployees];
      newEmployees[employeeIndex] = updatedEmployee;
      return newEmployees;
    });

    // Optionally reset the editing state and selected employee
    setStore('selectedEmployee', null);
    setStore('isEditing', false);

    // Show success message
    await Swal.fire('Updated!', `${firstName()} ${lastName()}'s data has been updated.`, 'success');
  };

  return (
    <div class="items-center justify-center ">
    <div class="container px-5 py-5 mx-auto flex flex-wrap items-center">
    <div class="rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 bg-slate-100">
      <form onSubmit={handleUpdate}>
      <h1 class="text-xl font-bold mb-2">Edit Employee</h1>
        <div class="relative mb-4">
        <label for="firstName" class="leading-7 text-sm text-gray-600">First Name</label>
        <input id="firstName" type="text" class="w-full bg-white rounded border border-gray-300 focus:border-green-800 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={firstName()} onInput={(e) => setFirstName(e.currentTarget.value)} />
        </div>
        <div class="relative mb-4">
        <label for="lastName" class="leading-7 text-sm text-gray-600">Last Name</label>
        <input id="lastName" type="text" class="w-full bg-white rounded border border-gray-300 focus:border-green-800 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={lastName()} onInput={(e) => setLastName(e.currentTarget.value)} />
        </div>
        <div class="relative mb-4">
        <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
        <input id="email" type="email" class="w-full bg-white rounded border border-gray-300 focus:border-green-800 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={email()} onInput={(e) => setEmail(e.currentTarget.value)} />
        </div>
        <div class="relative mb-4">
        <label for="salary" class="leading-7 text-sm text-gray-600">Salary ($)</label>
        <input id="salary" type="number" class="w-full bg-white rounded border border-gray-300 focus:border-green-800 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={salary()} onInput={(e) => setSalary(e.currentTarget.value)} />
        </div>
        <div class="relative mb-4">
        <label for="date" class="leading-7 text-sm text-gray-600">Date</label>
        <input id="date" type="date" class="w-full bg-white rounded border border-gray-300 focus:border-green-800 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={date()} onInput={(e) => setDate(e.currentTarget.value)} />
        </div>
        <div style={{ 'margin-top': '20px' }}>
          <button type="submit"  class=" bg-blue-200 rounded border border-gray-300 focus:border-green-800 text-base text-gray-700 py-1 px-5 leading-8">Update</button>
          <button type="button"class="bg-red-200 rounded border border-gray-300 focus:border-green-800 text-base text-gray-700 py-1 px-5 ml-8 leading-8" onClick={() => setStore('isEditing', false)}>Cancel</button>
        </div>
      </form>
      </div>
      </div>
    </div>
  );
};

export default Edit;

