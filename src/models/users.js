import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "El nombre de usuario, es obligatorio"]
    },
    password: String
});

const User = mongoose.model('User', userSchema);

export default User;