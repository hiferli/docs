import mongoose from 'mongoose'

const notepadSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true,
        default: 1 
    },
    
    text: {
        type: String,
        required: true,
    },

    timestamp: {
        type: String,
        required: true,
        default: new Date().toISOString().replace("T", " ").substring(0, 19)
    }
});

export default mongoose.model('Notepad', notepadSchema);