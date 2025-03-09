import { NavLink } from "react-router-dom";

const ListMatched = ({ id, avatar_url, full_name }) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            <NavLink
                to={`/chat/${id}`}
                className="mt-2 rounded-lg shadow-lg w-25 h-30 bg-cover bg-center border border-pink-300 flex items-end"
                style={{ backgroundImage: `url(${avatar_url})` }}
            >
                <h1 className="font-bold text-white bg-black/50 px-2 rounded">{full_name}</h1>
            </NavLink>
        </div>
    );
};

export default ListMatched;
