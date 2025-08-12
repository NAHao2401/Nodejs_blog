const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const { engine: handlebars } = require("express-handlebars");

const SortMiddleware = require("./app/middlewares/sortMiddlewareX");
const app = express();
const port = 3000;

const route = require("./routes");

const db = require("./config/db");
db.connect();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(SortMiddleware);
//HTTP logger
app.use(morgan("combined"));

//Template engine
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    helpers: require("./helpers/handlebars"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

//Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
