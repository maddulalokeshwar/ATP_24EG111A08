/*Product document structure
     a.productId (required)
     b.productName(required)
     c.price(required, min price 10000 and max price 50000)
     d.brand(required) */

import { Model, Schema,model } from "mongoose";
const productSchema=new Schema({
    productId:{
        type:Number,
        required:[true,"ProductId is a mandatory field"],
        unique:true
    },
    productName:{
        type:String,
        required:[true,"productName is a mandatory field"]
    },
    price:{
        type:Number,
        min:[10000,"The minimum price should be 10000"],
        max:[50000,"The maximum price should be 50000"]
    },
    brand:{
        type:String,
        required:[true,"The brand is a mandatory field"]
    }
},{
    versionKey:false,
    timestamps:true
})
export const productModel=new model("product",productSchema)