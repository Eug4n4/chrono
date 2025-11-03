async function getCountryCode(name) {
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fields=cca2`);
    const data = await res.json();
    return data[0]?.cca2 || null;
}

async function getHolidays(req, res) {
    const country = req.query.country;
    const year = req.query.year;
    const code = await getCountryCode(country);
    console.log(code);
    try {
        const response = await fetch(`https://api.11holidays.com/v1/holidays?country=${code}&year=${year}`);
        const data = await response.json();
        return res.json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'no holidays found'});
    }
}

export {getHolidays};