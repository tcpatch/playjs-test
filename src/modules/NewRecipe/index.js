import React, { useState, Fragment } from "react";

function NewRecipe() {

  const [inputList, setInputList] = useState([{ingredient: ''}]);
  const [singleInputList, setSingleInputList] = useState([{ recipeName: '',
                  prepTime: '',
                  cookTime: '',
                  cookTemp: ''}])
  const [instructionInputList, setInstructionInputList] = useState([{instruction: ''}]);
  const [tagInputList, setTagInputList] = useState([{tag: ''}]);
  
    const handleSubmit = () => {
    console.log('A recipe was submitted:  ',
      [...inputList],
      [...singleInputList],
      [...instructionInputList],
      [...tagInputList]);
    //event.preventDefault();
  }
 
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'ingredient') {
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
      if (list.length - 1 === index) {
        handleAddClick();
      }
    } else if (name === 'tag') {
      const tlist = [...tagInputList];
      tlist[index][name] = value;
      setTagInputList(tlist);
      if (tlist.length - 1 === index) {
        handleAddClickTag();
      }
    } else if (name === 'instruction') {
      const list = [...instructionInputList];
      list[index][name] = value;
      setInstructionInputList(list);
      if (list.length - 1 === index) {
        handleAddClickInst();
      }
    } else {
      const list = [...singleInputList];
      list[index][name] = value;
      setSingleInputList(list);
    }
  };
 
  // remove ingredient
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
 
  // add ingredient
  const handleAddClick = () => {
    setInputList([...inputList, { ingredient: "" }]);
  };
  
  // remove instruction
  const handleRemoveClickInst = index => {
    const list = [...instructionInputList];
    list.splice(index, 1);
    setInstructionInputList(list);
  };
 
  // add instruction 
  const handleAddClickInst = () => {
    setInstructionInputList([...instructionInputList, { instruction: "" }]);
  };
  
  // remove tag 
  const handleRemoveClickTag = index => {
    const tlist = [...tagInputList];
    tlist.splice(index, 1);
    setTagInputList(tlist);
  };
 
 // add tag 
  const handleAddClickTag = () => {
    setTagInputList([...tagInputList, { tag: "" }]);
  };
 
  return (
    <div>
      {singleInputList.map((y, j) => {
        return (
          <div>
            <h5>Recipe Name:</h5>
            <div>
            <input
              name="recipeName"
   placeholder="recipeName"
              value={y.recipeName}
              onChange={e => handleInputChange(e, j)}
            />
          </div>
          
          <h5>Prep Time:</h5>
          
          <div>
            <input
              name="prepTime"
   placeholder="prepTime"
              value={y.prepTime}
              onChange={e => handleInputChange(e, j)}
            />
          </div>
          
          <h5>Cook Time:</h5>
          
          <div>
            <input
              name="cookTime"
   placeholder="cookTime"
              value={y.cookTime}
              onChange={e => handleInputChange(e, j)}
            />
          </div>
          
          <h5>Cook Temperature:</h5>
          <div>
            <input name='cookTemp' placeholde='cookTemp' value={y.cookTemp} onChange={e => handleInputChange(e, j)} />
            </div>
          </div>
        );
      })}
      
      <h5>Ingredients:</h5>

      {inputList.map((x, i) => {
        return (

          <div>
            <input
              name="ingredient"
   placeholder="ingredient"
              value={x.ingredient}
              onChange={e => handleInputChange(e, i)}
            />
            <div>
              {inputList.length !== 1 && <button
                onClick={() => handleRemoveClick(i)}>Remove</button>}
              {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
            </div>
          </div>
        );
      })}
      
      <h5>Instructions:</h5>

      {instructionInputList.map((z, k) => {
        return (
          <div>
            <input
              name="instruction"
   placeholder="instruction"
              value={z.instruction}
              onChange={e => handleInputChange(e, k)}
            />
            <div>
              {instructionInputList.length !== 1 && <button
                onClick={() => handleRemoveClickInst(k)}>Remove</button>}
              {instructionInputList.length - 1 === k && <button onClick={handleAddClickInst}>Add</button>}
            </div>
          </div>
        );
      })}

      <h5>Tags:</h5>

      {tagInputList.map((a, m) => {
        return (

          <div>
            <input
              name="tag"
   placeholder="tag"
              value={a.tag}
              onChange={e => handleInputChange(e, m)}
            />
            <div>
              {tagInputList.length !== 1 && <button
                onClick={() => handleRemoveClickTag(m)}>Remove</button>}
              {tagInputList.length - 1 === m && <button onClick={handleAddClickTag}>Add</button>}
            </div>
          </div>
        );
      })}
    <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default {
    routeProps: {
        path: '/new_recipe',
        exact: true,
        component: NewRecipe,
    },
    name: 'New Recipe',
};