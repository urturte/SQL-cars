const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db");

require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/getAllCars", async (req, res) => {
  try {
    const cars = await db.query("SELECT * FROM cars");
    console.log(cars.rows);

    return res.status(200).json({ cars: cars.rows });
  } catch (err) {
    res.status(500).json({ status: "Something went wrong" });
    console.log(err);
  }
});
app.get("/getCar/:id", async (req, res) => {
  try {
    const car = await db.query(`SELECT FROM cars WHERE Id=${req.params.id}`);
    console.log(car.rows);

    return res.status(200).json({ car: car.rows });
  } catch (err) {
    res.status(500).json({ status: "Something went wrong" });
    console.log(err);
  }
});

app.post("/insertCar", async (req, res) => {
  try {
    const car = await db.query(`INSERT INTO public.cars(
      title, image, price, numberplates)
      VALUES ('${req.body.title}', '${req.body.image}', ${req.body.price}, '${req.body.numberplates}')`);
    return res.status(200).json({ status: "Car was added successfully" });
  } catch (err) {
    console.log(err);
  }

  res.status(500).json({ status: "Something went wrong" });
});
app.delete("/deleteCar/:id", async (req, res) => {
  try {
    const car = await db.query(`DELETE FROM cars WHERE Id=${req.params.id}`);
    return res.status(200).json({ status: "Car was deleted successfully" });
  } catch (err) {
    console.log(err);
  }

  res.status(500).json({ status: "Something went wrong" });
});

// app.post("/insertProj", async (req, res) => {
//   try {
//     const proj = await db.query(`INSERT INTO public.project(
//         id, projectname, customername)
//         VALUES (${req.body.id}, '${req.body.projectName}', '${req.body.customerName}')`);
//     return res.status(200).json({ status: "Project inserted successfully" });
//   } catch (err) {
//     console.log(err);
//   }

//   res.status(500).json({ status: "Something went wrong" });
// });

// app.get("/getAllProjs", async (req, res) => {
//   try {
//     const proj = await db.query("SELECT * FROM project");
//     console.log(proj.rows);

//     return res.status(200).json({ project: proj.rows });
//   } catch (err) {
//     console.log(err);
//   }
// });
app.listen(3002, () => {
  console.log("Listed on port 3002");
});
