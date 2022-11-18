import "../styles/note.scss";
import {
  FiPlus,
  FiMoreHorizontal,
  FiTrash2,
  FiItalic,
  FiBold,
} from "react-icons/fi";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { useState, useEffect } from "react";
export type NoteProps = {
  body: string;
  color: string;
  id: string;
  x: number;
  y: number;
  date: string;
  createNote: (color?: string) => void;
  handleChange: (body: string, id: string) => void;
  handleDrag: (e: DraggableEvent, data: DraggableData, id: string) => void;
  changeColor: (color: string, id: string) => void;
  removeNote: (id: string) => void;
};

const colors = [
  "#ffff00",
  "#ff9800",
  "#f44336",
  "#2196f3",
  "#4caf50",
  "#9c27b0",
];

function Note({
  body,
  color,
  createNote,
  id,
  handleChange,
  changeColor,
  handleDrag,
  x,
  y,
  date,
  removeNote,
}: NoteProps) {
  const [showColorTray, setShowColorTray] = useState(false);
  const [isDraggable, setIsDraggable] = useState(window.innerWidth > 800);

  function handleClick(color: string, id: string) {
    changeColor(color, id);
    setShowColorTray(false);
  }

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsDraggable(window.innerWidth > 800);
    });
    return () =>
      window.removeEventListener("resize", () => {
        setIsDraggable(window.innerWidth > 800);
      });
  });

  if (isDraggable) {
    return (
      <Draggable
        position={{ x, y }}
        onDrag={(e, data) => handleDrag(e, data, id)}
        handle=".Note-Toolbar"
        bounds="parent"
      >
        <div style={{ backgroundColor: color }} className="Note">
          <div className="Note-Toolbar">
            <FiPlus onClick={() => createNote(color)} className="Note-Icon" />
            <FiMoreHorizontal
              onClick={() => setShowColorTray((prev) => !prev)}
              className="Note-Icon"
            />
          </div>

          <div className="Color-Tray">
            {showColorTray
              ? colors.map((color) => (
                  <span
                    onClick={() => handleClick(color, id)}
                    style={{ backgroundColor: color }}
                    className="Color"
                  ></span>
                ))
              : ""}
          </div>

          <textarea
            placeholder="make a note..."
            onChange={(e) => handleChange(e.target.value, id)}
            className="Note-Body"
            rows={12}
            value={body}
          />
          <div className="Note-Footer">
            {date}
            <FiTrash2 onClick={() => removeNote(id)} className="Note-Icon" />
          </div>
        </div>
      </Draggable>
    );
  } else {
    return (
      <div style={{ backgroundColor: color }} className="Note">
        <div className="Note-Toolbar">
          <FiPlus onClick={() => createNote(color)} className="Note-Icon" />
          <FiMoreHorizontal
            onClick={() => setShowColorTray((prev) => !prev)}
            className="Note-Icon"
          />
        </div>

        <div className="Color-Tray">
          {showColorTray
            ? colors.map((color) => (
                <span
                  onClick={() => handleClick(color, id)}
                  style={{ backgroundColor: color }}
                  className="Color"
                ></span>
              ))
            : ""}
        </div>

        <textarea
          placeholder="make a note..."
          onChange={(e) => handleChange(e.target.value, id)}
          className="Note-Body"
          rows={12}
          value={body}
        />
        <div className="Note-Footer">
          {date}
          <FiTrash2 onClick={() => removeNote(id)} className="Note-Icon" />
        </div>
      </div>
    );
  }
}
export default Note;
