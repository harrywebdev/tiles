import { FC, useMemo } from "react";
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
import { useTilesLogRecordsStore } from "../stores/tiles-log-records.store.ts";

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
  debug(`Tiles render (${tile.label})`);

  const { isEditing } = useAppEditStore();
  const { showClockTileModal, clockTileModal } = useClockTileModal();
  const { getTileLogRecords, createTileLogRecord } = useTilesLogRecordsStore();
  const tileLogRecords = useMemo(
    () => getTileLogRecords(tile.id, "today"),
    [getTileLogRecords, tile.id]
  );

  const isPressed = tileLogRecords.length > 0;

  let buttonOnClick = () => {
    // no-op
  };

  if (isEditing) {
    switch (tile.type) {
      case AppTileType.Clock: {
        buttonOnClick = () => showClockTileModal(tile);
        break;
      }
      default:
        isStrictNever(tile.type);
    }
  } else {
    switch (tile.type) {
      case AppTileType.Clock: {
        buttonOnClick = isPressed
          ? () => {
              // TODO: confirm to delete record
            }
          : () => createTileLogRecord(tile);
        break;
      }
      default:
        isStrictNever(tile.type);
    }
  }

  return (
    <>
      <Button
        variant={`${isPressed ? "primary" : "outline-primary"}`}
        size={"lg"}
        onClick={buttonOnClick}
      >
        {tile.label}
      </Button>

      {clockTileModal}
    </>
  );
};
