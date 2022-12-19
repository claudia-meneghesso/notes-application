import { Link } from "@remix-run/react";
import { FC } from "react";

import { Note } from "~/types/note";

import styles from "./NoteList.css";

type NoteListProps = {
  notes: Array<Note>;
};

const NoteList: FC<NoteListProps> = ({ notes }) => (
  <ul id="note-list">
    {notes.map(({ id, title, content }, index: number) => (
      <li key={id} className="note">
        <Link to={id}>
          <article>
            <header>
              <ul className="note-meta">
                <li>#{index + 1}</li>
                <li>
                  <time dateTime={id}>
                    {new Date(id).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </li>
              </ul>
              <h2>{title}</h2>
            </header>
            <p>{content}</p>
          </article>
        </Link>
      </li>
    ))}
  </ul>
);

export default NoteList;

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
