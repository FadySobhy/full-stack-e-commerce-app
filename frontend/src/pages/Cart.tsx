import React from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Divider,
  Box,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const Cart: React.FC = () => {
  const mockCartItems = [
    { id: 1, name: 'Product 1', price: 99.99, quantity: 2 },
    { id: 2, name: 'Product 2', price: 149.99, quantity: 1 },
  ];

  const total = mockCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>

      {mockCartItems.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Your cart is empty
        </Typography>
      ) : (
        <>
          <List>
            {mockCartItems.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <ListItemText
                    primary={item.name}
                    secondary={`Quantity: ${item.quantity}`}
                  />
                  <Typography variant="body1" sx={{ mr: 4 }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>

          <Box sx={{ mt: 4, textAlign: 'right' }}>
            <Typography variant="h5" gutterBottom>
              Total: ${total.toFixed(2)}
            </Typography>
            <Button variant="contained" color="primary" size="large">
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Cart; 