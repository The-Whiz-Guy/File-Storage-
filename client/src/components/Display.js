import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Secondfile.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState(false);

  const getData = async () => {
    if (!contract) {
      alert("Contract is not connected yet.");
      return;
    }

    try {
      const addressInput = document.querySelector(".address");
      const targetAddress = addressInput?.value || account;
      const dataArray = await contract.display(targetAddress);

      if (!dataArray || dataArray.length === 0) {
        alert("No images to display");
        return;
      }

      const images = dataArray.map((item, i) => {
        const ipfsUrl = `https://ipfs.io/ipfs/${item.replace("ipfs://", "")}`;

        return (
          <div key={i} className="image-container">
            <button className="delete-button" onClick={() => deleteFile(i)}>
              <i className="fa-solid fa-trash fa-beat" style={{ color: "#007bff" }}></i>
            </button>
            <a href={ipfsUrl} target="_blank" rel="noreferrer">
              <img src={ipfsUrl} alt="File" className="image-list" width={300} height={300} />
            </a>
          </div>
        );
      });

      setData(images);
      setShowData(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error retrieving images.");
    }
  };

  const deleteFile = async (index) => {
    if (!contract) return alert("Contract not loaded yet.");

    try {
      await contract.deleteUrl(index);
      alert("Image deleted successfully");
      getData();
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Error deleting image");
    }
  };

  return (
    <>
      <div className="search-bar">
        <input type="text" className="address" placeholder="Enter the Account Address" />
        <button className="search-button" onClick={getData}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      {showData && data.length > 0 && (
        <div className="blank-container">
          <div className="image-grid">
            {data}
            <button className="close-container" onClick={() => setShowData(false)}>
              <i className="fa-sharp fa-solid fa-circle-xmark fa-2xl"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Display.propTypes = {
  contract: PropTypes.shape({
    display: PropTypes.func.isRequired,
    deleteUrl: PropTypes.func.isRequired,
  }).isRequired,
  account: PropTypes.string.isRequired,
};

export default Display;
