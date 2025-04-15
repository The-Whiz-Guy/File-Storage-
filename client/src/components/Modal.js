import React from "react";
import PropTypes from "prop-types";

const Modal = ({ contract, onShare }) => {
  const sharing = async () => {
    const address = document.querySelector(".address").value;
    if (!address) {
      alert("Please enter a valid address.");
      return;
    }

    try {
      await contract.allow(address);
      alert("Access shared successfully");
      onShare();
    } catch (error) {
      console.error("Error sharing access:", error);
      alert("Failed to share access");
    }
  };

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div id="myForm" className="myform">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>
            <div className="footer">
              <button onClick={sharing} className="share-btn">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  contract: PropTypes.shape({
    allow: PropTypes.func.isRequired,
  }).isRequired,
  onShare: PropTypes.func.isRequired,
};

export default Modal;
