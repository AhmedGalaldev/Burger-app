import { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
class Orders extends Component {
  state = {
    orders: [],
    loading: false,
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        this.setState({ loading: true, orders: fetchedOrders });
      })
      .catch((err) => {
        this.setState({ loading: true });
      });
  }
  render() {
    const orderOutput = this.state.orders.map((order) => {
      return (
        <Order
          price={+order.price}
          ingredients={order.ingredients}
          key={order.id}
        />
      );
    });
    return <div>{orderOutput}</div>;
  }
}

export default withErrorHandler(Orders, axios);
