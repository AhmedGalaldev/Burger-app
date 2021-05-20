import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredientsSuammary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
        {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious Burger with the following ingredients:</p>
      <ul>{ingredientsSuammary}</ul>
      <p>Countinue to checkout?</p>
      <Button btnType="Danger" clicked={props.purchasingCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchasingContinued}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
