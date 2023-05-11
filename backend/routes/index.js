const express = require('express');
const router = express.Router();
const { getGoals, createGoal, updateGoal, deleteGoal } = require('../controller/controller');
const { body } = require('express-validator');

const validationRules = [
    body('text').isLength({ min: 1 }).withMessage('Goal text is required'),
];

router.route('/').get(getGoals).post(validationRules, createGoal)
router.route('/:id').put(updateGoal).delete(deleteGoal)

module.exports = router;