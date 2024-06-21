import { model, Schema } from "mongoose";
var Roles;
(function (Roles) {
    Roles["admin"] = "admin";
    Roles["man"] = "manager";
    Roles["sup"] = "supervisor";
    Roles["broker"] = "broker";
})(Roles || (Roles = {}));
export const UserSchema = new Schema({
    username: { type: String, required: true },
    passowrd: { type: String, required: true },
    role: { type: String, enum: Roles, default: Roles.broker },
});
export const Users = model('Users', UserSchema);
