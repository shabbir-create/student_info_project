const express = require("express");
const db = require("../db");

const router = express.Router();
const { roll, tableSuffix } = db;

const studentsTable = `students_${tableSuffix}`;
const activitiesTable = `activities_${tableSuffix}`;
const subjectsTable = `Subject_${tableSuffix}`;

router.use((_req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

function validateActivity(req, res, next) {
  const { title, description, status, date } = req.body || {};
  if (
    typeof title !== "string" ||
    !title.trim() ||
    title.length > 120 ||
    typeof description !== "string" ||
    !description.trim() ||
    description.length > 4000 ||
    !["Planned", "In Progress", "Completed"].includes(status) ||
    typeof date !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !Number.isFinite(Date.parse(date)) ||
    new Date(date).toISOString().slice(0, 10) !== date
  ) {
    return res
      .status(400)
      .json({
        message: "Enter a title, description, valid date and activity status.",
      });
  }
  next();
}

router.get("/student", async (_req, res, next) => {
  try {
    const studentRows = await db.rows(
      `SELECT id, name, roll_number, course, email, city, school, year_of_passing, tenth_percentage,
              twelfth_percentage, college, cgpa, college_start_year, college_end_year
       FROM ${studentsTable} WHERE roll_number = ?`,
      [roll],
    );

    if (studentRows.length === 0) {
      return res.status(404).json({ message: "Student data not found." });
    }

    const subjectRows = await db.rows(
      `SELECT id, course_id, description, subject_name, date FROM ${subjectsTable} ORDER BY id ASC`,
    );

    return res.json({
      ...studentRows[0],
      subjects: subjectRows,
      storageNotice: db.storageNotice,
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/activities", async (_req, res, next) => {
  try {
    const rows = await db.rows(
      `SELECT id, title, description, status, date FROM ${activitiesTable} ORDER BY date DESC, id DESC`,
    );
    return res.json(rows);
  } catch (error) {
    return next(error);
  }
});

router.post("/activities", validateActivity, async (req, res, next) => {
  try {
    const { title, description, status, date } = req.body;

    const result = await db.write(
      `INSERT INTO ${activitiesTable} (title, description, status, date) VALUES (?, ?, ?, ?)`,
      [title, description, status, date],
    );

    return res
      .status(201)
      .json({ message: "Activity created.", id: result.insertId });
  } catch (error) {
    return next(error);
  }
});

router.put(
  "/activities/:id",
  validateActivity,
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const { title, description, status, date } = req.body;

      const result = await db.write(
        `UPDATE ${activitiesTable} SET title = ?, description = ?, status = ?, date = ? WHERE id = ?`,
        [title, description, status, date, id],
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Activity not found." });
      }

      return res.json({ message: "Activity updated." });
    } catch (error) {
      return next(error);
    }
  },
);

router.delete("/activities/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const result = await db.write(
      `DELETE FROM ${activitiesTable} WHERE id = ?`,
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Activity not found." });
    }

    return res.json({ message: "Activity deleted." });
  } catch (error) {
    return next(error);
  }
});

router.use((error, _req, res, _next) => {
  console.error("Portal database request failed", error.code || error.name);
  const unavailable = [
    "ENOTFOUND",
    "EAI_AGAIN",
    "ECONNREFUSED",
    "ETIMEDOUT",
    "PROTOCOL_CONNECTION_LOST",
  ];
  if (unavailable.includes(error.code)) {
    return res
      .status(503)
      .json({
        message:
          "The student database is unavailable. Please try again shortly.",
      });
  }
  return res
    .status(500)
    .json({ message: "The portal could not complete the database request." });
});

module.exports = router;
