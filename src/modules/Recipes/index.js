import React, { useRef, useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import MenuList from './menuList';
import DropZones from './dropZone';
import DayModal from './dayModal';
import store from '../store';

function recipes() {
  // todo could instantiate in a loop
  const [dayMenu, setDayMenu] = useState(
    {
      selectedRecipe: '',
      showDayModal: false,
      currentDay: '',
      userSelectedRecipes: {},
      dragStopZones: {
        sunday: {x: -1, y: -1}
        }
    }
  );
  console.log(store.getState())
  //store.dispatch({ type: 'menu/add/tuesday/lunch/pasta' })

  return (
    <div className='noSelect'>
    <Container>
  <Row>
    <Col>
      <h3>Select this week's menu:</h3>
    </Col>
  </Row>
  <Row>
    <Col> {MenuList('testing', dayMenu, setDayMenu)} </Col>
    <Col> {DropZones(dayMenu, setDayMenu)} </Col>
  </Row>
</Container>
   
    {DayModal(dayMenu, setDayMenu)}
    </div>
    );
}

export default {
    routeProps: {
        path: '/recipes',
        component: recipes
    },
    name: 'Choose Recipes',
}
