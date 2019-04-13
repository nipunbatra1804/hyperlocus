import React from "react";
import { useState } from "react";
import "./LoginPage.scss";
import { postLogin } from "../../services/serviceUser";

export default function LoginPage(props) {
  const [username, setUsername] = useState("example123");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleUsername = event => {
    setUsername(event.target.value);
  };
  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(username, password);
    const loggedIn = await postLogin(username, password);
    if (loggedIn) {
      const { updateUsername } = props;
      updateUsername(username);
      props.history.push("/explore");
      return;
    }
    setError("unable to login, please check your password");
  };

  return (
    <div className="text-center form-body">
      <form className="form-signin" onSubmit={handleSubmit}>
        <i className="fab fa-500px" />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputUsername" className="sr-only">
          Email address
        </label>
        <input
          type="username"
          id="inputUsername"
          className="form-control"
          placeholder="Email address"
          required
          autoFocus
          value={username}
          onChange={handleUsername}
        />

        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
          value={password}
          onChange={handlePassword}
        />

        <button className="btn btn-lg btn-secondary btn-block" type="submit">
          Sign in
        </button>
        {error && <div className="alert alert-danger">{error}</div>}
      </form>
    </div>
  );
}
