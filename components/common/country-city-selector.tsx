"use client";

import { useEffect, useState } from "react";
import { Country, City } from "country-state-city";

type CityType = {
  name: string;
  countryCode: string;
  stateCode?: string;
};

export default function CountryCitySelector(
  {
    onSelect,
    onReset,
    className,
    initialCountry,
    initialCity
  }
  :
  {
    className?: string,
    onReset?: (country: "", city: "") => void,
    onSelect: (data: { country_name: string; city_name: string }) => void,
    initialCountry?: string,
    initialCity?: string
  }
) {
  const countries = Country.getAllCountries();

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [cities, setCities] = useState<CityType[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");

  useEffect(() => {
    if (initialCountry) {
      const country = countries.find(c => c.name === initialCountry || c.isoCode === initialCountry);
      if (country) {
        setSelectedCountry(country.isoCode);
        const cityList = City.getCitiesOfCountry(country.isoCode);
        setCities(cityList as CityType[]);
      }
    }
    if (initialCity) {
      setSelectedCity(initialCity);
    }
  }, [initialCountry, initialCity, countries]);

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