// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import Select from "react-select";
// import { Country, City } from "country-state-city";

// type Props = {
//   className?: string;
//   initialCountry?: string;
//   initialCity?: string;
//   resetSignal?: number;
//   onReset?: (country: "", city: "") => void;
//   onSelect: (data: {
//     country_name: string;
//     city_name: string;
//   }) => void;
// };

// type OptionType = {
//   value: string;
//   label: string;
// };

// export default function CountryCitySelector({
//   onSelect,
//   className = "",
//   initialCountry,
//   initialCity,
//   resetSignal,
// }: Props) {
//   const lastEmittedRef = useRef<{ country_name: string; city_name: string } | null>(null);
//   const countries = Country.getAllCountries();

//   const [selectedCountry, setSelectedCountry] = useState<OptionType | null>(
//     null
//   );

//   const [selectedCity, setSelectedCity] = useState<OptionType | null>(null);

//   const [cities, setCities] = useState<any[]>([]);

//   const countryOptions: OptionType[] = useMemo(
//     () =>
//       countries.map((country) => ({
//         value: country.isoCode,
//         label: country.name,
//       })),
//     [countries]
//   );

//   useEffect(() => {
//     if (!initialCountry) return;

//     const country = countries.find(
//       (c) =>
//         c.name === initialCountry ||
//         c.isoCode === initialCountry
//     );

//     if (!country) return;

//     const countryOption = {
//       value: country.isoCode,
//       label: country.name,
//     };

//     setSelectedCountry(countryOption);

//     const cityList =
//       City.getCitiesOfCountry(country.isoCode) || [];

//     setCities(cityList);

//     if (initialCity) {
//       setSelectedCity({
//         value: initialCity,
//         label: initialCity,
//       });
//     }
//   }, [initialCountry, initialCity]);

//   useEffect(() => {
//     if (resetSignal === undefined) return;
//     setSelectedCountry(null);
//     setSelectedCity(null);
//     setCities([]);
//     lastEmittedRef.current = null;
//   }, [resetSignal]);

//   const cityOptions: OptionType[] = useMemo(
//     () =>
//       cities.map((city) => ({
//         value: city.name,
//         label: city.name,
//       })),
//     [cities]
//   );

//   useEffect(() => {
//     const payload = {
//       country_name: selectedCountry?.label || "",
//       city_name: selectedCity?.label || "",
//     };

//     if (
//       lastEmittedRef.current?.country_name === payload.country_name &&
//       lastEmittedRef.current?.city_name === payload.city_name
//     ) {
//       return;
//     }

//     lastEmittedRef.current = payload;
//     onSelect(payload);
//   }, [selectedCountry, selectedCity, onSelect]);

//   const customStyles = {
//     control: (provided: any) => ({
//       ...provided,
//       minHeight: "44px",
//       borderRadius: "8px",
//       borderColor: "var(--color-secondary)",
//       boxShadow: "none",
//       backgroundColor: "transparent",
//       color: "#ffffff",
//       "&:hover": {
//         borderColor: "#9ca3af",
//       },
//     }),
//     menu: (provided: any) => ({
//       ...provided,
//       backgroundColor: "var(--color-secondary)",
//       zIndex: 9999,
//     }),
//     menuList: (provided: any) => ({
//       ...provided,
//       backgroundColor: "var(--color-secondary)",
//     }),
//     option: (provided: any, state: any) => ({
//       ...provided,
//       backgroundColor: state.isFocused || state.isSelected
//         ? "rgba(255, 255, 255, 0.15)"
//         : "var(--color-secondary)",
//       color: "#ffffff",
//       cursor: "pointer",
//     }),
//     singleValue: (provided: any) => ({
//       ...provided,
//       color: "#ffffff",
//     }),
//     input: (provided: any) => ({
//       ...provided,
//       color: "#ffffff",
//     }),
//     placeholder: (provided: any) => ({
//       ...provided,
//       color: "rgba(255, 255, 255, 0.75)",
//     }),
//     dropdownIndicator: (provided: any) => ({
//       ...provided,
//       color: "#ffffff",
//     }),
//     indicatorSeparator: (provided: any) => ({
//       ...provided,
//       backgroundColor: "rgba(255, 255, 255, 0.35)",
//     }),
//   };

//   return (
//     <div className={`flex w-full flex-col gap-3 md:flex-row ${className}`}>
//       {/* Country Searchable Select */}
//       <div className="w-full">
//         <Select
//           options={countryOptions}
//           value={selectedCountry}
//           placeholder="Search country..."
//           isSearchable
//           styles={customStyles}
//           onChange={(option) => {
//             const selected = option as OptionType | null;

//             setSelectedCountry(selected);
//             setSelectedCity(null);

//             if (!selected) {
//               setCities([]);
//               return;
//             }

//             const cityList =
//               City.getCitiesOfCountry(selected.value) || [];

//             setCities(cityList);
//           }}
//           className="w-full min-w-0"
//         />
//       </div>

//       {/* City Searchable Select */}
//       <div className="w-full">
//         <Select
//           options={cityOptions}
//           value={selectedCity}
//           placeholder="Search city..."
//           isSearchable
//           isDisabled={!selectedCountry}
//           styles={customStyles}
//           onChange={(option) => {
//             setSelectedCity(option as OptionType | null);
//           }}
//           className="w-full min-w-0"
//         />
//       </div>
//     </div>
//   );
// }

"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Select from "react-select"
import { Country, State, City } from "country-state-city"

type Props = {
  className?: string
  initialCountry?: string
  initialProvince?: string
  initialCity?: string
  resetSignal?: number
  onReset?: (country: "", province: "", city: "") => void
  onSelect: (data: {
    country_name: string
    province_name: string
    city_name: string
  }) => void
  showCountry?: boolean
  showProvince?: boolean
  showCity?: boolean
}

type OptionType = {
  value: string
  label: string
}

export default function CountryCitySelector({
  onSelect,
  className = "",
  initialCountry,
  initialProvince,
  initialCity,
  resetSignal,
  showCountry = true,
  showProvince = true,
  showCity = true,
}: Props) {
  const countries = Country.getAllCountries()

  const lastEmittedRef = useRef<{
    country_name: string
    province_name: string
    city_name: string
  } | null>(null)

  const [selectedCountry, setSelectedCountry] = useState<OptionType | null>(
    null
  )

  const [selectedProvince, setSelectedProvince] = useState<OptionType | null>(
    null
  )

  const [selectedCity, setSelectedCity] = useState<OptionType | null>(null)

  const [states, setStates] = useState<ReturnType<typeof State.getAllStates>>(
    []
  )

  const [cities, setCities] = useState<ReturnType<typeof City.getAllCities>>([])

  const countryOptions: OptionType[] = useMemo(
    () =>
      countries.map((country) => ({
        value: country.isoCode,
        label: country.name,
      })),
    [countries]
  )

  const stateOptions: OptionType[] = useMemo(
    () =>
      states.map((state) => ({
        value: state.isoCode,
        label: state.name,
      })),
    [states]
  )

  const cityOptions: OptionType[] = useMemo(
    () =>
      cities.map((city) => ({
        value: city.name,
        label: city.name,
      })),
    [cities]
  )

  /**
   * Initial Values
   */
  useEffect(() => {
    if (!initialCountry) return

    const country = countries.find(
      (c) => c.name === initialCountry || c.isoCode === initialCountry
    )

    if (!country) return

    const countryOption: OptionType = {
      value: country.isoCode,
      label: country.name,
    }

    setSelectedCountry(countryOption)

    const stateList = State.getStatesOfCountry(country.isoCode) || []

    setStates(stateList)

    if (initialProvince) {
      const state = stateList.find(
        (s) => s.name === initialProvince || s.isoCode === initialProvince
      )

      if (state) {
        const stateOption: OptionType = {
          value: state.isoCode,
          label: state.name,
        }

        setSelectedProvince(stateOption)

        const cityList =
          City.getCitiesOfState(country.isoCode, state.isoCode) || []

        setCities(cityList)

        if (initialCity) {
          setSelectedCity({
            value: initialCity,
            label: initialCity,
          })
        }
      }
    }
  }, [countries, initialCountry, initialProvince, initialCity])

  /**
   * Reset
   */
  useEffect(() => {
    if (resetSignal === undefined) return

    setSelectedCountry(null)
    setSelectedProvince(null)
    setSelectedCity(null)

    setStates([])
    setCities([])

    lastEmittedRef.current = null
  }, [resetSignal])

  /**
   * Emit selection
   */
  useEffect(() => {
    const payload = {
      country_name: selectedCountry?.label || "",
      province_name: selectedProvince?.label || "",
      city_name: selectedCity?.label || "",
    }

    if (
      lastEmittedRef.current?.country_name === payload.country_name &&
      lastEmittedRef.current?.province_name === payload.province_name &&
      lastEmittedRef.current?.city_name === payload.city_name
    ) {
      return
    }

    lastEmittedRef.current = payload

    onSelect(payload)
  }, [selectedCountry, selectedProvince, selectedCity, onSelect])

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
      backgroundColor:
        state.isFocused || state.isSelected
          ? "rgba(255,255,255,0.15)"
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
      color: "rgba(255,255,255,0.75)",
    }),

    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: "#ffffff",
    }),

    indicatorSeparator: (provided: any) => ({
      ...provided,
      backgroundColor: "rgba(255,255,255,0.35)",
    }),
  }

  return (
    <div className={`flex w-full flex-col gap-3 md:flex-row ${className}`}>
      {/* Country */}
      {showCountry ? (
        <div className="w-full">
          <Select
            options={countryOptions}
            value={selectedCountry}
            placeholder="Search country..."
            isSearchable
            styles={customStyles}
            onChange={(option) => {
              const selected = option as OptionType | null

              setSelectedCountry(selected)

              setSelectedProvince(null)
              setSelectedCity(null)

              if (!selected) {
                setStates([])
                setCities([])
                return
              }

              const stateList = State.getStatesOfCountry(selected.value) || []

              setStates(stateList)
              setCities([])
            }}
            className="w-full min-w-0"
          />
        </div>
      ) : null}

      {/* Province / State */}
      {showProvince ? (
        <div className="w-full">
          <Select
            options={stateOptions}
            value={selectedProvince}
            placeholder="Search province..."
            isSearchable
            isDisabled={!selectedCountry}
            styles={customStyles}
            onChange={(option) => {
              const selected = option as OptionType | null

              setSelectedProvince(selected)
              setSelectedCity(null)

              if (!selectedCountry || !selected) {
                setCities([])
                return
              }

              const cityList =
                City.getCitiesOfState(selectedCountry.value, selected.value) ||
                []

              setCities(cityList)
            }}
            className="w-full min-w-0"
          />
        </div>
      ) : null}

      {/* City */}
      {showCity ? (
        <div className="w-full">
          <Select
            options={cityOptions}
            value={selectedCity}
            placeholder="Search city..."
            isSearchable
            isDisabled={!selectedProvince}
            styles={customStyles}
            onChange={(option) => {
              setSelectedCity(option as OptionType | null)
            }}
            className="w-full min-w-0"
          />
        </div>
      ) : null}
    </div>
  )
}
