const Loader = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
      style={{ zIndex: 9999 }}
    >
      <div className="container mx-auto  p-4 text-center">Loading...</div>
    </div>
  );
};

export default Loader;
