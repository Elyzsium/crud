 
import { Component, createSignal } from 'solid-js';
import Swal from 'sweetalert2';
import { store, setStore } from '../../store';

const Add: Component = () => {
  const [firstName, setFirstName] = createSignal('');
  const [lastName, setLastName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [salary, setSalary] = createSignal('');
  const [date, setDate] = createSignal('');

  const handleAdd = async (e: Event) => {
    e.preventDefault();
    if (!firstName() || !lastName() || !email() || !salary() || !date()) {
      await Swal.fire('Error!', 'All fields are required.', 'error');
      return;
    }

    const newEmployee = {
      id: store.employees.length + 1,
      firstName: firstName(),
      lastName: lastName(),
      email: email(),
      salary: parseFloat(salary()),
      date: date(),
    };

    setStore('employees', [...store.employees, newEmployee]);
    setStore('isAdding', false);

    await Swal.fire('Added!', `${firstName()} ${lastName()}'s data has been added.`, 'success');
  };


  return (
    <div class="items-center justify-center ">
    <div class="container px-5 py-5 mx-auto flex flex-wrap items-center">
    <div class="rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 bg-slate-100">
       <form onSubmit={handleAdd}>
       <h1 class="text-xl font-bold mb-2">Add Employee</h1>
        <div class="relative mb-4">
        <label for="firstName" class="leading-7 text-sm text-gray-600">First Name</label>
        <input
          id="firstName"
          type="text"
          value={firstName()}
          onInput={(e) => setFirstName(e.currentTarget.value)}
          placeholder='input firstname'
          class="w-full bg-white rounded border border-gray-300 focus:border-green-800 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        </div>
        <div class="relative mb-4">
        <label for="lastName" class="leading-7 text-sm text-gray-600">Last Name</label>
        <input
          id="lastName"
          type="text"
          value={lastName()}
          onInput={(e) => setLastName(e.currentTarget.value)}
          placeholder='input lastName'
          class="w-full bg-white rounded border border-gray-300 focus:border-green-800 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        </div>
        <div class="relative mb-4">
        <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
        <input
          id="email"
          type="email"
          value={email()}
          onInput={(e) => setEmail(e.currentTarget.value)}
          placeholder='input email'
          class="w-full bg-white rounded border border-gray-300 focus:border-green-800 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        </div>
        <div class="relative mb-4">
        <label for="salary" class="leading-7 text-sm text-gray-600">Salary ($)</label>
        <input
          id="salary"
          type="number"
          value={salary()}
          onInput={(e) => setSalary(e.currentTarget.value)}
          placeholder='input salary'
          class="w-full bg-white rounded border border-gray-300 focus:border-green-800 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        </div>
        <div class="relative mb-4">
        <label for="date" class="leading-7 text-sm text-gray-600">Date</label>
        <input
          id="date"
          type="date"
          value={date()}
          onInput={(e) => setDate(e.currentTarget.value)}
          class="w-full bg-white rounded border border-gray-300 focus:border-green-800 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        </div>
        <div class='mt-10 flex flex-col md:flex-row gap-3'>
          <button class="bg-blue-200 rounded border border-gray-300 focus:border-green-800 text-base text-gray-700 py-1 px-5 leading-8 mb-2 md:mb-0 md:mr-4" type="submit" >Add</button>
          <button class="bg-red-200 rounded border border-gray-300 focus:border-green-800 text-base text-gray-700 py-1 px-5 leading-8" type="button" onClick={() =>  setStore('isAdding', false)}>Cancel</button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
};

export default Add;
