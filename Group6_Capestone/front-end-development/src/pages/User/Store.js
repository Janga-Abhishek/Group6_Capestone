import { useQuery, gql, useMutation} from '@apollo/client';
import React, { useState } from 'react';
import PaymentForm from "../User/PaymentForm";
import {GET_PRODUCTS} from "../../graphql/middleware"
import StripeCheckout from '../User/StripeCheckout'
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components


export default function Store(){
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const navigate = useNavigate();  //Hook for programmatic navigation

  const [selectedProductId, setSelectedProductId] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  const handleClick = (productId) => {
    console.log("Navigating to StripeCheckout with productId:", productId);
    // setSelectedProductId(productId);
    navigate(`/stripeCheckout/${productId}`);
  };
    return (
      <Container>
      <h1 className="my-4">Products</h1>
      <Row>
        {data.products.map(product => (
          <Col md={4} key={product.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{product.currency}</Card.Subtitle>
                <Card.Text>
                  {product.description}
                </Card.Text>
                <Card.Text>
                  Price: ${(product.unitAmount)}
                </Card.Text>
                <Button variant="primary" onClick={() => handleClick(product.id)}>Buy</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    );
}