import { IBoardingPass } from "@/app/types";

const BoardingPass = ({
  origin,
  destination,
}: IBoardingPass): React.ReactElement => {
  return (
    <div className=" bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-4 py-3 bg-blue-500 text-white">
        <h1 className="text-lg font-bold">Boarding pass</h1>
      </div>
      <div className="p-4">
        <span className="block text-md p-2">Origin: {origin}</span>
        <span className="block text-md p-2">Destination: {destination}</span>
      </div>
    </div>
  );
};

export default BoardingPass;
