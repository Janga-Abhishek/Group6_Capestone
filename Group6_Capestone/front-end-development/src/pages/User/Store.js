import { useQuery, gql, useMutation} from '@apollo/client';
import React, { useState } from 'react';
import PaymentForm from "../User/PaymentForm";
import {GET_PRODUCTS} from "../../graphql/middleware"
import StripeCheckout from '../User/StripeCheckout'
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components
import Menu from '../../components/Menu';

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
    <div>
      <Menu />
      <div className='mt-5'>
      <h1 className='text-center mt-3'>Explore Products</h1>
      <Row className='row p-1' style={{maxWidth:"90%",margin:"auto"}}>
      {data.products.map(product =>(
         <Col key={product.id} className="m-2 p-1">
      <Card style={{ width: '18rem',padding:"2rem" }}>
      <Card.Img variant="top" src={product.imageUrl} style={{maxWidth:"30%",margin:"auto"}} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{product.currency}</Card.Subtitle>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>Price: ${(product.unitAmount)}</Card.Text>
        <Button variant="primary" onClick={() => handleClick(product.id)}>Buy</Button>
      </Card.Body>
      </Card>
         </Col>
      ))}
      </Row>
      </div>
    </div>
    );
}