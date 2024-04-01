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
    <div  class="bg-gray-200 flex justify-center items-center h-screen w-screen">
      <div  class=" border-t-8 rounded-sm border-indigo-600 bg-white p-12 shadow-2xl w-96">
      <form onSubmit={handleLogin}>
      <h1 class="font-bold text-center block text-2xl">Admin Login</h1>
       <div class="relative mb-4">
       <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="admin@example.com"
          value={email()}
          onInput={(e) => setEmail(e.currentTarget.value)}
          class="w-full bg-white rounded border border-gray-300 focus:border-green-800 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
       </div>
       <div class="relative mb-4">
       <label for="password"  class="leading-7 text-sm text-gray-600">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="qwerty"
          value={password()}
          onInput={(e) => setPassword(e.currentTarget.value)}
          class="w-full bg-white rounded border border-gray-300 focus:border-green-800 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
       </div>
        <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Login" />
      </form>
      </div>
    </div>
  );
};

export default Login;
