import styles from "./CheckoutSummary.module.css";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
const checkoutSummary = (props) => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We Hope It Tastes Well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContiued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
