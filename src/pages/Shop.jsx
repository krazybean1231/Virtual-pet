
import {React, useState, useRef, useEffect} from 'react'
import { inGameVariables, itemAmount } from '../store';
import { ITEMS } from '../constants';
import { stats } from '../store';
import Progression from './Progression';

// Button component to allow reuse
const Button = ({item,cost}) =>{
  // Using prop keys to pass in values for each item
  // Declaring the hooks and variables
  const [bought, setBought] = useState(false);
  const {money, setMoney} = inGameVariables();
  const itemStore = itemAmount();
  const Item = ITEMS.find((i) => i.name === item);
  const [display, setDisplay] = useState("Buy?");
  const {setTotalExpense} = stats();

  // Function to handle what happens if the user buys the item (not enough money, etc.)
  const handleBuy = () => {
    if(money >= Item.cost){
      itemStore[Item.setter](itemStore[item] + 1)
      setBought(true);
      setMoney(money-cost);
      const currentExpense = stats.getState().totalExpense;
      const newExpense = currentExpense + cost;
      setTotalExpense(newExpense);
      
  }
  else{
    setDisplay("No Money!");
  }

    
    setTimeout(() => {
      setBought(false);
      setDisplay("Buy?");
    }, 2000);
  };
  // Rendering the buttons
  return(
    <button className="absolute z-15 left-1/2 -translate-x-1/2 overflow-hidden bottom-[50%] bg-[url('/Virtual-pet/button.png')] h-[25%] w-[20%] bg-cover bg-no-repeat bg-center group" onClick={handleBuy}>
      <span className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
        {bought ? 'Bought!' : `${cost} C`}
      </span>
      <span className="absolute text-sm inset-0 flex items-center justify-center transition-all duration-300 translate-y-full group-hover:translate-y-0 group-hover:opacity-100">
        {bought ? 'Bought!' : `${display}`}
      </span>
    </button>
  )
}

// What actually gets rendered, the items on the shelves
const Shop = () => {
  const counterRef = useRef(null);
  const lithiumRef = useRef(null);
  const {add} = Progression();
  const [counterHeight, setCounterHeight] = useState(0);
  useEffect(() => {
        
    add([
      { target: lithiumRef, position: 13 },
    ])
  }, [])
  const measureCounter = () => {
    if (counterRef.current) {
      const h = counterRef.current.getBoundingClientRect().height;
      console.log("counter height:", h);
      setCounterHeight(h);
    }
  };
  return (
    <div className="bg-[#e5aa7a] w-screen h-screen mt-[7vh]">
        <img src="/Virtual-pet/cat.png" style={{ bottom: `${counterHeight}px` }} className="pixelated bg-black absolute left-[18%] w-[22%]"/>
        <img ref={counterRef} onLoad={measureCounter} src="/Virtual-pet/counter.png" className="pixelated bg-black scale-x-[-1] absolute bottom-0 w-full"/>
        <div className="absolute w-[50%] h-[40%] grid grid-cols-2 grid-rows-3 gap-5 m-[5%] right-0">
          <div ref={lithiumRef} className="relative">
          <img src="/Virtual-pet/lithium.png" className="pixelated absolute left-1/2 bottom-[75%] -translate-x-[50%] w-[25%]"/>
            <img src="/Virtual-pet/display.png" className="pixelated w-full"/>
            <Button item="Lithium" cost={5}/>
          </div>
            
          <div className="relative">
            <img src="/Virtual-pet/battery.png" className="pixelated absolute left-1/2 bottom-[75%] -translate-x-[50%] w-[25%]"/>
            <img src="/Virtual-pet/display.png" className="pixelated w-full"/>
            <Button item="Battery" cost={10}/>
          </div>
          <div className="relative">
            <img src="/Virtual-pet/crystal.png" className="pixelated absolute left-1/2 bottom-[75%] -translate-x-[50%] w-[25%]"/>
            <img src="/Virtual-pet/display.png" className="pixelated w-full"/>
            <Button item="Crystal" cost={25}/>
          </div>
          <div className="relative">
            <img src="/Virtual-pet/orb.png" className="pixelated absolute left-1/2 bottom-[75%] -translate-x-[50%] w-[25%]"/>
            <img src="/Virtual-pet/display.png" className="pixelated w-full"/>
            <Button item="Orb" cost={50}/>
          </div>
          <div className="relative">
            <img src="/Virtual-pet/air.png" className="pixelated absolute left-1/2 bottom-[75%] z-5 -translate-x-[50%] w-[25%]"/>
            <img src="/Virtual-pet/display.png" className="pixelated w-full"/>
            <Button item="Air" cost={50}/>
          </div>
          <div className="relative">
            <img src="/Virtual-pet/lubricant.png" className="pixelated absolute left-1/2 bottom-[75%] -translate-x-[50%] w-[25%]"/>
            <img src="/Virtual-pet/display.png" className="pixelated w-full"/>
            <Button item="Lubricant" cost={100}/>
          </div>
        </div>
        
    </div>
  )
}

export default Shop
