import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white dark:bg-black">
      <h2 className="text-6xl animate-spin text-primary_color">
        <FontAwesomeIcon icon={faSpinner} />
      </h2>
    </div>
  );
};

export default LoadingSkeleton;
