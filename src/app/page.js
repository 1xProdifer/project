'use client';

import './styles/home.css';
import { useState, useEffect } from 'react';

export default function Home() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('CAD');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currencies, setCurrencies] = useState([]);

  const [description, setDescription] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionType, setTransactionType] = useState('income');
  const [transactions, setTransactions] = useState([]);

  const API_KEY = 'fca_live_VErTijcRLf2w9t317a4eqLQdow13GMi66Rxm6WFH';

  useEffect(() => {
    const timeout = setTimeout(() => {
      alert("💡 Reminder: Don’t forget to review your budget today!");
    }, 20000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const res = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}`);
        const data = await res.json();
        if (data && data.data) {
          setCurrencies(Object.keys(data.data));
        }
      } catch (error) {
        console.error('Currency fetch error:', error);
      }
    }

    fetchCurrencies();
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch('/api/transactions');
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error('Error fetching transactions:', err);
    }
  };

  const handleAddTransaction = async () => {
    const newTransaction = {
      description,
      amount: parseFloat(transactionAmount),
      type: transactionType,
    };

    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });

      if (res.ok) {
        setDescription('');
        setTransactionAmount('');
        setTransactionType('income');
        fetchTransactions();
      } else {
        console.error('Failed to add transaction');
      }
    } catch (err) {
      console.error('Error adding transaction:', err);
    }
  };

  const handleClearForm = () => {
    setDescription('');
    setTransactionAmount('');
    setTransactionType('income');
    setAmount(1);
    setConvertedAmount(null);
    setTransactions([]);
  };

  const convertCurrency = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&base_currency=${fromCurrency}`);
      const data = await res.json();
      const rate = data.data[toCurrency];
      if (rate) {
        setConvertedAmount(amount * rate);
      }
    } catch (err) {
      alert('Conversion error');
    }
    setIsLoading(false);
  };

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <section className="home-container">
      <h2>Welcome to the Smart Budget Tracker</h2>
      <p>Track your expenses and stay financially smart.</p>

      <div className="balance-box">
        <h3>Total Balance: ${totalBalance.toFixed(2)}</h3>
        <p>Total Income: ${totalIncome.toFixed(2)}</p>
        <p>Total Expenses: ${totalExpense.toFixed(2)}</p>
      </div>

      <div className="form-currency-row">
        {/* Form */}
        <div className="form-box">
          <h3>Add Transaction</h3>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={transactionAmount}
            onChange={(e) => setTransactionAmount(e.target.value)}
          />
          <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <div className="button-row">
            <button onClick={handleAddTransaction}>Add</button>
            <button onClick={handleClearForm} className="clear-btn">Clear</button>
          </div>
        </div>

        {/* Converter */}
        <div className="currency-box">
          <h3>Currency Converter</h3>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
          <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
            {currencies.map((cur) => (
              <option key={cur} value={cur}>{cur}</option>
            ))}
          </select>
          <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            {currencies.map((cur) => (
              <option key={cur} value={cur}>{cur}</option>
            ))}
          </select>
          <button onClick={convertCurrency}>Convert</button>
          {isLoading ? (
            <p>Loading...</p>
          ) : convertedAmount !== null && (
            <p className="converted-result">
              {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
            </p>
          )}
        </div>
      </div>

      {/* Transactions */}
      <div className="transactions-box">
        <h3>Transaction History</h3>
        <div className="transaction-list">
          {transactions.map((item) => (
            <div key={item.id} className={`transaction-card ${item.type}`}>
              <div className="left">
                <span className="dot"></span>
                <div>
                  <p className="desc">{item.description}</p>
                  <p className="type">{item.type.toUpperCase()}</p>
                </div>
              </div>
              <div className="amount">
                ${item.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
