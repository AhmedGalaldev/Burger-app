import logoImage from "../../assets/images/burger-logo.png";
import styles from "./Logo.module.css";
const logo = (props) => (
  <div className={styles.Logo}>
    <img src={logoImage} alt="MyBurger" />
  </div>
);

export default logo;
