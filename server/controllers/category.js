import Category from '../models/category'
import Sub from '../models/sub'
import slugify from 'slugify'

export const create = async (req, res) => {
  try {
    const { name } = req.body
    const alreadyExist = await Category.findOne({
      slug: slugify(name),
    })
    if (alreadyExist) return res.status(400).send('Category already exits.')
    res.json(await new Category({ name, slug: slugify(name) }).save())
  } catch (err) {
    // console.log(err);
    res.status(400).send('Create category failed')
  }
}

export const list = async (req, res) => {
  res.json(await Category.find({}).sort({ createdAt: -1 }).exec())
}

export const read = async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec()
  // res.json(category);

  res.json({
    category,
  })
}

export const update = async (req, res) => {
  const { name } = req.body
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true },
    )
    res.json(updated)
  } catch (err) {
    res.status(400).send('Category update failed')
  }
}

export const remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug })
    res.json(deleted)
  } catch (err) {
    res.status(400).send('Category delete failed')
  }
}

export const getSubs = (req, res) => {
  Sub.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) console.log(err)
    res.json(subs)
  })
}
