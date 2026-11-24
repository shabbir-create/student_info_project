import LoadStatus from "../LoadStatus";

function Academic({ portalData }) {
  const { studentResource } = portalData;
  const student = studentResource.data;

  return (
    <section className="panel">
      <h2>Academic Page</h2>
      <LoadStatus resource={studentResource} label="student details" />

      {student && (
        <article className="card">
          <h3>All Subjects ({student.subjects?.length || 0})</h3>
          <ul>
            {student.subjects?.map((subject) => (
              <li key={subject.id}>
                <strong>{subject.subject_name}</strong> - {subject.description}
              </li>
            ))}
          </ul>
        </article>
      )}
    </section>
  );
}

export default Academic;
