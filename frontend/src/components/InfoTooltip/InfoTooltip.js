import RegistSuccess from "../../components/images/RegisterSuccess.svg";
import RegisterFault from "../../components/images/RegisterFault.svg";

export default function InfoTooltip({ InfoStatus, onClose, isOpen }) {
  return (
    <div
      className={`popup ${isOpen ? `popup_opened` : ""}`}
      id="InfoTooltip__popup"
      tabIndex="0"
    >
      <div className="InfoTooltip__container">
        <button
          className="popup__close"
          type="button"
          aria-label="закрыть попап"
          onClick={onClose}
        ></button>
        <img
          className="InfoTooltip__image"
          src={InfoStatus ? RegistSuccess : RegisterFault}
        />
        <h2 className="InfoTooltip__text">
          {InfoStatus
            ? "Вы успешно зарегестрировались!"
            : "Что-то пошло не так, попробуйте еще раз"}
        </h2>
      </div>
    </div>
  );
}
