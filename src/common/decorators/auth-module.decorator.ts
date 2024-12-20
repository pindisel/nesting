import { SetMetadata } from "@nestjs/common";

export const ModuleName = (moduleName: string) =>
  SetMetadata("moduleName", moduleName);
