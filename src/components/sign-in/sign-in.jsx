import PropTypes from "prop-types";
import React, {createRef} from "react";

import {Error} from "../../api";
import {Header} from "../header/header";
import {Footer} from "../footer/footer";


const getErrorMessage = (errorStatus) => {
  switch (errorStatus) {
    case Error.BAD_REQUEST:
      return (`We can’t recognize this email
and password combination. Please try again.`);
    default:
      return null;
  }
};


export const SignIn = (props) => {
  const {
    onSubmit,
    loginError,
  } = props;

  const emailRef = createRef();
  const passwordRef = createRef();

  const errorMessage = loginError ? getErrorMessage(loginError.response.status) : null;

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <div className="user-page">
      <Header />

      <div className="sign-in user-page__content">
        <form
          action="#"
          className="sign-in__form"
          onSubmit={handleSubmit}>

          {errorMessage &&
            <div className="sign-in__message">
              <p style={{whiteSpace: `pre-wrap`}}>{errorMessage}</p>
            </div>}

          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input ref={emailRef} className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input ref={passwordRef} className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>

          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};


SignIn.propTypes = {
  loginError: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};
