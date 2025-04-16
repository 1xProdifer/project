'use client';

import React, { Component } from 'react';
import '../styles/budget.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

class BudgetGoals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: [],
      name: '',
      amount: '',
      quote: '',
      loading: false,
      error: null,
      progressInputs: {},
    };
  }

  componentDidMount() {
    this.fetchGoals();
    this.fetchQuote();

    setTimeout(() => {
      alert('🚀 Tip: Set achievable goals to stay on track!');
    }, 15000);
  }

  async fetchGoals() {
    this.setState({ loading: true });
    try {
      const res = await fetch('/api/goals');
      const data = await res.json();
      this.setState({ goals: Array.isArray(data) ? data : [], loading: false });
    } catch (err) {
      this.setState({ error: 'Failed to fetch goals', loading: false });
    }
  }

  async fetchQuote() {
    try {
      const res = await fetch('https://api.quotable.io/random');
      const data = await res.json();
      this.setState({ quote: data.content });
    } catch (err) {
      this.setState({ quote: 'Stay focused and keep setting goals.' });
    }
  }

  async handleAddGoal() {
    const { name, amount } = this.state;
    try {
      const res = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, amount: parseFloat(amount) }),
      });

      if (res.ok) {
        this.setState({ name: '', amount: '' });
        this.fetchGoals();
      } else {
        this.setState({ error: 'Failed to add goal' });
      }
    } catch (err) {
      this.setState({ error: 'Failed to add goal' });
    }
  }

  async handleDeleteGoal(id) {
    try {
      const res = await fetch(`/api/goals?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        this.fetchGoals();
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  }

  async handleProgressSubmit(goalId) {
    const progress = this.state.progressInputs[goalId] || 0;

    try {
      const res = await fetch('/api/goals', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: goalId, progress }),
      });

      if (res.ok) {
        this.setState((prev) => ({
          progressInputs: { ...prev.progressInputs, [goalId]: '' },
        }));
        this.fetchGoals();
      }
    } catch (err) {
      console.error('Failed to update progress:', err);
    }
  }

  handleClearForm() {
    this.setState({ name: '', amount: '', error: null, goals: [] });
  }

  render() {
    const { goals, name, amount, loading, error, quote, progressInputs } = this.state;

    return (
      <section className="budget-container">
        <h2>🎯 Budget Goals</h2>
        <p>Track your goals and stay financially focused!</p>

        <div className="top-row">
          <div className="left-side">
            <div className="goal-form">
              <input
                type="text"
                placeholder="Goal name (e.g. Groceries)"
                value={name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Target Amount ($)"
                value={amount}
                onChange={(e) => this.setState({ amount: e.target.value })}
              />
              <div className="button-row">
                <button onClick={() => this.handleAddGoal()}>Add Goal</button>
                <button onClick={() => this.handleClearForm()} className="clear-btn">Clear</button>
              </div>
            </div>
          </div>

          <div className="right-side">
            <div className="quote-box">
              <p className="quote-title">🧠 Quote of the Day:</p>
              <p className="quote-text">{quote}</p>
            </div>
          </div>
        </div>

        {loading && <p>Loading goals...</p>}
        {error && <p className="error">{error}</p>}

        <div className="goal-list">
          {goals.map((goal) => {
            const percent = Math.min(100, (goal.current / goal.amount) * 100);
            const status = percent >= 100 ? '✅ Achieved' : percent >= 50 ? '🟢 Halfway There' : '🟡 In Progress';

            return (
              <div key={goal.id} className="goal-card">
                <div className="goal-head">
                  <h4>{goal.name}</h4>
                  <button onClick={() => this.handleDeleteGoal(goal.id)} className="delete-btn">🗑️</button>
                </div>
                <p>Target: ${goal.amount.toFixed(2)}</p>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${percent}%` }}></div>
                </div>
                <p>Progress: ${goal.current.toFixed(2)} / ${goal.amount.toFixed(2)} ({percent.toFixed(0)}%)</p>
                <p>Status: {status}</p>
                <div className="progress-update">
                  <input
                    type="number"
                    placeholder="Add progress"
                    value={progressInputs[goal.id] || ''}
                    onChange={(e) =>
                      this.setState({
                        progressInputs: {
                          ...progressInputs,
                          [goal.id]: e.target.value,
                        },
                      })
                    }
                  />
                  <button onClick={() => this.handleProgressSubmit(goal.id)}>➕</button>
                </div>
              </div>
            );
          })}
        </div>

        {goals.length > 0 && (
          <div className="chart-container">
            <h3>📊 Goal Targets Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={goals}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>
    );
  }
}

export default BudgetGoals;
