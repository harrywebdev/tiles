import { FC, FormEvent, useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Container,
  Form,
  Modal,
  Navbar,
} from "react-bootstrap";
import { useAppEditStore } from "../stores/app-edit.store.ts";
import { HiOutlineClock } from "react-icons/hi2";
import { AppTile, useAppTilesStore } from "../stores/app-tiles.store.ts";

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
  const { addTile } = useAppTilesStore();
  const [isClockTileModalShown, setIsClockTileModalShown] = useState(false);

  return (
    <>
      <ButtonToolbar
        aria-label="Tiles Toolbar"
        className={isVisible ? "" : "invisible"}
      >
        <ButtonGroup className="me-2" aria-label="First group">
          <Button
            variant={"primary"}
            onClick={() => setIsClockTileModalShown(true)}
          >
            <HiOutlineClock size={24} />
          </Button>
        </ButtonGroup>
      </ButtonToolbar>

      {isClockTileModalShown && (
        <AddClockTileModal
          onAbort={() => setIsClockTileModalShown(false)}
          onFinish={(tile: AppTile) => {
            addTile(tile);
            setIsClockTileModalShown(false);
          }}
        />
      )}
    </>
  );
};

const AddClockTileModal = ({
  onAbort,
  onFinish,
}: {
  onAbort: () => void;
  onFinish: (tile: AppTile) => void;
}) => {
  const emojiList = ["😁", "❤️", "☠️", "🚀", "🎉", "🙏🏻"];

  const [label, setLabel] = useState(emojiList[Math.floor(Math.random() * 5)]);

  const handleClose = () => onAbort();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();

      return;
    }

    onFinish({ label });
  };

  return (
    <Modal show={true} onHide={handleClose} centered={true}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Counter Tile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Alert>This tile resets every day.</Alert>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Tile Label</Form.Label>

            <Form.Control
              type="text"
              placeholder="Title, emoji,..."
              value={label}
              onChange={(event) => setLabel(event.currentTarget.value)}
            />

            <Form.Text className="text-muted">
              Keep it short and precise
            </Form.Text>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>

          <Button variant="primary" type="submit">
            Add Tile
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
