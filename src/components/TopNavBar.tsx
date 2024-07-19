import { FC } from "react";
import { Container, Form, Navbar } from "react-bootstrap";

type TopNavBarProps = {
  //
};

const TopNavBar: FC<TopNavBarProps> = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container className={"justify-content-end"}>
        <Form>
          <Form.Check type="switch" id="top-nav-bar-switch-edit" label="Edit" />
        </Form>
      </Container>
    </Navbar>
  );
};

export default TopNavBar;
