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
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=20"
      );
      const data = await response.json();
      const fetches = data.results.map((pokemon) =>
        fetch(pokemon.url).then((res) => res.json())
      );
      const pokemonData = await Promise.all(fetches);
      setPokemons(pokemonData);
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    setFilteredPokemons(
      pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, pokemons]);

  return (
    <MainContainer>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchResults>
          {filteredPokemons.map((pokemon) => (
            <Card key={pokemon.id}>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <h3 style={{ textTransform: "capitalize" }}>{pokemon.name}</h3>
            </Card>
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
          {pokemons.map((pokemon) => (
            <SwiperSlide key={pokemon.id}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  style={{ width: "200px", height: "200px" }}
                />
                <h1
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {pokemon.name.split(" ")[0]}
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

const Card = styled.div`
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
