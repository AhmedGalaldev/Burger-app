import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import styles from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { checkValidity } from "../../shared/utility";

const auth = (props) => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your Email",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Your Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });
  const [isSignUp, setIsSignUp] = useState(true);
  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
  }, [uildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp);
  };

  const inputChangedHandler = (event, controlName) => {
    const updatedControl = {
      ...authForm,
      [controlName]: {
        ...authForm[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          authForm[controlName].validation
        ),
        touched: true,
      },
    };

    setAuthForm(updatedControl);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onAuth(authForm.email.value, authForm.password.value, isSignUp);
  };

  let formElementsArr = [];
  for (let key in authForm) {
    formElementsArr.push({
      id: key,
      config: authForm[key],
    });
  }

  let form = (
    <form onSubmit={onSubmitHandler}>
      {formElementsArr.map((formElement) => {
        return (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValid={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)}
          />
        );
      })}
      <Button btnType="Success">SUBMIT</Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p style={{ color: "red" }}>{props.error.message}</p>;
  }

  let redirect = null;

  if (props.isAuthenticated) {
    redirect = <Redirect to={props.authRedirectPath} />;
  }
  return (
    <div className={styles.Auth}>
      {redirect}
      {errorMessage}
      {form}
      <Button btnType="Danger" clicked={switchAuthModeHandler}>
        SWITCH TO {isSignUp ? "SIGNUP" : "SIGNIN"}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(auth);
