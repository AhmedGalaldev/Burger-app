import styles from "./Order.module.css";

const order = (props) => {
  const ingredients = [];

  for (let ingName in props.ingredients) {
    ingredients.push({
      name: ingName,
      amount: props.ingredients[ingName],
    });
  }

  const ingredientOutput = ingredients.map((ing) => {
    return (
      <span
        style={{
          textDecoration: "capitalize",
          textAlign: "center",
          margin: "0 2px",
          padding: "3px",
          border: "1px solid #ccc",
        }}
        key={ing.name}
      >
        {ing.name}({ing.amount})
      </span>
    );
  });
  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price:
        <strong>USD: {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
