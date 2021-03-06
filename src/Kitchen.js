import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import './Kitchen.css';
import milkkitchen from './assets/milk.png'
import Chocolatekitchen from './assets/chocolate.png'
import Eggkitchen from './assets/egg.png'

class Kitchen extends Component {
  constructor(props) {
    super(props);
    if (!localStorage.getItem("eggs") && !localStorage.getItem("chocolates") && !localStorage.getItem("milk")) {
      localStorage.setItem("eggs", "0");
      localStorage.setItem("chocolates", "0");
      localStorage.setItem("milk", "0");
    }
    this.state = {
      allEggs: [],
      boughtEgg: null,
      eggs: localStorage.getItem("eggs"),
      chocolates: localStorage.getItem("chocolates"),
      milk: localStorage.getItem("milk"),
    }
    this.getEggs();
  }

  getEggs = () => {
    axios.get('http://easteregg.wildcodeschool.fr/api/eggs').then(r => {
      const allEggs = r.data;
      this.setState({ allEggs });
    })
  }

  componentWillMount() {
    // To do: calculate prices from API
    this.prices = {
      "junk": {
        eggs: 5,
        chocolates: 5,
        milk: 5,
      },
      "basic": {
        eggs: 10,
        chocolates: 10,
        milk: 10,
      },
      "fine": {
        eggs: 15,
        chocolates: 15,
        milk: 15,
      },
      "rare": {
        eggs: 20,
        chocolates: 20,
        milk: 20,
      },
      "legendary": {
        eggs: 25,
        chocolates: 25,
        milk: 25,
      },
      "exotic": {
        eggs: 30,
        chocolates: 30,
        milk: 30,
      },
      "masterwork": {
        eggs: 35,
        chocolates: 35,
        milk: 35,
      },
      "ascended": {
        eggs: 40,
        chocolates: 40,
        milk: 40,
      },
    }
  }

  buyEgg = (eggRarity) => {
    const { eggs, chocolates, milk, allEggs } = this.state;
    // If enough money
    if (eggs >= this.prices[eggRarity].eggs && chocolates >= this.prices[eggRarity].chocolates && milk >= this.prices[eggRarity].milk) {
      // Calculate money
      const newEggsValue = parseInt(localStorage.getItem("eggs")) - this.prices[eggRarity].eggs;
      const newChocolatesValue = parseInt(localStorage.getItem("chocolates")) - this.prices[eggRarity].chocolates;
      const newMilkValue = parseInt(localStorage.getItem("milk")) - this.prices[eggRarity].chocolates;
      // Register new money (in state and local storage)
      this.setState({ eggs: newEggsValue, chocolates: newChocolatesValue, milk: newMilkValue });
      localStorage.setItem("eggs", newEggsValue.toString());
      localStorage.setItem("chocolates", newChocolatesValue.toString());
      localStorage.setItem("milk", newMilkValue.toString());
      // Get random egg of bought rarity
      const eggsList = allEggs.filter((egg) => {
        if (egg.rarity === eggRarity) {
          return egg;
        } else {
          return null;
        }
      });
      const randomNumber = Math.floor(Math.random() * eggsList.length)
      const randomEgg = eggsList[randomNumber]
      // Get random egg id
      let eggId;
      for (let i = 0; i < allEggs.length; i += 1) {
        if (allEggs[i] === randomEgg) {
          eggId = i;
        }
      }
      this.setState({ boughtEgg: allEggs[eggId] })
      // Add egg to local storage
      if (!localStorage.getItem("collection")) {
        localStorage.setItem("collection", "")
      }
      const newCollection = localStorage.getItem("collection") + " " + (eggId)
      localStorage.setItem("collection", newCollection)
    }

  }

  render() {
    const { eggs, chocolates, milk, boughtEgg } = this.state;
    return (
      <div className="Background">
        <h1 className="h1-kitchen">Kitchen</h1>
        {
          boughtEgg === null
            ? null
            : <img
              className="Chaudron"
              src={boughtEgg.image}
              alt={boughtEgg}
              style={{
                zIndex: "2",
                bottom: "10%",
                opacity: 1,
                width: "30%",
                height: "30%",
                top: "0"
              }}
            />
        }
        <img className="Chaudron" src="http://www.pngmart.com/files/7/Cauldron-PNG-Photos.png" alt='cauldron'/> 
        <div className="Placement">
        <button className="buttonKitchen1" onClick={() => this.buyEgg("junk")}>Junk</button>
          <span className="Baaaa">Price = {this.prices.junk.eggs} X {this.prices.junk.chocolates} X {this.prices.junk.milk}</span>
          <button className="buttonKitchen2" onClick={() => this.buyEgg("basic")}>Basic</button>
          <span className="Baaaa">Price = {this.prices.basic.eggs} X {this.prices.basic.chocolates} X {this.prices.basic.milk}</span>
          <button className="buttonKitchen3" onClick={() => this.buyEgg("fine")}>Fine</button>
          <span className="Baaaa">Price = {this.prices.fine.eggs} X {this.prices.fine.chocolates} X {this.prices.fine.milk}</span>
          <button className="buttonKitchen4" onClick={() => this.buyEgg("rare")}>Rare</button>
          <span className="Baaaa">Price = {this.prices.rare.eggs} X {this.prices.rare.chocolates} X {this.prices.rare.milk}</span>
          <button className="buttonKitchen5" onClick={() => this.buyEgg("legendary")}>Legendary</button>
          <span className="Baaaa">Price = {this.prices.legendary.eggs} X {this.prices.legendary.chocolates} X {this.prices.legendary.milk}</span>
          <button className="buttonKitchen6" onClick={() => this.buyEgg("exotic")}>Exotic</button>
          <span className="Baaaa">Price = {this.prices.exotic.eggs} X {this.prices.exotic.chocolates} X {this.prices.exotic.milk}</span>
          <button className="buttonKitchen7" onClick={() => this.buyEgg("masterwork")}>Masterwork</button>
          <span className="Baaaa">Price = {this.prices.masterwork.eggs} X {this.prices.masterwork.chocolates} X {this.prices.masterwork.milk}</span>
          <button className="buttonKitchen8" onClick={() => this.buyEgg("ascended")}>Ascended</button>
          <span className="Baaaa">Price = {this.prices.ascended.eggs} X {this.prices.ascended.chocolates} X {this.prices.ascended.milk}</span>
        </div>
        <div> 
          <button className="MilkKitchen"><img className="Milkkkk" alt="coucou" src={milkkitchen}/> {milk}</button>
          <button className="ChocolateKitchen"><img className="Chocolatekitchen" alt="coucou" src={Chocolatekitchen}/> {chocolates}</button>
          <button className="EggKitchen"><img className="Eggkitchen" src={Eggkitchen} alt="coucou"/> {eggs}</button>
        </div>
        <Nav.Item>
            <NavLink to="/"><button className="button-home" style={{position :'absolute', top : '0', right : '0'}}>Back</button></NavLink>
          </Nav.Item>
      </div>
    );
  }
}

export default Kitchen;