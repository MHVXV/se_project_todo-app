 import { toggleButtonState } from "../scripts/validate.js";

 class FormValidator {
    constructor (settings, formEl) {
        this._inputSelector = settings.inputSelector;
        this._formSelector = settings.formSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._errorClass = settings.errorClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._formEl = formEl; 
        
    }

// implement all the other methods

    _checkInputValidity(inputElement) {
        //TODO - implement this method
        //work thru errors in console
        if (!inputElement.validity.valid) {
            showInputError(
              formElement,
              inputElement,
              inputElement.validationMessage,
              settings,
            );
          } else {
            hideInputError(formElement, inputElement, settings);
          }
    }


    // TODO - finish implementing _setEventListeners
_setEventListeners(settings) {
    const inputList = Array.from(
        this._formEl.querySelectorAll(this._inputSelector),
      );
      
      const buttonElement = this._formEl.querySelector(
        this._submitButtonSelector,
      );
    
      toggleButtonState(inputList, buttonElement, settings);
    
      inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          checkInputValidity(inputElement);
        toggleButtonState(inputList, buttonElement, settings);
        });
      });
}

enableValidation() {
        this._formEl.addEventListener("submit", (evt) => {
          evt.preventDefault();
        });
        this._setEventListeners();
    }
 }

 export default FormValidator;