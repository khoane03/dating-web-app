import { faBell, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header() {
    return (
        <div className="flex justify-between items-center bg-white shadow-xl h-16 px-4 rounded-3xl">
            <div>

                <div className="bg-gray-100 flex items-center rounded-full cursor-pointer">
                    <input className="bg-transparent outline-none py-2 pl-4"
                        type="text" placeholder="Bạn muốn tìm gì?" />
                    <FontAwesomeIcon icon={faMagnifyingGlass}
                        className="text-gray-500 py-2 pr-4"
                    />
                </div>
            </div>
            <div className="flex gap-4 justify-center items-center">
                <img className="w-10 h-10 rounded-full"
                    src="https://cdn.pixabay.com/photo/2013/07/13/01/15/preferences-155386_1280.png" alt="" />
            </div>

        </div>
    );
}

export default Header;