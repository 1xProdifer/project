'use client';

import React, { useState, useEffect } from 'react';
import '../styles/login.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    fetch('https://api.api-ninjas.com/v1/quotes?category=money', {
      headers: { 'X-Api-Key': 'NF9WmWXmOm+0Z2sCD+HXdg==GXIxDNQMc3i5fXYi' }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data[0]) {
          setGreeting(data[0].quote);
        } else {
          setGreeting('💸 Stay smart with your money!');
        }
      })
      .catch(() => setGreeting('💸 Stay smart with your money!'));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      alert('💡 Tip: Use a unique and secure password to keep your account safe.');
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async () => {
    const endpoint = isLogin ? '/api/users/login' : '/api/users/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(isLogin ? '✅ Logged in successfully!' : '✅ Registered successfully!');
        localStorage.setItem('user', email);
        setEmail('');
        setPassword('');
      } else {
        setMessage(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setMessage('⚠️ Network error.');
    }
  };

  const handleClear = () => {
    setEmail('');
    setPassword('');
    setMessage('');
  };

  return (
    <section className="login-container">
      <h2>{isLogin ? 'Login' : 'Register'} to Smart Budget Tracker</h2>
      <p className="greeting">💬 {greeting}</p>

      <div className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="button-row">
          <button onClick={handleSubmit}>{isLogin ? 'Login' : 'Register'}</button>
          <button onClick={handleClear} className="clear-btn">Clear</button>
        </div>
        <p className="toggle" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Register here" : 'Already have an account? Login'}
        </p>
        {message && <p className="message">{message}</p>}
      </div>
    </section>
  );
}
