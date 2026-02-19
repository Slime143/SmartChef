
export interface Ingredient {
  id: string;
  name: string;
  category: string;
}

export type Difficulty = 'Легко' | 'Средне' | 'Сложно';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  difficulty: Difficulty;
  calories?: number;
  cuisine?: string;
  spiceLevel?: 'Нет' | 'Низкая' | 'Средняя' | 'Высокая';
  isSoup?: boolean;
  isHot?: boolean;
}

export interface SearchFilters {
  cuisine: string;
  spiceLevel: string;
  isHot: string; // 'any', 'hot', 'cold'
  dishType: string; // 'any', 'soup', 'main'
}

export interface AppState {
  selectedIngredients: Ingredient[];
  recipes: Recipe[];
  favorites: Recipe[];
  isLoading: boolean;
  error: string | null;
  filters: SearchFilters;
}
