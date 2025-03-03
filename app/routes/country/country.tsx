import { useParams } from "react-router";
import { useCountry } from "./useCountry";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import type { Route } from "./+types/country";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Learn about each country alone" },
    {
      name: "Check out country data ",
      content: "Welcome to the country data representation",
    },
  ];
}

export default function Country() {
  const { country } = useParams();
  const { countryData, isLoading, error } = useCountry(country as string);

  // Check if countryData is an array and get the first item
  const data = Array.isArray(countryData) ? countryData[0] : countryData;

  if (error) {
    return <div className="p-6 text-red-500">Error: {error.message}</div>;
  }

  if (!data && !isLoading) {
    return <div className="p-6">Country not found</div>;
  }

  return (
    <>
      <div className="p-6 grid grid-cols-1 place-items-center sm:place-items-stretch sm:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-gray-900">
            {isLoading ? (
              <Skeleton width={250} height={36} />
            ) : (
              data?.name?.common
            )}
          </h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Official Name:</span>{" "}
              {isLoading ? (
                <Skeleton inline width={220} />
              ) : (
                data?.name?.official
              )}
            </p>
            <p>
              <span className="font-semibold">Capital:</span>{" "}
              {isLoading ? (
                <Skeleton inline width={120} />
              ) : data?.capital && data.capital.length > 0 ? (
                data.capital[0]
              ) : (
                "N/A"
              )}
            </p>
            <p>
              <span className="font-semibold">Region:</span>{" "}
              {isLoading ? (
                <Skeleton inline width={100} />
              ) : (
                data?.region || "N/A"
              )}
            </p>
            <p>
              <span className="font-semibold">Subregion:</span>{" "}
              {isLoading ? (
                <Skeleton inline width={150} />
              ) : (
                data?.subregion || "N/A"
              )}
            </p>
            <p>
              <span className="font-semibold">Population:</span>{" "}
              {isLoading ? (
                <Skeleton inline width={130} />
              ) : data?.population ? (
                data.population.toLocaleString()
              ) : (
                "N/A"
              )}
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center">
          {isLoading ? (
            <div className="w-56 h-40 border rounded shadow-lg overflow-hidden">
              <Skeleton width="100%" height="100%" />
            </div>
          ) : data?.flags?.svg ? (
            <img
              src={data.flags.svg}
              alt={`Flag of ${data.name?.common}`}
              className="w-56 h-auto border rounded shadow-lg"
            />
          ) : (
            <div className="w-56 h-40 border rounded shadow-lg bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">Flag not available</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
