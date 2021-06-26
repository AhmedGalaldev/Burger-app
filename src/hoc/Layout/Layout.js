import { useState } from "react";
import { connect } from "react-redux";
import Aux from "../Aux/Aux";
import styles from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
const layout = (props) => {
  const [isSideDrawerIsVisible, setIsSideDrawerIsVisible] = useState(false);
  const sideDrawerClosedHandler = () => {
    setIsSideDrawerIsVisible(false);
  };
  const sideDrawerToggleHandler = () => {
    setIsSideDrawerIsVisible(!isSideDrawerIsVisible);
  };

  return (
    <Aux>
      <Toolbar
        drawerToggleClicked={sideDrawerToggleHandler}
        isAuth={props.isAuthenticated}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={isSideDrawerIsVisible}
        closed={sideDrawerClosedHandler}
      />
      <main className={styles.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(layout);
