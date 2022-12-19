import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getStoredNotes } from "~/data/notes";

import styles from "~/styles/note-details.css";
import { Note } from "~/types/note";

const NoteDetailsPage = () => {
  const note = useLoaderData();

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all notes</Link>
        </nav>
        <h1>{note.title}</h1>
        <p id="note-details-content">{note.content}</p>
      </header>
    </main>
  );
};

export default NoteDetailsPage;

export const loader = async ({ params }: { [key: string]: any }) => {
  const notes = await getStoredNotes();

  const noteId = params.noteId;

  const selectedNote = notes.find((note: Note) => note.id === noteId);

  if (!selectedNote) {
    throw json(
      { message: "Could not find note with id " + noteId },
      { status: 404 }
    );
  }

  return selectedNote;
};

export const links = () => [{ rel: "stylesheet", href: styles }];
