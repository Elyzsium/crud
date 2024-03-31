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
      <h1>Employee Management Software</h1>
      <div class='mt-30 mb-18'>
        <button onClick={() => props.setIsAdding(true)}>Add Employee</button>
        <Logout setIsAuthenticated={props.setIsAuthenticated} />
      </div>
    </header>
  );
};

export default Header;
