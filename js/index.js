"use strict";

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var Panel = ReactBootstrap.Panel;
var Accordion = ReactBootstrap.Accordion;
var ButtonToolbar = ReactBootstrap.ButtonToolbar;
var recipes;
/*Next steps:
-Create parent element to host the add recipe buton and Modal display component
-Have each Modal component render the clickable recipe name that also launches the Modal with recipe.
-In parent, map a new state object (filled with recipe objects made up of title and ingredients) to create a modal component for each recipe.
-Set up add recipe function, pass it down to add recipe component. It will update the recipe "book" in the parent function.
-Add a cooking/preparation section?
*/
if (typeof localStorage["recipeList"] != "undefined") {
  recipes = JSON.parse(localStorage["recipeList"]);
  //console.log(recipes);
} else {
    recipes = [{
      title: 'Mac N Cheese',
      ingreds: ['Cheddar Cheese', 'Macaroni', 'Milk', 'Butter', 'Flour'],
      instruct: 'Boil water. Boil macaroni for 8-10 minutes. While boiling, melt butter in sauce pan on medium heat. When melted, add milk and flour. Stir until even consistency. Continue heating until mixture begins to boil. Slowly add cheese and stir until cheese sauce becomes thick and creamy. Rinse macaroni. Stir macaroni into cheese sauce. Delicious!'
    }, {
      title: 'Chicken Caesar Salad',
      ingreds: ['Chicken Breast', 'Romaine Lettuce', 'Garlic Caesar Salad Dressing', 'Croutons'],
      instruct: 'Preheat oven to 375F. Cook chicken for 35-45 mintues for your preferred level of juiciness. Check temperature of chicken before consuming. With 5-10 minutes left in bake time, wash the romaine (if necessary) and toss it with croutons and caesar dressing. When chicken is done, chop it up into bite sized pieces and toss it with the salad and any other ingredients you might want (nuts, carrots, cabbage, cheese, etc). Donezo.'
    }, {
      title: 'Stuffed Jumbo Shells',
      ingreds: ['Ricotta Cheese', 'Jumbo Shells', 'Your Choice of Sauce', 'Spinach'],
      instruct: 'First, mix ricotta cheese and thawed/drained spinach. (Consider adding mozzarella or parmesan to the mixture as well!) Boil jumbo shells for specified time (probably around 10 minutes). Create your sauce and set it to heat on low. When done boiling, stuff shells with spinach/ricotta combination. If not baking, pour hot sauce over shells and enjoy. If baking, preheat to 350F and place shells in a pan with sauce on the bottom. Bake for 25-35 minutes. Then enjoy!'
    }];
  }

var RecipeBook = function (_React$Component) {
  _inherits(RecipeBook, _React$Component);

  function RecipeBook(props) {
    _classCallCheck(this, RecipeBook);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      recipes: _this.props.recipes
    };
    _this.updateRecipes = _this.updateRecipes.bind(_this);
    _this.deleteRecipes = _this.deleteRecipes.bind(_this);
    return _this;
  }

  RecipeBook.prototype.updateRecipes = function updateRecipes(newTitle, newIngreds, newInstruct) {
    console.log('updating recipes');
    var added = {
      title: newTitle,
      ingreds: newIngreds.split(/\r?\n/),
      instruct: newInstruct
    };
    if (newTitle != 'Add New Recipe') {
      this.setState({
        recipes: this.state.recipes.concat([added])
      });
    }
    recipes.push(added);
    console.log(recipes);
    updateStorage();
    //passed to Recipe Adding Component to update the state
  };

  RecipeBook.prototype.deleteRecipes = function deleteRecipes(index) {
    recipes.splice(index, 1);
    this.setState({
      recipes: recipes
    });
    updateStorage();
  };

  RecipeBook.prototype.render = function render() {
    console.log(this.state.recipes);
    return React.createElement(
      "div",
      null,
      React.createElement(TitleBox, null),
      React.createElement(
        Accordion,
        null,
        this.state.recipes.map(function (recipe, index) {
          return React.createElement(
            Panel,
            { header: recipe.title, eventKey: index },
            React.createElement(
              "ul",
              null,
              recipe.ingreds.map(function (ing, index) {
                return React.createElement(
                  "li",
                  { key: index },
                  ing
                );
              })
            ),
            React.createElement(
              "div",
              null,
              recipe.instruct
            ),
            React.createElement(RecipeEditor, { index: index, deleteRecipes: this.deleteRecipes })
          );
        }, this)
      ),
      React.createElement(RecipeAdder, { updateRecipes: this.updateRecipes })
    );
  };

  return RecipeBook;
}(React.Component);

var TitleBox = function TitleBox(_ref) {
  _objectDestructuringEmpty(_ref);

  return React.createElement(
    "div",
    { id: "title" },
    "The Greasiest Cookbook Known to Anyone or Anything Ever"
  );
};

var RecipeEditor = function (_React$Component2) {
  _inherits(RecipeEditor, _React$Component2);

  function RecipeEditor(props) {
    _classCallCheck(this, RecipeEditor);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this2.state = {
      showModal: false,
      editedTitle: recipes[_this2.props.index].title,
      editedIngreds: recipes[_this2.props.index].ingreds,
      editedInstruct: recipes[_this2.props.index].instruct
    };
    _this2.editRecipe = _this2.editRecipe.bind(_this2);
    _this2.editTitle = _this2.editTitle.bind(_this2);
    _this2.editIngreds = _this2.editIngreds.bind(_this2);
    _this2.editInstruct = _this2.editInstruct.bind(_this2);
    _this2.open = _this2.open.bind(_this2);
    _this2.close = _this2.close.bind(_this2);
    return _this2;
  }

  RecipeEditor.prototype.open = function open() {
    this.setState({
      showModal: true
    }, function () {
      console.log(this.state.showModal);
    });
  };

  RecipeEditor.prototype.close = function close() {
    this.setState({
      showModal: false
    });
  };

  RecipeEditor.prototype.editRecipe = function editRecipe(title, ingreds, instruct) {
    console.log('is it working?');
    recipes[this.props.index].title = this.state.editedTitle;
    recipes[this.props.index].ingreds = this.state.editedIngreds;
    console.log(recipes[this.props.index].ingreds);
    recipes[this.props.index].instruct = this.state.editedInstruct;
    updateStorage();
  };

  RecipeEditor.prototype.editTitle = function editTitle(e) {
    var newTitle = e.target.value;
    this.setState({
      editedTitle: newTitle
    });
  };

  RecipeEditor.prototype.editIngreds = function editIngreds(e) {
    var newIngreds = e.target.value;
    var newIngreds = newIngreds.split('\n');
    this.setState({
      editedIngreds: newIngreds
    });
  };

  RecipeEditor.prototype.editInstruct = function editInstruct(e) {
    var newInstruct = e.target.value;
    this.setState({
      editedInstruct: newInstruct
    });
  };

  RecipeEditor.prototype.render = function render() {
    var _this3 = this;

    var ingredients = JSON.stringify(this.state.editedIngreds);
    ingredients = ingredients.replace(/[\[\"\]]/g, '').replace(/,/g, '\n');
    console.log(ingredients);
    return React.createElement(
      "div",
      null,
      React.createElement(
        ButtonToolbar,
        null,
        React.createElement(
          Button,
          {
            className: "modalButton",
            id: "editor",
            bsStyle: "info",
            bsSize: "large",
            onClick: this.open },
          "Edit"
        ),
        React.createElement(
          Button,
          {
            className: "modalButton",
            bsStyle: "danger",
            bsSize: "large",
            onClick: function onClick() {
              return _this3.props.deleteRecipes(_this3.props.index);
            } },
          "Delete"
        )
      ),
      React.createElement(
        Modal,
        { show: this.state.showModal, onHide: this.close },
        React.createElement(
          Modal.Header,
          { closeButton: true },
          React.createElement(
            Modal.Title,
            null,
            React.createElement(
              "textarea",
              { id: "editTitle", rows: "1", onChange: this.editTitle },
              this.state.editedTitle
            )
          )
        ),
        React.createElement(
          Modal.Body,
          null,
          React.createElement(
            "form",
            null,
            React.createElement(
              "textarea",
              { id: "editIngreds", rows: "9", type: "text", onChange: this.editIngreds },
              ingredients
            ),
            React.createElement(
              "textarea",
              { id: "instructions", rows: "7", type: "text", onChange: this.editInstruct },
              this.state.editedInstruct
            )
          )
        ),
        React.createElement(
          Modal.Footer,
          null,
          React.createElement(
            Button,
            { onClick: function onClick() {
                return _this3.editRecipe(_this3.state.editTitle, _this3.state.editIngreds, _this3.state.editInstruct);
              } },
            "Save"
          ),
          React.createElement(
            Button,
            { onClick: this.close },
            "Close"
          )
        )
      )
    );
  };

  return RecipeEditor;
}(React.Component);

var RecipeAdder = function (_React$Component3) {
  _inherits(RecipeAdder, _React$Component3);

  function RecipeAdder(props) {
    _classCallCheck(this, RecipeAdder);

    var _this4 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

    _this4.state = {
      showModal: false,
      titleValue: 'Add New Recipe',
      textValue: "List ingredients here\nNew line for each ingredient!",
      instructValue: "Add instructions here"
    };
    _this4.close = _this4.close.bind(_this4);
    _this4.open = _this4.open.bind(_this4);
    _this4.updateTitle = _this4.updateTitle.bind(_this4);
    _this4.updateIngreds = _this4.updateIngreds.bind(_this4);
    _this4.updateInstruct = _this4.updateInstruct.bind(_this4);
    return _this4;
  }

  RecipeAdder.prototype.open = function open() {
    this.setState({
      showModal: true
    }, function () {
      console.log(this.state.showModal);
    });
  };

  RecipeAdder.prototype.close = function close() {
    this.setState({
      showModal: false
    });
  };

  RecipeAdder.prototype.updateTitle = function updateTitle(e) {
    var newTitle = e.target.value;
    this.setState({
      titleValue: newTitle
    });
  };

  RecipeAdder.prototype.updateIngreds = function updateIngreds(e) {
    var newIngreds = e.target.value;
    this.setState({
      textValue: newIngreds
    }, function () {
      console.log(this.state.textValue);
    });
  };

  RecipeAdder.prototype.updateInstruct = function updateInstruct(e) {
    var newInstruct = e.target.value;
    this.setState({
      instructValue: newInstruct
    });
  };

  RecipeAdder.prototype.render = function render() {
    var _this5 = this;

    return React.createElement(
      "div",
      { id: "theAdder" },
      React.createElement(
        Button,
        {
          bsStyle: "info",
          bsSize: "large",
          className: "modalButton adderButton",
          onClick: this.open },
        "Add Recipe"
      ),
      React.createElement(
        Modal,
        { show: this.state.showModal, onHide: this.close },
        React.createElement(
          Modal.Header,
          { closeButton: true },
          React.createElement(
            Modal.Title,
            null,
            React.createElement(
              "textarea",
              { id: "addTitle", rows: "1", onChange: this.updateTitle },
              "Add Title Here"
            )
          )
        ),
        React.createElement(
          Modal.Body,
          null,
          React.createElement(
            "form",
            null,
            React.createElement(
              "textarea",
              { id: "addIngreds", rows: "9", type: "text", onChange: this.updateIngreds },
              "Add Ingredients here. Return between ingredients!"
            ),
            React.createElement(
              "textarea",
              { id: "instructions", rows: "7", type: "text", onChange: this.updateInstruct },
              "Add Instructions here."
            )
          )
        ),
        React.createElement(
          Modal.Footer,
          null,
          React.createElement(
            Button,
            { onClick: function onClick() {
                return _this5.props.updateRecipes(_this5.state.titleValue, _this5.state.textValue, _this5.state.instructValue);
              } },
            "Save"
          ),
          React.createElement(
            Button,
            { onClick: this.close },
            "Close"
          )
        )
      )
    );
  };

  return RecipeAdder;
}(React.Component);

function updateStorage() {
  console.log('updating storage');
  localStorage.setItem("recipeList", JSON.stringify(recipes));

  ReactDOM.render(React.createElement(RecipeBook, { recipes: recipes }), document.getElementById('app'));
}
//window.localStorage.clear();
updateStorage();