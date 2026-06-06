"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Select from "react-select";
import { Country, City } from "country-state-city";

type Props = {
  className?: string;
  initialCountry?: string;
  initialCity?: string;
  resetSignal?: number;
  onReset?: (country: "", city: "") => void;
  onSelect: (data: {
    country_name: string;
    city_name: string;
  }) => void;
};

type OptionType = {
  value: string;
  label: string;
};

export default function CountryCitySelector({
  onSelect,
  className = "",
  initialCountry,
  initialCity,
  resetSignal,
}: Props) {
  const lastEmittedRef = useRef<{ country_name: string; city_name: string } | null>(null);
  const countries = Country.getAllCountries();

  const [selectedCountry, setSelectedCountry] = useState<OptionType | null>(
    null
  );

  const [selectedCity, setSelectedCity] = useState<OptionType | null>(null);

  const [cities, setCities] = useState<any[]>([]);

  const countryOptions: OptionType[] = useMemo(
    () =>
      countries.map((country) => ({
        value: country.isoCode,
        label: country.name,
      })),
    [countries]
  );

  useEffect(() => {
    if (!initialCountry) return;

    const country = countries.find(
      (c) =>
        c.name === initialCountry ||
        c.isoCode === initialCountry
    );

    if (!country) return;

    const countryOption = {
      value: country.isoCode,
      label: country.name,
    };

    setSelectedCountry(countryOption);

    const cityList =
      City.getCitiesOfCountry(country.isoCode) || [];

    setCities(cityList);

    if (initialCity) {
      setSelectedCity({
        value: initialCity,
        label: initialCity,
      });
    }
  }, [initialCountry, initialCity]);

  useEffect(() => {
    if (resetSignal === undefined) return;
    setSelectedCountry(null);
    setSelectedCity(null);
    setCities([]);
    lastEmittedRef.current = null;
  }, [resetSignal]);

  const cityOptions: OptionType[] = useMemo(
    () =>
      cities.map((city) => ({
        value: city.name,
        label: city.name,
      })),
    [cities]
  );

  useEffect(() => {
    const payload = {
      country_name: selectedCountry?.label || "",
      city_name: selectedCity?.label || "",
    };

    if (
      lastEmittedRef.current?.country_name === payload.country_name &&
      lastEmittedRef.current?.city_name === payload.city_name
    ) {
      return;
    }

    lastEmittedRef.current = payload;
    onSelect(payload);
  }, [selectedCountry, selectedCity, onSelect]);

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      minHeight: "44px",
      borderRadius: "8px",
      borderColor: "var(--color-secondary)",
      boxShadow: "none",
      backgroundColor: "transparent",
      color: "#ffffff",
      "&:hover": {
        borderColor: "#9ca3af",
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "var(--color-secondary)",
      zIndex: 9999,
    }),
    menuList: (provided: any) => ({
      ...provided,
      backgroundColor: "var(--color-secondary)",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused || state.isSelected
        ? "rgba(255, 255, 255, 0.15)"
        : "var(--color-secondary)",
      color: "#ffffff",
      cursor: "pointer",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#ffffff",
    }),
    input: (provided: any) => ({
      ...provided,
      color: "#ffffff",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "rgba(255, 255, 255, 0.75)",
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: "#ffffff",
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      backgroundColor: "rgba(255, 255, 255, 0.35)",
    }),
  };

  return (
    <div className={`flex w-full flex-col gap-3 md:flex-row ${className}`}>
      {/* Country Searchable Select */}
      <div className="w-full">
        <Select
          options={countryOptions}
          value={selectedCountry}
          placeholder="Search country..."
          isSearchable
          styles={customStyles}
          onChange={(option) => {
            const selected = option as OptionType | null;

            setSelectedCountry(selected);
            setSelectedCity(null);

            if (!selected) {
              setCities([]);
              return;
            }

            const cityList =
              City.getCitiesOfCountry(selected.value) || [];

            setCities(cityList);
          }}
          className="w-full min-w-0"
        />
      </div>

      {/* City Searchable Select */}
      <div className="w-full">
        <Select
          options={cityOptions}
          value={selectedCity}
          placeholder="Search city..."
          isSearchable
          isDisabled={!selectedCountry}
          styles={customStyles}
          onChange={(option) => {
            setSelectedCity(option as OptionType | null);
          }}
          className="w-full min-w-0"
        />
      </div>
    </div>
  );
}