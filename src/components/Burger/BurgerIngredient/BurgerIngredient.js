import PropType from "prop-types";
import { Component } from "react";
import styles from "./BurgerIngredient.module.css";

class BurgerIngredient extends Component {
  render() {
    let ingredient = null;

    switch (this.props.type) {
      case "bread-buttom":
        ingredient = <div className={styles.BreadButtom}></div>;
        break;
      case "bread-top":
        ingredient = (
          <div className={styles.BreadTop}>
            <div className={styles.Seeds1}></div>
            <div className={styles.Seeds2}></div>
          </div>
        );
        break;
      case "meat":
        ingredient = <div className={styles.Meat}></div>;
        break;
      case "chease":
        ingredient = <div className={styles.Chease}></div>;
        break;
      case "salad":
        ingredient = <div className={styles.Salad}></div>;
        break;
      case "bacon":
        ingredient = <div className={styles.Bacon}></div>;
        break;
      default:
        ingredient = null;
    }
    return ingredient;
  }
}

BurgerIngredient.propTypes = {
  type: PropType.string.isRequired,
};
export default BurgerIngredient;
