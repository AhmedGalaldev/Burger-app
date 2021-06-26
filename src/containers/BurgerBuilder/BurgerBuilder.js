import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import * as actions from "../../store/actions/index";

const burgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const onIngredientAdded = (ingName) =>
    dispatch(actions.addIngredient(ingName));
  const onIngredientRemoved = (ingName) =>
    dispatch(actions.removeIngredient(ingName));
  const onInitIngredients = useCallback(
    () => dispatch(actions.initIngredients()),
    []
  );
  const onPurchased = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) =>
    dispatch(actions.setAuthRedirectPath(path));

  const ings = useSelector((state) => state.burgerBuilder.ingredients);
  const price = useSelector((state) => state.burgerBuilder.totalPrice);
  const error = useSelector((state) => state.burgerBuilder.error);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  const purchasingHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      props.history.push("auth");
    }
  };

  const purchasingCancelHandler = () => {
    setPurchasing(false);
  };
  const purchasingCountinueHandler = () => {
    onPurchased();
    props.history.push("/checkout");
  };

  // for disable remove button
  const disabledInfo = { ...props.ings };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let burger = error ? <p>Ingredients can't be loaded !</p> : <Spinner />;
  let orderSummary = null;

  if (ings) {
    burger = (
      <Aux>
        <Burger ingredients={ings} />
        <BuildControls
          addedIngredients={onIngredientAdded}
          removedIngredients={onIngredientRemoved}
          disabled={disabledInfo}
          price={price}
          purchasable={updatePurchaseState(ings)}
          ordered={purchasingHandler}
          isAuth={isAuthenticated}
        />
      </Aux>
    );

    orderSummary = (
      <OrderSummary
        ingredients={ings}
        purchasingCancelled={purchasingCancelHandler}
        purchasingContinued={purchasingCountinueHandler}
        price={price}
      />
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchasingCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     ings: state.burgerBuilder.ingredients,
//     price: state.burgerBuilder.totalPrice,
//     error: state.burgerBuilder.error,
//     isAuthenticated: state.auth.token !== null,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
//     onIngredientRemoved: (ingName) =>
//       dispatch(actions.removeIngredient(ingName)),
//     onInitIngredients: () => dispatch(actions.initIngredients()),
//     onPurchased: () => dispatch(actions.purchaseInit()),
//     onSetAuthRedirectPath: (path) =>
//       dispatch(actions.setAuthRedirectPath(path)),
//   };
// };

export default withErrorHandler(burgerBuilder, axios);
