/*
	This file contains all the api endpoints that the admin requires.
	The acctual functions are defined in the file main.js
*/

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { Pool } = require("pg");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const funcs = require("../db-helpers/main.js");
const db = require("../db-helpers/const-local.js");

const pool = new Pool({
	user: db.user,
	host: db.host,
	database: db.database,
	password: db.password,
	port: db.port,
	ssl: db.ssl,
});

router.post("/addClass", async (req, res) => {
	const client = await pool.connect();
	funcs
		.addClasses(client, req.body.className, req.body.classId)
		.then((result) => {
			console.log(result.rows);
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send("Error adding subject");
		});
	client.release();
});
router.post("/editClass", async (req, res) => {
	const client = await pool.connect();
	funcs
		.editClass(
			client,
			req.body.oldClass,
			req.body.className,
			req.body.oldClassId,
			req.body.classId
		)
		.then((result) => {
			console.log(result.rows);
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send("Error adding subject");
		});
	client.release();
});

router.post("/addDepartment", async (req, res) => {
	console.log(req.body);
	const client = await pool.connect();
	funcs
		.addDepartments(client, req.body.departmentId, req.body.departmentName)
		.then((result) => {
			res.send("OK");
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send("Error adding subject");
		});
	client.release();
});
router.post("/addSubject", async (req, res) => {
	console.log(req.body);
	const client = await pool.connect();
	funcs
		.addSubjects(
			client,
			req.body.department_id,
			req.body.subject_name,
			req.body.subject_id,
			req.body.subject_type
		)
		.then((result) => {
			console.log(result.rows);
			res.send("OK");
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send("Error adding subject");
		});
	client.release();
});
router.post("/addTeacher", async (req, res) => {
	console.log(req.body);
	const client = await pool.connect();
	funcs
		.addTeachers(
			client,
			req.body.department_id,
			req.body.teacher_name,
			req.body.teacher_id
		)
		.then((result) => {
			res.send("OK");
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send("Error adding subject");
		});
	client.release();
});
router.post("/addAssignment", async (req, res) => {
	console.log(req.body);
	const client = await pool.connect();
	funcs
		.addAssignment(
			client,
			req.body.class_id,
			req.body.teacher_id,
			req.body.subject_id
		)
		.then((result) => {
			res.send("OK");
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send("Error adding subject");
		});
	client.release();
});
router.post("/addStudent", async (req, res) => {
	console.log(req.body);
	const client = await pool.connect();
	funcs
		.addStudents(
			client,
			req.body.department_id,
			req.body.student_name,
			req.body.student_id
		)
		.then((result) => {
			res.send("OK");
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send("Error adding subject");
		});
	client.release();
});
router.post("/addEnrollment", async (req, res) => {
	console.log(req.body);
	const client = await pool.connect();
	funcs
		.addEnrollment(client, req.body.class_id, req.body.student_id)
		.then((result) => {
			res.send("OK");
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send("Error adding subject");
		});
	client.release();
});

router.get("/getClass", async (req, res) => {
	const client = await pool.connect();
	funcs
		.getClass(client)
		.then((result) => {
			res.send(result.rows);
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send("Error adding subject");
		});
	client.release();
});
router.get("/getDepartments", async (req, res) => {
	const client = await pool.connect();
	funcs
		.getDepartments(client)
		.then((result) => {
			res.send(result.rows);
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send("Error adding subject");
		});
	client.release();
});
router.get("/getTeachers", async (req, res) => {
	const client = await pool.connect();
	funcs
		.getTeachers(client)
		.then((result) => {
			res.send(result.rows);
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send("Error adding subject");
		});
	client.release();
});
router.get("/getSubjects", async (req, res) => {
	const client = await pool.connect();
	funcs
		.getSubjects(client)
		.then((result) => {
			res.send(result.rows);
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send("Error adding subject");
		});
	client.release();
});
router.get("/getStudents", async (req, res) => {
	const client = await pool.connect();
	funcs
		.getStudents(client)
		.then((result) => {
			console.log(result.rows);
			res.send(result.rows);
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send("Error adding subject");
		});
	client.release();
});
module.exports = router;
