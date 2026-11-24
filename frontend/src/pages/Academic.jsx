import { useState } from "react";
import LoadStatus from "../LoadStatus";

export default function Academic({ portalData: { studentResource } }) {
  const [query, setQuery] = useState("");
  const subjects = studentResource.data?.subjects || [];
  const visible = subjects.filter((s) =>
    (s.subject_name + " " + s.description)
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  return (
    <section className="panel">
      <header className="page-heading">
        <p className="eyebrow">Academic record</p>
        <h1>Subjects</h1>
      </header>
      <LoadStatus resource={studentResource} label="subjects" />
      {studentResource.data && (
        <>
          <div className="toolbar">
            <label className="search">
              Search subjects
              <input
                type="search"
                placeholder="Subject or topic"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <p>
              {visible.length} of {subjects.length} subjects
            </p>
          </div>
          <div className="subject-grid">
            {visible.map((s) => (
              <article key={s.id} className="subject-card">
                <small>Course {s.course_id}</small>
                <h2>{s.subject_name}</h2>
                <p>{s.description}</p>
                <time>{s.date}</time>
              </article>
            ))}
          </div>
          {!visible.length && <p>No subjects match your search.</p>}
        </>
      )}
    </section>
  );
}
