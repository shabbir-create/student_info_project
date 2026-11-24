import LoadStatus from "../LoadStatus";

function Student({ portalData }) {
  const { studentResource } = portalData;
  const student = studentResource.data;

  return (
    <section className="panel">
      <h2>Student Page</h2>
      <LoadStatus resource={studentResource} label="student details" />
      {student && (
        <div className="card-grid">
          <article className="card">
            <h3>Academic Profile</h3>
            <p>10th Percentage: {student.tenth_percentage}%</p>
            <p>City: {student.city}</p>
            <p>School: {student.school}</p>
            <p>Year of Passing: {student.year_of_passing}</p>
          </article>

          <article className="card">
            <h3>Extended Details</h3>
            <p>Course: {student.course}</p>
            <p>Email: {student.email}</p>
            <p>Roll Number: {student.roll_number}</p>
          </article>
        </div>
      )}
    </section>
  );
}

export default Student;
