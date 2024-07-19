import { FC } from "react";
import { Container, Form, Navbar } from "react-bootstrap";
import { useAppEditStore } from "../stores/app-edit-store.ts";

type TopNavBarProps = {
  //
};

const TopNavBar: FC<TopNavBarProps> = () => {
  const { isEditing, toggleIsEditing } = useAppEditStore();

  return (
    <Navbar bg="light" expand="lg">
      <Container className={"justify-content-end"}>
        <Form>
          <Form.Check
            type="switch"
            id="top-nav-bar-switch-edit"
            label="Edit"
            checked={isEditing}
            onChange={() => toggleIsEditing()}
          />
        </Form>
      </Container>
    </Navbar>
  );
};

export default TopNavBar;
