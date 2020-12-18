const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: Boolean, required: true },
    regDate: ({ type: String, required: true }),
    isBlocked: ({type: Boolean, required: true}),
    links: [{ type: Types.ObjectId, ref: 'Link' }],
    lastLoginDate: ({ type: String, required: true })
});

module.exports = model('User', schema);