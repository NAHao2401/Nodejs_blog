const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");
class MeController {
  // [Get] /me/stored/courses
  storedCourses(req, res, next) {
    let courseQuery = Course.find({});

    if ("_sort" in req.query) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type,
      });
    }

    Promise.all([
      courseQuery,
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

  // [Post] /courses/handle-form-actions
  handleFormStoreActions(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Course.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect("/me/stored/courses"))
          .catch(next);
        break;
      default:
        res.json({ message: "Action invalid" });
    }
  }
  handleFormTrashActions(req, res, next) {
    switch (req.body.action) {
      case "restore":
        Course.restore({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect("/me/trash/courses"))
          .catch(next);
        break;
      case "deleteForce":
        Course.deleteOne({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect("/me/trash/courses"))
          .catch(next);
        break;
      default:
        res.json({ message: "Action invalid" });
    }
  }
}
module.exports = new MeController();
