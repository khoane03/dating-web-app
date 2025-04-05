import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faPersonArrowUpFromLine, faUsers, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getAllAccounts, searchByKeyword } from "../../../service/adminService";
import ResultSearch from "./ResultSearch";

const Overview = () => {
  const [accounts, setAccounts] = useState([]);
  const [total, setTotal] = useState(0);
  const [active, setActive] = useState(0);
  const [block, setBlock] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [dataSearch, setDataSearch] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await getAllAccounts(1);
        setTotal(res.totalRecords);
        setAccounts(res.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    fetchAccounts();
  }, []);

  useEffect(() => {
    let activeCount = accounts.filter((item) => item.status === 1).length;
    let blockCount = accounts.length - activeCount;

    setActive(activeCount);
    setBlock(blockCount);
  }, [accounts]);

  const search = async () => {
    if (!keyword.trim()) {
      setIsSearch(false);
      return;
    }
    try {
      const res = await searchByKeyword(keyword);
      setDataSearch(res.data);
      setIsSearch(true);
    } catch (error) {
      console.error("Error searching accounts:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") search();
  };

  return (
    <>
      <div className="flex justify-between items-center bg-white shadow-xl h-16 mx-4 px-4 mt-2 rounded-3xl">
        <div className="bg-gray-100 flex items-center rounded-full cursor-pointer">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent outline-none py-2 pl-4"
            placeholder="Bạn muốn tìm gì?"
          />
          <FontAwesomeIcon
            onClick={search}
            icon={faMagnifyingGlass}
            className="text-gray-500 py-2 pr-4 cursor-pointer"
          />
        </div>
        <div className="flex gap-4 justify-center items-center">
          <img className="w-10 h-10 rounded-full"
            src="https://cdn.pixabay.com/photo/2013/07/13/01/15/preferences-155386_1280.png"
            alt="User avatar"
          />
        </div>
      </div>

      <div className="p-6">
        <h2 className="font-bold py-4 text-2xl">Thống kê người dùng</h2>
        <div className="grid grid-cols-3 gap-6 bg-white p-6 rounded-lg shadow-lg">
          <StatCard icon={faUsers} color="bg-[#FA5A7C]" bg="bg-[#FEEEF2]" count={total} label="Tổng số người dùng" />
          <StatCard icon={faPersonArrowUpFromLine} color="bg-[#3CD856]" bg="bg-[#DCFCE7]" count={active} label="Người dùng hoạt động" />
          <StatCard icon={faLock} color="bg-[#C083FF]" bg="bg-[#F4E8FF]" count={block} label="Người dùng bị khóa" />
        </div>

        {isSearch && <ResultSearch data={dataSearch} keyword={keyword} />}
      </div>
    </>
  );
};

const StatCard = ({ icon, color, bg, count, label }) => (
  <div className={`${bg} p-4 shadow-lg rounded-lg`}>
    <FontAwesomeIcon icon={icon} className={`${color} p-2 rounded-full`} />
    <h3 className="text-2xl font-bold">{count}</h3>
    <p className="text-gray-500 text-sm">{label}</p>
  </div>
);

export default Overview;
