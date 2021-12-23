import React from 'react';
import PropTypes from "prop-types";

class EditFishForm extends React.Component {
    static propTypes = {
        index: PropTypes.string,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        fish: PropTypes.shape({
            name: PropTypes.string, 
            image: PropTypes.string, 
            price: PropTypes.number,
            desc: PropTypes.string,
            status: PropTypes.string
        })
    };

    handleChange = event => {
        //Update that fish.
        //Take a copy of the current fish.
        const updatedFish = {
            ...this.props.fish,
            // Update the key name, with the value
        [event.currentTarget.name]: event.currentTarget.value
        };
        // send it to the state.
        this.props.updateFish(this.props.index, updatedFish)
    };

    //handleDelete = event => {
     //   this.props.deleteFish(this.props.index)
    //};
    
    render() {
        return (
            <div className="fish-edit">
                <input type="text" name="name" onChange={this.handleChange} value={this.props.fish.name}/>
                <input type="text" name="price" onChange={this.handleChange} value={this.props.fish.price}/>
                <select type="text" name="status" onChange={this.handleChange} value={this.props.fish.status}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold out!</option>
                </select>
                <textarea type="text" name="desc" onChange={this.handleChange} value={this.props.fish.desc}/>
                <input type="text" name="image" onChange={this.handleChange} value={this.props.fish.image}/>
                <button onClick={() => this.props.deleteFish(this.props.index)}>Delete Fish</button>
            </div>
        );
    }
}

export default EditFishForm;