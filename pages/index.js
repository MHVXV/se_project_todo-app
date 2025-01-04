import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Todo from "../components/Todo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: () => {},
});

addTodoPopup.setEventListeners();

const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

section.renderItems();

function generateTodo(data) {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
}

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

function renderTodo(item) {
  const todo = generateTodo(item);
  section.addItem(todo);
}

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const item = { name, date, id };

  renderTodo(item);

  newTodoValidator.resetValidation();

  addTodoPopup.close();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
