const mongoose=require("mongoose")

const registrationSchema=mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type: String,
            required:true
        }
    },
    {
    timestamps:true
    }
)

const Registration=mongoose.model("Registration",registrationSchema)

module.exports= Registration