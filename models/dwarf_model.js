var mongoose = require('mongoose');

var DwarfSchema = new mongoose.Schema({
    foodLevel:{
        type: Number,
        required: true,
        default: 0
    },
    isAlive: {
        type: Boolean,
        required: true,
        default: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

var Dwarf = mongoose.model("Dwarf", DwarfSchema);

module.exports = {
    Dwarf: Dwarf
}