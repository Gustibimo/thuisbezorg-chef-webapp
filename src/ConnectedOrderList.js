import React from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import OrderList from './OrderList';
const socket = new Pusher('65449945abe4abad3c51', {
    cluster: 'eu',
});
export default class ConnectedOrderList extends React.Component {
    state = {
        orders: []
    };
    render() {
        return ( <
            div className = "ui container" >
            <
            OrderList orders = {
                this.state.orders
            }
            /> < /
            div >
        );
    }
    componentDidMount() {
        this._fetchOrders();
        socket.subscribe('orders')
            .bind('order-update', () => this._fetchOrders());
    }
    _fetchOrders() {
        const ordersPromise = axios.get('http://localhost:8080/orders')
        const menuItemsPromise = axios.get('http://localhost:8080/menu-items');
        Promise.all([ordersPromise, menuItemsPromise])
            .then((values) => {
                const menuItems = {};
                values[1].data.forEach((entry) => {
                    menuItems[entry.id] = entry.name;
                });
                const orders = values[0].data.map((order) => {
                    return {
                        id: order.id,
                        status: order.status,
                        items: order.items.map((item) => {
                            return {
                                id: item.id,
                                menuItem: item.menuItem,
                                status: item.status,
                                name: menuItems[item.menuItem]
                            };
                        })
                    };
                });
                this.setState({
                    orders: orders
                });
            });
    }
}