'use client';  

import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useState } from 'react';
import './login.css';  // Import specific CSS for this page

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
  };

  return (
    <div>
      <Navbar />
      <main style={{ padding: '20px' }}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Log In</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
