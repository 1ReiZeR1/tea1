/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { Center, Text, Flex, Link as ChakraLink } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex
      zIndex="1000"
      as="footer"
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      boxShadow="md"
      padding="10px 20px"
    >
      <Center
        backgroundColor={'white'}
        borderColor="#FED7D7"
        borderWidth={1}
        borderStyle="groove"
        borderRadius={250}
        boxShadow="0 0 10px rgba(255, 0, 0, 0.3)"
        width="98%"
        justifyContent="center"
      >
        <Text fontSize="lg" style={{ color: "black", marginRight: "20px" }}>
          © 2025 Tea sort. Все права защищены.
        </Text>
        <Center gap={20} justifyContent="center">
          <Link to="/about" style={{ color: "black" }}>
            О нас
          </Link>
          <Link to="/contact" style={{ color: "black" }}>
            Контакты
          </Link>
          <Link to="/privacy" style={{ color: "black" }}>
            Политика конфиденциальности
          </Link>
        </Center>
      </Center>
    </Flex>
  );
}
