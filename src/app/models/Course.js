const mongoose = require("mongoose");
const slugify = require("slugify");
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
