import { model, Schema, Types, } from "mongoose";

enum EventType {
    in = 'login',
    out = 'logout'
}

export interface IEvent {
    timestamp: Date;
    ip: string;
    event_user: Object;
    type: EventType;
    time_total?: number;
}

export const EventSchema = new Schema<IEvent>(
    {
        timestamp: { type: Date, required: true },
        ip: { type: String, required: true },
        event_user: {type: Types.ObjectId, ref: 'Users'},
        type: { type: String, enum: EventType, required: true},
        time_total: { type: Number, required: false },
    }
)

export const Events = model<IEvent>('Events', EventSchema)