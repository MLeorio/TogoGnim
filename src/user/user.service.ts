import { ConflictException, ForbiddenException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose'
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>
    ) { }

    async findAllUsers(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users;
    }

    async findAllActiveUsers(): Promise<User[]> {
        const users = await this.userModel.find({ active: true }).exec();
        return users;
    }

    async findOneUser(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();

        if (!user) {
            throw new NotFoundException(`Utilisateur avec l'id ${id} non trouvé`)
        }

        return user
    }

    async findOneActiveUser(id: string): Promise<User> {
        const user = await this.userModel.findOne({
            _id: id,
            active: true
        }).exec();
        if (!user) {
            throw new NotFoundException(`Utilisateur avec l'id ${id} non trouvé`)
        }
        return user
    }

    async createUser(user: CreateUserDTO): Promise<User> {
        if (user.password != user.password2) throw new ConflictException("Les mots de passes ne sont conformes !")
        const hash = await bcrypt.hash(user.password, 10);
        const createdUser = new this.userModel(user);
        createdUser.password = hash

        return await createdUser.save();
    }

    async updateUser(id: string, updateUser: UpdateUserDTO): Promise<User> {
        const user = await this.userModel.findOneAndUpdate(
            { _id: id, active: true },
            { $set: updateUser },
            { new: true }
        ).exec();

        if (!user) throw new NotFoundException("Utilisateur non trouvé ou non actif");

        return user;
    }

    async activeAccount(id: string): Promise<User> {
        const user = await this.userModel.findById(id);
        user.active = true;
        return await user.save();
    }

    async desactiveAccount(id: string): Promise<User> {
        const user = await this.userModel.findById(id);
        user.active = false;
        return await user.save();
    }
}
