import React, { useRef, useState } from 'react'

import { Button, Modal } from 'react-bootstrap';

import store from '../store';


function DayModal(dayMenu, setDayMenu) {
  const [show, setShow] = useState(false);
 
  const breakfastItem = getMenuItem('breakfast', dayMenu.currentDay);
  const lunchItem = getMenuItem('lunch', dayMenu.currentDay);
  const dinnerItem = getMenuItem('dinner', dayMenu.currentDay);

  const handleClose = () => {
    //setShow(false);
    const dmenu = {...dayMenu};
    dmenu['showDayModal'] = false;
    setDayMenu(dmenu);
  }
  
  const handleUpdateMenuItem = (event) => {
    let meal = event.target.getAttribute('data-meal');
    let recipeName = dayMenu.selectedRecipe;
    const dmenu = {...dayMenu};
    dmenu.userSelectedRecipes[dayMenu.currentDay][meal] = recipeName;
    setDayMenu(dmenu);
    if (meal) {
      let updateString = `menu/add/${dayMenu.currentDay}/${meal}/${recipeName}`;
      store.dispatch({ type: updateString })
    }
  }
  
  function getMenuItem(meal, day) {
    let recipe = '';
    try {
      //recipe = dayMenu.userSelectedRecipes[day][meal];
      for (let i=0; i<store.getState().menu.length; i++) {
        let c = store.getState().menu[i];
        if (c.day === day && c.meal === meal) {
          recipe = c.recipe;
          if (recipe === ' ') {
            recipe = '';
          }
        }
      }
    } catch (error) {
    }
    return recipe
  }
  
  //const removeMenuItem = (event) => {
  function removeMenuItem(meal) {
    const dmenu = {...dayMenu};
    dmenu.userSelectedRecipes[dayMenu.currentDay][meal] = '';
    setDayMenu(dmenu);
    let updateString = `menu/remove/${dayMenu.currentDay}/${meal}/ `;
    store.dispatch({ type: updateString })
  }
  return (
    <div>

      <Modal show={dayMenu.showDayModal} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{dayMenu.currentDay}'s menu:<br />Recipe: {dayMenu.selectedRecipe}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/*this could be its own coppnemt*/}
          <ul>
            <li data-meal='breakfast' onClick={handleUpdateMenuItem}>Breakfast: 
            { breakfastItem ? <span> { breakfastItem } <span onClick={() => removeMenuItem('breakfast')}>x</span></span> : '' } </li>
            <li data-meal='lunch' onClick={handleUpdateMenuItem}>Lunch: 
            { lunchItem ? <span> { lunchItem } <span onClick={() => removeMenuItem('lunch')}>x</span></span> : '' } </li>
            <li data-meal='dinner' onClick={handleUpdateMenuItem}>Dinner: 
            { dinnerItem ? <span> { dinnerItem } <span onClick={() => removeMenuItem('dinner')}>x</span></span> : '' } </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    
    </div>
  );
}

export default DayModal