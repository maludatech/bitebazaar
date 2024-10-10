import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Spinner = ({ otherStyles }: {otherStyles: string}) => {
  return (
    <FontAwesomeIcon icon={faSpinner} className={`text-lg text-primary_color animate-spin ${otherStyles}`} />
  );
};
