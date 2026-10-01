Name : Vizar Panta
SYMBOL NO: 60395838 

# React Assessment - ShopZone

A mini e-commerce web application built using React, TypeScript, Bootstrap, and React Router.

## Technologies Used

* React
* TypeScript
* Vite
* Bootstrap 5
* Bootstrap Icons
* React Router DOM
* Fake Store API
* React Hooks

## Features

### Product Management

* Displays products fetched from the Fake Store API
* Reusable `ProductCard` component
* Product list rendered using `.map()`
* TypeScript interfaces for product and cart data
* Product details page

### Search and Sorting

* Search products by name
* Sort products by price:

  * Low to High
  * High to Low

### Shopping Cart

* Add products to cart
* Cart count displayed in the navbar
* Increase or decrease product quantity
* Remove products from cart
* Automatically calculates the total price
* Empty cart state

### Add New Product

* Controlled React form
* Product name field
* Price field
* Image URL field
* Category selection
* Form validation
* Product must have a name
* Price must be a positive number
* Image URL must be valid
* New products are added to the top of the product list without reloading the page

### API Integration

* Product data is fetched using `useEffect`
* Uses the Fake Store API
* Loading state
* Bootstrap loading skeletons
* Error handling

### Routing

The application uses React Router with the following routes:

| Route          | Description                 |
| -------------- | --------------------------- |
| `/`            | Product listing / Home page |
| `/product/:id` | Product details             |
| `/cart`        | Shopping cart               |
| `*`            | 404 Not Found page          |

### UI and UX

* Responsive Bootstrap layout
* Bootstrap Icons
* Hover effects on product cards
* Responsive product grid
* Loading skeletons using Bootstrap placeholders
* Dark mode
* Light/dark theme preference is saved in `localStorage`
* Automatically uses the system color scheme when no preference is saved

## Project Structure

```text
react-assessment-yourname/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductList.tsx
│   │   ├── SearchBar.tsx
│   │   ├── ProductForm.tsx
│   │   ├── ProductSkeleton.tsx
│   │   └── ProductSkeletonList.tsx
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── ProductDetails.tsx
│   │   ├── Cart.tsx
│   │   └── NotFound.tsx
│   │
│   ├── types/
│   │   └── Product.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## How to Run

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

## Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## API

Product data is fetched from the Fake Store API:

```text
https://fakestoreapi.com/products
```

## React Hooks Used

The project uses React Hooks for state and side-effect management:

* `useState` - manages products, cart, form data, search, sorting, loading, and dark mode
* `useEffect` - fetches product data and applies the selected theme
* `useMemo` - optimizes product filtering and sorting

## Assumptions

* Products added through the form are stored in React state and are not persisted to a backend.
* Cart data is stored in React state and resets when the page is refreshed.
* The Fake Store API is used as the mock product API.
* Product images are expected to be valid publicly accessible URLs.
* The checkout button is a UI element only and does not process real payments.

## Bonus Features

The project includes the following bonus features:

* Bootstrap loading skeletons
* Dark mode toggle
* Dark mode preference persistence using `localStorage`
* System color scheme detection

