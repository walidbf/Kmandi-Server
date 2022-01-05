const expressJwt = require('express-jwt');
const config = require('config.json');
const path = require('path')
const userService = require(path.join(__dirname,'../users/user.service'));

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
            '/users/verify',
            /^\/users\/email\/.*/,
            /^\/users\/reset\/.*/
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};