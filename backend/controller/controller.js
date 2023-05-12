const { validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Goal = require('../model/goalModel');
const express = require('express');
const { default: mongoose } = require('mongoose');

//@desc    Get goals
//@route   GET /api/v1/goals
//@access  private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find();
    res.status(200).json({
        success: true,
        data: goals
    })
});

//@desc    Create goal
//@route   POST /api/v1/goals
//@access  private
const createGoal = asyncHandler(async (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.status(400).json({
            success: false,
            data: err.array()[0].msg
        });
    }
    const { name, description } = req.body;
    const createdAt = Date.now();
    const goal = new Goal({ name, description, createdAt });
    await goal.save();
    res.status(201).json({
        success: true,
        data: goal});
});

//@desc    Update goal
//@route   PUT /api/v1/goals/:id
//@access  private
const updateGoal = asyncHandler(async (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({
            success: false,
            data: err.array()[0].msg
        });
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(404);
        return next(new Error(`No goal with id ${req.params.id}`));
    }
    const { name, description } = req.body;
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        res.status(404);
        return next(new Error(`No goal with id ${req.params.id}`));
    } else {
        goal.name = name;
        goal.description = description;
        await goal.save();
        res.status(200).json({
            success: true,
            data: goal
        })
    }
});

//@desc    Delete goal
//@route   DELETE /api/v1/goals/:id
//@access  private
const deleteGoal = asyncHandler(async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(404);
        return next(new Error(`No goal with id ${req.params.id}`));
    }
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        res.status(404);
        return next(new Error(`No goal with id ${req.params.id}`));
    } else {
        await Goal.deleteOne({ _id: req.params.id });
        }
        res.status(200).json({
            success: true,
            data: {message: `Goal with id ${req.params.id} deleted`}
        })
    });

module.exports = { getGoals, createGoal, updateGoal, deleteGoal };