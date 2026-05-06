"use client";

import { useEffect, useState } from "react";
import { Country, City } from "country-state-city";
import { u } from "motion/react-client";

type CityType = {
  name: string;
  countryCode: string;
  stateCode?: string;
};

export default function CountryCitySelector(
  {
    onSelect ,
    onReset,
    className
  }
  :
  {
    className?: string,
    onReset?: (country: "" , city: "") => void,
    onSelect: (data:{country_name: string , city_name: string}) => void
  }
) {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [cities, setCities] = useState<CityType[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");

  const countries = Country.getAllCountries();


 

  const handleCountryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);

    const cityList = City.getCitiesOfCountry(countryCode);
    setCities(cityList as CityType[]);
    setSelectedCity("");
  };


useEffect(() => {
  const selectedCountryObj = countries.find(
    (c) => c.isoCode === selectedCountry
  );

  const data = {
    country_name: selectedCountryObj?.name || "",
    city_name: selectedCity || "",
  };

  onSelect(data);
}, [selectedCity, selectedCountry]);


  return (
    <div className={`flex gap-2 w-full ${className}     `}>
      {/* Country Dropdown */}
      <select onChange={handleCountryChange} value={selectedCountry} className="border border-secondary/30 p-2 rounded-md w-full bg-secondary        ">
        <option value="">Select Country</option>
        {countries.map((c) => (
          <option key={c.isoCode} value={c.isoCode} className="hover:bg-brand/80! ">
            {c.name}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setSelectedCity(e.target.value)
        }
        value={selectedCity}
        disabled={!cities.length}
        className="border border-secondary/30 p-2 rounded-md  w-full  bg-secondary     "
      >
        <option value="">Select City</option>
        {cities.map((city, index) => (
          <option key={index} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
}