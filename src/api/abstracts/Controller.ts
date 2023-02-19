import { Router } from "express";

abstract class Controller {
  public router: Router;
  public mainRoute: string;
  public initializeRoutes() {}

  constructor(mainRoute: string) {
    this.mainRoute = mainRoute;
    this.router = Router();
  }
}

export default Controller;
