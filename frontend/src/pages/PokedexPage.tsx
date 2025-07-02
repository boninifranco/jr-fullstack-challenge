import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";

// Se definen interfaces para los detalles pokemon
interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonSprites {
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
}

export interface PokemonDetail {
  id: number;
  name: string;
  types: PokemonType[];
  sprites: PokemonSprites;
}

function PokedexPage() {
  //Estados para la lista, carga, errores, desplazamiento y constante de limite
  const [listaPokemon, setListaPokemon] = useState<PokemonDetail[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [desplazamiento, setDesplazamiento] = useState(0);
  const limite = 8;

  useEffect(() => {
    const obtenerDatosPokemon = async () => {
      try {
        setCargando(true);
        setError(null);

        // Se obtiene la lista inicial de Pokémon
        const listaPokemonUrl = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${limite}&offset=${desplazamiento}`
        );

        // Se crea arreglo de promesas, una por cada petición de detalle
        const promesasDetalles = listaPokemonUrl.data.results.map(
          (pokemon: { url: string }) => axios.get<PokemonDetail>(pokemon.url)
        );

        // Se ejecutan las promesas
        const respuestaDetalles = await Promise.all(promesasDetalles);

        // Se mapean las respuestas para que queden solo los datos '.data'
        const detallesPokemon = respuestaDetalles.map((res) => res.data);

        setListaPokemon(detallesPokemon);
      } catch (err) {
        setError("No se pudieron cargar los datos de los Pokemon.");
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    obtenerDatosPokemon();
  }, [desplazamiento]);

  if (cargando)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  if (error)
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">Pokédex</h1>

      {/* Grilla de Pokémon */}
      <Row>
        {listaPokemon.map((pokemon) => (
          <Col key={pokemon.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <PokemonCard pokemon={pokemon} />
          </Col>
        ))}
      </Row>

      {/*Paginación*/}
      <Row className="justify-content-center mb-4">
        <Col xs="auto">
          <Button
            variant="secondary"
            onClick={() =>
              setDesplazamiento((prevOffset) => prevOffset - limite)
            }
            disabled={desplazamiento === 0} // Se deshabilita si estamos en la primera página
          >
            Anterior
          </Button>
        </Col>
        <Col xs="auto">
          <Button
            variant="danger"
            onClick={() =>
              setDesplazamiento((prevOffset) => prevOffset + limite)
            }
          >
            Siguiente
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default PokedexPage;
