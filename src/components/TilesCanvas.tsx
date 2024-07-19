import { FC } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { useAppEditStore } from "../stores/app-edit.store.ts";
import { AppTile, useAppTilesStore } from "../stores/app-tiles.store.ts";

type TilesCanvasProps = {
  //
};

const TilesCanvas: FC<TilesCanvasProps> = () => {
  const { isEditing } = useAppEditStore();
  const { tiles } = useAppTilesStore();

  return (
    <div
      className={`flex-grow-1 d-flex ${isEditing ? "bg-white" : "bg-light"}`}
    >
      <Container>
        <Row>
          {tiles.map((tile, index) => (
            <Col xs={3} key={`${index}_${tile.label}`} className={"p-3"}>
              <Tile tile={tile} />
            </Col>
          ))}

          {tiles.length === 0 ? (
            <Alert variant={"info"}>No tiles yet.</Alert>
          ) : null}
        </Row>
      </Container>
    </div>
  );
};

export default TilesCanvas;

const Tile = ({ tile }: { tile: AppTile }) => {
  return (
    <Button variant={"outline-primary"} size={"lg"}>
      {tile.label}
    </Button>
  );
};
