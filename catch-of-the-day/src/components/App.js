import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory.js";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";
import PropTypes from "prop-types";
class App extends React.Component {

// Every custom function that need sto update state needs to live in the App-component.
    state = {
        fishes: {},
        order: {}
    };

    static props = {
        match: PropTypes.Object
    }

    // Sync the state and the database. componentDidMount method runs after the component output has been rendered to the DOM.
    componentDidMount() {
        // Get the name of the store
        const { params } = this.props.match;
        // Reinstate our local storage, by first getting the item from the local storage.
        const localStorageRef = localStorage.getItem(params.storeId);
        // Then, if there is a localstorage value, then turn it back from a string into an object and set it to state.
        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef)});
        }
        // Sync the database with the name of the store. The fish state is whats going to be synced.
        this.ref = base.syncState(`${ params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    // Evoked directly after updating occurs. Below method for persisting the state in local storage.
    componentDidUpdate() {
        // Stick the state into the local storage with the key(the storeId) and the value (the order), and convert the order object into a string.
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    // Clean up the state saved into the database for the component when the user is going back and forward.
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = fish => {
        console.log("Adding A fish");
        // 1. Take a copy of the existing state
        const fishes = {...this.state.fishes };
        // 2. Add a new fish to that fishes variable
        fishes[`fish${Date.now()}`] = fish;
        // 3. Set the new fishes object to state
        this.setState({
            fishes: fishes
        });
    }

    updateFish = (key, updatedFish) => {
        // 1. Take a copy of the current state fishes
        const fishes = { ...this.state.fishes };
        // 2. Update that state, the fish with the new value
        fishes[key] = updatedFish;
        // 3. Set the updated state to state
        this.setState({
            fishes: fishes
        });
    }

    deleteFish = (key) => {
        //1. Take a copy of the current fishes state.
        const fishes = {... this.state.fishes };
        //2. Update the state, the fish setting the value to null
        fishes[key] = null;
        //3. Set the updated state to state.
        this.setState({ fishes: fishes });
    }

    loadSampleFishes = () => {
        this.setState({fishes: sampleFishes});
        alert('Load Sample')
    }

    addToOrder = (key) => {
        console.log('Adding an order');
        // 1. Take a copy of existing state
        const order = { ...this.state.order };
        // 2. Add a new order to the order variable or update the number in the order
        order[key] = order[key] + 1 || 1;
        // 3. Update the state object
        this.setState({order: order});
    }

    deleteFromOrder = (key) => {
       // 1. Take a copy of the order
        const order = { ...this.state.order };
       // 2. Update the order copy to null
       order[key] = null ;
       // 3. Update the state
       this.setState({ order: order});
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="Fishes">
                        {Object.keys(this.state.fishes).map(key => (
                        <Fish 
                            key={key}
                            index={key}
                            details={this.state.fishes[key]} 
                            addToOrder={this.addToOrder}
                            />
                        ))}
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order}
                    deleteFromOrder={this.deleteFromOrder}/>
                <Inventory 
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes}
                    storeId={this.props.match.params.storeId}
                />
            </div>
        );
    }
}

export default App;