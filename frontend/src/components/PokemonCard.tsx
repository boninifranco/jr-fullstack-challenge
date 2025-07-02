import React from "react";
import { Card, Badge } from "react-bootstrap";
import { PokemonDetail } from "../pages/PokedexPage";
import { traduccionesTiposPokemon } from "../utils/traducciones";
import { coloresPorTipo } from "../utils/colores";

interface PokemonCardProps {
  pokemon: PokemonDetail;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  // Se extrae la url para obtener los sprites
  const imageUrl = pokemon.sprites.other["official-artwork"].front_default;

  // Capitalización del nombre
  const pokemonName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  // PokemonCards
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={pokemonName}
        style={{
          height: "150px",
          width: "150px",
          objectFit: "contain",
          margin: "10px auto",
        }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-center">{pokemonName}</Card.Title>
        <Card.Text as="div" className="text-center text-muted">
          ID: #{pokemon.id}
        </Card.Text>
        <div className="mt-auto text-center">
          {pokemon.types.map((typeInfo) => {
            const tipoEnIngles = typeInfo.type.name;

            const tipoTraducido =
              traduccionesTiposPokemon[tipoEnIngles] || tipoEnIngles;

            const colorDelTipo = coloresPorTipo[tipoEnIngles] || "secondary";

            return (
              <Badge pill bg={colorDelTipo} className="me-1" key={tipoEnIngles}>
                {tipoTraducido}
              </Badge>
            );
          })}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PokemonCard;
