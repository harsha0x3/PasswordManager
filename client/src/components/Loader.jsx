const Loader = ({ size = "md" }) => {
  const sizeClasses = {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  return (
    <div className="flex justify-center items-center py-4">
      <div
        className={`animate-spin rounded-full border-2 border-blue-500 border-t-transparent ${sizeClasses[size]}`}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
