import { useState } from "react";
import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import * as Auth from "../../utils/Auth";

export default function Login({ handleRegister }) {
  const [formValue, setFormValue] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    handleRegister(email, password);
  };

  return (
    <>
      <Header link_path="/sign-in" link_action="Войти" isMain={false} />
      <div className="login__wrapper">
        <h2 className="login__action">Регистрация</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            required
            name="email"
            onChange={handleChange}
            value={formValue.email}
            type="text"
            className="login__input"
            placeholder="Email"
          ></input>
          <input
            required
            name="password"
            onChange={handleChange}
            value={formValue.password}
            type="password"
            className="login__input"
            placeholder="Пароль"
          ></input>
          <button type="submit" className="login__submit">
            Зарегистрироваться
          </button>
        </form>
        <p className="login__paragraph">
          Уже зарегестрированы?{" "}
          <Link to="/sign-in" className="login__link">
            Войти
          </Link>
        </p>
      </div>
    </>
  );
}
