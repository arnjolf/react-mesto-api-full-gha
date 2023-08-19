import logo from "../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";

export default function Header(props) {
  const navigate = useNavigate();
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <div className="header__nav">
        {props.isMain && <p className="header__email">{props.userEmail}</p>}
        {props.isMain ? (
          <button className="header__button" onClick={props.onSignOut}>
            {props.link_action}
          </button>
        ) : (
          <Link to={props.link_path} className="header__link">
            {props.link_action}
          </Link>
        )}
      </div>
    </header>
  );
}
