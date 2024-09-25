import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../User/PaymentForm';
import { useParams } from 'react-router-dom';

// const stripePromise = loadStripe('pk_test_51PfqqaRpKFld35aBMUY5dLMcbmVA7KxjV1YdS5f80b3bLpZGLDGMHooc6NkkR4b3kzH6kkTRIEOL7HCpiRH8TKLd00TIcZf35x'); // Use your Stripe publishable key

export default function StripeCheckout(){
    const { productId } = useParams();
    return <PaymentForm productId={productId} />;
}