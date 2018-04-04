import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
var firebase = require('firebase');
var Check = require('react-checkbox-group');
var Checkbox = Check.Checkbox;
var CheckboxGroup = Check.CheckboxGroup;


var config = {
    apiKey: "AIzaSyALDAyVFvCh9muw5dIWbmECBFZKvd_0Drk",
    authDomain: "baileysjsrproject.firebaseapp.com",
    databaseURL: "https://baileysjsrproject.firebaseio.com",
    projectId: "baileysjsrproject",
    storageBucket: "baileysjsrproject.appspot.com",
    messagingSenderId: "578141450819"
  };
firebase.initializeApp(config);
var database = firebase.database();
var recipes;
database.ref('Recipes').on('value', function (results) {
  recipes = results.val();
});


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: []
    };
    this.handleDoneClick = this.handleDoneClick.bind(this);
  }

  handleDoneClick() {
    var selectedFoods = this.state.foods;
    for(var i = 0; i<selectedFoods.length; i++)
    {
        console.log(selectedFoods[i]);
        if(selectedFoods[i] === "avocado")
          console.log("true!!!");
    }
    var recipeMap = {};
    Object.keys(recipes).map(function(keyName, keyIndex){
      recipeMap[keyName] = 0;
      var r = recipes[keyName];
      for(var ingredient in r)
      {
        console.log(r[ingredient]);
      }
    });
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ReciDB</h1>
        </header>
        <p className="App-intro">
          Welcome to ReciDB! To get started, select what foods you currently have.
        </p>  

      <h2>Fruit and Veggies</h2>
      <CheckboxGroup
          checkboxDepth={2}
          name="foods"
          value={this.state.foods}
          onChange={this.handleFoodChange}>
 
            <label><Checkbox value="apple"/> Apple</label>
            <label><Checkbox value="avocado" />Avocado</label>
            <label><Checkbox value="lemon" />Lemon</label>
            <label><Checkbox value="tomato" />Tomato</label>
        <h2>Greens</h2>
            <label><Checkbox value="spinach" />Spinach</label>
            <label><Checkbox value="arugala" />Arugala</label>
            <label><Checkbox value="basil" />Basil</label>
            <label><Checkbox value="bayleaves" />Bay Leaves</label>
        <h2>Meats and Fish</h2>
            <label><Checkbox value="chicken" />Chicken</label>
            <label><Checkbox value="salmon" />Salmon</label>
            <label><Checkbox value="steak" />Steak</label>
            <label><Checkbox value="groundbeef" />Ground Beef or Turkey</label>
        <h2>Grains</h2>
            <label><Checkbox value="quinoa" />Quinoa</label>
            <label><Checkbox value="rice" />Rice</label>
            <label><Checkbox value="farro" />Farro</label>
        <h2>Nuts</h2>
            <label><Checkbox value="almond" />Almonds</label>
            <label><Checkbox value="pistachio" />Pistachios</label>
            <label><Checkbox value="walnut" />Walnuts</label>
        <h2>Cheese</h2>
            <label><Checkbox value="parmesan" />Parmesan</label>
            <label><Checkbox value="cheddar" />Cheddar</label>
            <label><Checkbox value="goatcheese" />Goat Cheese</label>
        <h2>Misc</h2>
            <label><Checkbox value="oliveoil" />Olive Oil</label>
            <label><Checkbox value="salt" />Salt</label>
            <label><Checkbox value="pepper" />Pepper</label>
      </CheckboxGroup>

      <button onClick={this.handleDoneClick}>
        {'Done! Find me recipes!'}
      </button>



      </div>
    );
  }

  handleFoodChange = (newFoods) => {
    this.setState({
      foods: newFoods
    });
  }
}




export default App;
