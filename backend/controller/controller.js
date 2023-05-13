const { validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Goal = require('../model/goalModel');
const express = require('express');
const { default: mongoose } = require('mongoose');
const { CustomError } = require('../middleware/errorMiddleware')

//@desc    Get goals
//@route   GET /api/goals
//@access  private
const getGoals = asyncHandler(async (req, res) => {
    const id = req.userId;
    const goals = await Goal.find({ user: id });
    if (!goals) {
        return res.status(404).json({
            success: false,
            data: 'No goals found'
        });
    } 
    res.status(200).json({
        success: true,
        data: goals
    })
});

//@desc    Create goal
//@route   POST /api/goals
//@access  private
const createGoal = asyncHandler(async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.status(400).json({
            success: false,
            data: err.array()[0].msg
        });
    }
    const id = req.userId;
    const { name, description} = req.body;
    const createdAt = Date.now();
    const goal = new Goal({ 
        name, 
        description, 
        user : id, 
        createdAt 
    });
    await goal.save();
    res.status(201).json({
        success: true,
        data: goal});
});

//@desc    Update goal
//@route   PUT /api/goals/:id
//@access  private
const updateGoal = asyncHandler(async (req, res, next) => {
    const err = validationResult(req);
    const user_id = req.userId;
    if (!err.isEmpty()) {
        return res.status(400).json({
            success: false,
            data: err.array()[0].msg
        });
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new CustomError(`No goal with id ${req.params.id}`, 404));
    }
    const { name, description } = req.body;
    const goal = await Goal.findOne({$and:[
        { user: user_id},
        {_id : req.params.id}
    ]});
    if (!goal) {
        return next(new CustomError(`No goal with id ${req.params.id}`, 404));
    } else {
        goal.name = name;
        goal.description = description;
        console.log(goal);
        await goal.save();
        res.status(200).json({
            success: true,
            data: goal
        })
    }
});

//@desc    Delete goal
//@route   DELETE /api/goals/:id
//@access  private
const deleteGoal = asyncHandler(async (req, res, next) => {
    const user_id = req.userId;
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new CustomError(`No goal with id ${req.params.id}`, 404));
    }
    const goal = await Goal.findOne({$and:[
        { user: user_id},
        {_id : req.params.id}
    ]});
    if (!goal) {
        return next(new CustomError(`No goal with id ${req.params.id}`, 404));
    } else {
        await Goal.deleteOne({ _id: req.params.id });
        }
        res.status(200).json({
            success: true,
            data: {message: `Goal with id ${req.params.id} deleted`}
        })
    });

module.exports = { getGoals, createGoal, updateGoal, deleteGoal };