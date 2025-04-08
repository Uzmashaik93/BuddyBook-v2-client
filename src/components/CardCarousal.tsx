import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

interface CardCarouselProps {
  list: { answer: string; name: string }[];
}

function CardCarousel({ list }: CardCarouselProps) {
  return (
    <div
      className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-lg shadow-xl 
      p-4 sm:p-6 md:p-8 lg:p-10 
      mx-auto 
      w-11/12 max-w-4xl 
      mt-8 sm:mt-12 md:mt-16 lg:mt-20"
    >
      {list.length === 1 ? (
        <SliderCard item={list[0]} />
      ) : (
        <Slider {...settings} className="focus:outline-none">
          {list.map((item, i) => (
            <SliderCard item={item} key={i} />
          ))}
        </Slider>
      )}
    </div>
  );
}

export default CardCarousel;

interface SliderCardProps {
  item: { answer: string; name: string };
}

function SliderCard({ item }: SliderCardProps) {
  return (
    <div>
      <div className="backdrop-blur-sm rounded-xl transition-all duration-300 border border-purple-100">
        <h1
          className="text-lg sm:text-xl md:text-2xl 
                font-bold 
                mb-2 sm:mb-3 md:mb-4 
                tracking-wide"
        >
          {item.answer}
        </h1>
        <h1 className="!text-gray-400 text-base">-{item.name}😁</h1>
      </div>
    </div>
  );
}
