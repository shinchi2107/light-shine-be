const { getAllCategories, createCategoryService, findCategory, updateCategoryService } = require("./category.service");
const { HTTPStatusCode } = require("@constants");
const { log } = require("@utils/logger/log");

const getCategories = async (req, res) => {
    try {
        const { page, limit, search } = req.query;
        const categories = await getAllCategories({ page: parseInt(page), limit: parseInt(limit), search });
        res.status(HTTPStatusCode.Ok).sendData({ ...categories });
    } catch (error) {
        log(error);
        res.status(HTTPStatusCode.BadRequest).sendData({ message: error.message });
    }
}

const createCategory = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const category = await createCategoryService(data);
        if (!category) {
            return res.status(HTTPStatusCode.BadRequest).sendData({ message: "Category not created" });
        }
        res.status(HTTPStatusCode.Created).sendData({ message: "Category created successfully" });
    } catch (error) {
        log(error);
        res.status(HTTPStatusCode.BadRequest).sendData({ message: error.message });
    }
}

const updateCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const category = await updateCategoryService({ _id: id }, data);
        res.status(HTTPStatusCode.Ok).sendData({ ...category });
    } catch (error) {
        log(error);
        res.status(HTTPStatusCode.BadRequest).sendData({ message: error.message });
    }
}

const findCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await findCategory({ _id: id });
        res.status(HTTPStatusCode.Ok).sendData({ ...category });
    } catch (error) {
        log(error);
        res.status(HTTPStatusCode.BadRequest).sendData({ message: error.message });
    }
}

module.exports = {
    getCategories,
    createCategory,
    updateCategoryById,
    findCategoryById
}