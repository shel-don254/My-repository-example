import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionTable from "./components/TransactionTable";
import TransactionForm from "./components/TransactionForm";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/transactions").then((response) => {
      setTransactions(response.data);
    });
  }, []);

  const addTransaction = (newTransaction) => {
    axios
      .post("http://localhost:4000/transactions", newTransaction)
      .then((res) => {
        setTransactions((prev) => [...prev, res.data]);
      });
  };
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Bank Transactions App</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TransactionTable transactions={filteredTransactions} />
      <TransactionForm addTransaction={addTransaction} />
    </div>
  );
};

export default App;
