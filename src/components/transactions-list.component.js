import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Transaction = props => (
    
    <tr>
      <td>{props.transaction.username}</td>
      <td>{props.transaction.role}</td>
      <td>{props.transaction.amount}</td>
      <td>
        <Link to={"/edit/"+props.transaction._id}>edit</Link> | <a href="/#" onClick={() => { props.deleteTransaction(props.transaction._id) }}>delete</a>
      </td>
    </tr>
    
  )
  
//const totalAmount = props =>(
//    <div>
//        <p>`Total Amount is ${props.totalAmount}`</p>
//    </div>
//)

export default class TransactionsList extends Component {

    constructor(props) {
        super(props);
        this.deleteTransaction = this.deleteTransaction.bind(this);
        this.state = {transactions: []};
      }

      componentDidMount() {
        axios.get('http://localhost:5000/transactions/')
         .then(response => {
           this.setState({ transactions: response.data });
         })
         .catch((error) => {
            console.log(error);
         })
      }

      deleteTransaction(id) {
        axios.delete('http://localhost:5000/transactions/'+id)
          .then(res => console.log(res.data));
        this.setState({
          transactions: this.state.transactions.filter(el => el._id !== id)
        })
      }

      transactionList() {
        return this.state.transactions.map(currenttransaction => {
          return <Transaction transaction={currenttransaction} deleteTransaction={this.deleteTransaction} key={currenttransaction._id}/>;
        })
      }

  render() {
    return (
        <div>
        <h3>Logged Transactions</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.transactionList() }
          </tbody>
        </table>
      </div>
    )
  }
}


















