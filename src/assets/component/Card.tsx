import React from "react";
import "./card.css";
import { CardModel } from "../../models/card";

type CardProps = CardModel & {
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({
  description,
  id,
  content,
  type,
  label,
  onClick,
}) => {
  return (
    <div className="card" key={id} onClick={onClick}>
      <h3 style={{textTransform:'capitalize'}}>{content}</h3>
      <p>{description}</p>
      <p>{type}</p>
      <p>{label}</p>
    </div>
  );
};

export default Card;
