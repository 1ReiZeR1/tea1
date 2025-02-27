/* eslint-disable no-unused-vars */
import { Image, Text } from "@chakra-ui/react";
import Carousel from "../Carousel/Carousel";
import SvgMapComponent from "../Map/Map";
import { Description } from "../Description/Description";

export default function Home() {
  return (
    <>
      <Image
        width="100%"
        src="/img/фон2.jpg"
      />
      <Text className="tea_birth">Здесь рождается чай</Text>
      <SvgMapComponent />
   {/* <br/>
      <Description /> Не уверенна на счет него*/} 
    </>
  );
}
