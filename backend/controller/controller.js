const { validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

//@desc    Get goals
//@route   GET /api/v1/goals
//@access  private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        data: "get goals"
    })
});

//@desc    Create goal
//@route   POST /api/v1/goals
//@access  private
const createGoal = asyncHandler(async (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return next(new Error(err.array()[0].msg));
    }
    res.status(201).json({
        success: true,
        data: "ceate goals"
    })
});

//@desc    Update goal
//@route   PUT /api/v1/goals/:id
//@access  private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        data: `update goal ${req.params.id}`
    })
});

//@desc    Delete goal
//@route   DELETE /api/v1/goals/:id
//@access  private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        data: `delete goal ${req.params.id}`
    })
});

module.exports = { getGoals, createGoal, updateGoal, deleteGoal };