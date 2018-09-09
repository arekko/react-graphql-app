import React from "react";
import { Mutation } from "react-apollo";
import { SIGNUP_USER } from "../../queries";
import Error from "../Error";

const intialState = {
    username: "",
    email: "",
    password: "",
    passwordConfiramation: ""
}

class Signup extends React.Component {
  state = { ...intialState };

  clearState = () => {
    this.setState({ ...intialState })
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = (event, signupUser) => {
    event.preventDefault();

    signupUser().then(({data}) => {
      console.log(data);
      localStorage.setItem('token', data.signupUser.token )
      this.clearState();
    });
  };

  validateForm = () => {
    const { username, email, password, passwordConfiramation } = this.state;
    const isInvalid =
      !username ||
      !email ||
      !password ||
      password !== passwordConfiramation;
    return isInvalid;
  };

  render() {
    const { username, email, password, passwordConfiramation } = this.state;

    return (
      <div className="App">
        <h2 className="App">Signup</h2>
        <Mutation
          mutation={SIGNUP_USER}
          variables={{ username, email, password }}
        >
          {(signupUser, { data, loading, error }) => {
            return (
              <form
                action=""
                className="form"
                onSubmit={event => this.handleSubmit(event, signupUser)}
              >
                <input
                  value={username}
                  onChange={this.handleChange}
                  type="text"
                  name="username"
                  placeholder="username"
                />
                <input
                  value={email}
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  placeholder="email"
                />
                <input
                  value={password}
                  onChange={this.handleChange}
                  type="password"
                  name="password"
                  placeholder="password"
                />
                <input
                  value={passwordConfiramation}
                  onChange={this.handleChange}
                  type="password"
                  name="passwordConfiramation"
                  placeholder="Confirm password"
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

export default Signup;
