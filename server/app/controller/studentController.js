const AppError = require("../utils/appError");
const StudentModel = require("../model/studenModel");

const StudentContoller = {
  async register(req, res, next) {
    const payload = req.body;

    // const { username, email, roles, password } = req.body;

    try {
      const user = new StudentModel({
        ...payload,
      });
      console.log("payload" + payload);
      const data = await user.save();
      console.log("data" + data);
      return res.status(200).json({ message: "okay" });
    } catch (error) {
      console.log(error);
      if (error.name === "MongoServerError" && error.code === 11000) {
        return next(new AppError("Student already exist", 404));
      }
      return next(error);
    }
  },

  async getAllStudent(req, res, next) {
    try {
      const limit = parseInt(req.query.limit.toString(), 10);

      const skip = limit * parseInt(req.query.page.toString(), 10);

      const queryRes = {};

      if (req.query.email) {
        queryRes["email"] = { $in: req.query.email };

        console.log(queryRes);
      }

      if (req.query.department) {
        queryRes["department"] = { $in: req.query.department };

        console.log(queryRes);
      }
      if (req.query.email) {
        query = { email: req.query.email };
      }

      for (key in req.query) {
        console.log(key + ":" + req.query[key]);
      }
      const data = await StudentModel.find(queryRes)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
      // const count = await  UserModel.find({ $and: queryRes }).count().exec();
      const count = await StudentModel.find(queryRes).count().exec();

      if (!data) {
        return next(new AppError("data not found", 401));
      }
      // const data = await UserModel.find();
      return res.status(200).json({ message: "All Student", data, count });
    } catch (error) {
      next(error);
    }
  },

  async getStudentById(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id);
      const data = await StudentModel.findById(id);
      return res.status(200).json({ message: "done", data });
    } catch (error) {
      return next(error);
    }
  },

  async updateStudent(req, res, next) {
    const payload = req.body;

    try {
        
      let data = await StudentModel.findOneAndUpdate({ _id: req.params.id }, payload, {
        new: true,
      });

      res.status(200).json({ message: "done", data });
    } catch (error) {
      next(error);

    }
  },

  async deleteStudent(req, res, next) {
    try {
    let data = await StudentModel.deleteOne({ _id: req.params.id });
      return res.status(200).json({ message: "deleted successfully" });
        
    } catch (error) {
      next(error);
        
    }
  }
};

module.exports = StudentContoller;
