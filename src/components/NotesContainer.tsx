import "../styles/note.scss";
import { useState, useEffect } from "react";
import Note, { NoteProps } from "./Note";
import { v4 as uuidv4 } from "uuid";
import { DraggableEvent, DraggableData } from "react-draggable";
import date from "date-and-time";

function NotesContainer() {
  const [notesList, setNotesList] = useState<NoteProps[]>([]);

  const noteHandlers = {
    createNote,
    handleChange,
    changeColor,
    handleDrag,
    removeNote,
  };

  useEffect(() => {
    const notesLocalStorage: NoteProps[] = JSON.parse(
      localStorage.getItem("notes") || "[]"
    );
    if (notesLocalStorage.length) {
      setNotesList(notesLocalStorage);
    } else {
      createNote();
    }
  }, []);

  function createNote(color?: string) {
    const now = new Date();
    const note: NoteProps = {
      id: uuidv4(),
      body: "",
      color: color || "#ffff00",
      ...noteHandlers,
      x: 0,
      y: 0,
      date: date.format(now, "MMM/DD/YYYY"),
    };

    setNotesList((prev) => {
      const newNotesList = [...prev, note];
      localStorage.setItem("notes", JSON.stringify(newNotesList));
      return newNotesList;
    });
  }

  function handleDrag(e: DraggableEvent, data: DraggableData, id: string) {
    const note = notesList.find((note) => note.id === id);
    console.log(data);
    if (note) {
      setNotesList((prev) => {
        const newNotesList = prev.map((prevNote) => {
          if (prevNote.id === id) {
            return { ...prevNote, x: data.x, y: data.y };
          }
          return { ...prevNote };
        });

        localStorage.setItem("notes", JSON.stringify(newNotesList));
        return newNotesList;
      });
    }
  }

  function removeNote(id: string) {
    setNotesList((prev) => {
      const newNotesList = prev.filter((note) => note.id !== id);
      localStorage.setItem("notes", JSON.stringify(newNotesList));
      return newNotesList;
    });
  }

  function handleChange(body: string, id: string) {
    const note = notesList.find((note) => note.id === id);
    if (note) {
      setNotesList((prev) => {
        const newNotesList = prev.map((prevNote) => {
          if (prevNote.id === id) {
            return { ...prevNote, body };
          }
          return { ...prevNote };
        });

        localStorage.setItem("notes", JSON.stringify(newNotesList));
        return newNotesList;
      });
    }
  }

  function changeColor(color: string, id: string) {
    const note = notesList.find((note) => note.id === id);
    if (note) {
      setNotesList((prev) => {
        const newNotesList = prev.map((prevNote) => {
          if (prevNote.id === id) {
            return { ...prevNote, color };
          }
          return { ...prevNote };
        });
        localStorage.setItem("notes", JSON.stringify(newNotesList));
        return newNotesList;
      });
    }
  }
  return (
    <div className="Notes-Container">
      {/* <button onClick={createNote}>add new note</button> */}
      {notesList.map(({ id, body, color, x, y, date }) => (
        <Note
          //key={uuidv4()}
          id={id}
          body={body}
          color={color}
          x={x}
          y={y}
          date={date}
          {...noteHandlers}
        />
      ))}
    </div>
  );
}

export default NotesContainer;
