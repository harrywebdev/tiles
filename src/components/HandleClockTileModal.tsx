import { FC, FormEvent, useState } from "react";
import { AppTile } from "../stores/app-tiles.store.ts";
import { Alert, Button, Form, Modal } from "react-bootstrap";

type HandleClockTileModalProps = {
  onAbort: () => void;
  onFinish: (tile: AppTile) => void;
  updateTile?: AppTile;
};

const HandleClockTileModal: FC<HandleClockTileModalProps> = ({
  onAbort,
  onFinish,
  updateTile,
}) => {
  const emojiList = ["😁", "❤️", "☠️", "🚀", "🎉", "🙏🏻"];
  const initLabel =
    updateTile !== undefined
      ? updateTile.label
      : emojiList[Math.floor(Math.random() * 5)];

  const [label, setLabel] = useState(initLabel);

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

export default HandleClockTileModal;
