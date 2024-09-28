import React from 'react'
import './Card.css';
import { FaStar } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Card = ({index, cardIndex, tabIndex, handleDeleteMeal, handleCardSelect, productImage, productName, cuisine, rating}) => {
  return (
    <div key={index} className={`meal-card ${cardIndex ? 'active-meal-card' : ''}`} onClick={() => handleCardSelect(index)}>
      <button className='delete-meal-btn  ' onClick={handleDeleteMeal}>
        <MdDeleteOutline size={20}/>
      </button>
      <img className='meal-image' src={productImage} alt='meal image' />
      <h3 className='meal-name'>{productName}</h3>
      <p className='meal-description'>
        Preheat the oven to 475F (245C). Roll out the pizza dough and spread tomato sauce evenly. Top
        with slice of fresh mozzarella and fresh basil leaves. Drizzle with olive oil and season with salt and papper.
        Bake in the preheated oven for 12-15 minuts or until the crust is golden brown. Slice and serve hot.
      </p>
      <div className='meal-rating-section'>
        <span>
          <h3>Cuisine: </h3>
          <p>{cuisine}</p>
        </span>
        <span>
          <h3>Rating: <p>{rating}</p></h3>
          <p>
            {[0,1,2,3,4].map((star) => (
              <FaStar size={15} />
            ))}
          </p>
          
        </span>
      </div>
    </div>
  )
}

export default Card
