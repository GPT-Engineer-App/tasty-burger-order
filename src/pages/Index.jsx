import React, { useState } from "react";
import { Box, Heading, Text, Image, Grid, GridItem, Button, VStack, HStack, IconButton, useToast } from "@chakra-ui/react";
import { FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";

const burgers = [
  {
    name: "Classic Cheeseburger",
    description: "Juicy beef patty with melted cheese, lettuce, tomato, and pickles.",
    image: "https://images.unsplash.com/photo-1591336277697-cdae7e42dead?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwY2hlZXNlYnVyZ2VyfGVufDB8fHx8MTcxMDc2MTI0N3ww&ixlib=rb-4.0.3&q=80&w=1080",
    price: 8.99,
  },
  {
    name: "BBQ Bacon Burger",
    description: "Beef patty topped with crispy bacon, BBQ sauce, and onion rings.",
    image: "https://images.unsplash.com/photo-1591336277932-f0579b75992b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxiYnElMjBiYWNvbiUyMGJ1cmdlcnxlbnwwfHx8fDE3MTA3NjEyNDd8MA&ixlib=rb-4.0.3&q=80&w=1080",
    price: 10.99,
  },
  {
    name: "Mushroom Swiss Burger",
    description: "Beef patty with sautéed mushrooms and melted Swiss cheese.",
    image: "https://images.unsplash.com/photo-1579065413090-3ce766e7deca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxtdXNocm9vbSUyMHN3aXNzJTIwYnVyZ2VyfGVufDB8fHx8MTcxMDc2MTI0N3ww&ixlib=rb-4.0.3&q=80&w=1080",
    price: 9.99,
  },
  {
    name: "Veggie Burger",
    description: "Plant-based patty with avocado, lettuce, and tomato.",
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx2ZWdnaWUlMjBidXJnZXJ8ZW58MHx8fHwxNzEwNzYxMjQ4fDA&ixlib=rb-4.0.3&q=80&w=1080",
    price: 9.49,
  },
];

const Index = () => {
  const [cart, setCart] = useState([]);
  const toast = useToast();

  const addToCart = (burger) => {
    setCart([...cart, burger]);
    toast({
      title: "Added to cart",
      description: `${burger.name} has been added to your cart.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const totalPrice = cart.reduce((total, burger) => total + burger.price, 0);

  return (
    <Box maxWidth="1200px" margin="auto" padding={4}>
      <Heading as="h1" size="2xl" textAlign="center" marginBottom={8}>
        World's Best Burgers
      </Heading>
      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={8}>
        {burgers.map((burger) => (
          <GridItem key={burger.name}>
            <VStack spacing={4} align="stretch">
              <Image src={burger.image} alt={burger.name} objectFit="cover" height="200px" />
              <Heading as="h2" size="lg">
                {burger.name}
              </Heading>
              <Text>{burger.description}</Text>
              <HStack justify="space-between">
                <Text fontWeight="bold">${burger.price.toFixed(2)}</Text>
                <Button leftIcon={<FaShoppingCart />} onClick={() => addToCart(burger)}>
                  Add to Cart
                </Button>
              </HStack>
            </VStack>
          </GridItem>
        ))}
      </Grid>
      <Box marginTop={8}>
        <Heading as="h2" size="xl" marginBottom={4}>
          Your Cart
        </Heading>
        {cart.length === 0 ? (
          <Text>Your cart is empty.</Text>
        ) : (
          <>
            {cart.map((burger, index) => (
              <HStack key={index} justify="space-between" marginBottom={2}>
                <Text>
                  {burger.name} - ${burger.price.toFixed(2)}
                </Text>
                <IconButton icon={<FaMinus />} aria-label="Remove from cart" onClick={() => removeFromCart(index)} />
              </HStack>
            ))}
            <HStack justify="space-between" marginTop={4}>
              <Text fontWeight="bold">Total: ${totalPrice.toFixed(2)}</Text>
              <Button colorScheme="green">Checkout</Button>
            </HStack>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Index;
