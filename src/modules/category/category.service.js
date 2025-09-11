const Category = require("@models/Category");

const findCategory = async (query, exclude = "") => {
    const category = await Category.findOne({
        ...query
    }).select("-__v " + exclude).lean();
    if (!category) {
        throw new Error("Category not found");
    }
    return category;
}

const getAllCategories = async ({ page = 1, limit = 10, search = "" }) => {
    const skip = (page - 1) * limit;

    // create query
    const query = {};
    if (search) {
        query.$or = [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } }
        ];
    }

    const [categories, total] = await Promise.all([
        Category.find(query).lean().skip(skip).limit(limit),
        Category.countDocuments(query)
    ]).catch(err => {
        throw new Error(err);
    });

    return {
        categories,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasPrev: page > 1,
        hasNext: page < Math.ceil(total / limit)
    };
}

const createCategoryService = async ({ name, description, image = "" }) => {
    const category = await Category.findOne({ name });
    if (category) {
        throw new Error("Category already exists");
    }
    const newCategory = await Category.create({ name, description, image });
    return newCategory;
}

const updateCategoryService = async (search, data) => {
    const category = await Category.findOneAndUpdate(search, data, { new: true }).select("-__v").lean();
    if (!category) {
        throw new Error("Category not found");
    }
    return category;
}


module.exports = {
    getAllCategories,
    createCategoryService,
    findCategory,
    updateCategoryService
}