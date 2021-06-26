import { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
const checkout = (props) => {
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContiuedHandler = () => {
    props.history.push("/checkout/contact-data");
  };

  let summary = <Redirect to="/" />;

  if (props.ings) {
    const purchased = props.purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchased}
        <CheckoutSummary
          ingredients={props.ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContiued={checkoutContiuedHandler}
        />
        <Route
          path={props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
  return summary;
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(checkout);
