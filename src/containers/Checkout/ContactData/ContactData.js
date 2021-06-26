import { useState } from "react";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import { checkValidity } from "../../../shared/utility";

const contactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-Mail",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Country",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Street",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your ZIP Code",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false,
    },
    deleveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "fastest",
      validation: {},
      valid: false,
    },
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();

    const orderForm = {};
    for (let formElementIdentifier in orderForm) {
      orderForm[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: orderForm,
      userId: props.userId,
    };
    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updetedOrderForm = { ...orderForm };

    const updatedOrderFormElement = { ...updetedOrderForm[inputIdentifier] };

    updatedOrderFormElement.value = event.target.value;

    updatedOrderFormElement.valid = checkValidity(
      updatedOrderFormElement.value,
      updatedOrderFormElement.validation
    );

    updatedOrderFormElement.touched = true;

    updetedOrderForm[inputIdentifier] = updatedOrderFormElement;
    let isFormValid = true;

    for (let inputIdentifier in updetedOrderForm) {
      isFormValid = updetedOrderForm[inputIdentifier].valid && isFormValid;
    }
    setOrderForm(updetedOrderForm);
    setIsFormValid(isFormValid);
  };

  let formElementsArr = [];
  for (let key in orderForm) {
    formElementsArr.push({
      id: key,
      config: orderForm[key],
    });
  }

  let form = (
    <form onSubmit={orderHandler}>
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
      <Button btnType="Success" disabled={!isFormValid}>
        ORDER
      </Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className={styles.ContactData}>
      <h4>Enter Your Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(contactData, axios));
