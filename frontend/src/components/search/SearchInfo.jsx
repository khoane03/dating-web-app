import { useParams } from "react-router-dom";
import TinderSwipe from "../card/Tinder";

const SearchInfo = () => {
  const {id} = useParams();

  return (
    <div className="flex flex-col">
      <TinderSwipe posts_id={id} />
    </div>
  );
};
export default SearchInfo;