import { Link } from "react-router";
import Select from "react-select";
import type { SelectOption } from "~/shared/types";
import { useCountries } from "./useCountries";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Countries() {
  const {
    search,
    setSearch,
    setSelectedRegion,
    filteredCountries,
    regionOptions,
    isLoading,
    error,
  } = useCountries();

  // Render the skeleton UI while loading
  if (isLoading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          <Skeleton width={150} />
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Skeleton height={42} className="w-full sm:w-1/2" />
          <Skeleton height={42} className="w-full sm:w-1/2" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Render multiple skeleton cards to match typical grid layout */}
          {Array(9)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow"
              >
                <Skeleton height={24} width="70%" />
                <div className="mt-1">
                  <Skeleton count={2} />
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (error)
    return <div className="p-6 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Countries</h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-6 ">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-1/2 focus:outline-none focus:border-indigo-500"
        />
        <Select
          options={regionOptions as SelectOption[]}
          onChange={(option) => setSelectedRegion(option)}
          placeholder="Filter by region..."
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-1/2 focus:outline-none focus:border-indigo-500  [&_.css-13cymwt-control]:!border-0 [&_.css-t3ipsp-control]:!border-0 [&_.css-t3ipsp-control]:!border-transparent"
        />
      </div>

      {filteredCountries?.length === 0 ? (
        <div>No countries match your filters.</div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCountries?.map((country) => (
            <li
              key={country.cca3}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <Link
                to={`/countries/${country.name.common}`}
                className="text-indigo-600 hover:underline text-lg font-semibold"
              >
                {country.name.common}
              </Link>
              <div className="text-gray-600 text-sm mt-1">
                Region: {country.region} <br />
                Population: {country.population.toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
