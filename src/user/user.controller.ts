import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Utilisateur')
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
    ) { }

    @Get()
    async getAllActiveUsers() {
        const users = await this.userService.findAllActiveUsers();

        return {
            status: HttpStatus.OK,
            data: users,
            message: "Liste des utilisateurs actifs"
        }
    }


    @Get('all-users')
    async getAllUsers() {
        const users = await this.userService.findAllUsers();
        return {
            status: HttpStatus.OK,
            message: "Liste des utilisateurs (Actifs & non Actifs) ",
            data: users
        }
    }


    @Get(':id')
    async findOneActiveUser(@Param('id') id: string) {

        const user = await this.userService.findOneActiveUser(id)

        return {
            status: HttpStatus.OK,
            data: user,
            message: `Utilisateur avec l'id ${id} récupéré avec succès`
        }
    }

    @Get('force/:id')
    async findOneUser(@Param('id') id: string) {

        const user = await this.userService.findOneUser(id)

        return {
            status: HttpStatus.OK,
            data: user,
            message: `Utilisateur non actif avec l'id ${id} récupéré avec succès`
        }
    }

    @Post('create-user')
    async createUser(@Body() userDTO: CreateUserDTO) {
        try {
            const user = await this.userService.createUser(userDTO);
            return {
                status: HttpStatus.OK,
                data: user,
                message: "Compte utilisateur crée avec succès !"
            }
        } catch (e) {
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: e.errmsg
            }
        }
    }

    @Put('update/:id')
    async updateUser(
        @Param('id') id: string,
        @Body() userDTO: UpdateUserDTO
    ) {
        try {
            const user = await this.userService.updateUser(id, userDTO);
            return {
                status: HttpStatus.OK,
                data: user,
                message: "Mise à jour des infos utilisateur réussie !"
            }
        } catch (e) {
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: e.errmsg
            }
        }
    }

    @Get('activation/:id')
    async activeAccount(@Param('id') id: string) {
        try {
            const user = await this.userService.activeAccount(id)
            return {
                status: HttpStatus.OK,
                message: "Compte utilisateur activé avec succès !"
            }
        } catch (e) {
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: e.errmsg
            }
        }
    }

    @Delete('desactive/:id')
    async desactiveAccount(@Param('id') id: string) {
        try {
            const user = await this.userService.desactiveAccount(id)
            return {
                status: HttpStatus.OK,
                data: user,
                message: "Compte utilisateur desactivé avec succès !"
            }
        } catch (e) {
            return {
                status: HttpStatus.OK,
                message: e.errmsg
            }
        }
    }

}
