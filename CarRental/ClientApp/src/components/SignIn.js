import React, { Component } from 'react';

export class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailAddress: '',
            password: ''
        };
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Sign In</h2>
                    <div className="input-group flex-nowrap w-25">
                        <span className="input-group-text" id="addon-wrapping">@</span>
                        <input type="email"
                                name="emailAddress"
                                value={this.state.emailAddress}
                                onChange={this.handleInputChange} 
                                className="form-control"/>
                    </div>
                    <div className="input-group flex-nowrap w-25">
                        <span className="input-group-text" id="addon-wrapping">Password</span>
                        <input type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleInputChange} 
                                className="form-control"/>
                    </div>
                    <div>
                        <button type="submit">Zaloguj</button>
                    </div>
                </form>
            </div>
        );
    }
}
