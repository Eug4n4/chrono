import { createSlice } from "@reduxjs/toolkit";
import { getCountryDataList } from "countries-list"

const countriesListSlice = createSlice({
    name: "countriesList",
    initialState: () => {
        return {
            countries: getCountryDataList().map(country => {
                return { value: country.iso2, label: country.name }
            })
        }
    }
})

export default countriesListSlice.reducer;