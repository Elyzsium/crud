import { Component } from 'solid-js';
import Swal from 'sweetalert2';

interface LogoutProps {
  setIsAuthenticated: (value: boolean) => void;
}

const Logout: Component<LogoutProps> = (props) => {
  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: 'question',
      title: 'Logging Out',
      text: 'Are you sure you want to log out?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    });

    if (result.isConfirmed) {
      await Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          localStorage.setItem('is_authenticated', 'false');
          props.setIsAuthenticated(false);
        },
      });
    }
  };

  return (
    <button
      style={{ 'margin-left': '12px' }}
      class="muted-button"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
