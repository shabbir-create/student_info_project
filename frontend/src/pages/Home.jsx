import { useState } from "react";
import LoadStatus from "../LoadStatus";
import { requestPortal } from "../api";
import { usePortalData } from "../usePortalData";

const emptyForm = { title: "", description: "", status: "Planned", date: "" };

function Home({ portalData }) {
  const { rollNumber, studentResource } = portalData;
  const student = studentResource.data;
  const path = `${rollNumber}/activities`;
  const activities = usePortalData(path);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function changeActivity(method, id, body) {
    setSaving(true);
    setError("");
    try {
      await requestPortal(id == null ? path : `${path}/${id}`, {
        method,
        headers: body && { "Content-Type": "application/json" },
        body: body && JSON.stringify(body)
      });
      if (method === "POST") setForm(emptyForm);
      activities.reload();
    } catch (failure) {
      setError(failure.message);
    } finally {
      setSaving(false);
    }
  }

  function addActivity(event) {
    event.preventDefault();
    changeActivity("POST", null, form);
  }

  return (
    <section className="panel">
      <h2>Home Page</h2>
      <LoadStatus resource={studentResource} label="student details" />
      {error && <p className="error" role="alert">{error}</p>}

      {student && (
        <div className="card-grid">
          <article className="card">
            <h3>Basic Details</h3>
            <p>Name: {student.name}</p>
            <p>Roll Number: {student.roll_number}</p>
            <p>Course: {student.course}</p>
            <p>Email: {student.email}</p>
          </article>

          <article className="card">
            <h3>Subjects</h3>
            <ul>
              {student.subjects?.map((subject) => (
                <li key={subject.id}><strong>{subject.subject_name}</strong> - {subject.description}</li>
              ))}
            </ul>
          </article>
        </div>
      )}

      <div className="card-grid">
        <article className="card">
          <h3>Add Activity</h3>
          <form className="form-stack" onSubmit={addActivity}>
            <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Title" required />
            <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Description" required />
            <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>
              <option value="Planned">Planned</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} required />
            <button disabled={saving} type="submit">Add Activity</button>
          </form>
        </article>

        <article className="card">
          <h3>Activities</h3>
          <LoadStatus resource={activities} label="activities" />
          {!activities.loading && !activities.error && activities.data?.length === 0 && <p>No activities yet.</p>}
          <ul>
            {activities.data?.map((activity) => (
              <li key={activity.id} className="activity-item">
                <div>
                  <strong>{activity.title}</strong> ({activity.status}) - {activity.date}
                  <p>{activity.description}</p>
                </div>
                <button className="danger" type="button" disabled={saving} onClick={() => changeActivity("DELETE", activity.id)}>Delete</button>
                {activity.status !== "Completed" && (
                  <button type="button" disabled={saving} onClick={() => changeActivity("PUT", activity.id, { ...activity, status: "Completed" })}>Mark Completed</button>
                )}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

export default Home;

