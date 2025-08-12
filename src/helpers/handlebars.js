const Handlebars = require("handlebars");
module.exports = {
  sum: (a, b) => a + b,
  sortable: (field, sort) => {
    const sortType = field === sort.column ? sort.type : "default";

    const types = {
      default: "bi bi-chevron-expand",
      asc: "bi bi-sort-up",
      desc: "bi bi-sort-down",
    };

    const icon = types[sortType];

    const address = Handlebars.escapeExpression(
      `?_sort&column=${field}&type=${sort.type === "desc" ? "asc" : "desc"}`
    );

    const output = `<a href="${address}">
          <i class="${icon}"></i>
        </a>`;
    return new Handlebars.SafeString(output);
  },
};
