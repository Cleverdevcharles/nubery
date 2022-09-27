import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 320,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    content: {
      type: {},
      minlength: 200,
    },
    video: {},
    free_preview: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
)

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 320,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: {},
      required: true,
    },
    courseAchievement: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
    },
    image: {},
    category: [
      {
        type: ObjectId,
        ref: 'Category',
        required: true,
      },
    ],
    sold: {
      type: Number,
      default: 0,
    },
    subs: [
      {
        type: ObjectId,
        ref: 'Sub',
        required: true,
      },
    ],
    courseLevel: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    downloadableResourses: {
      type: String,
    },
    published: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: true,
    },
    instructor: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    lessons: [lessonSchema],
    reviews: [reviewSchema],
    ratings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: 'User' },
      },
    ],
    numOfReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
)

export default mongoose.model('Course', courseSchema)