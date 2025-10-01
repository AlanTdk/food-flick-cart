import { Product } from '@/contexts/CartContext';
import burgerClassic from '@/assets/burger-classic.jpg';
import burgerBbq from '@/assets/burger-bbq.jpg';
import burgerDouble from '@/assets/burger-double.jpg';
import hotdogClassic from '@/assets/hotdog-classic.jpg';
import hotdogSpecial from '@/assets/hotdog-special.jpg';
import pizzaMargherita from '@/assets/pizza-margherita.jpg';
import pizzaPepperoni from '@/assets/pizza-pepperoni.jpg';
import drinkCola from '@/assets/drink-cola.jpg';
import drinkLemonade from '@/assets/drink-lemonade.jpg';
import dessertCheesecake from '@/assets/dessert-cheesecake.jpg';
import dessertBrownie from '@/assets/dessert-brownie.jpg';

export const products: Product[] = [
  {
    id: '1',
    name: 'Hamburguesa Clásica',
    description: 'Carne de res jugosa con queso, lechuga, tomate y nuestra salsa especial',
    price: 12.99,
    category: 'burgers',
    image: burgerClassic,
    ingredients: ['Carne de res', 'Queso cheddar', 'Lechuga', 'Tomate', 'Cebolla', 'Salsa especial'],
  },
  {
    id: '2',
    name: 'Hamburguesa BBQ',
    description: 'Carne con bacon crujiente, cebolla caramelizada y salsa BBQ ahumada',
    price: 14.99,
    category: 'burgers',
    image: burgerBbq,
    ingredients: ['Carne de res', 'Bacon', 'Cebolla caramelizada', 'Queso', 'Salsa BBQ'],
  },
  {
    id: '3',
    name: 'Hamburguesa Doble',
    description: 'Doble carne de res con doble queso para los más hambrientos',
    price: 16.99,
    category: 'burgers',
    image: burgerDouble,
    ingredients: ['Doble carne', 'Doble queso', 'Lechuga', 'Tomate', 'Pepinillos'],
  },
  {
    id: '4',
    name: 'Hot Dog Clásico',
    description: 'Salchicha premium con mostaza, ketchup y cebolla crujiente',
    price: 8.99,
    category: 'hotdogs',
    image: hotdogClassic,
    ingredients: ['Salchicha premium', 'Pan suave', 'Mostaza', 'Ketchup', 'Cebolla'],
  },
  {
    id: '5',
    name: 'Hot Dog Especial',
    description: 'Con queso fundido, jalapeños y salsa picante',
    price: 10.99,
    category: 'hotdogs',
    image: hotdogSpecial,
    ingredients: ['Salchicha', 'Queso fundido', 'Jalapeños', 'Salsa picante', 'Cebolla frita'],
  },
  {
    id: '6',
    name: 'Pizza Margherita',
    description: 'Clásica pizza italiana con tomate, mozzarella y albahaca fresca',
    price: 15.99,
    category: 'pizza',
    image: pizzaMargherita,
    ingredients: ['Salsa de tomate', 'Mozzarella', 'Albahaca fresca', 'Aceite de oliva'],
  },
  {
    id: '7',
    name: 'Pizza Pepperoni',
    description: 'Generosas rodajas de pepperoni con extra queso mozzarella',
    price: 17.99,
    category: 'pizza',
    image: pizzaPepperoni,
    ingredients: ['Salsa de tomate', 'Mozzarella', 'Pepperoni', 'Orégano'],
  },
  {
    id: '8',
    name: 'Coca Cola',
    description: 'Refresco clásico bien frío (500ml)',
    price: 2.99,
    category: 'drinks',
    image: drinkCola,
    ingredients: ['Agua carbonatada', 'Azúcar', 'Cafeína'],
  },
  {
    id: '9',
    name: 'Limonada Natural',
    description: 'Limonada fresca hecha al momento con limones naturales',
    price: 3.99,
    category: 'drinks',
    image: drinkLemonade,
    ingredients: ['Limones frescos', 'Agua', 'Azúcar', 'Hielo'],
  },
  {
    id: '10',
    name: 'Cheesecake',
    description: 'Cremoso cheesecake con base de galleta y topping de frutos rojos',
    price: 6.99,
    category: 'desserts',
    image: dessertCheesecake,
    ingredients: ['Queso crema', 'Base de galleta', 'Frutos rojos', 'Crema'],
  },
  {
    id: '11',
    name: 'Brownie con Helado',
    description: 'Brownie de chocolate caliente con helado de vainilla',
    price: 7.99,
    category: 'desserts',
    image: dessertBrownie,
    ingredients: ['Brownie de chocolate', 'Helado de vainilla', 'Salsa de chocolate'],
  },
];
