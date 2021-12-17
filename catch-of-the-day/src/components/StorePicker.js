import React from 'react';
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
    // Create a "ref" in order to access the item in the DOM.
    myInput = React.createRef();
    
    // Declare a property (goToStore) and set it to an arrowfunction since the property is bound to the instance which enables the access to "this".
    goToStore = event => {
        // 1. Stop the event from submitting.
        event.preventDefault();
        // 2. get the text from that input.
        const storeName = this.myInput.current.value;
        // 3. Change the page to store
        this.props.history.push(`/store/${storeName}`);
    };
    render() {
        return (
            // Create a form with an inline eventhandler onSubmit, and tell it which function to run. This works directly when someone submits the form.
            <form className="store-selector" onSubmit={this.goToStore}> 
                <h2>Please enter a store</h2>
                <input 
                    type="text"
                    // this.myInput links up to createRef and enables the selection of it.
                    ref={this.myInput}
                    required placeholder="Store Name"
                    defaultValue={getFunName()}
                    />
                <button type="submit">Visit Store</button>
            </form>
            );
        }   
}

export default StorePicker;