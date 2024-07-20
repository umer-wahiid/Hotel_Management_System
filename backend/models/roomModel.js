import mongoose from 'mongoose';
const roomSchema = mongoose.Schema(
    {
        room: {
            type: String,
            required: true,
        },
        floor: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean
        },
    },
    {
        timestamps: true,
    }
);
export const Room = mongoose.model('Room', roomSchema);