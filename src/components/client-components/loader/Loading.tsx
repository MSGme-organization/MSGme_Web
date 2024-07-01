const Loading = ({ isLoading, children }) => {
  return (
    <>
      {children}
      {isLoading && (
        <div className="relative z-[1050] block">
          <div className="fixed top-0 left-0 bottom-0 z-[1055] right-0 bg-[#00000099] flex justify-center items-center overflow-hidden">
            <div className="loader-spinner" />
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
