import React from "react";
import AddFishForm from "./AddFishForm";
import firebase from "firebase";
import EditFishForm from "./EditFishForm";
import PropTypes from "prop-types";
import Login from "./Login";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFish: PropTypes.func
    };

    state = {
        uid: null,
        owner: null
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.authHandler({ user });
            };
        });
    }

    authHandler = async authData => {
        // 1. Look up the current store in the Firebase database
        const store = await base.fetch(this.props.storeId, {context: this});
        console.log(store);
        // 2. Claim the store
        if(!store.owner) {
            //save it as our own
            await base.post(`${this.props.storeId}/owner`, { data: authData.user.uid });
        }
        // 3. Set the state of the inventory component to match the user.
        this.setState({
            uid: authData.user.uid, 
            owner: store.owner || authData.user.uid
        });
        console.log(authData);
    };

    authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
        .auth()
        .signInWithPopup(authProvider)
        .then(this.authHandler);
    };

    logout = async () => {
        await firebase.auth().signOut();
        // clear the state
        this.setState({ uid: null });
    };

    render() {
        // Create a log out button.
        const logout = <button onClick={this.logout}>Log Out</button>;

        // 1. Check if they are logged in.
        // 2. If not return the login button.
        if(!this.state.uid) {
            return <Login authenticate={this.authenticate}/>;
        }
        // 3. Check if the user is the owner of the store.
        if(this.state.uid != this.state.owner) {
            return (
            <div>
                <p>It is not your store</p>
                {logout}
            </div>
            );
        }
        return (
            <div className="inventory">
                <h2>Inventory!!!</h2>
                {logout}
                { Object.keys(this.props.fishes).map(key => (
                    <EditFishForm 
                        key={key}
                        index={key}
                        fish={this.props.fishes[key]}
                        updateFish={this.props.updateFish}
                        deleteFish={this.props.deleteFish}
                        />
                ))}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        );
        
    }
}

export default Inventory;