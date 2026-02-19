
import React from 'react';
import { Ingredient } from '../types';

interface IngredientBadgeProps {
  ingredient: Ingredient;
  isSelected: boolean;
  onToggle: (ingredient: Ingredient) => void;
}

const IngredientBadge: React.FC<IngredientBadgeProps> = ({ ingredient, isSelected, onToggle }) => {
  return (
    <button
      onClick={() => onToggle(ingredient)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
        isSelected
          ? 'bg-orange-500 text-white border-orange-500 shadow-md'
          : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:bg-orange-50'
      }`}
    >
      {ingredient.name}
    </button>
  );
};

export default IngredientBadge;
