class Section {
  constructor({ items, renderer, containerSelector }) {
    // an array of the data that we want to convert into html and then place on the dom, when renderItems is called
    this._items = items;
    // a function that takes in 'data' converts it to html and places it on the dom
    this._renderer = renderer;
    // the element that we want to append or prepend items into
    this._container = document.querySelector(containerSelector);
  }

  // loop through the items, we convert each item into html, and then place each item on the dom
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // take an element and place that element in the container
  addItem(element) {
    this._container.prepend(element);
  }
}

export default Section;
