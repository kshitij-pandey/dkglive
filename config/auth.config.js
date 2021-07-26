const jwt = require('jsonwebtoken');
const Admin = require('../model/admin.model')

const auth = async (req, res, next) => {
    try {
        let token = req.cookies['x-access-token'];
        if (token) {
            const decode = jwt.verify(token, 'secret')
            const user = await Admin.findOne({ _id: decode.id })
            if (!user) {
                return res.redirect('/login');
            }
            req.token = token
            req.user = user
            next()
        } else {
            // cookie not found redirect to login 
            return res.redirect('/login');
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = auth;