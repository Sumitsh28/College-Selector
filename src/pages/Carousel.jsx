import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";
import { EffectCards, Pagination, Navigation, Autoplay } from "swiper/modules";
import Arrow from "../assets/Arrow.svg";

const Carousel = () => {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBeers, setFilteredBeers] = useState([]);

  useEffect(() => {
    const fetchBeers = async () => {
      const response = await fetch("https://api.sampleapis.com/beers/ale");
      const data = await response.json();
      setBeers(data.slice(0, 10));
    };

    fetchBeers();
  }, []);

  useEffect(() => {
    setFilteredBeers(
      beers.filter((beer) =>
        beer.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, beers]);

  return (
    <MainContainer>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search beers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchResults>
          {filteredBeers.map((beer) => (
            <BeerCard key={beer.id}>
              <img src={beer.image} alt={beer.name} />
              <h3>{beer.name}</h3>
            </BeerCard>
          ))}
        </SearchResults>
      </SearchContainer>
      <CarouselContainer>
        <Swiper
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          navigation={true}
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards, Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          {beers.map((beer) => (
            <SwiperSlide key={beer.id}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={beer.image}
                  alt={beer.name}
                  style={{ width: "100px", height: "100px" }}
                />
                <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {beer.name.split(" ")[0]}
                </h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </CarouselContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  color: white;
`;

const SearchContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: scroll;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  border-radius: 999px;
  position: fixed;
  width: 27%;
  z-index: 40;
`;

const SearchResults = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 80px;
`;

const BeerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background-color: #5119c7;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }

  h3 {
    margin-top: 10px;
    font-size: 18px;
  }
`;

const CarouselContainer = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;

  .swiper {
    width: 30%;
    height: 60%;
    &-slide {
      background-color: #5119c7;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        display: block;
        width: 100%;
        height: auto;
        object-fit: cover;
      }
    }
    &-button-next,
    &-button-prev {
      width: 4rem;
      top: 60%;
      background-image: url(${Arrow});
      background-position: center;
      background-size: cover;
      &::after {
        display: none;
      }
      @media (max-width: 64em) {
        width: 3rem;
      }
      @media (max-width: 30em) {
        width: 2rem;
      }
    }
    &-button-prev {
      left: 0;
      transform: rotate(180deg);
    }
    &-button-next {
      right: 0;
    }
  }
`;

export default Carousel;
