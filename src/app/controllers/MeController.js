const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");
class MeController {
  // [Get] /me/stored/courses
  storedCourses(req, res, next) {
    Promise.all([
      Course.find({}),
      Course.countDocumentsDeleted({ deletedAt: { $ne: null } }),
    ])
      .then(([courses, deletedCount]) => {
        res.render("me/stored-courses", {
          deletedCount,
          courses: mutipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }

  // [Get] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findWithDeleted({ deletedAt: { $ne: null } }) //$ne: Toán tử truy vấn "Not Equal"
      .then((courses) =>
        res.render("me/trash-courses", {
          courses: mutipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }
}
module.exports = new MeController();
