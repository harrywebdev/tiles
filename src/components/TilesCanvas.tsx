import { FC } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useAppEditStore } from "../stores/app-edit-store.ts";

type TilesCanvasProps = {
  //
};

const TilesCanvas: FC<TilesCanvasProps> = () => {
  const { isEditing } = useAppEditStore();
  return (
    <div
      className={`flex-grow-1 d-flex ${isEditing ? "bg-white" : "bg-light"}`}
    >
      <Container>
        <Row>
          <Col>MainScreen</Col>
        </Row>
      </Container>
    </div>
  );
};

export default TilesCanvas;
