import React, { useState, useEffect } from "react";
import styles from "./Table.module.css";
import { useDispatch } from "react-redux";
import { getOrders } from "../../store/reducers/prodigi";
import { ThreeCircles } from "react-loader-spinner";
import { formatDate } from "../../helpers/formatDate";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function TableComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  const getOrdersHandler = async () => {
    try {
      setLoading(true);
      await dispatch(getOrders()).then((res) => {
        setOrders(res.payload.orders);
        setLoading(false);
        return;
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrdersHandler();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    let orderss = orders.filter((item) =>
      item.shipments[0]?.status
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setFilteredOrders(orderss);
    setCurrentPage(1);
  };

  // pagination logic
  useEffect(() => {
    setTotalPages(Math.ceil(orders?.length / itemsPerPage));
  }, [orders]);

  const listOfOrders = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const subset = orders?.slice(startIndex, endIndex);
    setData(subset);
  };

  useEffect(() => {
    listOfOrders();
  }, [orders]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  // end of pagination logic

  return (
    <div className={styles.tableContainer}>
      {loading ? (
        <div className={styles.loader}>
          <ThreeCircles
            height="100"
            width="100"
            color="#fff"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Filter by status..."
            className={styles.filterInput}
            value={searchTerm}
            onChange={handleSearch}
          />
          <table className={styles.table}>
            <thead>
              <tr>
                {/* <th>No</th> */}
                <th>Image</th>
                <th>Order</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Coplies</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {!searchTerm && data?.length > 0 ? (
                data.map((item, index) => {
                  return (
                    <tr
                      className={styles.rowEven}
                      key={index}
                      onClick={() => navigate(`/order/${item.id}`)}
                    >
                      {/* <td>{item.id}</td> */}
                      <td>
                        <img src={item?.items[0].thumbnailUrl} />
                      </td>
                      <td>{item.id}</td>
                      <td>{item?.recipient.name}</td>
                      <td>{formatDate(item.created)}</td>
                      <td>{item.items[0]?.copies}</td>
                      <td>$ {item.charges[0]?.totalCost.amount}</td>
                      <td
                        style={{
                          color:
                            item.shipments.length &&
                            item.shipments[0]?.status === "Shipped"
                              ? "green"
                              : "orange",
                        }}
                      >
                        {item.shipments[0]?.status || "In Production"}
                      </td>
                    </tr>
                  );
                })
              ) : searchTerm && filteredOrders?.length > 0 ? (
                filteredOrders.map((item, index) => {
                  return (
                    <tr
                      className={styles.rowEven}
                      key={index}
                      onClick={() => navigate(`/order/${item.id}`)}
                    >
                      {/* <td>{item.id}</td> */}
                      <td>
                        <img src={item?.items[0].thumbnailUrl} alt="" />
                      </td>
                      <td>{item.id}</td>
                      <td>{item?.recipient.name}</td>
                      <td>{item.created}</td>
                      <td>{item.items[0]?.copies}</td>
                      <td>$ {item.charges[0]?.totalCost.amount}</td>
                      <td
                        style={{
                          color:
                            item.shipments.length &&
                            item.shipments[0]?.status === "Shipped"
                              ? "green"
                              : "orange",
                        }}
                      >
                        {item.shipments[0]?.status || "In Production"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr style={{ textAlign: "center" }}>
                  <td
                    colSpan={8}
                    style={{ width: "100%", textAlign: "center" }}
                  >
                    No Orders Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className={styles.pagination}>
            <ReactPaginate
              pageCount={totalPages}
              onPageChange={handlePageChange}
              forcePage={currentPage}
              breakLabel={"..."}
              previousLabel={<FaChevronLeft color="white" />}
              nextLabel={<FaChevronRight color="white" />}
              containerClassName={"default-pagination"}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TableComponent;
