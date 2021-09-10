import React, { useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';

import store from '../store';

function StapleModal(staples, setStaples) {
  const [show, setShow] = useState(false);
  //const [staples, setStaples] = useState(['eggs', 'bread', 'milk', 'cereal']);
  const [newStaple, setNewStaple] = useState('');
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaple(value);
  }
  
  const handleSubmit = (e) => {
    const addThis = newStaple;
    let allStaples = [...staples]
    allStaples.push(addThis);
    setStaples(allStaples);
    setNewStaple('');
  }

  const handleClose = () => {
    handleUpdateStaple()
    setShow(false);
  }
  
  const handleOpen = () => {
    setShow(true);
  }
  
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
  
  function getStaples() {
    let ret = {}
    for (let i=0; i<staples.length; i++) {
      console.log(staples[i])
    }
    return staples.map((item, index) => (
      <li>
          {item}
      </li>
    ));
  }

  //const removeMenuItem = (event) => {
  function removeMenuItem(meal) {
    let updateString = `menu/append/test/remove/none/ `;
    store.dispatch({ type: updateString })
  }
  return (
    <div>
     <Button variant="secondary" onClick={handleOpen}> Set Weekly Staples </Button>
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Weekly Staples</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/*this could be its own coppnemt*/}
          <input
              name="extraStaple"
   placeholder="Add item..."
              value={newStaple}
              onChange={e => handleInputChange(e)}
            />
          <button onClick={handleSubmit}>Submit</button>
          <ul>
            {getStaples()}
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

export default StapleModal