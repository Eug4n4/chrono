import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    refresh: String

})

const Token = mongoose.model("Token", TokenSchema)


export default Token;
