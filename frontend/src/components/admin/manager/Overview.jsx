import { useEffect, useRef, useState } from "react";
import Header from "../header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faPersonArrowUpFromLine, faUsers } from "@fortawesome/free-solid-svg-icons";
import { getAllAccounts } from "../../../service/adminService";

const Overview = () => {
  const [accounts, setAccounts] = useState([]);
  const [total, setTotal] = useState(0);
  const [active, setActive] = useState(0);
  const [block, setBlock] = useState(0);


  const getAccounts = async () => {
    try {
      const res = await getAllAccounts();
      setTotal(res.total);
      setAccounts(res.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  useEffect(() => {
    getAccounts();
  }, []);

  useEffect(() => {
    let activeCount = 0;
    let blockCount = 0;

    accounts.forEach((item) => {
      if (item.status === 1) {
        activeCount++;
      } else {
        blockCount++;
      }
    });

    setActive(activeCount);
    setBlock(blockCount);
  }, [accounts]);

  return (
    <>
      <Header />
      <div className="p-6">
        <h2 className="font-bold py-4 text-2xl">Thống kê người dùng</h2>
        <div className="grid grid-cols-3 gap-6 bg-white p-6 rounded-lg shadow-lg">
          <div className="bg-[#FEEEF2] p-4 shadow-lg rounded-lg ">
            <FontAwesomeIcon icon={faUsers} className="bg-[#FA5A7C] p-2 rounded-full" />
            <h3 className="text-2xl font-bold">{total}</h3>
            <p className="text-gray-500 text-sm">Tổng số người dùng</p>
          </div>
          <div className="bg-[#DCFCE7] p-4 shadow-lg rounded-lg ">
            <FontAwesomeIcon icon={faPersonArrowUpFromLine} className="bg-[#3CD856] p-2 rounded-full" />
            <h3 className="text-2xl font-bold">{active}</h3>
            <p className="text-gray-500 text-sm">Người dùng hoạt động</p>
          </div>
          <div className="bg-[#F4E8FF] p-4 shadow-lg rounded-lg ">
            <FontAwesomeIcon icon={faLock} className="bg-[#C083FF] p-2 rounded-full" />
            <h3 className="text-2xl font-bold">{block}</h3>
            <p className="text-gray-500 text-sm">Người dùng bị khoá</p>
          </div>
        </div>

        <div className="mt-6">
          
        </div>
      </div>
    </>
  );
};

export default Overview;
