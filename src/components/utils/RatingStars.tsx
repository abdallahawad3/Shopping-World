import React, { useState } from "react";

interface IProps {
  maxStars?: number;
  rating: number;
  onChange?: (rating: number) => void;
  size?: number;
  color?: string;
  precision?: number;
}

const RatingStars = ({
  maxStars = 5,
  rating,
  onChange,
  size = 20,
  color = "#faca15",
  precision = 0.5,
}: IProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Calculates the fractional rating based on mouse position
  const calculateFractionalRating = (
    event: React.MouseEvent,
    index: number,
  ) => {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - left;
    const fraction = Math.ceil(mouseX / width / precision) * precision;
    return index + fraction;
  };

  const handleMouseMove = (event: React.MouseEvent, index: number) => {
    const newHoverRating = calculateFractionalRating(event, index);
    setHoverRating(newHoverRating);
  };

  const handleMouseLeave = () => setHoverRating(null);

  const handleClick = (event: React.MouseEvent, index: number) => {
    if (onChange) {
      const newRating = calculateFractionalRating(event, index);
      onChange(newRating);
    }
  };

  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = (hoverRating ?? rating) >= starValue;

        return (
          <div
            key={index}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => handleClick(e, index)}
            style={{
              cursor: onChange ? "pointer" : "default",
              width: size,
              height: size,
              position: "relative",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isFilled ? color : "none"}
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              width={size}
              height={size}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 6.82 21 8 14.13 3 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

export default RatingStars;
