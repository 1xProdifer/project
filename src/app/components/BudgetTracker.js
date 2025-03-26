'use client'
import { useState } from "react";


const BudgetTracker = () => {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const addEntry = (type) => {
    if (!name || !amount) return;
    const value = type === "income" ? +amount : -amount;
    setEntries([...entries, { name, amount: value }]);
    setName("");
    setAmount("");
  };

  const totalBalance = entries.reduce((sum, entry) => sum + entry.amount, 0);

  return (
    <div className="budget-tracker">
      <h2 className="balance">💰 Balance: ${totalBalance.toFixed(2)}</h2>

      <div className="input-container">
        <input
          type="text"
          placeholder="Entry Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button onClick={() => addEntry("income")} className="add-income">
        Add Income
      </button>
      <button onClick={() => addEntry("expense")} className="add-expense">
        Add Expense
      </button>

      <h3>📜 History</h3>
      <ul className="history-list">
        {entries.map((entry, index) => (
          <li
            key={index}
            className={`history-item ${entry.amount > 0 ? "income" : "expense"}`}
          >
            {entry.name}: ${entry.amount.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetTracker;
