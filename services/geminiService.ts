
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe, Ingredient, SearchFilters } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateRecipes = async (
  ingredients: Ingredient[], 
  filters: SearchFilters,
  specificDish?: string
): Promise<Recipe[]> => {
  const ingredientNames = ingredients.map(i => i.name).join(", ");
  
  let prompt = "";
  if (specificDish) {
    prompt = `Запрос пользователя: "${specificDish}". 
    - Если это конкретное блюдо, составь 1 идеальный рецепт.
    - Если это кухня или категория, предложи 4 рецепта.`;
  } else {
    prompt = `У меня есть: ${ingredientNames}. Предложи 4 рецепта.`;
  }

  prompt += `
  ОБЯЗАТЕЛЬНЫЕ ТРЕБОВАНИЯ:
  1. ОТВЕТЬ НА РУССКОМ ЯЗЫКЕ.
  2. ИНСТРУКЦИИ (instructions) должны быть ЭКСТРЕМАЛЬНО ПОДРОБНЫМИ. Для каждого шага:
     - Описывай технику нарезки (соломкой, кубиком и т.д.).
     - Указывай точные температурные режимы (средний огонь, 180 градусов).
     - Добавляй советы шеф-повара (например, "не перемешивайте сразу, чтобы появилась корочка").
     - Минимум 6-8 детализированных шагов.
  3. Если рецептов 4, распредели сложность: Легко, Средне, Средне, Сложно.
  4. Поле "cuisine" должно быть названием страны (например, "Итальянская", "Русская", "Японская", "Китайская", "Мексиканская", "Индийская", "Грузинская").
  5. Сгенерируй уникальный строковый ID для каждого рецепта.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
              instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
              prepTime: { type: Type.STRING },
              difficulty: { type: Type.STRING },
              calories: { type: Type.NUMBER },
              cuisine: { type: Type.STRING },
              spiceLevel: { type: Type.STRING },
              isSoup: { type: Type.BOOLEAN },
              isHot: { type: Type.BOOLEAN }
            },
            required: ["id", "title", "description", "ingredients", "instructions", "prepTime", "difficulty", "cuisine"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
