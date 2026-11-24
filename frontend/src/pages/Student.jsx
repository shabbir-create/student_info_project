import LoadStatus from "../LoadStatus";

export default function Student({ portalData: { studentResource } }) {
  const s = studentResource.data;
  return (
    <section className="panel">
      <header className="page-heading">
        <p className="eyebrow">Student record</p>
        <h1>Profile</h1>
      </header>
      <LoadStatus resource={studentResource} label="student details" />
      {s && (
        <div className="profile-grid">
          <article className="profile-cover">
            <span className="monogram">{s.name[0]}</span>
            <h2>{s.name}</h2>
            <p>{s.course}</p>
            <small>Roll {s.roll_number}</small>
          </article>
          <article className="card">
            <h2>Academic profile</h2>
            <dl className="facts">
              {[
                ["College", s.college],
                ["College tenure", `${s.college_start_year}–${s.college_end_year}`],
                ["CGPA", Number(s.cgpa).toFixed(2)],
                ["12th percentage", Number(s.twelfth_percentage) + "%"],
                ["School", s.school],
                ["City", s.city],
                ["Year of passing", s.year_of_passing],
                ["10th percentage", s.tenth_percentage + "%"],
                ["Email", s.email],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
      )}
    </section>
  );
}
