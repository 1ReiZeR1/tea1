/* eslint-disable no-unused-vars */
import { Text, Center } from "@chakra-ui/react";
import Carousel from "../Carousel/Carousel";
import SvgMapComponent from "../Map/Map";


export default function Home() {
  return (
    <>
    {/* <Carousel /> */}
    <SvgMapComponent />
    <Center >
      <Text>Добро пожаловать на главную страницу!</Text>
    </Center>
    </>
    
  );
}
