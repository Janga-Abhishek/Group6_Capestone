import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Import your global styles if any
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

//MY STRIPE SECRET KEY
const stripePromise = loadStripe('pk_test_51PfqqaRpKFld35aBMUY5dLMcbmVA7KxjV1YdS5f80b3bLpZGLDGMHooc6NkkR4b3kzH6kkTRIEOL7HCpiRH8TKLd00TIcZf35x'); // Use your Stripe publishable key

root.render(
  <Elements stripe={stripePromise}>
    <App />
  </Elements>
  // <React.StrictMode>
  // </React.StrictMode>
);
