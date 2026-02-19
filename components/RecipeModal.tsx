
import React from 'react';
import { Recipe } from '../types';

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (recipe: Recipe) => void;
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
  'Турецкая': 'tr'
};

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose, isFavorite, onToggleFavorite }) => {
  if (!recipe) return null;

  const countryCode = cuisineToCountry[recipe.cuisine || ''] || 'un';
  const flagUrl = `https://flagcdn.com/w640/${countryCode.toLowerCase()}.png`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all">
      <div className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
        <div className="relative h-48 bg-gray-50 flex items-center justify-center overflow-hidden border-b border-gray-100">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-50/50 to-red-50/50 opacity-40" />
          <img 
            src={flagUrl} 
            alt={recipe.cuisine}
            className="w-40 h-auto drop-shadow-2xl relative z-10"
          />
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/80 hover:bg-white text-gray-900 shadow-sm transition-all z-20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div className="p-8 sm:p-10 overflow-y-auto custom-scrollbar flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 bg-orange-50 px-3 py-1 rounded-full">{recipe.cuisine} Кухня</span>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                  recipe.difficulty === 'Легко' ? 'bg-green-100 text-green-700' : 
                  recipe.difficulty === 'Средне' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                }`}>
                  {recipe.difficulty}
                </span>
              </div>
              <h2 className="text-4xl font-black text-gray-900 leading-tight">{recipe.title}</h2>
            </div>
            
            <button 
              onClick={() => onToggleFavorite(recipe)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm ${
                isFavorite ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-gray-900 text-white'
              }`}
            >
               <svg className={`w-5 h-5 ${isFavorite ? 'fill-red-600' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
               </svg>
               {isFavorite ? 'В избранном' : 'В избранное'}
            </button>
          </div>
          
          <p className="text-gray-500 text-lg mb-12 italic leading-relaxed border-l-4 border-orange-100 pl-6">"{recipe.description}"</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-6 bg-orange-500 rounded-full mr-3"></span>
                Ингредиенты
              </h3>
              <ul className="space-y-4">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex items-start text-gray-700 font-medium bg-gray-50 p-3 rounded-xl border border-gray-100/50">
                    <svg className="w-5 h-5 text-orange-500 mr-3 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:col-span-2">
              <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-6 bg-orange-500 rounded-full mr-3"></span>
                Пошаговый мастер-класс
              </h3>
              <div className="space-y-8">
                {recipe.instructions.map((step, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="shrink-0">
                      <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-sm shadow-lg shadow-orange-100 group-hover:scale-110 transition-transform">
                        {idx + 1}
                      </div>
                      {idx !== recipe.instructions.length - 1 && <div className="w-0.5 h-full bg-orange-50 mx-auto mt-2" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-gray-700 leading-relaxed font-medium text-lg pt-1">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-gray-900 flex flex-wrap justify-between items-center px-10">
          <div className="flex gap-10 text-white/60 font-bold text-xs uppercase tracking-widest">
            <div className="flex items-center gap-2">
               <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               {recipe.prepTime}
            </div>
            <div className="flex items-center gap-2">
               <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
               {recipe.calories || 350} ККАЛ
            </div>
          </div>
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-white text-gray-900 rounded-2xl font-black text-sm hover:bg-orange-500 hover:text-white transition-all active:scale-95 shadow-xl"
          >
            ГОТОВО
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
