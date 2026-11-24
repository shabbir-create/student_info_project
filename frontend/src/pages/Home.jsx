import { useState } from "react";
import { Link } from "react-router-dom";
import LoadStatus from "../LoadStatus";
import { requestPortal } from "../api";
import { usePortalData } from "../usePortalData";

const statuses = ["Planned", "In Progress", "Completed"];
const emptyForm = { title: "", description: "", status: "Planned", date: "" };

function exportActivities(rows) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(rows, null, 2)], { type: "application/json" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "student-activities.json";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function Home({ portalData: { rollNumber, studentResource } }) {
  const student = studentResource.data;
  const path = `${rollNumber}/activities`;
  const activities = usePortalData(path);
  const rows = activities.data || [];
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const complete = rows.filter((a) => a.status === "Completed").length;
  const visible = rows.filter(
    (a) =>
      (filter === "All" || a.status === filter) &&
      (a.title + " " + a.description)
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  );

  async function save(method, id, payload, success) {
    setError("");
    setNotice("");
    setBusy(true);
    try {
      await requestPortal(id == null ? path : `${path}/${id}`, {
        method,
        headers: payload && { "Content-Type": "application/json" },
        body: payload && JSON.stringify(payload),
      });
      setForm(null);
      setDeleting(null);
      setNotice(success);
      if (method === "POST") {
        setFilter("All");
        setSearch("");
      }
      activities.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  function field(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <section className="panel">
      <header className="page-heading">
        <p className="eyebrow">
          Roll {rollNumber}
          {student && " · " + student.course}
        </p>
        <h1>{student ? `Hello, ${student.name}.` : "Your overview"}</h1>
      </header>
      <LoadStatus resource={studentResource} label="student details" />
      <div className="summary-grid">
        <Link className="summary subject-summary" to="/academic">
          <span>
            Subjects <b aria-hidden="true">↗</b>
          </span>
          <strong>{student?.subjects?.length ?? "—"}</strong>
          <small>View subject library</small>
        </Link>
        <div className="summary planned-summary">
          <span>In progress</span>
          <strong>
            {activities.data
              ? rows.filter((a) => a.status === "In Progress").length
              : "—"}
          </strong>
          <small>Activities underway</small>
        </div>
        <div className="summary completed-summary">
          <span>Completed</span>
          <strong>{activities.data ? complete : "—"}</strong>
          <progress
            aria-label="Activity completion"
            max={Math.max(rows.length, 1)}
            value={complete}
          />
        </div>
      </div>
      <section className="planner">
        <div className="planner-heading">
          <h2>Activity planner</h2>
          <div className="actions">
            <button
              className="secondary"
              disabled={!activities.data}
              onClick={() => exportActivities(rows)}
            >
              Export
            </button>
            <button
              disabled={busy}
              onClick={() => {
                setForm({ ...emptyForm });
                setDeleting(null);
                setError("");
                setNotice("");
              }}
            >
              + Add activity
            </button>
          </div>
        </div>
        {student?.storageNotice && (
          <p className="storage-note">{student.storageNotice}</p>
        )}
        {form && (
          <form
            className="editor form-stack"
            onSubmit={(e) => {
              e.preventDefault();
              save(
                form.id ? "PUT" : "POST",
                form.id,
                form,
                form.id ? "Activity updated." : "Activity added.",
              );
            }}
          >
            <h3>{form.id ? "Edit activity" : "New activity"}</h3>
            <label>
              Title
              <input
                autoFocus
                required
                maxLength="120"
                value={form.title}
                onChange={(e) => field("title", e.target.value)}
              />
            </label>
            <label>
              Description
              <textarea
                required
                maxLength="4000"
                value={form.description}
                onChange={(e) => field("description", e.target.value)}
              />
            </label>
            <div className="form-row">
              <label>
                Date
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => field("date", e.target.value)}
                />
              </label>
              <label>
                Status
                <select
                  value={form.status}
                  onChange={(e) => field("status", e.target.value)}
                >
                  {statuses.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="actions">
              <button disabled={busy} type="submit">
                {busy ? "Saving…" : "Save activity"}
              </button>
              <button
                type="button"
                disabled={busy}
                className="quiet"
                onClick={() => setForm(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <div role="status">{notice}</div>
        <div className="toolbar">
          <div className="filters" aria-label="Activity status">
            {["All", ...statuses].map((s) => (
              <button
                type="button"
                aria-pressed={s === filter}
                key={s}
                onClick={() => setFilter(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <input
            aria-label="Search activities"
            type="search"
            placeholder="Search activities"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <LoadStatus resource={activities} label="activities" />
        {activities.data && (
          <ul className="activity-list">
            {visible.map((a) => (
              <li className="activity-item" key={a.id}>
                <div className="activity-body">
                  <span
                    className={"status status-" + statuses.indexOf(a.status)}
                  >
                    {a.status}
                  </span>
                  <h3>{a.title}</h3>
                  <p>{a.description}</p>
                  <time>{a.date}</time>
                </div>
                <div className="row-actions">
                  {deleting === a.id ? (
                    <>
                      <span>Delete this activity?</span>
                      <button
                        className="danger"
                        disabled={busy}
                        onClick={() =>
                          save("DELETE", a.id, null, "Activity deleted.")
                        }
                      >
                        Confirm delete
                      </button>
                      <button
                        className="quiet"
                        disabled={busy}
                        onClick={() => setDeleting(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      {a.status !== "Completed" && (
                        <button
                          className="secondary"
                          disabled={busy || !!form}
                          onClick={() =>
                            save(
                              "PUT",
                              a.id,
                              { ...a, status: "Completed" },
                              "Activity completed.",
                            )
                          }
                        >
                          Mark complete
                        </button>
                      )}
                      <button
                        className="quiet"
                        disabled={busy}
                        onClick={() => {
                          setForm({ ...a });
                          setDeleting(null);
                          setNotice("");
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="quiet delete"
                        disabled={busy || !!form}
                        onClick={() => setDeleting(a.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        {activities.data && !visible.length && (
          <p>
            {rows.length
              ? "No activities match these filters."
              : "Your planner is empty. Add an activity to get started."}
          </p>
        )}
      </section>
    </section>
  );
}
