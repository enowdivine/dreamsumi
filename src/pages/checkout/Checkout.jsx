import React, { useState } from "react";
import styles from "./Checkout.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Stripe from "../../components/stripe/Stripe";
import { Puff, ThreeCircles } from "react-loader-spinner";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [cost, setCost] = useState(0);

  const handlePrint = () => {};

  return (
    <div>
      <Navbar />
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          {loading ? (
            <div className={styles.Loader}>
              <h4
                style={{
                  marginTop: 30,
                  marginBottom: 30,
                }}
              >
                Processing print order...
              </h4>
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
            <>
              <div className={styles.form}>
                <h3>User Details</h3>
                <form>
                  <div className={styles.inputDiv}>
                    <label>Full Name</label>
                    <input type="text" placeholder="Full Name" />
                  </div>
                  <div className={styles.inputDiv}>
                    <label>Address 1</label>
                    <input type="text" placeholder="Address 2" />
                  </div>
                  <div className={styles.inputDiv}>
                    <label>Address 2</label>
                    <input type="text" placeholder="Address 2" />
                  </div>
                  <div className={styles.inputDiv2}>
                    <div>
                      <label>Country Code</label>
                      <input type="text" placeholder="Country Code" />
                    </div>
                    <div>
                      <label>Zip or Postal Code</label>
                      <input type="number" placeholder="e.g 123" />
                    </div>
                  </div>
                  <div className={styles.inputDiv}>
                    <label>Town or City</label>
                    <input type="text" placeholder="Town or City" />
                  </div>
                  <div className={styles.inputDiv}>
                    <label>State or Country</label>
                    <input type="text" placeholder="Country" />
                  </div>
                  <h3>Shipping Details</h3>
                  <div className={styles.inputDiv}>
                    <label>Copies</label>
                    <input type="number" placeholder="e.g 1" />
                  </div>
                  <div className={styles.inputDiv2}>
                    <div>
                      <label>Shipping Method</label>
                      <select>
                        <option value="Standard">Standard</option>
                        <option value="Express">Express</option>
                        <option value="Overnight">Overnight</option>
                        <option value="Budget">Budget</option>
                      </select>
                    </div>
                    <div>
                      <label>SKU</label>
                      <div className={styles.SKU}>GLOBAL-CFPM-A4</div>
                    </div>
                  </div>
                </form>
              </div>
              <div className={styles.stripe}>
                <div className={styles.striptContent}>
                  {quoteLoading ? (
                    <div className={styles.Loader}>
                      <Puff
                        height="40"
                        width="40"
                        color="#fff"
                        visible={true}
                      />
                    </div>
                  ) : (
                    <h3>Total: $ {cost}</h3>
                  )}
                  <Stripe
                    amount={cost}
                    handlePrint={handlePrint}
                    quoteLoading={quoteLoading}
                  />
                  <button type="submit">Test Prodigi</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
