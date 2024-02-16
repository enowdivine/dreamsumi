import React, { useState, useEffect } from "react";
import styles from "./Table.module.css";
import { useDispatch } from "react-redux";
import { getOrders } from "../../store/reducers/prodigi";
import { ThreeCircles } from "react-loader-spinner";

function TableComponent() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  console.log(orders);

  const getOrdersHandler = async () => {
    try {
      setLoading(true);
      await dispatch(getOrders()).then((res) => {
        console.log(res);
        setOrders(res.payload.orders);
        setLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getOrdersHandler();
  }, [getOrdersHandler]);
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
            placeholder="Filter..."
            className={styles.filterInput}
          />
          <table className={styles.table}>
            <thead>
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>Order</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Coples</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.rowEven}>
                <td>1</td>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
                <td>Data 4</td>
                <td>Data 5</td>
                <td>Data 6</td>
                <td>Data 7</td>
              </tr>
              <tr className={styles.rowOdd}>
                <td>2</td>
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
                <td>Data 10</td>
                <td>Data 11</td>
                <td>Data 12</td>
                <td>Data 13</td>
              </tr>
              <tr className={styles.rowEven}>
                <td>1</td>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
                <td>Data 4</td>
                <td>Data 5</td>
                <td>Data 6</td>
                <td>Data 7</td>
              </tr>
              <tr className={styles.rowOdd}>
                <td>2</td>
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
                <td>Data 10</td>
                <td>Data 11</td>
                <td>Data 12</td>
                <td>Data 13</td>
              </tr>{" "}
              <tr className={styles.rowEven}>
                <td>1</td>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
                <td>Data 4</td>
                <td>Data 5</td>
                <td>Data 6</td>
                <td>Data 7</td>
              </tr>
              <tr className={styles.rowOdd}>
                <td>2</td>
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
                <td>Data 10</td>
                <td>Data 11</td>
                <td>Data 12</td>
                <td>Data 13</td>
              </tr>{" "}
              <tr className={styles.rowEven}>
                <td>1</td>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
                <td>Data 4</td>
                <td>Data 5</td>
                <td>Data 6</td>
                <td>Data 7</td>
              </tr>
              <tr className={styles.rowOdd}>
                <td>2</td>
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
                <td>Data 10</td>
                <td>Data 11</td>
                <td>Data 12</td>
                <td>Data 13</td>
              </tr>{" "}
              <tr className={styles.rowEven}>
                <td>1</td>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
                <td>Data 4</td>
                <td>Data 5</td>
                <td>Data 6</td>
                <td>Data 7</td>
              </tr>
              <tr className={styles.rowOdd}>
                <td>2</td>
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
                <td>Data 10</td>
                <td>Data 11</td>
                <td>Data 12</td>
                <td>Data 13</td>
              </tr>{" "}
              <tr className={styles.rowEven}>
                <td>1</td>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
                <td>Data 4</td>
                <td>Data 5</td>
                <td>Data 6</td>
                <td>Data 7</td>
              </tr>
              <tr className={styles.rowOdd}>
                <td>2</td>
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
                <td>Data 10</td>
                <td>Data 11</td>
                <td>Data 12</td>
                <td>Data 13</td>
              </tr>{" "}
              <tr className={styles.rowEven}>
                <td>1</td>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
                <td>Data 4</td>
                <td>Data 5</td>
                <td>Data 6</td>
                <td>Data 7</td>
              </tr>
              <tr className={styles.rowOdd}>
                <td>2</td>
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
                <td>Data 10</td>
                <td>Data 11</td>
                <td>Data 12</td>
                <td>Data 13</td>
              </tr>{" "}
              <tr className={styles.rowEven}>
                <td>1</td>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
                <td>Data 4</td>
                <td>Data 5</td>
                <td>Data 6</td>
                <td>Data 7</td>
              </tr>
              <tr className={styles.rowOdd}>
                <td>2</td>
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
                <td>Data 10</td>
                <td>Data 11</td>
                <td>Data 12</td>
                <td>Data 13</td>
              </tr>{" "}
              <tr className={styles.rowEven}>
                <td>1</td>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
                <td>Data 4</td>
                <td>Data 5</td>
                <td>Data 6</td>
                <td>Data 7</td>
              </tr>
              <tr className={styles.rowOdd}>
                <td>2</td>
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
                <td>Data 10</td>
                <td>Data 11</td>
                <td>Data 12</td>
                <td>Data 13</td>
              </tr>{" "}
              <tr className={styles.rowEven}>
                <td>1</td>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
                <td>Data 4</td>
                <td>Data 5</td>
                <td>Data 6</td>
                <td>Data 7</td>
              </tr>
              <tr className={styles.rowOdd}>
                <td>2</td>
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
                <td>Data 10</td>
                <td>Data 11</td>
                <td>Data 12</td>
                <td>Data 13</td>
              </tr>{" "}
              <tr className={styles.rowEven}>
                <td>1</td>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
                <td>Data 4</td>
                <td>Data 5</td>
                <td>Data 6</td>
                <td>Data 7</td>
              </tr>
              <tr className={styles.rowOdd}>
                <td>2</td>
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
                <td>Data 10</td>
                <td>Data 11</td>
                <td>Data 12</td>
                <td>Data 13</td>
              </tr>{" "}
              <tr className={styles.rowEven}>
                <td>1</td>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
                <td>Data 4</td>
                <td>Data 5</td>
                <td>Data 6</td>
                <td>Data 7</td>
              </tr>
              <tr className={styles.rowOdd}>
                <td>2</td>
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
                <td>Data 10</td>
                <td>Data 11</td>
                <td>Data 12</td>
                <td>Data 13</td>
              </tr>{" "}
              <tr className={styles.rowEven}>
                <td>1</td>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
                <td>Data 4</td>
                <td>Data 5</td>
                <td>Data 6</td>
                <td>Data 7</td>
              </tr>
              <tr className={styles.rowOdd}>
                <td>2</td>
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
                <td>Data 10</td>
                <td>Data 11</td>
                <td>Data 12</td>
                <td>Data 13</td>
              </tr>{" "}
              <tr className={styles.rowEven}>
                <td>1</td>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
                <td>Data 4</td>
                <td>Data 5</td>
                <td>Data 6</td>
                <td>Data 7</td>
              </tr>
              <tr className={styles.rowOdd}>
                <td>2</td>
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
                <td>Data 10</td>
                <td>Data 11</td>
                <td>Data 12</td>
                <td>Data 13</td>
              </tr>{" "}
              <tr className={styles.rowEven}>
                <td>1</td>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
                <td>Data 4</td>
                <td>Data 5</td>
                <td>Data 6</td>
                <td>Data 7</td>
              </tr>
              <tr className={styles.rowOdd}>
                <td>2</td>
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
                <td>Data 10</td>
                <td>Data 11</td>
                <td>Data 12</td>
                <td>Data 13</td>
              </tr>{" "}
              <tr className={styles.rowEven}>
                <td>1</td>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
                <td>Data 4</td>
                <td>Data 5</td>
                <td>Data 6</td>
                <td>Data 7</td>
              </tr>
              <tr className={styles.rowOdd}>
                <td>2</td>
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
                <td>Data 10</td>
                <td>Data 11</td>
                <td>Data 12</td>
                <td>Data 13</td>
              </tr>{" "}
              <tr className={styles.rowEven}>
                <td>1</td>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
                <td>Data 4</td>
                <td>Data 5</td>
                <td>Data 6</td>
                <td>Data 7</td>
              </tr>
              <tr className={styles.rowOdd}>
                <td>2</td>
                <td>Data 7</td>
                <td>Data 8</td>
                <td>Data 9</td>
                <td>Data 10</td>
                <td>Data 11</td>
                <td>Data 12</td>
                <td>Data 13</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TableComponent;
