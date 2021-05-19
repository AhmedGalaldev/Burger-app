import BuildControl from "./BuildControl/BuildControl";
import styles from "./BuildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" },
];
const buildControls = (props) => (
  <div className={styles.BuildControls}>
    {controls.map((ctrl) => {
      return (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.addedIngredients(ctrl.type)}
          removed={() => props.removedIngredients(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      );
    })}
  </div>
);
export default buildControls;
