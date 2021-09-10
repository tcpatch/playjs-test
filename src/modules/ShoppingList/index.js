import React, { useState, Fragment } from "react";

import store from '../store';

const testRecipes = [
  {
    name: 'Tacos',
    tags: ['mexican',
           'vegetarian'],
    // todo figure a better data structure
    ingredients: [
      '1,spanish rice',
      '1,black beans',
      '1,green pepper',
      '1,onion',
      '1,frozen corn',
      '1,tortia'
    ]
  },
  {
    name: 'Kale Pesto',
    tags: ['pasta',
           'vegetarian'],
    ingredients: [
      '1,kale',
      '1,garlic',
      '1,rigatoni'
    ]
  }
  ]

function addAdditionalItems(shoppingList) {
  let storeState = store.getState();
  //todo add ability to specify n items
  let count = 1;
  for (let i=0; i<storeState.additionalItems.length; i++) {
    let item = storeState.additionalItems[i].item;
    console.log(item)
    if (item in shoppingList) {
      shoppingList[item] = shoppingList[item] + count;
    } else {
      shoppingList[item] = count;
    }
  }
  return shoppingList
}

// todo update from db
function updateShoppingList(recipe, shoppingList) {
  for (let i=0; i<testRecipes.length; i++) {
    let currentRecipe = testRecipes[i];
    if (currentRecipe.name === recipe) {
      let ingredients = currentRecipe.ingredients;
      for (let j=0; j<ingredients.length; j++) {
        let ingredientStr = ingredients[j];
        let splitIngredientSt = ingredientStr.split(',');
        let ingredient = splitIngredientSt[1];
        let count = parseInt(splitIngredientSt[0]);
        if (ingredient in shoppingList) {
          shoppingList[ingredient] = shoppingList[ingredient] + count;
        } else {
          shoppingList[ingredient] = count;
        }
      }
    }
  }
  return shoppingList
}

const crossOut = (event) => {
  const styleText = 'text-decoration:line-through;'
  if (event.target.className ==='noStrikeThrough') {
    event.target.className = 'strikeThrough'
  } else {
    event.target.className = 'noStrikeThrough'
  }
}

function getList() {
  let storeState = store.getState();
  let shoppingList = {};
  for (let i=0; i<storeState.menu.length; i++) {
    let c = storeState.menu[i];
    shoppingList = updateShoppingList(c.recipe, shoppingList);
  }
  shoppingList = addAdditionalItems(shoppingList);
  let ingredients = Object.keys(shoppingList);
  
  return ingredients.map((item, index) => (
    <li onClick={crossOut} className='noStrikeThrough'>
        {shoppingList[item]} {item}
    </li>
));

}

function ShoppingList() {
  const [inputExtra, setInputExtra] = useState('');
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputExtra(value);
  }
  
  const handleSubmit = (e) => {
    const addThis = inputExtra;
    let updateString = `menu/append/${addThis}/none/none`;
    store.dispatch({ type: updateString })
    setInputExtra('');
  }

  return (
    <div>
      <input
              name="extra"
   placeholder="Add item..."
              value={inputExtra}
              onChange={e => handleInputChange(e)}
            />
      <button onClick={handleSubmit}>Submit</button>
    <ul>
    {getList()}
    </ul>
    </div>
  );
}

export default {
    routeProps: {
        path: '/shoppinglist', 
        exact: true,
        component: ShoppingList,
    },
    name: 'Shopping List',
};