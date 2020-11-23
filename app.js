// Storage Controller
const StorageCtrl = (function () {
  return {
    storeItem: function (item) {
      let items = [];
      // Check if there are any items in local storage
      if (localStorage.getItem("items") === null) {
        items = [];

        // Push item into items
        items.push(item);
        localStorage.setItem("items", JSON.stringify(items));
      } else {
        items = JSON.parse(localStorage.getItem("items"));
        items.push(item);
        localStorage.setItem("items", JSON.stringify(items));
      }
    },
    getItemsFromLS: function () {
      let items = [];
      if (localStorage.getItem("items") === null) {
        items = [];
        return items;
      } else {
        items = JSON.parse(localStorage.getItem("items"));
        return items;
      }
    },
    updateAndStoreItem: function (updatedItem) {
      let items = [];
      // Check if there are any items in local storage
      if (localStorage.getItem("items") !== null) {
        items = JSON.parse(localStorage.getItem("items"));
        items.forEach(function (item, index) {
          if (item.id === updatedItem.id) {
            items.splice(index, 1, updatedItem);
          }
        });
        localStorage.setItem("items", JSON.stringify(items));
      } else {
        console.log("Oops there is not element in ls");
      }
    },
    deleteFromItemStorage: function (id) {
      let items = [];
      if (localStorage.getItem("items") !== null) {
        items = JSON.parse(localStorage.getItem("items"));
        items.forEach(function (item, index) {
          if (item.id === id) {
            items.splice(index, 1);
          }
        });
        localStorage.setItem("items", JSON.stringify(items));
      } else {
        console.log("Oops there is not element in ls");
      }
    },
    removeAllFromStorage: function () {
      localStorage.removeItem("items");
    },
  };
})();

// Item Controller
const ItemCtrl = (function () {
  const Item = function (id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  };

  const data = {
    items: StorageCtrl.getItemsFromLS(),
    currentItem: null,
    totalSpends: 0,
  };

  // Public methods
  return {
    getItems: function () {
      return data.items;
    },
    logData: function () {
      return data;
    },
    getTotalSpends: function () {
      let total = 0;
      data.items.forEach((item) => {
        total += item.price;
      });
      data.totalSpends = total;

      return data.totalSpends;
    },
    getItemById: function (itemId) {
      return data.items.find(function (item) {
        return item.id === itemId;
      });
    },
    getCurrentName: function () {
      return data.currentItem.name;
    },
    getCurrentPrice: function () {
      return data.currentItem.price;
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
    setCurrentItem: function (item) {
      data.currentItem = item;
    },
    updateCurrentItem: function (updatedName, updatedPrice) {
      let updatedItem;
      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.name = updatedName;
          item.price = updatedPrice;
          // return { ...item, name: updatedName, price: updatedPrice };
          updatedItem = item;
        }
      });
      return updatedItem;
    },
    deleteCurrentItem: function () {
      let deletedItem;
      let newItemsList = data.items.filter(function (item) {
        if (item.id !== data.currentItem.id) {
          return item;
        }
        deletedItem = item;
      });
      data.items = newItemsList;
      return deletedItem;
    },
    clearCurrentItem: function () {
      data.currentItem = null;
    },
    removeAllItems: function () {
      data.items = [];
      data.currentItem = null;
      totalSpends = 0;
    },
  };
})();

// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemForm: ".item-form",
    itemList: "#item-list",
    listItems: "#item-list li",
    addBtn: ".add-btn",
    itemName: "#item-name",
    itemPrice: "#item-price",
    totalSpend: ".total-spends",
    updateBtn: "#update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    clearBtn: ".clear-btn",
  };
  // Public Methods
  return {
    populateToList: function (items) {
      let innerUL = "";
      items.forEach((item) => {
        innerUL += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.price} dollar</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
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
      document.querySelector(UISelectors.itemList).style.display = "block";
      const li = document.createElement("li");
      li.className = "collection-item";
      li.id = `item-${item.id}`;
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.price} dollar</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
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
    showTotalSpends: function (totalSpend) {
      document.querySelector(UISelectors.totalSpend).innerHTML = totalSpend;
    },
    clearEditState: function () {
      this.clearInputs();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },
    fillFormToUpdate: function () {
      document.querySelector(
        UISelectors.itemName
      ).value = ItemCtrl.getCurrentName();
      document.querySelector(
        UISelectors.itemPrice
      ).value = ItemCtrl.getCurrentPrice();
      UICtrl.showEditState();
    },
    updateList: function (item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn Node List into array
      listItems = Array.from(listItems);

      listItems.forEach((listItem) => {
        const itemID = listItem.getAttribute("id");
        if (itemID === `item-${item.id}`) {
          document.querySelector(
            `#${itemID}`
          ).innerHTML = `<strong>${item.name}: </strong> <em>${item.price} dollar</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      });
    },
    updateListAfterDelete: function (item) {
      const itemID = `#item-${item.id}`;
      const itemToDelete = document.querySelector(itemID);
      itemToDelete.remove();
    },
    deleteAllFromUI: function () {
      document.querySelector(UISelectors.itemList).innerHTML = "";
      document.querySelector(UISelectors.totalSpend).innerHTML = 0;
    },
  };
})();

// App Controller
const App = (function (ItemCtrl, UICtrl, StorageCtrl) {
  // load event listeners
  const loadEventListeners = function () {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    document
      .querySelector(UISelectors.itemForm)
      .addEventListener("submit", function (e) {
        console.log("Daaaaaa");
        e.preventDefault();
      });
    // Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    // Add edit icon click event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEditClick);

    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", itemUpdateSubmit);
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", itemDeleteSubmit);
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", discardItemChangeState);
    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener("click", deleteItemsSubmit);
  };

  // Add item submit
  const itemAddSubmit = function (e) {
    e.preventDefault();
    // Get form from UI Controller
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

      // Add new item to ls
      StorageCtrl.storeItem(newItem);

      // Get total spend from Item Ctrl
      const totalSpend = ItemCtrl.getTotalSpends();

      // Add total spends to UI
      UICtrl.showTotalSpends(totalSpend);

      // Clear input fields after adding new item
      UICtrl.clearInputs();
    }
  };

  // Item Edit icon click
  function itemEditClick(e) {
    console.log(e.target);
    if (e.target.classList.contains("edit-item")) {
      console.log("fusck is this");
      const listID = e.target.parentNode.parentNode.id;
      const id = parseInt(listID.split("-")[1]);
      const itemToEdit = ItemCtrl.getItemById(id);
      console.log(itemToEdit);
      ItemCtrl.setCurrentItem(itemToEdit);
      UICtrl.fillFormToUpdate(itemToEdit);
    }
  }

  function itemUpdateSubmit(e) {
    e.preventDefault();
    // Get form from UI Controller
    const inputs = UICtrl.getItemInputs();
    // Validation for inputs values

    if (
      inputs.name.value !== "" &&
      typeof Number(inputs.price.value) === "number" &&
      parseInt(inputs.price.value) > 0
    ) {
      const updatedItem = ItemCtrl.updateCurrentItem(
        inputs.name.value,
        parseInt(inputs.price.value)
      );
      console.log(updatedItem);

      // Set updated item into local storage
      StorageCtrl.updateAndStoreItem(updatedItem);

      const totalSpends = ItemCtrl.getTotalSpends();

      ItemCtrl.clearCurrentItem();

      // Clear edit state
      UICtrl.clearEditState();

      // Clear input fields after adding new item
      UICtrl.clearInputs();

      // To show up updated list
      UICtrl.updateList(updatedItem);

      // Show total spends after item update
      UICtrl.showTotalSpends(totalSpends);
    }
  }

  function discardItemChangeState(e) {
    e.preventDefault();

    // Clear item details from ItemCtrl data currentItem
    ItemCtrl.clearCurrentItem();

    // Clear edit state
    UICtrl.clearEditState();

    // Clear input fields after adding new item
    UICtrl.clearInputs();
  }

  function itemDeleteSubmit(e) {
    e.preventDefault();
    const deletedItem = ItemCtrl.deleteCurrentItem();
    ItemCtrl.clearCurrentItem();
    // Clear item details from ItemCtrl data currentItem
    ItemCtrl.clearCurrentItem();

    // Delete item from LS
    StorageCtrl.deleteFromItemStorage(deletedItem.id);
    // Clear edit state
    UICtrl.clearEditState();

    // Clear input fields after adding new item
    UICtrl.clearInputs();

    // Rerender list items after deleting
    UICtrl.updateListAfterDelete(deletedItem);
  }

  function deleteItemsSubmit(e) {
    e.preventDefault(e);
    ItemCtrl.removeAllItems();
    StorageCtrl.removeAllFromStorage();
    UICtrl.deleteAllFromUI();
    UICtrl.hideList();
    // Clear input fields after adding new item
    UICtrl.clearInputs();
    // Clear edit state
    UICtrl.clearEditState();
  }

  //Public Methods
  return {
    init: function () {
      // Clear edit state
      UICtrl.clearEditState();
      // Fetch items from data sturcture
      const items = ItemCtrl.getItems();
      // Get total Spends
      ItemCtrl.getTotalSpends();
      // check if items list is empty
      if (items.length === 0) {
        // Hide ul items
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateToList(items);
      }

      // Show total spends on UI
      UICtrl.showTotalSpends(ItemCtrl.getTotalSpends());

      // Load event listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl, StorageCtrl);

App.init();
