
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { COMMON_INGREDIENTS, INGREDIENT_CATEGORIES } from './constants';
import { Ingredient, Recipe, AppState, SearchFilters } from './types';
import IngredientBadge from './components/IngredientBadge';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import { generateRecipes } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    // Загружаем избранное только один раз при инициализации
    const saved = localStorage.getItem('smartchef-v2-favorites');
    return {
      selectedIngredients: [],
      recipes: [],
      favorites: saved ? JSON.parse(saved) : [],
      isLoading: false,
      error: null,
      filters: {
        cuisine: 'Любая',
        spiceLevel: 'Любая',
        isHot: 'any',
        dishType: 'any'
      }
    };
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [specificDishQuery, setSpecificDishQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'discover' | 'favorites'>('discover');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Синхронизация избранного с localStorage при любых изменениях
  useEffect(() => {
    localStorage.setItem('smartchef-v2-favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  const filteredIngredients = useMemo(() => {
    return COMMON_INGREDIENTS.filter(ing => {
      const matchesSearch = ing.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? ing.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const toggleIngredient = useCallback((ingredient: Ingredient) => {
    setState(prev => {
      const isSelected = prev.selectedIngredients.some(i => i.id === ingredient.id);
      return {
        ...prev,
        selectedIngredients: isSelected 
          ? prev.selectedIngredients.filter(i => i.id !== ingredient.id)
          : [...prev.selectedIngredients, ingredient]
      };
    });
  }, []);

  const handleSearch = async (isSpecific: boolean = false) => {
    if (!isSpecific && state.selectedIngredients.length === 0) return;
    if (isSpecific && !specificDishQuery.trim()) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const results = await generateRecipes(
        state.selectedIngredients, 
        state.filters, 
        isSpecific ? specificDishQuery : undefined
      );
      setState(prev => ({ ...prev, recipes: results, isLoading: false }));
      setActiveTab('discover');
      if (isSpecific) setSpecificDishQuery('');
    } catch (err) {
      setState(prev => ({ ...prev, error: 'Ошибка при получении рецепта. Попробуйте еще раз.', isLoading: false }));
    }
  };

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    setState(prev => ({ ...prev, filters: { ...prev.filters, [key]: value } }));
  };

  const clearSelected = () => setState(prev => ({ ...prev, selectedIngredients: [] }));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-1.5 sm:p-2.5 rounded-xl shadow-lg shadow-orange-100">
              <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h1 className="text-lg sm:text-2xl font-black text-gray-900 tracking-tight">SmartChef <span className="text-orange-500">AI</span></h1>
          </div>
          
          <nav className="flex bg-gray-100/80 p-1 rounded-xl sm:rounded-2xl border border-gray-200/50 shrink-0">
            <button 
              onClick={() => setActiveTab('discover')}
              className={`px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-black transition-all whitespace-nowrap ${activeTab === 'discover' ? 'bg-white shadow-sm text-orange-600' : 'text-gray-500 hover:text-gray-900'}`}
            >
              ПОИСК
            </button>
            <button 
              onClick={() => setActiveTab('favorites')}
              className={`px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-black transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${activeTab === 'favorites' ? 'bg-white shadow-sm text-orange-600' : 'text-gray-500 hover:text-gray-900'}`}
            >
              ИЗБРАННОЕ
              <span className={`px-1.5 sm:px-2 py-0.5 rounded-md text-[8px] sm:text-[10px] ${activeTab === 'favorites' ? 'bg-orange-100 text-orange-600' : 'bg-gray-200 text-gray-500'}`}>
                {state.favorites.length}
              </span>
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xs font-black text-gray-400 mb-4 flex items-center gap-3 uppercase tracking-widest">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Поиск блюда
            </h2>
            <div className="flex gap-2">
              <input 
                type="text"
                placeholder="Борщ, Паста или Индийская..."
                value={specificDishQuery}
                onChange={(e) => setSpecificDishQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(true)}
                className="flex-1 px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-orange-200 transition-all text-sm text-gray-900 font-bold placeholder-gray-400"
              />
              <button 
                onClick={() => handleSearch(true)}
                className="p-3 bg-gray-900 text-white rounded-xl hover:bg-orange-600 transition-all active:scale-90 flex items-center justify-center min-w-[48px]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </button>
            </div>
          </div>

          {state.selectedIngredients.length > 0 && (
            <div className="bg-orange-500 rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-orange-100 animate-in fade-in slide-in-from-top-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xs font-black text-white/80 uppercase tracking-widest">Продукты:</h2>
                <button onClick={clearSelected} className="text-[10px] text-white/60 font-black hover:text-white uppercase">Очистить</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {state.selectedIngredients.map(ing => (
                  <button 
                    key={ing.id}
                    onClick={() => toggleIngredient(ing)}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-black text-white border border-white/10 flex items-center gap-2 transition-all"
                  >
                    {ing.name} <span className="opacity-40 text-xs">✕</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-xs font-black text-gray-400 flex items-center gap-3 uppercase tracking-widest">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Фильтры
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">Кухня</label>
                <select 
                  value={state.filters.cuisine}
                  onChange={(e) => updateFilter('cuisine', e.target.value)}
                  className="w-full bg-gray-50 border-none rounded-xl text-xs font-black focus:ring-2 focus:ring-orange-200 py-3 text-gray-900 appearance-none cursor-pointer px-4"
                >
                  {['Любая', 'Русская', 'Итальянская', 'Азиатская', 'Французская', 'Грузинская', 'Мексиканская', 'Японская', 'Китайская', 'Индийская'].map(c => <option key={c} value={c}>{c === 'Любая' ? 'Все кухни' : c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">Острота</label>
                <select 
                  value={state.filters.spiceLevel}
                  onChange={(e) => updateFilter('spiceLevel', e.target.value)}
                  className="w-full bg-gray-50 border-none rounded-xl text-xs font-black focus:ring-2 focus:ring-orange-200 py-3 text-gray-900 appearance-none px-4"
                >
                  {['Любая', 'Нет', 'Низкая', 'Средняя', 'Высокая'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">Темп.</label>
                <div className="flex bg-gray-50 rounded-xl p-1 h-10">
                  <button onClick={() => updateFilter('isHot', 'any')} className={`flex-1 rounded-lg text-[10px] font-black transition-all ${state.filters.isHot === 'any' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}>ВСЁ</button>
                  <button onClick={() => updateFilter('isHot', 'hot')} className={`flex-1 rounded-lg text-[10px] font-black transition-all ${state.filters.isHot === 'hot' ? 'bg-white shadow-sm text-red-500' : 'text-gray-400'}`}>🔥</button>
                  <button onClick={() => updateFilter('isHot', 'cold')} className={`flex-1 rounded-lg text-[10px] font-black transition-all ${state.filters.isHot === 'cold' ? 'bg-white shadow-sm text-blue-500' : 'text-gray-400'}`}>❄️</button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xs font-black text-gray-400 mb-4 flex items-center gap-3 uppercase tracking-widest">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Ваши продукты
            </h2>
            <div className="space-y-4">
              <input 
                type="text"
                placeholder="Поиск ингредиента..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-orange-200 text-sm text-gray-900 font-bold placeholder-gray-400 shadow-inner"
              />
              <div className="flex flex-wrap gap-2 max-h-[250px] overflow-y-auto custom-scrollbar pr-2">
                {filteredIngredients.map(ing => (
                  <IngredientBadge 
                    key={ing.id} 
                    ingredient={ing} 
                    isSelected={state.selectedIngredients.some(si => si.id === ing.id)}
                    onToggle={toggleIngredient}
                  />
                ))}
              </div>
              <button 
                onClick={() => handleSearch(false)}
                disabled={state.selectedIngredients.length === 0 || state.isLoading}
                className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 shadow-2xl transition-all transform active:scale-95 ${
                  state.selectedIngredients.length === 0 || state.isLoading
                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-orange-200 hover:-translate-y-1'
                }`}
              >
                {state.isLoading ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ГОТОВИМ...
                  </span>
                ) : 'НАЙТИ РЕЦЕПТЫ'}
              </button>
            </div>
          </div>
        </aside>

        <section className="lg:col-span-8">
          <div className="mb-8">
             <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
                {activeTab === 'discover' ? 'Кулинарные идеи' : 'Книга рецептов'}
             </h2>
             <p className="text-gray-400 font-medium text-sm sm:text-base">
                {activeTab === 'discover' ? 'Лучшие варианты из ваших ингредиентов' : 'Ваши сохраненные рецепты'}
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {(activeTab === 'discover' ? state.recipes : state.favorites).map(recipe => (
              <RecipeCard 
                key={recipe.id}
                recipe={recipe}
                isFavorite={state.favorites.some(f => f.id === recipe.id)}
                onToggleFavorite={(r) => {
                  setState(prev => {
                    const exists = prev.favorites.some(f => f.id === r.id);
                    return { ...prev, favorites: exists ? prev.favorites.filter(f => f.id !== r.id) : [...prev.favorites, r] };
                  });
                }}
                onViewDetails={setSelectedRecipe}
              />
            ))}
            
            {((activeTab === 'discover' && state.recipes.length === 0 && !state.isLoading) || (activeTab === 'favorites' && state.favorites.length === 0)) && (
              <div className="col-span-full py-24 sm:py-32 text-center bg-white rounded-[2rem] border-4 border-dashed border-gray-100 flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-6 sm:mb-8">
                   <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">Пусто</h3>
                <p className="text-gray-400 font-medium max-w-sm px-6 text-sm">
                  {activeTab === 'discover' ? 'Выберите ингредиенты или введите название блюда' : 'Добавляйте рецепты кнопкой-сердечком'}
                </p>
              </div>
            )}

            {state.isLoading && activeTab === 'discover' && (
              <div className="col-span-full py-20 text-center">
                <div className="w-16 h-16 border-8 border-orange-100 border-t-orange-500 rounded-full animate-spin mx-auto"></div>
                <div className="mt-8 font-black text-gray-400 uppercase tracking-widest text-xs">Шеф-повар составляет меню...</div>
              </div>
            )}
          </div>
        </section>
      </main>

      <RecipeModal 
        recipe={selectedRecipe} 
        onClose={() => setSelectedRecipe(null)}
        isFavorite={selectedRecipe ? state.favorites.some(f => f.id === selectedRecipe.id) : false}
        onToggleFavorite={(r) => {
          setState(prev => {
            const exists = prev.favorites.some(f => f.id === r.id);
            return { ...prev, favorites: exists ? prev.favorites.filter(f => f.id !== r.id) : [...prev.favorites, r] };
          });
        }}
      />

      <footer className="bg-white border-t border-gray-100 py-10 text-center">
        <p className="text-[9px] sm:text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] px-4">&copy; 2025 SMARTCHEF LABS • НОВЫЙ ВКУС КАЖДЫЙ ДЕНЬ</p>
      </footer>
    </div>
  );
};

export default App;
