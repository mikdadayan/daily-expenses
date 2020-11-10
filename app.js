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
      { id: 0, name: "Steak Dinner", price: 25 },
      { id: 1, name: "Gas", price: 40 },
      { id: 2, name: "Mark Store", price: 45 },
    ],
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
  };
})();

// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: "#item-list"
  }
  // Public Methods
  return {
    populateToList: function (items) {
      console.log("Helllooooo")
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
    getSelectors: function(){
      return UISelectors;
    }
  };
})();

// App Controller
const App = (function (ItemCtrl, UICtrl) {
  // load event listeners
  const loadEventListeners = function(){
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();
  }
  return {
    init: function () {
      const items = ItemCtrl.getItems();
      UICtrl.populateToList(items);
    },
  };
})(ItemCtrl, UICtrl);


App.init()