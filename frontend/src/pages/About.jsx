export default function About({ portalData: { studentName } }) {
  return (
    <section className="panel">
      <header className="page-heading">
        <p className="eyebrow">About the student</p>
        <h1>{studentName}</h1>
      </header>
      <article className="card reading">
        <h2>Interests</h2>
        <p>
          {studentName} enjoys designing interactive web interfaces, solving
          coding problems and experimenting with modern JavaScript frameworks.
          Outside academics, his hobbies include reading technology blogs,
          playing chess and sketching UI layouts.
        </p>
        <p>
          His academic interests include full-stack development, API design and
          building projects that connect frontend experiences with real backend
          data.
        </p>
      </article>
    </section>
  );
}
