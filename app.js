// Storage Controller

// Item Controller
const ItemCtrl = (function () {
  const Item = function (id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  };

  const data = {
    items: [
      // { id: 0, name: "Steak Dinner", price: 25 },
      // { id: 1, name: "Gas", price: 40 },
      // { id: 2, name: "Mark Store", price: 45 },
    ],
    currentItem: null,
    totalSpends: 0,
  };

  // Public methods
  return {
    getItems: function () {
      return data.items;
    },
    addItem: function (name, price) {
      let id;
      // Create id for new item(last items added id + 1 or 0 if items list is empty)
      if (data.items.length > 0) {
        id = data.items[data.items.length - 1].id + 1;
      } else {
        id = 0;
      }
      const newItem = new Item(id, name, price);
      data.items.push(newItem);
      return newItem;
    },
    logData: function () {
      return data;
    },
  };
})();

// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemName: "#item-name",
    itemPrice: "#item-price",
  };
  // Public Methods
  return {
    populateToList: function (items) {
      let innerUL = "";
      items.forEach((item) => {
        innerUL += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.price} dollar</em>
        <a href="#" class="secondary-content">
          <i class="fa fa-pencil"></i>
        </a>
      </li>`;
      });
      document.querySelector(UISelectors.itemList).innerHTML = innerUL;
    },
    getItemInputs: function () {
      return {
        name: document.querySelector(UISelectors.itemName),
        price: document.querySelector(UISelectors.itemPrice),
      };
    },
    getSelectors: function () {
      return UISelectors;
    },
    addItemToList: function (item) {
      document.querySelector(UISelectors.itemList).style.display = "block"
      const li = document.createElement("li");
      li.className = "collection-item";
      li.id = `item-${item.id}`;
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.price} dollar</em>
        <a href="#" class="secondary-content">
          <i class="fa fa-pencil"></i>
        </a>
      `;
      // Insert Item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    clearInputs: function () {
      document.querySelector(UISelectors.itemName).value = "";
      document.querySelector(UISelectors.itemPrice).value = "";
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
  };
})();

// App Controller
const App = (function (ItemCtrl, UICtrl) {
  // load event listeners
  const loadEventListeners = function () {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);
  };
  // console.log(itemAddSubmit)

  // Add item submit
  const itemAddSubmit = function (e) {
    // Get form from UI Controller
    e.preventDefault();
    const inputs = UICtrl.getItemInputs();
    // Validation for inputs values
    if (
      inputs.name.value !== "" &&
      typeof Number(inputs.price.value) === "number" &&
      inputs.price.value > 0
    ) {
      // Add inputes values to data list and populate items to UI
      const newItem = ItemCtrl.addItem(
        inputs.name.value,
        Number(inputs.price.value)
      );

      // Add new Item to our ul list in UI
      UICtrl.addItemToList(newItem);

      // Clear input fields after adding new item
      UICtrl.clearInputs();
    }
  };

  //Public Methods
  return {
    init: function () {
      // Fetch items from data sturcture
      const items = ItemCtrl.getItems();
      // check if items list is empty
      if (items.length === 0) {
        // Hide ul items 
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateToList(items);
      }

      // Load event listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

App.init();
