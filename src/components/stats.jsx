import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsByStatsFilter } from "../redux/product/productApi";
import {
  getAllProductsByStatsFilterAsync,
  statsData,
  fetching,
} from "../redux/product/productSlice";

export default function Stats() {
  const [data, setData] = useState(3);
  const dispatch = useDispatch();
  const stats = useSelector(statsData);
  const isFetching = useSelector(fetching);
  const getAllStatsData = () => {
    try {
      dispatch(getAllProductsByStatsFilterAsync({ month: data }));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      getAllStatsData();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [data, 1000]);
  console.log(stats);
  return (
    <section className="w-full min-h-[100vh] flex justify-center pt-[6rem] ">
      <div className="w-[95%] flex ">
        {!isFetching ? (
          <>
            <div className="w-[80%] flex flex-col border-r-2 border-gray-500">
              <div className="flex justify-around">
                <div className="flex flex-col justify-center items-center">
                  <span className="font-semibold text-3xl">Total sale</span>
                  <span className="text-yellow-800 text-xl">
                    {stats.totalSaleAmount}
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <span className="font-semibold text-3xl">
                    Total sold items
                  </span>
                  <span className="text-yellow-800 text-xl">
                    {stats.totalSoldItems}
                  </span>
                </div>{" "}
                <div className="flex flex-col justify-center items-center">
                  <span className="font-semibold text-3xl">
                    Total not sold items
                  </span>
                  <span className="text-yellow-800 text-xl">
                    {" "}
                    {stats.totalNotSoldItems}
                  </span>
                </div>
              </div>
              <div></div>
            </div>
            <div className="flex justify-center w-[20%]">
              <div className="w-[10rem] h-max rounded-md border-black border-[1px] flex justify-center items-center">
                <select
                  onChange={(e) => setData(e.target.value)}
                  className="text-xl"
                  value={data}
                >
                  <option value={1}>January</option>
                  <option value={2}>February</option>
                  <option value={3}>March</option>
                  <option value={4}>April</option>
                  <option value={5}>May</option>
                  <option value={6}>June</option>
                  <option value={7}>July</option>
                  <option value={8}>Aguest</option>
                  <option value={9}>September</option>
                  <option value={10}>October</option>
                  <option value={11}>November</option>
                  <option value={12}>December</option>
                </select>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full flex items-center justify-center">
            <span className="text-2xl"> Loading....</span>
          </div>
        )}
      </div>
    </section>
  );
}
