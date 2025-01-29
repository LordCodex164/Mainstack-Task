import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

export interface IUser extends Document {
  name: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true},
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
    return this.password;
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);