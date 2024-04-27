import React from "react";
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";
import Card from "./Card";
import { CardModel } from "../../models/card";

interface SliderProps {
  cards: CardModel[];
  onCardClick: (card: CardModel) => void;
}

const SliderComponent: React.FC<SliderProps> = ({ cards, onCardClick }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {cards.map((card) => (
          <Card key={card.id} {...card} onClick={() => onCardClick(card)} />
        ))}
      </Slider>
    </div>
  );
};


export default SliderComponent;