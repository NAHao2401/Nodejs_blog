const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const { engine: handlebars } = require("express-handlebars");

const SortMiddleware = require("./app/middlewares/SortMiddleware");
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
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : "default";

        const types = {
          default: "bi bi-chevron-expand",
          asc: "bi bi-sort-up",
          desc: "bi bi-sort-down",
        };

        const type = types[sort.type];
        const icon = types[sortType];

        return `<a href="?_sort&column=${field}&type=${sort.type === "desc" ? "asc" : "desc"}">
          <i class="${icon}"></i>
        </a>`;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

//Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
