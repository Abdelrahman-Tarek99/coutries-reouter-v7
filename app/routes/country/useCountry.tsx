import { useEffect, useState } from "react";
import { useCountryApi } from "~/services";
import type { Country } from "~/shared/types";

export const useCountry = (id: string) => {
  const { data: countryData, isLoading, error } = useCountryApi(id);

  return {
    countryData,
    isLoading,
    error,
  };
};
