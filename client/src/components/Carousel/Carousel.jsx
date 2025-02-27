import Slider from "react-slick";
import { Box, Image } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box width="55%" margin="auto">
      <Slider {...settings}>
        <Box>
          <Image src="/img/img2.jpg" alt="Image 1" />
        </Box>
        <Box>
          <Image src="/img/img3.jpg" alt="Image 2" />
        </Box>
        <Box>
          <Image src="/img/img4.jpg" alt="Image 3" />
        </Box>
      </Slider>
    </Box>
  );
};

export default Carousel;
