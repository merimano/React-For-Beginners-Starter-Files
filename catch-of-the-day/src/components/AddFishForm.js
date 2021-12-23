import React from 'react';
import PropTypes from "prop-types";

class AddFishForm extends React.Component {
    static propTypes = {
        addFish: PropTypes.func
    };

    // Create a ref for each reference
    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();
    // Create an arrow function to enable this to be the created instance.
    createFish = (event) => {
         // 1. Stop the form from submitting
        event.preventDefault();
        // 2. Get the text from the form and create a fish instance
        const fish = {
            name: this.nameRef.current.value,
            price: parseFloat(this.priceRef.current.value),
            status: this.statusRef.current.value,
            desc: this.descRef.current.value,
            image: this.imageRef.current.value
        };
        this.props.addFish(fish);
        // Refresh the form
        event.currentTarget.reset();
    }
    // 3. Create a new instance of a fish and update the page.
    render() {
        return (
            // Add an inline eventlistener
            <form className="fish-edit" onSubmit={this.createFish}>
               <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
               <input name="price" ref={this.priceRef} type="text" placeholder="Price"/>
               <select name="status" ref={this.statusRef} type="text" placeholder="Status">
                   <option value="availaible">Fresh!</option>
                   <option value="unavailiable">Sold out!</option>
               </select>
               <textarea name="desc" ref={this.descRef} type="text" placeholder="Desc"/>
               <input name="image" ref={this.imageRef} type="text" placeholder="Image"/>
               <button type="submit">Add Fish</button>
            </form>
        );
    }
}

export default AddFishForm;