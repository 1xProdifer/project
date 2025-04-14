// src/app/reminders/page.js
'use client';

import React, { useState } from 'react';
import './reminders.css';

const RemindersPage = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState('');
  const [date, setDate] = useState('');

  const addReminder = () => {
    if (newReminder && date) {
      setReminders([...reminders, { text: newReminder, date }]);
      setNewReminder('');
      setDate('');
    }
  };

  const deleteReminder = (index) => {
    const updated = reminders.filter((_, i) => i !== index);
    setReminders(updated);
  };

  return (
    <div className="reminders-container">
      <h1>📅 Set Your Reminders</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Reminder description"
          value={newReminder}
          onChange={(e) => setNewReminder(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={addReminder}>Add Reminder</button>
      </div>
      {reminders.length === 0 ? (
        <p className="empty">No reminders yet. Add one above! 🚀</p>
      ) : (
        <ul className="reminders-list">
          {reminders.map((reminder, index) => (
            <li key={index} className="reminder-item">
              <span>{reminder.text} - {reminder.date}</span>
              <button onClick={() => deleteReminder(index)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RemindersPage;
