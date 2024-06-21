import { model, Schema, Types } from "mongoose";

enum Roles {
    admin = 'admin',
    man = 'manager',
    sup = 'supervisor',
    broker = 'broker'
}

enum Status {
    ready = 'avilable',
    noshow = 'abscence',
    party = 'vacations',
}

export interface IUser {
    username: string;
    passowrd: string;
    role: Roles;
    status?: Status;
    events: Array<Object>;
}

export const UserSchema = new Schema<IUser>(
    {
        username: { type: String, required: true },
        passowrd: { type: String, required: true },
        role: { type: String, enum: Roles, default: Roles.broker },
        status: { type: String, enum: Status, default: Status.ready },
        events: [{ type: Types.ObjectId, ref: 'Events' }],
    }
)

export const Users = model<IUser>('Users', UserSchema)