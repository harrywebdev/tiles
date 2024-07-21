import { FC, FormEvent, useState } from "react";
import {
  AppTile,
  createClockTile,
  useAppTilesStore,
} from "../stores/app-tiles.store.ts";
import { Alert, Button, Form, Modal } from "react-bootstrap";

type HandleClockTileModalProps = {
  onAbort: () => void;
  onFinish: (tile: AppTile) => void;
  tileToUpdate?: AppTile;
};

export const HandleClockTileModal: FC<HandleClockTileModalProps> = ({
  onAbort,
  onFinish,
  tileToUpdate,
}) => {
  const isEditing = tileToUpdate !== undefined;

  const emojiList = ["😁", "❤️", "☠️", "🚀", "🎉", "🙏🏻"];
  const initLabel = isEditing
    ? tileToUpdate.label
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

    onFinish(
      tileToUpdate ? { ...tileToUpdate, label } : createClockTile({ label })
    );
  };

  return (
    <Modal show={true} onHide={handleClose} centered={true}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit" : "Add"} Counter Tile</Modal.Title>
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
  const { addTile, updateTile } = useAppTilesStore();
  const [isClockTileModalShown, setIsClockTileModalShown] = useState(false);
  const [tileEdited, setTileEdited] = useState<AppTile | undefined>();

  return {
    showClockTileModal: (tile?: AppTile) => {
      setTileEdited(tile);
      setIsClockTileModalShown(true);
    },

    clockTileModal: isClockTileModalShown && (
      <HandleClockTileModal
        tileToUpdate={tileEdited}
        onAbort={() => setIsClockTileModalShown(false)}
        onFinish={(tile: AppTile) => {
          tileEdited ? updateTile(tile) : addTile(tile);
          setIsClockTileModalShown(false);
        }}
      />
    ),
  };
};
