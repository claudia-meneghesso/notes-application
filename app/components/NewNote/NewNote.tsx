import { Form, useTransition } from "@remix-run/react";
import { FC } from "react";

import styles from "~/components/NewNote/NewNote.css";

const NewNote: FC = () => {
  const navigation = useTransition();

  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" action="/notes" id="note-form">
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5} required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>Add Note</button>
      </div>
    </Form>
  );
};

export default NewNote;

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
