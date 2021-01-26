import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    async componentDidMount() {
        try {
            const result = await axios.get('orders.json');

            const fetchedOrders = [];
            for (let key in result.data) {
                fetchedOrders.push({
                    ...result.data[key],
                    id: key
                });
            }

            this.setState({loading: false, orders: fetchedOrders});
        } catch (e) {
            this.setState({loading: false});
        }
    }

    render() {
        return (
            <div>
                {this.state.orders.map((order: any) => {
                    return <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}
                    />;
                })}
            </div>
        );
    }
}

export default Orders;