import { FC } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { useAppEditStore } from "../stores/app-edit.store.ts";
import {
  AppTile,
  AppTileType,
  useAppTilesStore,
} from "../stores/app-tiles.store.ts";
import { isStrictNever } from "../utils";
import { useClockTileModal } from "./HandleClockTileModal.tsx";
import { debug } from "../utils/console.ts";

type TilesCanvasProps = {
  //
};

type TilesWithLayoutRow = {
  id: string;
  tiles: AppTile[];
};

const TilesCanvas: FC<TilesCanvasProps> = () => {
  debug("TilesCanvas render");

  const { isEditing } = useAppEditStore();
  const { tiles } = useAppTilesStore();

  const tilesWithLayout = tiles.reduce((acc, tile, tileIndex) => {
    const rowIndex = Math.floor(tileIndex / 4);

    // init
    if (!acc[rowIndex]) {
      acc[rowIndex] = {
        id: "",
        tiles: [],
      };
    }

    acc[rowIndex].id += tile.id;
    acc[rowIndex].tiles.push(tile);

    return acc;
  }, [] as TilesWithLayoutRow[]);

  return (
    <div
      className={`flex-grow-1 d-flex ${isEditing ? "bg-white" : "bg-light"}`}
    >
      <Container>
        {tiles.length === 0 ? (
          <Alert variant={"info"}>No tiles yet.</Alert>
        ) : null}

        {tilesWithLayout.map((row) => (
          <Row key={row.id}>
            {row.tiles.map((tile) => (
              <Col xs={12 / row.tiles.length} key={tile.id} className={"p-3"}>
                <Tile tile={tile} />
              </Col>
            ))}
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default TilesCanvas;

const Tile = ({ tile }: { tile: AppTile }) => {
  const { showClockTileModal, clockTileModal } = useClockTileModal();

  let buttonOnClick = () => {
    // no-op
  };
  switch (tile.type) {
    case AppTileType.Clock: {
      buttonOnClick = () => showClockTileModal(tile);
      break;
    }
    default:
      isStrictNever(tile.type);
  }

  return (
    <>
      <Button variant={"outline-primary"} size={"lg"} onClick={buttonOnClick}>
        {tile.label}
      </Button>

      {clockTileModal}
    </>
  );
};
