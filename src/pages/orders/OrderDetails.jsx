import React, { useEffect, useState } from "react";
import styles from "./Orders.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOrder } from "../../store/reducers/prodigi";
import { formatDate } from "../../helpers/formatDate";
import { ThreeCircles } from "react-loader-spinner";
import { GrShare } from "react-icons/gr";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSingleOrder = async () => {
    setLoading(true);
    await dispatch(getOrder(id)).then((res) => {
      setOrder(res.payload.order);
      setLoading(false);
    });
  };

  useEffect(() => {
    getSingleOrder();
  }, [id]);
  return (
    <div>
      <Navbar />
      <div className={styles.wrapper}>
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
          <div className={styles.content}>
            <h3>Order {order?.id?.slice(4, 15)}</h3>
            <p>
              <span
                style={{
                  color:
                    order?.shipments?.length &&
                    order?.shipments[0]?.status === "Shipped"
                      ? "green"
                      : "orange",
                }}
              >
                {order?.shipments[0]?.status}
              </span>{" "}
              - {order?.recipient?.name} - {formatDate(order?.created)}
            </p>
            <div className={styles.details}>
              <div className={styles.leftDetails}>
                <p className={styles.shippingHeader}>
                  <p>
                    Shipment 1 of {order?.shipments?.length}{" "}
                    <small>{order?.shipments[0]?.id}</small>
                  </p>
                  <a href={order?.shipments[0]?.tracking?.url} target="_blank">
                    <span style={{ marginRight: 7 }}>Track</span> <GrShare />
                  </a>
                </p>
                <div className={styles.shippingDetails}>
                  <div>
                    <p>
                      {order?.shipments[0]?.dispatchDate
                        ? "Shipped" +
                          formatDate(order?.shipments[0]?.dispatchDate) +
                          "from UK"
                        : order?.shipments[0]?.status + " Order"}
                    </p>
                    <p>{order?.shipments[0]?.carrier?.service}</p>
                  </div>
                  <div>
                    <p>
                      Shipping cost ${order?.charges[0]?.items[0]?.cost?.amount}
                    </p>
                    <p>{order?.shipments[0]?.tracking?.number}</p>
                  </div>
                </div>
                <div className={styles.imageSection}>
                  <div>
                    <img
                      src={
                        order?.items[0]?.thumbnailUrl ||
                        "/assets/demo/dreamsumi.jpeg"
                      }
                    />
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Cost</th>
                        <th>Qty</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {order?.items[0]?.recipientCost?.amount /
                            order?.items[0]?.copies}
                        </td>
                        <td>{order?.items[0]?.copies}</td>
                        <td>{order?.items[0]?.recipientCost?.amount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className={styles.summary}>
                  <p className={styles.otherHeaders}>Summary</p>
                  <div>
                    <p>Name: {order?.recipient?.name}</p>
                    <p>Address: {order?.recipient?.address?.line1}</p>
                    <p> Order Referrence: {order?.metadata?.mycustomkey}</p>
                  </div>
                </div>
              </div>
              <div className={styles.rightDetails}>
                <p className={styles.otherHeaders}>Address</p>
                <div>
                  <p> {order?.recipient?.name}</p>
                  <p>{order?.recipient?.address?.line1}</p>
                  <p>{order?.recipient?.address?.line2}</p>
                  <p>{order?.recipient?.address?.townOrCity}</p>
                  <p>{order?.recipient?.address?.stateOrCounty}</p>
                  <p>{order?.recipient?.address?.postalOrZipCode}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
