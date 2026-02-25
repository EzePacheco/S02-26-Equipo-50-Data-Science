import User from'../entities/User.js';
import UserSchema from'../schemas/user.schema.js';

export default (data) => new User(UserSchema.parse(data));
