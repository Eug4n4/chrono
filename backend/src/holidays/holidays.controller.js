import {getHolidaysForYear} from "../utils/holiday.db.is_present.js";

async function getHolidays(req, res) {
    const country = req.query.country;
    const year = req.query.year;
    try {
        const holidays = await getHolidaysForYear(year, country);
        return res.json(holidays);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'no holidays found'});
    }
}

export {getHolidays};