import React, { FC } from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const NotFound: FC = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, blue.400, blue.600)"
        backgroundClip="text">
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Página no eoncontrada
      </Text>
      <Text color={"primary.500"} mb={6}>
        La página que busca no parece existir
      </Text>

      <Button
        as={Link}
        to="/"
        colorScheme="blue"
        bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
        color="white"
        variant="solid">
        Ir al inicio
      </Button>
    </Box>
  );
};
