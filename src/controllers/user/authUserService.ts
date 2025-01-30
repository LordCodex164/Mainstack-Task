import user, { IUser } from "../../models/user";
import CreateUserDto from "./user.dto";
import bcrypt from 'bcryptjs';
import { generateToken } from '../../utils/jwt';
import TokenData from '../../interfaces/token.interface';
import WrongCredentialsException from '../../exceptions/WrongCredientialsException';
import UserNotFoundException from "../../exceptions/UserFoundException";
import UserWithThatEmailAlreadyExistsException from "../../exceptions/UserWithThatEmailAlreadyExistsException";

class AuthUserService {

    public userModel = user;

    public async register(userData: CreateUserDto){
    
    try{
       if(await this.userModel.findOne({email: userData.email})){
           throw new UserWithThatEmailAlreadyExistsException(userData.email);
       }

       const newUser = await this.userModel.create({
              ...userData,
         })

         let newUserObject: IUser;

         newUserObject = newUser.toObject();
         
         if (newUserObject) {
             delete newUserObject.password;
             delete newUserObject.__v;
             delete newUserObject._id;
         }


         const token = generateToken(newUser);

         const cookie = this.createCookie({token: token.token, expiresIn: token.expiresIn});

         return {user: newUserObject, token: token.token, cookie};
        }
        catch(err){
            throw new Error(err as unknown as string);
        }
    }

    private createCookie(tokenData: TokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }

    public async login(data:{email: string, password: string}){
        
        const user = await this.userModel.findOne({ email: data.email });

        if(!user){
            throw new UserNotFoundException(data.email);
        }

        let newUserObject: IUser;

        newUserObject = user.toObject();

        if (newUserObject) {
            delete newUserObject.password;
            delete newUserObject.__v;
            delete newUserObject._id;
        }

        const isPasswordMatching = await user.comparePassword(data.password);

        if(!isPasswordMatching){
            throw new Error('Invalid password');
        }

        const token = generateToken(user);

        return {newUserObject, token: token.token};

    }
}

export default AuthUserService;