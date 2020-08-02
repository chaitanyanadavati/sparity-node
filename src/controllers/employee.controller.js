"use strict";
const http_status = require('../utils/http-status-codes');
const { UsersModel } = require('../models');

module.exports = {
    getEmployees: async (req, res, next) => {
        const skip = +req.query.skip || 0,
            limit = +req.query.limit || 10;
        const search_string = req.query.search_string || undefined;
        let filter = {};
        if (search_string) {
            const search_query = {
                $or: [
                    { firstName: { $regex: search_string, $options: 'i' } },
                ]
            };
            filter = { ...filter, ...search_query };
        }
        try {
            const options = { skip, limit };
            const total = await UsersModel.countDocuments({});
            const employees = await UsersModel.find(filter, {}, options);
            const respObj = { skip, limit, total, employees };
            return res.status(http_status.OK).send(respObj);
        } catch (error) {
            return next(error);
        }
    }
};