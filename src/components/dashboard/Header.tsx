// In Header.tsx or similar
import { Component } from 'solid-js';
import Logout from '../Logout';

type HeaderProps = {
    setIsAdding: (isAdding: boolean) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
};

const Header: Component<HeaderProps> = (props) => {
  return (
    <header>
      <h1 class="text-xl font-bold">Employee Management</h1>
      <div class='mt-10 mb-8 text-xl font-bold'>
        <button  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-5 rounded focus:outline-none focus:shadow-outline" onClick={() => props.setIsAdding(true)}>Add Employee</button>
        <Logout  setIsAuthenticated={props.setIsAuthenticated} />
      </div>
    </header>
  );
};

export default Header;
