const express = require('express');
const router = express.Router();
const { getGoals, createGoal, updateGoal, deleteGoal } = require('../controller/controller');
const { body } = require('express-validator');

const validationRules = [
    body('name').isLength({ min: 1 }).withMessage('Please enter goal name'),
    body('description').isLength({ min: 1 }).withMessage('Please enter goal description')
];

router.route('/').get(getGoals).post(validationRules, createGoal)
router.route('/:id').put(validationRules, updateGoal).delete(deleteGoal)

module.exports = router;