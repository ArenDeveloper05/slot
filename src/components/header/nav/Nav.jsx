import { Link } from "react-router-dom";
import { CONFIG } from "../../../config";

const Nav = () => {
  return (
    <nav>
      {CONFIG.navConfig.map(({ id, title, link }) => {
        return (
          <div key={id}>
            <Link to={link}>{title}</Link>
          </div>
        );
      })}
    </nav>
  );
};

export default Nav;
