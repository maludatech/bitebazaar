import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const cartIcon = () => {
  return (
    <div className="bg-secondary_color items-center justify-center flex">
        <FontAwesomeIcon icon={faCartShopping} className="text-primary_color"/>
    </div>
  )
}

export default cartIcon