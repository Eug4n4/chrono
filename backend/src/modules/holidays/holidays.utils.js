import Holiday from "../../db/models/Holiday.js";

async function getHolidayAPI(year, code) {
    const url = `https://api.11holidays.com/v1/holidays?country=${encodeURIComponent(code)}&year=${encodeURIComponent(year)}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
    }
    return await response.json();
}

async function getHolidaysForYear(year, code) {
    try {
        let holidays = await Holiday.findOne({ year: year, countryCode: code });
        if (!holidays) {
            const holidaysFromAPI = await getHolidayAPI(year, code);

            const holidaysToSave = holidaysFromAPI.map((holiday) => ({
                name: holiday.name,
                date: new Date(holiday.date),
            }));

            holidays = await Holiday.create({
                year: year,
                countryCode: code,
                holidays: holidaysToSave,
            });
        }
        return holidays;
    } catch (error) {
        console.error("Error fetching holidays:", error);
        throw error;
    }
}

export { getHolidaysForYear };