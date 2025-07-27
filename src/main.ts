import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.ts';
import { supabase } from './supabaseClient';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
    <div>
      <button id="signup">Sign Up</button>
      <button id="login">Log In</button>
      <button id="logout">Log Out</button>
    </div>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);

const signupButton = document.querySelector<HTMLButtonElement>('#signup')!;
const loginButton = document.querySelector<HTMLButtonElement>('#login')!;
const logoutButton = document.querySelector<HTMLButtonElement>('#logout')!;

signupButton.addEventListener('click', async () => {
  const email = prompt('Enter your email:');
  const password = prompt('Enter your password:');

  if (email && password) {
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Sign up successful!');
    }
  }
});

loginButton.addEventListener('click', async () => {
  const email = prompt('Enter your email:');
  const password = prompt('Enter your password:');

  if (email && password) {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Log in successful!');
    }
  }
});

logoutButton.addEventListener('click', async () => {
  await supabase.auth.signOut();
  alert('Logged out!');
});
