import { model, Schema, Types, } from "mongoose";
var EventType;
(function (EventType) {
    EventType["in"] = "login";
    EventType["out"] = "logout";
})(EventType || (EventType = {}));
export const EventSchema = new Schema({
    timestamp: { type: Date, required: true },
    ip: { type: String, required: true },
    event_user: { type: Types.ObjectId, ref: 'Users' },
    type: { type: String, enum: EventType, required: true },
    time_total: { type: Number, required: false },
});
export const Events = model('Events', EventSchema);
