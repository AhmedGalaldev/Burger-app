import Aux from "../../hoc/Aux";
const layout = (props) => (
  <Aux>
    <div>toolbar, sideDrawer, backDrop</div>
    <main>{props.children}</main>
  </Aux>
);

export default layout;
