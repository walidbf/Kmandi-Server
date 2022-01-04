const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    fullName:{
        type: String,
        required: true
    },
    hash: { type: String, required: true},
    email: {type: String, required:true,unique: true},
    number:{type: String, required:true,unique: true},
    address: String,
    isVerified: { type: Boolean, default: false },
    verifCode: String,
    createdDate: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false},
    avatar: { type: String, default:"1639006969837-984058815-male_boy_person_people_avatar_icon_159358.png"}
});
schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('User',schema);
