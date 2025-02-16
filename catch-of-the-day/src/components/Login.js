import React from "react";
import PropTypes from "prop-types";
const Login = (props) => (


    //Below is a stateless function, thus this.props is not needed, only props.
    <nav className="login">
        <h2>Inventory Login</h2>
        <p>Sign In to access your fish</p>
        <button className="github" onClick={() => props.authenticate('Github')}>
            Log In with Github
        </button>
        <button className="facebook" onClick={() => props.authenticate('Facebook')}>
            Log In with Facebook
        </button>
    </nav>
)

Login.propTypes = {
    authenticate: PropTypes.func.isRequired
};

export default Login;