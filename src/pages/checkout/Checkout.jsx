import React, { useState, useEffect } from "react";
import styles from "./Checkout.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Stripe from "../../components/stripe/Stripe";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Puff, ThreeCircles } from "react-loader-spinner";
import { getQuote, printOrder } from "../../store/reducers/prodigi";
import { getPrice } from "../../store/reducers/strpe";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [name, setName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [shippingMethod, setShippingMethod] = useState("Standard");
  const [postalOrZipCode, setPostalOrZipCode] = useState("");
  const [sku, setSKU] = useState("");
  const [color, setColor] = useState("");
  const [stateOrCounty, setStateOrCounty] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [townOrCity, setTownOrCity] = useState("");
  const [copies, setCopies] = useState("1");
  const [sizing, setSizing] = useState("fillPrintArea");
  const [cost, setCost] = useState(0);
  const [image, setImage] = useState("");
  const [issues, setIssues] = useState(null);
  const [charge, setCharge] = useState(0);
  const [costSummary, setCostSummary] = useState(null);

  useEffect(() => {
    let _color = localStorage.getItem("color");
    setColor(_color);
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => {
        // Process the retrieved data
        setTownOrCity(data.city);
        setStateOrCounty(data.country_name);
        setCountryCode(data.country_code);
        setAddress1(`${data.country_name}, ${data.city}`);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.log("Error:", error);
      });
  }, []);

  useEffect(() => {
    dispatch(getPrice()).then((res) => {
      // setCharge(res.payload);
    });
    let _sku = localStorage.getItem("sku");
    setSKU(_sku);

    let _data = window.localStorage.getItem("selectedImage");
    setImage(_data.split("?")[0]);
  }, []);

  useEffect(() => {
    if (shippingMethod && copies && countryCode.length === 2) {
      setQuoteLoading(true);
      dispatch(
        getQuote({
          shippingMethod,
          copies: +copies,
          countryCode,
          sku,
          color,
        })
      ).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          toast.error("An error occured");
          setLoading(false);
          return;
        }
        if (!res.payload.quote) {
          toast.error("Unsupported SKU, please try another");
          setCost(0);
          setCostSummary(null);
          setQuoteLoading(false);
        }
        if (res.payload.issues) {
          setIssues(res.quote.issues);
        }
        setCostSummary(res.payload.quote.quotes[0].costSummary);
        setCost(
          Number(res.payload.quote.quotes[0].costSummary.totalCost.amount) +
            charge
        );
        setQuoteLoading(false);
      });
    }
  }, [shippingMethod, copies, countryCode, sku]);

  const handlePrint = async (e) => {
    e.preventDefault();
    try {
      if (countryCode.length > 3) {
        toast.error("Invalid country code");
        return;
      }
      setLoading(true);
      await dispatch(
        printOrder({
          name,
          address1,
          address2,
          shippingMethod,
          postalOrZipCode,
          sizing,
          copies,
          image,
          cost,
          townOrCity,
          countryCode,
          stateOrCounty,
          sku,
          color,
        })
      ).then((res) => {
        console.log(res);
        if (res.meta.requestStatus === "rejected") {
          toast.error("An error occured");
          setLoading(false);
          return;
        }
        if (!res.payload._result) {
          setLoading(false);
          return toast.error("Something went wrong!");
        }
        toast.success("Operation completed successfully!");
        setLoading(false);
        navigate("/order-complete");
        return;
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
      return;
    }
  };

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
                <form onSubmit={handlePrint}>
                  <div className={styles.inputDiv}>
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.inputDiv}>
                    <label>Address 1</label>
                    <input
                      type="text"
                      placeholder="Address 2"
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.inputDiv}>
                    <label>Address 2</label>
                    <input
                      type="text"
                      placeholder="Address 2"
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.inputDiv2}>
                    <div>
                      <label>Country Code</label>
                      <input
                        type="text"
                        placeholder="Country Code"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label>Zip or Postal Code</label>
                      <input
                        type="number"
                        placeholder="e.g 123"
                        value={postalOrZipCode}
                        onChange={(e) => setPostalOrZipCode(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.inputDiv}>
                    <label>Town or City</label>
                    <input
                      type="text"
                      placeholder="Town or City"
                      value={townOrCity}
                      onChange={(e) => setTownOrCity(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.inputDiv}>
                    <label>State or Country</label>
                    <input
                      type="text"
                      placeholder="Country"
                      value={stateOrCounty}
                      onChange={(e) => setStateOrCounty(e.target.value)}
                      required
                    />
                  </div>
                  <h3>Shipping Details</h3>
                  <div className={styles.inputDiv}>
                    <label>Copies</label>
                    <input
                      type="number"
                      placeholder="e.g 1"
                      value={copies}
                      onChange={(e) => setCopies(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.inputDiv2}>
                    <div>
                      <label>Shipping Method</label>
                      <select
                        onChange={(e) => setShippingMethod(e.target.value)}
                        value={shippingMethod}
                        required
                      >
                        <option value="Standard">Standard</option>
                        <option value="Express">Express</option>
                        <option value="Overnight">Overnight</option>
                        <option value="Budget">Budget</option>
                      </select>
                    </div>
                    <div>
                      <label>SKU</label>
                      <div className={styles.SKU}>{sku}</div>
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
                  <button onClick={handlePrint}>Test Prodigi</button>
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
