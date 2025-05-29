import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import ProductCard from '../components/ProductCard';

const Products: React.FC = () => {
  // Sample products data
  const products = [
    {
      id: 1,
      name: "Product 1",
      description: "Description for product 1",
      price: 99.99,
      imageUrl: "https://via.placeholder.com/200"
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description for product 2",
      price: 149.99,
      imageUrl: "https://via.placeholder.com/200"
    },
    // Add more products as needed
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Our Products
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Products; 