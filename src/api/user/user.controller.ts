import { User, PrismaClient } from "@prisma/client";
import { Router, Request, Response, NextFunction } from "express";

import Controller from "../abstracts/Controller";

// User functionality
import UserService from "./user.service";
import { Id, IdSchema, LoginData, LoginSchema } from "./user.validation";

// Middleware
// such as // import validationMiddleware from "../middleware/validation.middleware";
// such as // import authMiddleware from "./../middleware/auth.middleware";
// such as // import permissionsMiddleware from "./../middleware/permissions.middleware";

// Helpers
import asyncHandler from "../helpers/asyncHandler.helper";
import { hashPassword, verifyPassword } from "../helpers/hashPassword.helper";
import { signToken } from "./../helpers/jwt.helper";
import logger from "./../helpers/logger.helper";

// Errors
import NotFoundError from "../errors/NotFoundError";
import ConflictError from "../errors/ConflictError";
import InternalServerError from "./../errors/InternalServerError";
import UnauthorizedError from "./../errors/UnauthorizedError";

class UserController extends Controller {
  public routes = {
    getAll: "",
    getOne: "/:id",
    createOne: "",
    updateOne: "/:id",
    deleteOne: "/:id",
    logout: "/:id/logout",
    login: "/login",
  };
  public router: Router;

  private service: UserService;
  private prisma: PrismaClient;

  constructor() {
    super("/users");

    this.router = Router();
    this.prisma = new PrismaClient();
    this.service = new UserService(this.prisma);

    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(
      this.routes.getAll,
      // authMiddleware,
      // permissionsMiddleware(),
      this.getAll_route
    );

    this.router.get(
      this.routes.getOne,
      // authMiddleware,
      // permissionsMiddleware(),
      // validationMiddleware(IdSchema),
      this.getOne_route
    );

    this.router.post(
      this.routes.login,
      // validationMiddleware(LoginSchema),
      this.login_route
    );
  }

  /**
   * @desc        Gets all users
   * @method      GET
   * @path        /users
   * @access      private
   */
  private getAll_route = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const [users, error] = <[User[], any]>(
      await asyncHandler(this.service.findAll())
    );

    if (error) return next(error);

    response.json({
      success: true,
      users,
    });
  };

  /**
   * @desc        Gets one user by id
   * @method      GET
   * @path        /users
   * @access      private
   */
  private getOne_route = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const { id } = <Id>request.params;

    const [user, error] = <[User, any]>(
      await asyncHandler(this.service.findOneById(id))
    );

    if (error) {
      next(error);
      return;
    }

    if (!user) return next(new NotFoundError(`There is no such a user`));

    response.json({
      success: true,
      user,
    });
  };

  /**
   * @desc        Logins a user
   * @method      POST
   * @path        /users/login
   * @access      public
   */
  private login_route = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const { username, password } = <LoginData>request.body;

    let [user, error] = await asyncHandler(
      this.service.findOneByUsername(username)
    );

    if (error) return next(error);

    if (!user)
      return next(
        new NotFoundError(
          `A user with the username of "${username}" does not exists`
        )
      );

    let _: boolean;
    [_, error] = <[boolean, any]>(
      await asyncHandler(verifyPassword(password, user.password))
    );

    if (error)
      return next(new UnauthorizedError("Incorrect username or password"));

    let token: string = "";
    [token, error] = <[string, any]>await asyncHandler(
      signToken(
        {
          username: user.username,
        },
        // : TODO: should be 15 minutes
        // : FIXME: fix using refresh token
        // 24h
        60 * 60 * 24
      )
    );

    if (error) return next(error);

    response.json({
      success: true,
      token,
    });
  };
}

export default UserController;
