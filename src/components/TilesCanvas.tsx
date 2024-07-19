import { FC } from "react";
import { Col, Container, Row } from "react-bootstrap";

type TilesCanvasProps = {
  //
};

const TilesCanvas: FC<TilesCanvasProps> = () => {
  return (
    <div className={"flex-grow-1 d-flex"}>
      <Container>
        <Row>
          <Col>MainScreen</Col>
        </Row>
      </Container>
    </div>
  );
};

export default TilesCanvas;
