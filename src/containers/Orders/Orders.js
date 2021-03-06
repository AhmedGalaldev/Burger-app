import { useEffect } from "react";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
const orders = (props) => {
  const { fetchOrders } = props;
  useEffect(() => {
    fetchOrders(props.token, props.userId);
  }, [fetchOrders]);

  let orders = <Spinner />;

  if (!props.loading) {
    orders = props.orders.map((order) => {
      return (
        <Order
          price={+order.price}
          ingredients={order.ingredients}
          key={order.id}
        />
      );
    });
  }

  return <div>{orders}</div>;
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(orders, axios));
