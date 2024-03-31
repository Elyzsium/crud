import { createSignal, Component } from 'solid-js';
import Swal from 'sweetalert2';

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
}

const Login: Component<LoginProps> = (props) => {
  const adminEmail = 'admin@example.com';
  const adminPassword = 'qwerty';
  const [email, setEmail] = createSignal<string>('admin@example.com');
  const [password, setPassword] = createSignal<string>('qwerty');

  const handleLogin = async (e: Event) => {
    e.preventDefault();

    if (email() === adminEmail && password() === adminPassword) {
      await Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: async () => {
          localStorage.setItem('is_authenticated', 'true');
          props.setIsAuthenticated(true);

          await Swal.fire({
            icon: 'success',
            title: 'Successfully logged in!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    } else {
      await Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: async () => {
          await Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Incorrect email or password.',
            showConfirmButton: true,
          });
        },
      });
    }
  };

  return (
    <div class="small-container">
      <form onSubmit={handleLogin}>
        <h1>Admin Login</h1>
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="admin@example.com"
          value={email()}
          onInput={(e) => setEmail(e.currentTarget.value)}
        />
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="qwerty"
          value={password()}
          onInput={(e) => setPassword(e.currentTarget.value)}
        />
        <input class='mt-12' type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
