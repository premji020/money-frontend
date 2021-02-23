import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import TransactionsList from "./components/transactions-list.component.js";
import EditTransaction from "./components/edit-transaction.component";
import CreateTransaction from "./components/create-transaction.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={TransactionsList} />
        <Route path="/edit/:id" component={EditTransaction} />
        <Route path="/create" component={CreateTransaction} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;