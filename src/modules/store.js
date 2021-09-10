import { createStore } from 'redux'

let reducerState = {
  menu: [],
  additionalItems: []
}

function dayInStore(d, m, state) {
  for (let i=0; i < state.menu.length; i++) {
    if (state.menu[i].day == d && state.menu[i].meal == m) {
      return true
    }
  }
  return false
}

// should really put this into an api...
function counterReducer(state = reducerState, action) {
  const regex = /menu\/(?<action>.*)\/(?<day>.*)\/(?<meal>.*)\/(?<recipe>.*)/
  let match  = regex.exec(action.type);
  let actionType = '';
  let day = '';
  let meal = '';
  let recipe = '';
  try {
    let groups = match.groups;
    actionType = groups.action;
    day = groups.day;
    meal = groups.meal;
    recipe = groups.recipe;
  }
  catch {}
  console.log(actionType)
  let updateObj = {day, meal, recipe};
  if (actionType === 'add') {
    if (dayInStore(day, meal, state)) {
      return {
        menu: state.menu.map((menu) => {
            if(menu.day === day && menu.meal == meal){
               return {
                  ...menu,
                  ...updateObj
               }
            } else {
               return menu
            }
         })
     }
    } else {
      return {
        ...state,
        menu: [...state.menu, updateObj]
      }
    }
  } else if ( actionType === 'remove') {
    recipe = '';
    updateObj = {day, meal, recipe};
    if (dayInStore(day, meal, state)) {
      return {
        menu: state.menu.map((menu) => {
            if(menu.day === day && menu.meal == meal){
               return {
                  ...menu,
                  ...updateObj
               }
            } else {
               return menu
            }
         })
     }
    }
    // todo hanfle remove apprnd see StapleModal
  } else if ( actionType === 'append') {
    let item = day;
    updateObj = {item};
    return {
      ...state,
      additionalItems: [...state.additionalItems, updateObj]
    }
  } else {
      return state
  }
}

// subscribe, dispatch, getState
let store = createStore(counterReducer)


export default store;