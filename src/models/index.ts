import { User } from "./entities/user.entity"; // Named export of User model

export * from "./entities/user.entity"; // Re-exports all named exports from user.entity

const Models = [User]; // Default export as an array of models

export default Models;
