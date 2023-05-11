const { validationResult } = require('express-validator');
//@desc    Get goals
//@route   GET /api/v1/goals
//@access  private
const getGoals = async (req, res) => {
    res.status(200).json({
        success: true,
        data: "get goals"
    })
};

//@desc    Create goal
//@route   POST /api/v1/goals
//@access  private
const createGoal = async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({ success: false, error: err.array() });
    }
    res.status(201).json({
        success: true,
        data: "ceate goals"
    })
};

//@desc    Update goal
//@route   PUT /api/v1/goals/:id
//@access  private
const updateGoal = async (req, res) => {
    res.status(200).json({
        success: true,
        data: `update goal ${req.params.id}`
    })
};

//@desc    Delete goal
//@route   DELETE /api/v1/goals/:id
//@access  private
const deleteGoal = async (req, res) => {
    res.status(200).json({
        success: true,
        data: `delete goal ${req.params.id}`
    })
};

module.exports = { getGoals, createGoal, updateGoal, deleteGoal };