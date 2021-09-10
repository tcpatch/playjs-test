import React, { useState, Fragment } from "react";

//const NewRecipe = () => (
//    <div>Add Recipe</div>
//);

class NewRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {recipeName: '',
                  prepTime: '',
                  cookTime: '',
                  ingredients:'',
                  ingredientsList: [{'foo': ''}],
                  instructions: '',
                  tags: '',
                  tagsList: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
//    for (const [key, value] of Object.entries(this.state)) {
//      this.setState({key: event.target.value});
//    }
    let s = event.target.getAttribute('for');
    if (s === 'ingredients' || s === 'instructions') {
      this.setState({ingredientsList: {foo: event.target.value}, [s]: event.target.value});
      appendInput();
    } else if (s === 'tags') {
      this.setState(prevState => ({ tagsList: [...this.state.tagList, event.target.value] }));
    } else {
    
      this.setState({ [s]: event.target.value});
    }
    console.log(this.state);
  }
  
  appendInput() {
    var newInput = `input-${this.state.ingredientsList.length}`;
    this.setState(prevState => ({ inputs: prevState.ingredientsList.concat([newInput]) }));
    }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form id='NewRecipeForm' onSubmit={this.handleSubmit}>
        <label>
          Recipe Name:
          <input type="text" htmlFor="recipeName" value={this.state.recipeName} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Prep Time:
          <input type="text" htmlFor="prepTime" value={this.state.prepTime} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Cook Time:
          <input type="text" htmlFor="cookTime" value={this.state.cookTime} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Ingredients:
          <input type="text" htmlFor="ingredients" value={this.state.ingredients} onChange={this.handleChange} />
        </label>
        <br />
        <div id="moreIngredients">
          {this.state.ingredientsList.map(input => <div><input type='text' value={input} onChange={this.handleChange}/> <br /></div>)}
        </div>
        <label>
          Instructions:
          <input type="text" htmlFor="instructions" value={this.state.instructions} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Tags:
          <input type="text" htmlFor="tags" value={this.state.tags} onChange={this.handleChange} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default {
    routeProps: {
        path: '/new_recipe',
        exact: true,
        component: NewRecipe,
    },
    name: 'New Recipe',
};