'use client';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useState } from 'react';
import './budget-goals.css';  // Import specific CSS for this page

export default function BudgetGoals() {
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [goals, setGoals] = useState([]);

  const addGoal = (e) => {
    e.preventDefault();
    if (goalName && targetAmount) {
      setGoals([...goals, { goalName, targetAmount }]);
      setGoalName('');
      setTargetAmount('');
    }
  };

  return (
    <div>
      <Navbar />
      <main style={{ padding: '20px' }}>
        <h2>Budget Goals</h2>
        <p>Set your financial goals for better budget tracking.</p>
        <form onSubmit={addGoal}>
          <input
            type="text"
            placeholder="Goal Name"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Target Amount"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
          />
          <br />
          <button type="submit">Save Goal</button>
        </form>
        <h3>Your Goals:</h3>
        <ul>
          {goals.map((goal, index) => (
            <li key={index}>
              {goal.goalName}: ${goal.targetAmount}
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
