"use client";

import { useMemo, useState } from "react";
import Select from "react-select";
import { Country } from "country-state-city";

type OptionType = {
  value: string;
  label: string;
};

type Props = {
  className?: string;
  initialCountry?: string;
  onSelect: (data: {
    country_name: string;
    country_code: string;
  }) => void;
};

export default function CountryCodeSelector({
  className = "",
  initialCountry,
  onSelect,
}: Props) {
  const countries = Country.getAllCountries();

  const [selectedCountry, setSelectedCountry] =
    useState<OptionType | null>(null);

  /**
   * Options
   */
  const countryOptions: OptionType[] = useMemo(
    () =>
      countries.map((country) => ({
        value: country.isoCode,
        label: country.name,
      })),
    [countries]
  );

  /**
   * Initial value
   */
  useMemo(() => {
    if (!initialCountry) return;

    const country = countries.find(
      (c) =>
        c.name === initialCountry || c.isoCode === initialCountry
    );

    if (!country) return;

    setSelectedCountry({
      value: country.isoCode,
      label: country.name,
    });
  }, [initialCountry, countries]);

  /**
   * Styles (same as your original)
   */
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      minHeight: "44px",
      borderRadius: "8px",
      borderColor: "var(--color-secondary)",
      boxShadow: "none",
      backgroundColor: "transparent",
      color: "#ffffff",
    }),

    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "var(--color-secondary)",
      zIndex: 9999,
    }),

    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor:
        state.isFocused || state.isSelected
          ? "rgba(255,255,255,0.15)"
          : "var(--color-secondary)",
      color: "#fff",
    }),

    singleValue: (provided: any) => ({
      ...provided,
      color: "#fff",
    }),

    placeholder: (provided: any) => ({
      ...provided,
      color: "rgba(255,255,255,0.6)",
    }),

    input: (provided: any) => ({
      ...provided,
      color: "#fff",
    }),

    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: "#fff",
    }),
  };

  return (
    <div className={`w-full ${className}`}>
      <Select
        options={countryOptions}
        value={selectedCountry}
        placeholder="Select country..."
        isSearchable
        styles={customStyles}
        className="w-full"
        onChange={(option) => {
          const selected = option as OptionType | null;

          setSelectedCountry(selected);

          if (!selected) {
            onSelect({
              country_name: "",
              country_code: "",
            });
            return;
          }

          onSelect({
            country_name: selected.label,
            country_code: selected.value,
          });
        }}
      />
    </div>
  );
}