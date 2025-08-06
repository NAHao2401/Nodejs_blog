const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");
class SiteController {
  // [Get] /home
  index(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render("home", { courses: mutipleMongooseToObject(courses) });
      })
      .catch(next);
  }

  // [Get] /search
  search(req, res) {
    res.render("search");
  }
}
module.exports = new SiteController();
