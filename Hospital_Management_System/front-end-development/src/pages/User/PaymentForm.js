import React, { useState } from 'react';
import { Elements, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useMutation } from '@apollo/client';
import { CREATE_PAYMENT_INTENT } from '../../graphql/middleware';
import { Card, Button, Form } from 'react-bootstrap'; // Import Bootstrap components
import { useNavigate } from 'react-router-dom';

export default function PaymentForm({ productId }) {
    const stripe = useStripe();
    const elements = useElements();
    const [createPaymentIntent] = useMutation(CREATE_PAYMENT_INTENT);
    const [error, setError] = useState(null);
    const [succeeded, setSucceeded] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        try {
            const { data } = await createPaymentIntent({ variables: { productId } });
            const { clientSecret } = data.createPaymentIntent;

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                },
            });

            if (error) {
                setError(error.message);
                setSucceeded(false);
            } else if (paymentIntent.status === 'succeeded') {
                setSucceeded(true);
                setError(null);
                setTimeout(()=>{
                  navigate("/store")
                },5000)
            }
        } catch (error) {
            setError(error.message);
            setSucceeded(false);
        }
    };

    return (
        <Card style={{marginTop:"3%",boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}} className="p-4 border w-50 mx-auto">
            <Card.Body>
            <img style={{width:"15%", height:"auto",margin:"0.5rem",borderRadius:"50%",position:'relative',left:"40%",boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}} src="/images/HealthEase_logo.png" alt="Logo" />
                <Card.Title className='text-center mt-5 mb-3'>Payment Information</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Card Number</Form.Label>
                        <CardNumberElement className="p-3 border rounded" />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Expiration Date</Form.Label>
                        <CardExpiryElement className="p-3 border rounded" />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>CVC</Form.Label>
                        <CardCvcElement className="p-3 border rounded" />
                    </Form.Group>
                    <Button type="submit" variant="primary" disabled={!stripe} className="mt-3">
                        Pay
                    </Button>
                </Form>
                {error && <div className="text-danger mt-3">{error}</div>}
                {succeeded && <div className="text-success mt-3">Payment succeeded!</div>}
            </Card.Body>
        </Card>
    );
}
