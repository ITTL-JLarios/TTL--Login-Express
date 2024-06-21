import { model, Schema, Types } from "mongoose";
var Roles;
(function (Roles) {
    Roles["admin"] = "admin";
    Roles["man"] = "manager";
    Roles["sup"] = "supervisor";
    Roles["broker"] = "broker";
})(Roles || (Roles = {}));
var Status;
(function (Status) {
    Status["ready"] = "avilable";
    Status["noshow"] = "abscence";
    Status["party"] = "vacations";
})(Status || (Status = {}));
export const UserSchema = new Schema({
    username: { type: String, required: true },
    passowrd: { type: String, required: true },
    role: { type: String, enum: Roles, default: Roles.broker },
    status: { type: String, enum: Status, default: Status.ready },
    events: [{ type: Types.ObjectId, ref: 'Events' }],
});
export const Users = model('Users', UserSchema);
