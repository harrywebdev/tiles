import { FC } from "react";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Container,
  Form,
  Navbar,
} from "react-bootstrap";
import { useAppEditStore } from "../stores/app-edit-store.ts";
import { HiOutlineClock } from "react-icons/hi2";

type TopNavBarProps = {
  //
};

const TopNavBar: FC<TopNavBarProps> = () => {
  const { isEditing, toggleIsEditing } = useAppEditStore();

  return (
    <Navbar bg="light" expand="lg">
      <Container className={"justify-content-between"}>
        <EditTilesToolbar isVisible={isEditing} />

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

const EditTilesToolbar = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <ButtonToolbar
      aria-label="Tiles Toolbar"
      className={isVisible ? "" : "invisible"}
    >
      <ButtonGroup className="me-2" aria-label="First group">
        <Button variant={"primary"}>
          <HiOutlineClock size={24} />
        </Button>
      </ButtonGroup>
    </ButtonToolbar>
  );
};
