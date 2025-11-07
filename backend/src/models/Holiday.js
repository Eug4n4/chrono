import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true }
});

const HolidaySchema = new mongoose.Schema({
    year: { type: String, required: true },
    countryCode: { type: String, required: true },
    holidays: [holidaySchema]
});

const Holiday = mongoose.model("Holiday", HolidaySchema);

export default Holiday;