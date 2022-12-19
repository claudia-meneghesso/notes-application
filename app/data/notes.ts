import fs from "fs/promises";
import { Note } from "~/types/note";

export const getStoredNotes = async () => {
  const rawFileContent = await fs.readFile("./database/notes.json", {
    encoding: "utf-8",
  });
  const data = JSON.parse(rawFileContent);
  const storedNotes = data.notes ?? [];
  return storedNotes;
};

export const storeNotes = (notes: Array<Note>) => {
  return fs.writeFile(
    "./database/notes.json",
    JSON.stringify({ notes: notes || [] })
  );
};
