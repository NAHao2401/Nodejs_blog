const mongoose = require("mongoose");
const slugify = require("slugify");
const mongooseDelete = require("mongoose-delete");
const { Schema } = mongoose;

const CourseSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    image: String,
    slug: {
      type: String,
      slug: "name",
      required: true,
      unique: true,
      index: true,
    },
    videoId: { type: String, required: true },
    level: String,
  },
  { timestamps: true }
);
// Custom query helpers
CourseSchema.query.sortable = function (req) {
  if ("_sort" in req.query) {
    const isValidtype = ["asc", "desc"].includes(req.query.type);
    return this.sort({
      [req.query.column]: isValidtype ? req.query.type : "desc",
    });
  }
  return this;
};

// Add plugin
CourseSchema.plugin(mongooseDelete, {
  deletedAt: true, // có cột deletedAt
  overrideMethods: "all", // .find() tự ẩn doc đã xoá
});

// Tạo slug; nếu trùng thì thêm -<6 ký tự cuối của _id>
CourseSchema.pre("validate", async function () {
  if (!this.isModified("name") && this.slug) return;

  const base =
    slugify(this.name || "", { lower: true, strict: true, trim: true }) ||
    String(Date.now());
  let candidate = base;

  const dup = await this.constructor.exists({
    slug: candidate,
    _id: { $ne: this._id },
  });
  if (dup) {
    const suffix = this._id.toString().slice(-6);
    candidate = `${base}-${suffix}`;
    // Hiếm khi vẫn trùng thì thêm số đếm
    let i = 1;
    while (
      await this.constructor.exists({ slug: candidate, _id: { $ne: this._id } })
    ) {
      candidate = `${base}-${suffix}-${i++}`;
    }
  }

  this.slug = candidate;
});
module.exports = mongoose.model("Course", CourseSchema);
