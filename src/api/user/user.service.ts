import { PrismaClient, User } from "@prisma/client";

import Service from "../abstracts/Service";
import InternalServerError from "../errors/InternalServerError";
import asyncHandler from "../helpers/asyncHandler.helper";

class UserService extends Service {
  constructor(private prisma: PrismaClient) {
    super();
  }

  public async findAll() {
    const [users, error] = <[User[], any]>(
      await asyncHandler(this.prisma.user.findMany())
    );

    if (error) throw new InternalServerError(error.message);

    return users;
  }

  public async findOneById(id: string) {
    const [user, error] = <[User, any]>(
      await asyncHandler(this.prisma.user.findUnique({ where: { id } }))
    );

    if (error) throw new InternalServerError(error.message);

    return user;
  }

  public async findOneByUsername(username: string) {
    const [user, error] = <[User, any]>(
      await asyncHandler(this.prisma.user.findUnique({ where: { username } }))
    );

    if (error) throw new InternalServerError(error.message);

    return user;
  }
}

export default UserService;
