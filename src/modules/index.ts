import { AuthModule } from "./auth/auth.module";
import { ModuleRoleModule } from "./module-role/module-role.module";
import { UserModule } from "./user/user.module";

const modules = [UserModule, AuthModule, ModuleRoleModule];

export default { modules };
