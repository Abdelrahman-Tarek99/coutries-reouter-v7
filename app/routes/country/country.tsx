import { useParams } from "react-router";
import { useCountry } from "./useCountry";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Country() {
  const { country } = useParams();
  const { countryData, isLoading, error } = useCountry(country as string);

  // Render skeleton UI while loading
  if (isLoading) {
    return (
      <div className="p-6 grid grid-cols-1 place-items-center sm:place-items-stretch sm:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          {/* Country name skeleton */}
          <h2 className="text-3xl font-bold text-gray-900">
            <Skeleton width={250} height={36} />
          </h2>

          {/* Details skeleton */}
          <div className="space-y-2 text-gray-700">
            {/* Official name */}
            <p>
              <span className="font-semibold">Official Name: </span>
              <Skeleton width={220} />
            </p>

            {/* Capital */}
            <p>
              <span className="font-semibold">Capital: </span>
              <Skeleton width={120} />
            </p>

            {/* Region */}
            <p>
              <span className="font-semibold">Region: </span>
              <Skeleton width={100} />
            </p>

            {/* Subregion */}
            <p>
              <span className="font-semibold">Subregion: </span>
              <Skeleton width={150} />
            </p>

            {/* Population */}
            <p>
              <span className="font-semibold">Population: </span>
              <Skeleton width={130} />
            </p>
          </div>
        </div>

        {/* Flag skeleton */}
        <div className="flex justify-center items-center">
          <div className="w-56 h-40 border rounded shadow-lg overflow-hidden">
            <Skeleton width="100%" height="100%" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error.message}</div>;
  }

  // Check if countryData is an array and get the first item
  const data = Array.isArray(countryData) ? countryData[0] : countryData;

  if (!data) {
    return <div className="p-6">Country not found</div>;
  }

  return (
    <div className="p-6 grid grid-cols-1 place-items-center sm:place-items-stretch sm:grid-cols-2 gap-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-gray-900">
          {data.name?.common}
        </h2>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Official Name:</span>{" "}
            {data.name?.official}
          </p>
          <p>
            <span className="font-semibold">Capital:</span>{" "}
            {data.capital && data.capital.length > 0 ? data.capital[0] : "N/A"}
          </p>
          <p>
            <span className="font-semibold">Region:</span>{" "}
            {data.region || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Subregion:</span>{" "}
            {data.subregion || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Population:</span>{" "}
            {data.population ? data.population.toLocaleString() : "N/A"}
          </p>
        </div>
      </div>
      {data.flags?.svg ? (
        <div className="flex justify-center items-center">
          <img
            src={data.flags.svg}
            alt={`Flag of ${data.name?.common}`}
            className="w-56 h-auto border rounded shadow-lg"
          />
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="w-56 h-40 border rounded shadow-lg bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">Flag not available</span>
          </div>
        </div>
      )}
    </div>
  );
}
