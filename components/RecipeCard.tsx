
import React from 'react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (recipe: Recipe) => void;
  onViewDetails: (recipe: Recipe) => void;
}

const cuisineToCountry: Record<string, string> = {
  'Русская': 'ru',
  'Итальянская': 'it',
  'Азиатская': 'cn',
  'Японская': 'jp',
  'Французская': 'fr',
  'Грузинская': 'ge',
  'Мексиканская': 'mx',
  'Американская': 'us',
  'Китайская': 'cn',
  'Индийская': 'in',
  'Греческая': 'gr',
  'Испанская': 'es',
  'Немецкая': 'de',
  'Украинская': 'ua',
  'Турецкая': 'tr',
  'Корейская': 'kr',
  'Тайская': 'th',
  'Вьетнамская': 'vn',
  'Бразильская': 'br'
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isFavorite, onToggleFavorite, onViewDetails }) => {
  const countryCode = cuisineToCountry[recipe.cuisine || ''] || 'un';
  const flagUrl = `https://flagcdn.com/w640/${countryCode.toLowerCase()}.png`;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group">
      <div className="h-40 bg-gray-50 flex items-center justify-center relative overflow-hidden cursor-pointer" onClick={() => onViewDetails(recipe)}>
         <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white opacity-50" />
         <img 
            src={flagUrl} 
            alt={recipe.cuisine}
            className="w-24 h-auto drop-shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
         />
         
         <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
              recipe.difficulty === 'Легко' ? 'bg-green-500 text-white' : 
              recipe.difficulty === 'Средне' ? 'bg-orange-500 text-white' : 'bg-red-600 text-white'
            }`}>
              {recipe.difficulty}
            </span>
         </div>

         <button 
           onClick={(e) => {
             e.stopPropagation();
             onToggleFavorite(recipe);
           }}
           className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-all active:scale-90 z-10"
         >
           <svg 
             className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
             fill="none" 
             stroke="currentColor" 
             viewBox="0 0 24 24"
           >
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
           </svg>
         </button>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-md font-bold text-gray-900 mb-1 line-clamp-1">{recipe.title}</h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-3 h-8 leading-relaxed">{recipe.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{recipe.cuisine || 'Интернациональная'}</span>
          {recipe.isSoup && <span className="text-[10px] bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full font-medium">Суп</span>}
          {recipe.spiceLevel && recipe.spiceLevel !== 'Нет' && (
            <span className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium">🌶️ {recipe.spiceLevel}</span>
          )}
        </div>

        <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {recipe.prepTime}
            </span>
            {recipe.calories && <span>{recipe.calories} ккал</span>}
          </div>
          <button onClick={() => onViewDetails(recipe)} className="text-orange-600 font-bold hover:text-orange-700 transition-colors">
            Рецепт →
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
