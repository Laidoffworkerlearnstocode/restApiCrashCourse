const asyncHandler = require('express-async-handler');

const registerUser = asyncHandler(async (req, res) => {
    await res.send({
        message: 'Regiter User'
    })
})

module.exports = {
    registerUser
}