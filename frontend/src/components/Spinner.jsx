const Spinner = ({ size = "md" }) => {
  const sizes = { sm: "h-4 w-4", md: "h-8 w-8", lg: "h-12 w-12" };
  return (
    <div className="flex justify-center items-center py-8">
      <div className={`${sizes[size]} border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin`} />
    </div>
  );
};

export default Spinner;