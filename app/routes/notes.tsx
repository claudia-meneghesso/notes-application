import { json, redirect } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import { FC } from "react";

import NewNote, { links as newNoteLinks } from "~/components/NewNote/NewNote";
import NoteList, {
  links as noteListLinks,
} from "~/components/NoteList/NoteList";

import { getStoredNotes, storeNotes } from "~/data/notes";

const Notes: FC = () => {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
};

export default Notes;

export const meta = () => {
  return {
    title: "All Notes",
    description: " Manage all your notes.",
  };
};

// Runs on the server / backend
export const CatchBoundary = () => {
  const caughtResponse = useCatch();

  const message = caughtResponse.data?.message || "Data not found.";

  return (
    <main>
      <NewNote />
      <p className="info-message">{message}</p>
    </main>
  );
};

export const loader = async () => {
  const notes = await getStoredNotes();

  if (!notes || notes.length === 0) {
    throw json(
      { message: "Could not find any notes." },
      {
        status: 404,
        statusText: "Not Found",
      }
    );
  }

  return notes;
};

export const action = async ({ request }: { [key: string]: any }) => {
  const formData = await request.formData();

  const noteData = Object.fromEntries(formData);

  const existingNotes = await getStoredNotes();

  noteData.id = new Date().toISOString();

  const updatedNotes = existingNotes.concat(noteData);

  await storeNotes(updatedNotes);

  return redirect("/notes");
};

export const links = () => [...newNoteLinks(), ...noteListLinks()];
