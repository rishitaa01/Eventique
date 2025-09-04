// app/[event]/create/page.tsx

import { useParams } from "next/navigation";

export default function CreateEventPage() {
  const params = useParams();

  return (
    <main>
      <h1>Create a new {params.event} Event</h1>
      <form>
        <label>
          Title:
          <input type="text" name="title" />
        </label>
        <br />
        <label>
          Details:
          <textarea name="details" />
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </main>
  );
}
