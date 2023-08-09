const { Schema, model } = require('mongoose');


const urlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true,
        unique: true
    },
    shortenedUrl: {
        type: String,
        required: true,
        unique: true
    },
    snowflakeId: {
        type: Number,
        required: true,
        unique: true
    }
},
    {
        timestamps: true
    }
);
urlSchema.index({ shortenedUrl: 1 });

const Url = model('Url', urlSchema);

module.exports = Url;