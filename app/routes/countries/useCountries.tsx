import { useEffect, useMemo, useState } from "react";
import { useCountriesApi } from "~/services";
import type { Country, SelectOption } from "~/shared/types";

export const useCountries = () => {
  const { data, isLoading, error } = useCountriesApi();
  const [search, setSearch] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<SelectOption | null>(
    null
  );
  const [filteredCountries, setFilteredCountries] = useState<Country[]>(
    data || []
  );

  // Format regions for select options
  const regionOptions = useMemo(() => {
    const uniqueRegions = Array.from(
      new Set(data?.map((country: Country) => country.region))
    );
    return [
      { label: "All Regions", value: "all" },
      ...uniqueRegions.map((region) => ({
        value: region,
        label: region,
      })),
    ];
  }, [data]);

  // Add this useEffect to handle filtering
  useEffect(() => {
    if (!data) return;
    else {
      let result = [...data];
      // Filter by search term
      if (search) {
        result = result.filter((country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Filter by region
      if (selectedRegion && selectedRegion.value !== "all") {
        result = result.filter(
          (country) => country.region === selectedRegion.value
        );
      }

      setFilteredCountries(result);
    }
  }, [search, selectedRegion, data]);

  return {
    search,
    setSearch,
    selectedRegion,
    setSelectedRegion,
    filteredCountries,
    regionOptions,
    data,
    isLoading,
    error,
  };
};
