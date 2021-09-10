import React, { useRef, useState } from 'react'
import { Dropdown } from 'react-bootstrap';

import DraggableComponent from './draggableComponent';

const testRecipes = [
  {
    name: 'Tacos',
    tags: ['mexican',
           'vegetarian']
  },
  {
    name: 'Kale Pesto',
    tags: ['pasta',
           'vegetarian']
  }
  ]
  
function fetchRecipes(s, dm, setDm) {
  // todo allow for multilevel organization
  // <tag: a/b/name>
  // a
  //   b
  //     name
  
  const handleDropDown = (e) => {
    // access to e.target here
    console.log(e.target.children);
    var dropList = e.target.children;
    console.log(e.target.children.length)
    for (var i; i<dropList.length; i++) {
      console.log(dropList[i])
      dropList[i].style.display = 'none';
    }
  }
  
  if (s === 'testing') {
    var recipes = testRecipes;
  } else {
    // todo fetch from db
    var recipes = 'not implemented';
  }
  
  let organizedRecipes = {};
  for (var i=0; i<recipes.length; i++) {
    let n = recipes[i].name;
    let tags = recipes[i].tags;
    for (var k=0; k<tags.length; k++) {
      let tag = tags[k];
      if (tag in organizedRecipes) {
        organizedRecipes[tag].push(n);
      } else {
        organizedRecipes[tag] = [n];
      }
    }
  }
  organizedRecipes["dumb"] = ['fdsa'];
  for (var i=0; i<20; i++) {
    organizedRecipes["dumb"].push("asdf");
  }
  // dropdown: https://react-bootstrap.github.io/components/dropdowns/
  return (
    <div>
    {Object.keys(organizedRecipes).map((l, m) => {
      return (
        <div>
<Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    {l}
  </Dropdown.Toggle>

  <Dropdown.Menu>
    {organizedRecipes[l].map((t, n) => {
         return(
           <Dropdown.Item>
             {new DraggableComponent(t, dm, setDm)}
           </Dropdown.Item>
         );
       })}
  </Dropdown.Menu>
</Dropdown>
       </div>
      );
     })}
    </div>
  );
}

function MenuList(selection, dayMenu, setDayMenu) {
  const [currentMenu, setCurrentMenu] = useState([{
    name: 'Pesto',
    tags: ['pasta',
           'vegetarian'],
    asdf: 'testing'
  }]);
  
  const addRecipes = () => {
    testRecipes.map((x, i) => {
      console.log(x, i);
      setCurrentMenu([...currentMenu, { name: x.name, tags: x.tags }]);
    });
    console.log(currentMenu);
  };
  

  return (
    <div>

      {currentMenu.map((x, i) => {
        return (
          <div>
           {fetchRecipes(x.asdf, dayMenu, setDayMenu)}
          </div>
        );
      })}
     
    </div>
  );
}

export default MenuList