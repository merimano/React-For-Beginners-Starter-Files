import React from "react";
import {formatPrice} from "../helpers";

class Order extends React.Component {
    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish && fish.status === 'available';
        // If there is no fish then don't render out anything.
        if(!fish) return null;
        // If the fish isn't availiable, inform. If the fish equals a fish, use the fish name, is the fish isn't in the database, jyst use the work fish.
        if(!isAvailable) {
            return <li key={key}> Sorry {fish ? fish.name : 'fish'} is no longer available</li>;
        }
        return <li key={key}>
            {count} lbs {fish.name}

            {formatPrice(count * fish.price)}
            <button onClick={() => this.props.deleteFromOrder(key)}>Delete</button>
            </li>;
    };
    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if(isAvailable) {
                return prevTotal + (count * fish.price);
            }
            return prevTotal;
        }, 0);
        return (
            <div className="order-wrap">
                <h2>Order!!!</h2>
                <ul className="order">{orderIds.map(this.renderOrder)}</ul>
                
                <div className="total">
                    <strong>{formatPrice(total)}</strong>
                </div>
                
            </div>
        );
    }
}

export default Order;