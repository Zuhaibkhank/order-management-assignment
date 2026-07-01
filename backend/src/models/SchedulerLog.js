const mongoose = require("mongoose");

const schedulerLogSchema = new mongoose.Schema(
{
    executionTime:{
        type:Date,
        default:Date.now
    },

    totalOrdersChecked:{
        type:Number,
        default:0
    },

    totalOrdersUpdated:{
        type:Number,
        default:0
    },

    message:{
        type:String,
        default:"Scheduler Executed Successfully"
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model(
    "SchedulerLog",
    schedulerLogSchema
);