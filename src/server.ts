import App from "./api";
import config from "./config";

import UserController from "./api/user/user.controller";

const app = new App([new UserController()], config.apiPort);

app.listen();
