'use client';

import React, { useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import '../styles/reminders.css';

export default function RemindersPage() {
  const [reminders, setReminders] = useState([]);
  const [moneyFact, setMoneyFact] = useState('');
  const [rotatingTip, setRotatingTip] = useState('');
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');

  const tips = [
    '💡 Pay yourself first — save before spending.',
    '📅 Automate bills to avoid late fees.',
    '🛒 Stick to a grocery list — avoid impulse buys.',
    '🔐 Review your subscriptions monthly.',
  ];

  useEffect(() => {
    fetchReminders();
    fetchMoneyFact();

    const tipInterval = setInterval(() => {
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      setRotatingTip(randomTip);
    }, 8000);

    return () => clearInterval(tipInterval);
  }, []);

  const fetchReminders = async () => {
    try {
      const res = await fetch('/api/reminders');
      const data = await res.json();
      setReminders(data);
    } catch (err) {
      console.error('Error fetching reminders:', err);
    }
  };

  const fetchMoneyFact = async () => {
    try {
      const res = await fetch('https://financialmodelingprep.com/api/v3/quote/AAPL?apikey=demo');
      const data = await res.json();
      if (data[0]) {
        setMoneyFact(`📈 Apple Inc. stock price: $${data[0].price}`);
      }
    } catch {
      setMoneyFact('💸 Saving even $5/week adds up fast.');
    }
  };

  const addReminder = async () => {
    if (!text || !dueDate) return;
    await fetch('/api/reminders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, dueDate }),
    });
    setText('');
    setDueDate('');
    fetchReminders();
  };

  const deleteReminder = async (id) => {
    await fetch(`/api/reminders?id=${id}`, { method: 'DELETE' });
    fetchReminders();
  };

  const toggleReminder = async (id, currentStatus) => {
    await fetch('/api/reminders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, completed: !currentStatus }),
    });
    fetchReminders();
  };

  return (
    <section className="reminder-container">
      <div className="reminder-header">
        <FaCalendarAlt size={28} />
        <h2>Upcoming Reminders</h2>
      </div>
      <p className="money-fact">{moneyFact}</p>
      <p className="tip-cycle">{rotatingTip}</p>

      <div className="reminder-form">
        <input
          type="text"
          placeholder="Reminder (e.g. Pay rent)"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addReminder}>➕ Add Reminder</button>
      </div>

      <div className="reminder-list">
        {reminders.length > 0 ? (
          reminders.map((reminder) => (
            <div key={reminder.id} className={`reminder-card ${reminder.completed ? 'done' : ''}`}>
              <div>
                <h4>{reminder.text}</h4>
                <p>📅 Due: {new Date(reminder.dueDate).toLocaleDateString()}</p>
                <p>Status: {reminder.completed ? '✅ Completed' : '⏳ Pending'}</p>
              </div>
              <div className="btn-group">
                <button onClick={() => toggleReminder(reminder.id, reminder.completed)}>
                  ✅ Complete
                </button>
                <button onClick={() => deleteReminder(reminder.id)} className="delete-btn">
                  🗑️
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No reminders found.</p>
        )}
      </div>
    </section>
  );
}
