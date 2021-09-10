import React, { useRef, useState } from 'react';

import store from '../store';
import StapleModal from './stapleModal'

function sortMeals(meals) {
  var order = ['breakfast', 'lunch', 'dinner'];

  meals.sort(function(a, b) {
    if (order.indexOf(a.props.children[0]) < order.indexOf(b.props.children[0])) {
      return -1;
    }
    if (order.indexOf(a.props.children[0]) > order.indexOf(b.props.children[0])) {
      return 1;
    }
    return 0;
  });

  return meals

}

function addToSelectedMenu(d, m, r, selectedMenu) {
  if (d in selectedMenu) {
    selectedMenu[d].push(<p>{m}: {r}</p>);
  } else {
    selectedMenu[d] = [<p>{m}: {r}</p>];
  }
  selectedMenu[d] = sortMeals(selectedMenu[d]);
  return selectedMenu
}

function sortMenu(days) {
  var order = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', `saturday`];
  function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

  var uniqueDays = days.filter(onlyUnique);
  uniqueDays.sort(function(a, b) {
    if (order.indexOf(a) < order.indexOf(b)) {
      return -1;
    }
    if (order.indexOf(a) > order.indexOf(b)) {
      return 1;
    }
    return 0;
  });

  return uniqueDays

}

function getMenu() {
  console.log('getting state')
  let storeState = store.getState();
  console.log(storeState)
  let dayList = [];
  let selectedMenu = {};
  for (let i=0; i<storeState.menu.length; i++) {
    let c = storeState.menu[i];
    let d = c.day;
    let m = c.meal;
    let r = c.recipe;
    selectedMenu = addToSelectedMenu(d, m, r, selectedMenu);
    dayList.push(c.day);
  }
  dayList = sortMenu(dayList);
  return dayList.map((item, index) => (
    <li>
      {item} {selectedMenu[item]}
    </li>
));
}

//const Dashboard = () => (
function Dashboard() {
  //todo get from db based on user
  const [staples, setStaples] = useState(['eggs', 'bread', 'milk', 'cereal']);
  
  // todo would be cool to import this from modal
  function handleUpdateStaple() {
    const storeState = store.getState();
    try {
      var currentItems = storeState.additionalItems.map(function (i) { return i.item; });
    } catch {
      var currentItems = [];
    }
    for (let i=0; i<staples.length; i++) {
      let item = staples[i];
      if (!(currentItems.includes(item))) {
        let updateString = `menu/append/${item}/staple/none`;
        store.dispatch({ type: updateString })
      }
    }
  }
  
  handleUpdateStaple();

  return (
  <div>
    {StapleModal(staples, setStaples)}
    <div>Menu:</div>
    {getMenu()}
  </div>
  );
}

export default {
    routeProps: {
        path: '/',
        exact: true,
        component: Dashboard,
    },
    name: 'Home',
};
