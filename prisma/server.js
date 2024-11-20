const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.use("/employees", require("./api/employees"));

app.get("/", (req, res) => {
    res.send("Welcome to the Prismatic Employees Api");
});

app.use((req, res, next) => {
    next({ status: 404, message: "Endpoint not found"});
});

app.use((err, req, res, next) => {
    console.error.apply(err);
    res.status(err.status ?? 500);
    res.json(err.message ?? "sorry, something went wrong :(");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});