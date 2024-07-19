import { FC, FormEvent, useState } from "react";
import {
  AppTile,
  AppTileType,
  useAppTilesStore,
} from "../stores/app-tiles.store.ts";
import { Alert, Button, Form, Modal } from "react-bootstrap";

type HandleClockTileModalProps = {
  onAbort: () => void;
  onFinish: (tile: AppTile) => void;
  updateTile?: AppTile;
};

export const HandleClockTileModal: FC<HandleClockTileModalProps> = ({
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
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();

      return;
    }

    onFinish({ label, type: AppTileType.Clock });
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

// eslint-disable-next-line react-refresh/only-export-components
export const useClockTileModal = () => {
  const { addTile } = useAppTilesStore();
  const [isClockTileModalShown, setIsClockTileModalShown] = useState(false);
  const [tileEdited, setTileEdited] = useState<AppTile | undefined>();

  return {
    showClockTileModal: (tile?: AppTile) => {
      setTileEdited(tile);
      setIsClockTileModalShown(true);
    },

    clockTileModal: isClockTileModalShown && (
      <HandleClockTileModal
        updateTile={tileEdited}
        onAbort={() => setIsClockTileModalShown(false)}
        onFinish={(tile: AppTile) => {
          addTile(tile);
          setIsClockTileModalShown(false);
        }}
      />
    ),
  };
};
