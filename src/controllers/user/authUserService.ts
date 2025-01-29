import user from "../../models/user";
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
         });

         const token = generateToken(newUser);

         const cookie = this.createCookie({token: token.token, expiresIn: token.expiresIn});

         return {user: newUser, token, cookie};
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

        const isPasswordMatching = await user.comparePassword(data.password);

        console.log("isPasswordMatching", isPasswordMatching);

        if(!isPasswordMatching){
            throw new Error('Invalid password');
        }

        const token = generateToken(user);

        return {user, token: token.token};

    }
}

export default AuthUserService;