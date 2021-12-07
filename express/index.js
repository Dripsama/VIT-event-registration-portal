const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./db.js");
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

//get

//user data
app.get("/userdata", async (req, res) => {
  var client = await pool.connect();
  try {
    const { regno } = req.query;
    const user = await client.query(
      "select regno, name, mobile_number from users where regno = ($1)",
      [regno]
    );
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
  } finally {
    client.release();
  }
  console.log("get query successful");
});

//all events
app.get("/events", async (req, res) => {
  var client = await pool.connect();
  try {
    const allEvents = await client.query("select * from events");
    res.json(allEvents.rows);
  } catch (err) {
    console.error(err.message);
  } finally {
    client.release();
  }
  console.log("get query successful");
});

//all users
app.get("/users", async (req, res) => {
  var client = await pool.connect();
  try {
    const allUsers = await client.query("select * from users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  } finally {
    client.release();
  }
  console.log("get query successful");
});

//all user_registers
app.get("/user_registers", async (req, res) => {
  var client = await pool.connect();
  try {
    const allUserRegister = await client.query("select * from user_register");
    res.json(allUserRegister.rows);
  } catch (err) {
    console.error(err.message);
  } finally {
    client.release();
  }
  console.log("get query successful");
});

//all associations
app.get("/associations", async (req, res) => {
  var client = await pool.connect();
  try {
    const allAsc = await client.query("select * from associations");
    res.json(allAsc.rows);
  } catch (err) {
    console.error(err.message);
  } finally {
    client.release();
  }
  console.log("get query successful");
});

//get registered events for user
app.get("/user/events", async (req, res) => {
  var client = await pool.connect();
  try {
    const { regno } = req.query;
    const query =
      "select *  " +
      "from user_register INNER JOIN events on (user_register.event_id)::integer = (events.event_id)::integer " +
      "where user_register.regno =($1)";
    const events = await client.query(query, [regno]);
    res.json(events.rows);
  } catch (err) {
    console.error(err.message);
  } finally {
    client.release();
  }
});

//events by association
app.get("/association/events", async (req, res) => {
  var client = await pool.connect();
  try {
    const { association } = req.query;
    const query = "select *  " + "from events " + "where association =($1)";
    const events = await client.query(query, [association]);
    res.json(events.rows);
  } catch (err) {
    console.error(err.message);
  } finally {
    client.release();
  }
});

//users registered for event
app.get("/register/events", async (req, res) => {
  var client = await pool.connect();
  try {
    const { event_id } = req.query;
    const query =
      "select users.regno, users.name, users.mobile_number " +
      "from user_register " +
      "INNER JOIN users on user_register.regno = users.regno " +
      "where (user_register.event_id)::integer = ($1) ";
    const events = await client.query(query, [event_id]);
    res.json(events.rows);
  } catch (err) {
    console.error(err.message);
  } finally {
    client.release();
  }
});

//association password authentication (true or false)
app.get("/auth_asc", async (req, res) => {
  var client = await pool.connect();
  try {
    const { association } = req.query;
    const { password } = req.query;
    const query =
      "SELECT asc_id FROM associations WHERE association = ($1)  AND password = crypt(($2), password); ";
    const auth = await client.query(query, [association, password]);
    res.json(auth.rows.length !== 0);
  } catch (err) {
    console.error(err.message);
  } finally {
    client.release();
  }
});

//user passAuth
app.get("/auth_user", async (req, res) => {
  var client = await pool.connect();
  try {
    const { regno } = req.query;
    const { password } = req.query;
    const query =
      "SELECT * FROM users WHERE regno = ($1)  AND password = crypt(($2), password); ";
    const auth = await client.query(query, [regno, password]);
    res.json(auth.rows.length !== 0);
  } catch (err) {
    console.error(err.message);
  } finally {
    client.release();
  }
});

//post

//add user_register
app.post("/adduser_register", async (req, res) => {
  var client = await pool.connect();
  try {
    const { event_id } = req.body;
    const { regno } = req.body;
    const newUserRegister = await client.query(
      "INSERT INTO user_register(event_id,regno) VALUES ($1, $2) RETURNING *",
      [event_id, regno]
    );
    res.json(newUserRegister.rows);
  } catch (err) {
    console.error(err.message);
  } finally {
    client.release();
  }
});

//add user
app.post("/adduser", async (req, res) => {
  var client = await pool.connect();
  try {
    const { regno } = req.body;
    const { name } = req.body;
    const { mobile_number } = req.body;
    const { password } = req.body;
    const newUser = await client.query(
      "INSERT INTO users(regno, name, mobile_number, password) VALUES ($1, $2, $3, crypt($4,gen_salt('bf', 4))) RETURNING *",
      [regno, name, mobile_number, password]
    );
    res.json(newUser.rows);
  } catch (err) {
    console.error(err.message);
  } finally {
    client.release();
  }
});

//add association
app.post("/addasc", async (req, res) => {
  var client = await pool.connect();
  try {
    const { association } = req.body;
    const { password } = req.body;
    const newAsc = await client.query(
      "INSERT INTO associations(association, password) VALUES ($1, crypt($2,gen_salt('bf', 4))) RETURNING *",
      [association, password]
    );
    res.json(newAsc.rows);
  } catch (err) {
    console.error(err.message);
  } finally {
    client.release();
  }
});

//add events
app.post("/addevent", async (req, res) => {
  var client = await pool.connect();
  try {
    const { title } = req.body;
    const { association } = req.body;
    const { start_date } = req.body;
    const { end_date } = req.body;
    const { time } = req.body;
    const { description } = req.body;
    const { venue } = req.body;
    const newEvent = await client.query(
      "INSERT INTO events(title, association, start_date, end_date, time, description, venue) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [title, association, start_date, end_date, time, description, venue]
    );
    res.json(newEvent.rows);
  } catch (err) {
    console.error(err.message);
  } finally {
    client.release();
  }
});

//runnning the app on port 4000
//npm run dev
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
