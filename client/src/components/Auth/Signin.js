import React from "react";
import { Mutation } from "react-apollo";
import { SIGNIN_USER } from "../../queries";
import Error from "../Error";
import { withRouter } from 'react-router-dom'


const initialstate = {
  username: "",
  password: ""
}

class Signin extends React.Component {
  state = { ...initialstate };

  clearState = () => {
    this.setState({ ...initialstate })
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = (event, signinUser) => {
    event.preventDefault();

    signinUser().then(async ({ data }) => {
      localStorage.setItem('token', data.signinUser.token )
      await this.props.refetch()  // refetch the query 
      this.clearState();
      this.props.history.push('/')
    });
  };

  validateForm = () => {
    const { username, password } = this.state;
    const isInvalid = !username || !password;
    return isInvalid;
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="App">
        <h2 className="App">SignIn</h2>
        <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
          {(signinUser, { data, loading, error }) => {
            return (
              <form
                action=""
                className="form"
                onSubmit={event => this.handleSubmit(event, signinUser)}
              >
                <input
                  value={username}
                  onChange={this.handleChange}
                  type="text"
                  name="username"
                  placeholder="username"
                />

                <input
                  value={password}
                  onChange={this.handleChange}
                  type="password"
                  name="password"
                  placeholder="password"
                />
                <button
                  disabled={loading || this.validateForm()}
                  type="submit"
                  className="button-primary"
                >
                  Submit
                </button>
                {error && <Error error={error} />}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(Signin);
