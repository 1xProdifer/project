'use client';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useState } from 'react';
import './contact.css';  // Import specific CSS for this page

export default function Contact() {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <Navbar />
      <main style={{ padding: '20px' }}>
        <h2>Contact Us</h2>
        <p>Email: support@budgettracker.com</p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message"
            rows="4"
            cols="50"
          ></textarea>
          <br />
          <button type="submit">Send Message</button>
        </form>
        {submitted && <p>Your message has been sent!</p>}
      </main>
      <Footer />
    </div>
  );
}
