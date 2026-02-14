const User = require('../entities/User');
const UserSchema = require('../schemas/user.schema');

module.exports = (data) => new User(UserSchema.parse(data));
