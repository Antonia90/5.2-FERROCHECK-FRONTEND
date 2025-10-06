# ferrocheck

**FerroCheck** is a web application designed to help users:

- Calculate their **approximate daily iron intake** based on category (e.g., premenopausal woman, adult man, pregnancy).
- Explore **recipes** filtered by dietary category (vegan, vegetarian, omnivore).  
- Manage and consult **ingredients** with their iron content.  
- Learn about **advice and best practices** to improve iron absorption in meals.  

> ⚠️ **Disclaimer:** Calculations in FerroCheck are **approximate and intended for educational purposes only**. They do not replace professional medical advice.

## How to Use FerroCheck

Here’s how to navigate and use the main sections of the app:

### Ingredients

Add and manage your ingredients here.
Each ingredient requires:
-A type (e.g., vegetable, fruit, protein, dairy, condiment, other)
-A name
-The iron content in milligrams per 100 grams (iron_mg_per_100g).

⚠️ The daily calculator and recipes depend on this data — you must register your ingredients first.

### Recipes

Create your recipes using the ingredients you’ve already saved.
Choose a category (vegan, vegetarian, or omnivorous).
Add one or more ingredients, specifying the unit (g, ml, etc.) and quantity per serving.
Each recipe can then be edited, filtered by diet type, or deleted if needed.

### Daily Check

Estimate your daily iron intake.
Select your category (e.g., premenopausal woman, pregnant, adult man).
Add up to 8 recipes and indicate how many servings you’ve eaten.
The app will calculate:
-Your total iron intake (mg)
-The recommended requirement
-The difference and your status (sufficient / insufficient)

### Tips (Advices)

Learn how to improve iron absorption — e.g., combining iron-rich foods with vitamin C sources, or avoiding calcium and tannins during main meals.

### Profile

View your user information and access placeholders for future features such as saved recipes and daily progress tracking.

---

## 🚀 Technologies

### Backend (API)

- [Laravel 12.30.1](https://laravel.com/)  
- PHP 8.2  
- MySQL (`ferrocheck_api` database)  
- [Laravel Passport](https://laravel.com/docs/passport) for Bearer Token authentication  

### Frontend

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for validations  
- Axios for API calls  

---

## 📦 Installation & Setup

### 1. Clone repositories

## Backend

git clone <https://github.com/Antonia90/5.1-FERROCHECK-API>
cd ferrocheck_api

## Frontend Repository

git clone <https://github.com/Antonia90/5.2-FERROCHECK-FRONTEND>
cd ferrocheck_frontend

### 2. Backend (Laravel API)

cd ferrocheck_api
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan passport:install
php artisan serve
API will be available at <http://127.0.0.1:8000>

### 3. Frontend (React + Vite)

cd ferrocheck_frontend
npm install
cp .env.example .env.local
In .env.local set your API base URL:

ini
VITE_API_BASE_URL=<http://127.0.0.1:8000>
Run development server:

npm run dev
Frontend will be available at <http://localhost:5173>

🔑 Authentication
Main endpoints:

POST /api/register → create a new user
POST /api/login → authenticate and get token
POST /api/logout → invalidate token
GET /api/user → fetch authenticated user

All private requests require headers:

Authorization: Bearer ``<TOKEN>``
Accept: application/json
Seeder credentials:

Admin: <admin@example.com> / password

User: <user@example.com> / password

📚 Features
Frontend
Home: introduction, iron requirements table, quick links to recipes, ingredients and daily check.

Auth: login, register, logout and user profile.

Ingredients: CRUD for ingredients with type (vegetable, fruit, protein, dairy, spice, other).

Recipes: CRUD for recipes with attached ingredients, servings, and diet categories (vegan, vegetarian, omnivore).

Daily Check: select recipes/servings to calculate iron intake vs. requirement.

Advices: static view with information about iron types, factors that increase/reduce absorption, and practical meal examples.

Backend
RESTful API validated with Laravel.

Endpoints for authentication, ingredients, recipes, and daily-check.

Validation rules on all requests.

Many-to-Many relation between recipes and ingredients (with unit + quantity per serving).

🗂️ Project Structure (Frontend)

src/
├── api/            # API calls with axios
├── components/     # Navbar, Footer, Layout
├── images/         # static icons and images
├── pages/          # main views (Login, Register, Home, Ingredients, Recipes, DailyCheck, Advices)
├── store/          # Zustand state (auth, etc.)
├── styles/         # Tailwind + global styles
🎨 Styling
Color palette based on earthy reddish/orange tones (iron-inspired).

Components with rounded corners, soft shadows and minimalistic typography.

Responsive layout with navbar + hamburger menu on mobile.

🧪 Best Practices
Git Flow methodology with main, develop, and feature/* branches.

Semantic and descriptive commit messages.

Separation of concerns in frontend (API, store, pages, components).

Validation both on frontend (Zod) and backend (Laravel Validator).

Persistent auth state using localStorage.

👩‍💻 Author
Developed by Antonia as part of a fullstack web development project.
