module.exports = {
    released_version:{
        type:Number,
        default:0
    },
    createdAt:{
        type: Date,
        default:Date.now()
    },
    deployedAt:{
        type: Date
    },
    exportable:{
        type:Boolean,
        default:true
    }
}