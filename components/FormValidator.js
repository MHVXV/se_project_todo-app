class FormValidator {
  constructor(settings, formEl) {
    this._settings = settings;
    this._errorClass = settings.errorClass;
    this._formSelector = settings.formSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;

    this._inputSelector = settings.inputSelector;
    this._formEl = formEl;
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );

    this._submitButtonSelector = settings.submitButtonSelector;
    this._buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );
  }

  _showInputError = (inputElement, errorMessage) => {
    this._errorElementId = `#${inputElement.id}-error`;
    this._errorElement = this._formEl.querySelector(this._errorElementId);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    this._errorElementId = `#${inputElement.id}-error`;
    this._errorElement = this._formEl.querySelector(this._errorElementId);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = "";
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };

  _setEventListeners() {
    this._toggleButtonState(this._inputList);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._formEl.reset();
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}

export default FormValidator;
