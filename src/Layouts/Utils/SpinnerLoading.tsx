export const SpinnerLoading = () => {
  return (
    <div
      className="container m-5 d-flex justify-content-center"
      style={{ height: 550 }}
    >
      <div className="spinner-grow text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
