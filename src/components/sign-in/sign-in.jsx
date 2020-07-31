import PropTypes from "prop-types";
import React, {createRef} from "react";
import {connect} from "react-redux";

import {Header} from "../header/header";
import {Footer} from "../footer/footer";
import {Operation as UserOperation, ActionCreator} from "../../reducers/user/user";
import {getLoginError} from "../../reducers/user/selectors";


export const SignInError = {
  BAD_REQUEST: 400,
  EMAIL_VALIDATION: `EMAIL_VALIDATION`,
};

const getErrorMessage = (loginError) => {
  switch (true) {
    case loginError === null:
      return null;

    case loginError.response === SignInError.EMAIL_VALIDATION:
      return `Please enter a valid email address`;

    case loginError.response && loginError.response.status === SignInError.BAD_REQUEST:
    default:
      return (`We can’t recognize this email
and password combination. Please try again.`);
  }
};

const getEmailValidation = (emailValue) => {
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(String(emailValue).toLowerCase());
};


const SignInComponent = (props) => {
  const {
    login,
    loginError,
    setLoginError,
  } = props;

  const emailRef = createRef();
  const passwordRef = createRef();

  const errorMessage = loginError ? getErrorMessage(loginError) : null;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (getEmailValidation(emailRef.current.value)) {
      login({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    } else {
      setLoginError({
        response: SignInError.EMAIL_VALIDATION,
      });
    }
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
            <div className={`sign-in__field ${loginError && loginError.response === SignInError.EMAIL_VALIDATION && `sign-in__field--error`}`}>
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


SignInComponent.propTypes = {
  loginError: PropTypes.object,
  login: PropTypes.func.isRequired,
  setLoginError: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  loginError: getLoginError(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  setLoginError(error) {
    dispatch(ActionCreator.setLoginError(error));
  },
});

const SignIn = connect(mapStateToProps, mapDispatchToProps)(SignInComponent);


export {
  SignInComponent,
  SignIn,
};
