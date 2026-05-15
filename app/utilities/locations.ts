import { City, Country } from "country-state-city";

export const COUNTRIES = Country.getAllCountries();
export const CITIES = City.getCitiesOfCountry("PK");

export const COUNTRIESLIST = COUNTRIES.map((country) => country.name);
export const CITIESLIST = CITIES?.map((city) => {
  return {
    label: city.name,
    value: city.name,
  };
});
