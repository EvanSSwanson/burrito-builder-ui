import React, { Component } from 'react';
import './App.css';
import { getOrders, postOrder, deleteOrder } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    getOrders()
    .then(data => this.setState({orders: data.orders}))
      .catch(err => console.error('Error fetching:', err));
  }

  addOrder = (newOrder) => {
    postOrder(newOrder)
      .then(response => {
        this.setState({orders: [...this.state.orders, response]})
      })
  }

  removeOrder = (orderId) => {
    deleteOrder(orderId)
    getOrders()
    .then(data => this.setState({orders: data.orders}))
      .catch(err => console.error('Error fetching:', err));
    document.location.reload()
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1 className="site-title">Burrito Builder</h1>
          <OrderForm addOrder={this.addOrder}/>
        </header>

        <Orders orders={this.state.orders} removeOrder={this.removeOrder}/>
      </main>
    );
  }
}


export default App;
