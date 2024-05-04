"use client";

import React, { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import { Data, Datum, IBoardingPass, IData } from "./types";
import Loader from "./components/Loader/Loader";
import BoardingPass from "./components/BoardingPass/BoardingPass";

const Home = (): React.ReactElement => {
  const [data, setData] = useState<Data | null>(null);
  const [selectedOrigin, setSelectedOrigin] = useState<string>("Algeria");
  const [selectedDestination, setSelectedDestination] =
    useState<string>("Angola");
  const [filteredDestinations, setFilteredDestinations] = useState<string[]>(
    []
  );
  const [boardingPasses, setBoardingPasses] = useState<IBoardingPass>({
    origin: "",
    destination: "",
  });

  const url = "https://api.first.org/data/v1/countries";

  const { data: fetchedData, error, loading } = useFetch<IData>(url);

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData.data);
    }
  }, [fetchedData]);

  useEffect(() => {
    if (data) {
      const destinations = Object.keys(data).map((key) => data[key].country);
      setFilteredDestinations(
        destinations.filter((destination) => destination !== selectedOrigin)
      );
    }
  }, [data, selectedOrigin]);

  const handleOriginChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOrigin(event.target.value);
  };

  const handleDestinationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDestination(event.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setBoardingPasses({
      origin: selectedOrigin,
      destination: selectedDestination,
    });
  };

  const clearBoardingPasses = () => {
    setBoardingPasses({
      origin: "",
      destination: "",
    });
  };

  let arr: Datum[] = [];

  if (data) {
    for (const property in data) {
      arr.push({
        country: data[property].country,
        region: data[property].region,
      });
    }
  }

  if (error) {
    console.log(error);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto  p-4 flex flex-col gap-[40px] max-w-[800px]">
      {!boardingPasses.destination ? (
        <form
          onSubmit={handleSubmit}
          className="md:flex md:justify-between gap-4 rounded-lg shadow-lg overflow-hidden p-5 "
        >
          <div className="md:w-1/2 mb-4 md:mb-0">
            <label htmlFor="Origin" className="block ">
              Origin
            </label>
            <select
              name="Origin"
              id="Origin"
              value={selectedOrigin}
              onChange={handleOriginChange}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            >
              {arr.map((item) => (
                <option key={item.country} value={item.country}>
                  {item.country}
                </option>
              ))}
            </select>
          </div>
          <div className="md:w-1/2 mb-4 md:mb-0">
            <label htmlFor="Destination" className="block">
              Destination
            </label>
            <select
              name="Destination"
              disabled={!selectedOrigin}
              value={selectedDestination}
              onChange={handleDestinationChange}
              id="Destination"
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            >
              {selectedOrigin &&
                filteredDestinations.map((destination) => (
                  <option key={destination} value={destination}>
                    {destination}
                  </option>
                ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2  rounded-md btn"
            disabled={!selectedOrigin}
          >
            Next
          </button>
        </form>
      ) : null}
      {boardingPasses.destination && (
        <>
          <BoardingPass
            origin={selectedOrigin}
            destination={selectedDestination}
          />
          <div className=" bg-white rounded-lg shadow-lg overflow-hidden p-4 flex align-center gap-4 justify-center items-center">
            <button
              className="bg-indigo-500 text-white px-4 py-2  rounded-md"
              onClick={clearBoardingPasses}
            >
              Previous
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
