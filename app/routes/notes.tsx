import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { FC } from "react";

import NewNote, { links as newNoteLinks } from "~/components/NewNote/NewNote";
import NoteList, {
  links as noteListLinks,
} from "~/components/NoteList/NoteList";

import { getStoredNotes, storeNotes } from "~/data/notes";

const Notes: FC = () => {
  const notes = useLoaderData();

  console.log(notes);

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
};

export default Notes;

// Runs on the server / backend
export const loader = async () => {
  const notes = await getStoredNotes();

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
