import { FC } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TopNavBar from "./TopNavBar.tsx";

type MainScreenProps = {
  //
};

const MainScreen: FC<MainScreenProps> = () => {
  return (
    <>
      <TopNavBar />
      <Container>
        <Row>
          <Col>MainScreen</Col>
        </Row>
      </Container>
    </>
  );
};

export default MainScreen;
