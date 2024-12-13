import { UserController } from "./user/controllers/user.controller";
import { UserService } from "./user/services/user.service";
import { UserModule } from "./user/user.module";

const modules = [UserModule];
const controllers = [UserController];
const services = [UserService];

export default { modules, controllers, services };
