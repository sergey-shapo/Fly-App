"use client";

import React, { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import { Data, IBoardingPass, IData } from "./types";
import Loader from "./components/Loader/Loader";
import BoardingPass from "./components/BoardingPass/BoardingPass";

const Home = (): React.ReactElement => {
  const url = "https://api.first.org/data/v1/countries";

  const [boardingPass, setBoardingPass] = useState<IBoardingPass | null>(null);
  const { data, error, loading } = useFetch<IData>(url);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleChange = (e: any) => {
    e.preventDefault();

    const { name, value } = e.target;
  };

  const clearBoardingPasses = () => {};

  if (error) {
    console.log(error);
  }

  if (loading) {
    return <Loader />;
  }
  const { data: dataObject } = data as IData;
  const dataKeys = Object.keys(dataObject);

  return (
    <div className="container mx-auto  p-4 flex flex-col gap-[40px] max-w-[800px]">
      <form
        onSubmit={handleSubmit}
        className="md:flex md:justify-between gap-4 rounded-lg shadow-lg overflow-hidden p-5 "
      >
        <div className="md:w-1/2 mb-4 md:mb-0">
          <label htmlFor="origin" className="block ">
            Origin
          </label>
          <select
            name="origin"
            id="origin"
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          >
            {dataKeys.map((key) => (
              <option key={key}>{dataObject[key].country}</option>
            ))}
          </select>
        </div>
        <div className="md:w-1/2 mb-4 md:mb-0">
          <label htmlFor="Destination" className="block">
            Destination
          </label>
          <select
            name="Destination"
            id="Destination"
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          >
            {dataKeys.map((key) => (
              <option key={key}>{dataObject[key].country}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2  rounded-md max-h-[40px] self-end align-self-end"
        >
          Next
        </button>
      </form>

      <>
        <div className=" bg-white rounded-lg shadow-lg overflow-hidden p-4 flex align-center gap-4 justify-center items-center">
          <button
            className="bg-indigo-500 text-white px-4 py-2  rounded-md"
            onClick={clearBoardingPasses}
          >
            Previous
          </button>
        </div>
      </>
    </div>
  );
};
1;

export default Home;
