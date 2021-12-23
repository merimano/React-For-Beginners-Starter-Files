import React from "react";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

class Order extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        order: PropTypes.object,
        deleteFromOrder: PropTypes.func,
    };
    
    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish && fish.status === 'available';
        const transitionOptions = {
            classNames: "order",
            key: key,
            timeout: { enter:5000, exit: 5000 }
        };
        // If there is no fish then don't render out anything.
        
        if(!fish) return null;
        // If the fish isn't availiable, inform. If the fish equals a fish, use the fish name, is the fish isn't in the database, jyst use the work fish.
        
        if(!isAvailable) {
            return (
                <CSSTransition {...transitionOptions}>
                    <li key={key}> Sorry {fish ? fish.name : 'fish'} is no longer available</li>;
                </CSSTransition>
            ); 
        }
        
        return (
            <CSSTransition {...transitionOptions}>
                 <li key={key}>
                     <span>
                         <TransitionGroup component="span" className="count">
                            <CSSTransition {...transitionOptions}>
                                <span>{count} lbs {fish.name}</span>
                            </CSSTransition>
                            </TransitionGroup>
                        {formatPrice(count * fish.price)}
                        <button onClick={() => this.props.deleteFromOrder(key)}>Delete</button>
                     </span>
                    
                </li>
            </CSSTransition>
        );
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
                <TransitionGroup component="ul" className="order">
                    {orderIds.map(this.renderOrder)}
                    </TransitionGroup>
                <div className="total">
                    Total:
                    <strong>{formatPrice(total)}</strong>
                </div>
                
            </div>
        );
    }
}

export default Order;