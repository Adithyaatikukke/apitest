import React, { useEffect, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

import { useSelector, useDispatch } from "react-redux";
import {
  fetching,
  getAllProductsByFilterAsync,
  notFound,
  products,
} from "../redux/product/productSlice";
import { BeatLoader } from "react-spinners";

const Dashbord = () => {
  const allOrders = useSelector(products);
  const isFetching = useSelector(fetching);
  const noResultFound = useSelector(notFound);
  const dispatch = useDispatch();

  const [data, setData] = useState({ page: 1, month: 3, search: "" });
  const getAllProductsByFilter = () => {
    try {
      dispatch(getAllProductsByFilterAsync(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getAllProductsByFilter();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [data, 1000]);

  return (
    <section className="w-full pt-[5rem]  flex justify-center items-center">
      <div className="w-[70rem] flex-col gap-y-5  flex justify-center items-center">
        <div className="flex justify-between w-[100%]">
          <div className="w-[20rem]">
            <form class="max-w-md mx-auto">
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div class="relative">
                <div
                  onClick={() => setData({ ...data, serach: "" })}
                  class="absolute  cursor-pointer inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                >
                  <svg
                    class="w-4 h-4 cursor-pointer text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  onChange={(e) => setData({ ...data, search: e.target.value })}
                  value={data?.search}
                  type="search"
                  id="default-search"
                  class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search products by price, name..."
                  required
                />
              </div>
            </form>
          </div>
          <div className="w-[10rem] rounded-md border-black border-[1px] flex justify-center items-center">
            <select
              onChange={(e) => setData({ ...data, month: e.target.value })}
              className="text-xl"
              value={data.month}
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
        {!noResultFound && allOrders.length ? (
          <div className="  max-h-[60vh] overflow-auto">
            <table class="shadow-lg  bg-white">
              <tr className="">
                <th class="bg-blue-100 border text-left px-8 py-4">ID</th>
                <th class="bg-blue-100 border text-left px-8 py-4">Title</th>
                <th class="bg-blue-100 border text-left px-8 py-4">
                  Description
                </th>
                <th class="bg-blue-100 border text-left px-8 py-4">Price</th>
                <th class="bg-blue-100 border text-left px-8 py-4">Sold</th>
                <th class="bg-blue-100 border text-left px-8 py-4">Image</th>
              </tr>

              <>
                {allOrders?.length && !isFetching
                  ? allOrders?.map((order) => (
                      <>
                        <tr>
                          <td class="border px-8 py-4">{order.id}</td>
                          <td class="border px-8 py-4">
                            {order.title.slice(0, 20)}...
                          </td>
                          <td class="border px-8 py-4">
                            {order.description.slice(0, 20)}...
                          </td>
                          <td class="border px-8 py-4">{order.price}</td>
                          <td class="border px-8 py-4">
                            {order.sold ? "Sold" : ""}
                          </td>
                          <td class="border px-8 py-4">
                            {order.image.slice(0, 20)}...
                          </td>
                        </tr>
                      </>
                    ))
                  : [1, 2, 3, 4, 5, 6].map(() => (
                      <>
                        <tr>
                          <td class="border px-8 py-4">
                            {" "}
                            <BeatLoader color="#36d7b7" />
                          </td>
                          <td class="border px-8 py-4">
                            <BeatLoader color="#36d7b7" />
                          </td>
                          <td class="border px-8 py-4">
                            <BeatLoader color="#36d7b7" />
                          </td>
                          <td class="border px-8 py-4">
                            {" "}
                            <BeatLoader color="#36d7b7" />
                          </td>
                          <td class="border px-8 py-4">
                            <BeatLoader color="#36d7b7" />
                          </td>
                          <td class="border px-8 py-4">
                            <BeatLoader color="#36d7b7" />
                          </td>
                        </tr>
                      </>
                    ))}
              </>
            </table>
          </div>
        ) : (
          <div className="w-full font-semibold text-[1.5rem] flex justify-center items-center min-h-[23rem]">
            {isFetching ? (
              <span>Loading.... </span>
            ) : (
              <span>No result found! </span>
            )}
          </div>
        )}
        <div className="flex w-full justify-center items-center gap-x-5">
          <button
            onClick={() => setData({ ...data, page: data.page - 1 })}
            className={`h-[2.5rem] w-[6rem] rounded-md bg-blue-500 text-white ${
              data.page === 1 && "opacity-55"
            }`}
          >
            &#x2190; Prev
          </button>
          <button
            onClick={() => setData({ ...data, page: data.page + 1 })}
            className={`h-[2.5rem] w-[6rem] rounded-md bg-green-500 text-white ${
              allOrders.length < 10 && "opacity-55"
            }`}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Dashbord;
