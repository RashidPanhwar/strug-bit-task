import React, { useEffect, useState } from 'react'
import './MealPlanner.css';
import axios from 'axios';
import Card from '../ProductCard/Card';
import { RxCross2 } from "react-icons/rx";
import { IoMenu } from "react-icons/io5";

const MealPlanner = () => {
  const tabItems = ['All Meals', 'Week 1', 'Week 2', 'Week 3', 'Week 4'];
  const modalWeeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  const [tabIndex, setTabIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(null);
  const [mealData, setMealData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);

  const handleDropDownOpen = () => {setIsDropDown(true)}
  const handleDropDownClose = () => {setIsDropDown(false)}
  

  const fetchData = async () => {
    const response = await axios.get('https://dummyjson.com/recipes');
    setMealData(response.data.recipes);
    console.log('api response', response.data.recipes);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTabIndex = (index) => {
    setTabIndex(index);
    setIsDropDown(false)
  };

  const handleCardSelect = (index) => {
    setCardIndex(index);
    const selectedMeal = mealData[index];
    setSelectedCard(selectedMeal);
  };

  const openModalHandler = () => {
    if (selectedCard !== null) {
      setOpenModal(true);
    } else {
      alert("Please select a meal first.");
    }
  };

  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);

  // To store cards by week (1 to 4)
  const [weekMeals, setWeekMeals] = useState({
    week1: [],
    week2: [],
    week3: [],
    week4: []
  });

  

  const handleWeekSelect = (weekNumber) => {
    setSelectedWeek(weekNumber);
  };

   // Save card to the selected week
   const saveMealToWeek = () => {
    if (selectedCard && selectedWeek) {
      const weekKey = `week${selectedWeek}`;
      const updatedMeals = { ...weekMeals };

      // Check if the meal is already in the selected week
      if (!updatedMeals[weekKey].some(meal => meal.id === selectedCard.id)) {
        updatedMeals[weekKey] = [...updatedMeals[weekKey], selectedCard];
        setWeekMeals(updatedMeals); 
      } else {
        alert('Meal is already added to this week.');
      }

      // Reset state
      setSelectedCard(null);
      setSelectedWeek(null);
      setOpenModal(false);
    } else {
      alert('Please select a meal and a week.');
    }
  };

  // Delete meal from a specific week
  const handleDeleteMeal = (mealId, weekNumber) => {
    const weekKey = `week${weekNumber}`;
    const updatedMeals = { ...weekMeals };

    // Remove the meal from the selected week
    updatedMeals[weekKey] = updatedMeals[weekKey].filter(meal => meal.id !== mealId);

    setWeekMeals(updatedMeals);
  };

  // Filter the displayed meals based on the selected tab week      
  const displayedMeals = tabIndex === 0
    ? mealData
    : weekMeals[`week${tabIndex}`];

  return (
    <div className='meal-planner-main-container'>
      <div className='meal-planner-hero-section'>
        <h3>Optimize Your Meal</h3>
        <p>Select a meal to add to a week. You will be able to edit and change the meal weeks.</p>
      </div>

      <div className='meal-planner-containt-container'>
        <div className='all-meal-containt-heading-container'>
          <h3>{tabItems[tabIndex]} Orders</h3>
        </div>

        <div className='all-meals-nav'>
          {tabItems.map((items, index) => (
            <h3
              key={index}
              className={`tabs ${tabIndex === index ? 'active-tab' : ''}`}
              onClick={() => handleTabIndex(index)}
            >
              {items}
            </h3>
          ))}
          <button onClick={openModalHandler}>Add to Week</button>
        </div>
        <div className='toggle-nav'>
            <div className='toggler-and-add-to-week-btn'>
              <p onClick={handleDropDownOpen}><IoMenu size={30} /></p>
              <button onClick={openModalHandler}>Add To Week</button>
            </div>
            
        </div>
        <div className='all-meals-cards-container'>
          {displayedMeals && displayedMeals.length > 0 ? (
            displayedMeals.map((items, index) => (
              <Card
                key={index}
                index={index}
                id={items.id}
                tabIndex={tabIndex}
                cardIndex={cardIndex === index}
                handleCardSelect={() => handleCardSelect(index)}
                productImage={items.image}
                productName={items.name}
                cuisine={items.cuisine}
                rating={items.rating}
                handleDeleteMeal={() => handleDeleteMeal(items.id, tabIndex)}
              />
            ))
          ) : (
            <p>No data added to this week.</p>
          )}
        </div>
      </div>
      {/* </div> */}

      {/* Modal and Overlay */}
      <div className={`modal ${openModal ? 'show' : ''}`}>
        <p className='close-btn' onClick={() => setOpenModal(false)}>
          <RxCross2 size={20} />
        </p>
        <div className='modal-content'>
          <h3>Select Week</h3>
          <div className='modal-week-select'>
            {modalWeeks.map((item, index) => (
              <h3 key={index} onClick={() => handleWeekSelect(index + 1)}>
                {item}
              </h3>
            ))}
          </div>
          <button onClick={saveMealToWeek}>Save</button>
        </div>
      </div>
      {/* drop-down */}
      <div className={`nav-dropdown ${isDropDown ? 'show-drop-down' : ''}`}>
        <button onClick={handleDropDownClose}>
          <RxCross2 />
        </button>
        {tabItems.map((item, index) => (
          <h3 
            key={index} 
            className={`drop-down-tab ${tabIndex === index ? 'active-drop-down-tab' : ''}`}
            onClick={() => handleTabIndex(index)}  
          >{item}</h3>
        ))}
      </div>
    </div>
  );
};


export default MealPlanner
