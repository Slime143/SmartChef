
import { Ingredient } from './types';

export const INGREDIENT_CATEGORIES = [
  "Овощи", "Зелень", "Фрукты", "Белки", "Молочное", "Крупы", "Бакалея", "Специи"
];

export const COMMON_INGREDIENTS: Ingredient[] = [
  // Овощи
  { id: '1', name: 'Помидор', category: 'Овощи' },
  { id: '2', name: 'Лук репчатый', category: 'Овощи' },
  { id: '3', name: 'Картофель', category: 'Овощи' },
  { id: '4', name: 'Чеснок', category: 'Овощи' },
  { id: '5', name: 'Морковь', category: 'Овощи' },
  { id: '6', name: 'Брокколи', category: 'Овощи' },
  { id: '7', name: 'Шпинат', category: 'Овощи' },
  { id: '8', name: 'Болгарский перец', category: 'Овощи' },
  { id: '9', name: 'Огурец', category: 'Овощи' },
  { id: '31', name: 'Кабачок', category: 'Овощи' },
  { id: '32', name: 'Баклажан', category: 'Овощи' },
  { id: '33', name: 'Цветная капуста', category: 'Овощи' },
  { id: '34', name: 'Сельдерей (корень)', category: 'Овощи' },
  { id: '35', name: 'Тыква', category: 'Овощи' },
  { id: '36', name: 'Авокадо', category: 'Овощи' },
  { id: '37', name: 'Кукуруза', category: 'Овощи' },
  { id: '38', name: 'Стручковая фасоль', category: 'Овощи' },
  { id: '39', name: 'Свекла', category: 'Овощи' },
  { id: '40', name: 'Капуста белокочанная', category: 'Овощи' },
  { id: '41', name: 'Грибы (шампиньоны)', category: 'Овощи' },

  // Зелень
  { id: '42', name: 'Укроп', category: 'Зелень' },
  { id: '43', name: 'Петрушка', category: 'Зелень' },
  { id: '44', name: 'Кинза', category: 'Зелень' },
  { id: '45', name: 'Базилик', category: 'Зелень' },
  { id: '46', name: 'Зеленый лук', category: 'Зелень' },
  { id: '47', name: 'Листья салата', category: 'Зелень' },
  { id: '48', name: 'Руккола', category: 'Зелень' },
  
  // Белки
  { id: '10', name: 'Куриная грудка', category: 'Белки' },
  { id: '11', name: 'Яйца куриные', category: 'Белки' },
  { id: '12', name: 'Говядина (вырезка)', category: 'Белки' },
  { id: '13', name: 'Тофу', category: 'Белки' },
  { id: '14', name: 'Лосось / Семга', category: 'Белки' },
  { id: '15', name: 'Бекон', category: 'Белки' },
  { id: '49', name: 'Индейка', category: 'Белки' },
  { id: '50', name: 'Свинина', category: 'Белки' },
  { id: '51', name: 'Фарш говяжий', category: 'Белки' },
  { id: '52', name: 'Креветки', category: 'Белки' },
  { id: '53', name: 'Тунец консервированный', category: 'Белки' },
  { id: '54', name: 'Чечевица', category: 'Белки' },
  { id: '55', name: 'Нут', category: 'Белки' },
  { id: '56', name: 'Фасоль красная', category: 'Белки' },
  
  // Молочное
  { id: '16', name: 'Молоко', category: 'Молочное' },
  { id: '17', name: 'Сыр Чеддер', category: 'Молочное' },
  { id: '18', name: 'Сливочное масло', category: 'Молочное' },
  { id: '19', name: 'Йогурт натуральный', category: 'Молочное' },
  { id: '20', name: 'Сливки 20%', category: 'Молочное' },
  { id: '57', name: 'Сметана', category: 'Молочное' },
  { id: '58', name: 'Творог', category: 'Молочное' },
  { id: '59', name: 'Сыр Пармезан', category: 'Молочное' },
  { id: '60', name: 'Сыр Фета / Брынза', category: 'Молочное' },
  { id: '61', name: 'Маскарпоне', category: 'Молочное' },
  { id: '62', name: 'Моцарелла', category: 'Молочное' },
  
  // Крупы и мучное
  { id: '21', name: 'Рис (басмати/длиннозерный)', category: 'Крупы' },
  { id: '22', name: 'Паста (спагетти)', category: 'Крупы' },
  { id: '23', name: 'Хлеб пшеничный', category: 'Крупы' },
  { id: '24', name: 'Овсяные хлопья', category: 'Крупы' },
  { id: '25', name: 'Киноа', category: 'Крупы' },
  { id: '63', name: 'Гречка', category: 'Крупы' },
  { id: '64', name: 'Булгур', category: 'Крупы' },
  { id: '65', name: 'Кус-кус', category: 'Крупы' },
  { id: '66', name: 'Лаваш', category: 'Крупы' },
  { id: '67', name: 'Тортилья', category: 'Крупы' },
  
  // Фрукты
  { id: '68', name: 'Яблоко', category: 'Фрукты' },
  { id: '69', name: 'Банан', category: 'Фрукты' },
  { id: '70', name: 'Лимон', category: 'Фрукты' },
  { id: '71', name: 'Апельсин', category: 'Фрукты' },
  { id: '72', name: 'Груша', category: 'Фрукты' },
  { id: '73', name: 'Ягоды замороженные', category: 'Фрукты' },
  
  // Бакалея
  { id: '26', name: 'Оливковое масло', category: 'Бакалея' },
  { id: '27', name: 'Мука пшеничная', category: 'Бакалея' },
  { id: '28', name: 'Сахар', category: 'Бакалея' },
  { id: '29', name: 'Соевый соус', category: 'Бакалея' },
  { id: '30', name: 'Мед', category: 'Бакалея' },
  { id: '74', name: 'Томатная паста', category: 'Бакалея' },
  { id: '75', name: 'Горчица', category: 'Бакалея' },
  { id: '76', name: 'Майонез', category: 'Бакалея' },
  { id: '77', name: 'Кокосовое молоко', category: 'Бакалея' },
  { id: '78', name: 'Грецкие орехи', category: 'Бакалея' },
  { id: '79', name: 'Кешью', category: 'Бакалея' },
  { id: '80', name: 'Панировочные сухари', category: 'Бакалея' },
  
  // Специи
  { id: '81', name: 'Черный перец', category: 'Специи' },
  { id: '82', name: 'Паприка сладкая', category: 'Специи' },
  { id: '83', name: 'Куркума', category: 'Специи' },
  { id: '84', name: 'Розмарин', category: 'Специи' },
  { id: '85', name: 'Тимьян', category: 'Специи' },
  { id: '86', name: 'Корица', category: 'Специи' },
  { id: '87', name: 'Имбирь (свежий/сушеный)', category: 'Специи' },
  { id: '88', name: 'Прованские травы', category: 'Специи' }
];
