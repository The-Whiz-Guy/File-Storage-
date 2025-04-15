import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./AccessList.css";

const AccessList = ({ contract }) => {
  const [accessList, setAccessList] = useState([]);

  const fetchAccessList = async () => {
    if (!contract) return;

    try {
      const list = await contract.shareAccess();
      setAccessList(list.filter((entry) => entry.access));
    } catch (error) {
      console.error("Error fetching access list:", error);
    }
  };

  useEffect(() => {
    fetchAccessList();
  }, [contract]);

  const removeAccess = async (address) => {
    if (!contract) return;

    try {
      await contract.disallow(address);
      setAccessList((prevList) =>
        prevList.filter((entry) => entry.user !== address)
      );
      alert("Access removed successfully");
    } catch (error) {
      console.error("Error removing access:", error);
      alert("Failed to remove access");
    }
  };

  return (
    <div className="accesslist-section">
      <h1 className="accesslist-h1">Allowed Wallet Addresses</h1>
      {accessList.length > 0 ? (
        <div>
          {accessList.map((entry, index) => (
            <div key={index} className="accesslist-container">
              <span className="address">{entry.user}</span>
              <button
                className="accesslist-button"
                onClick={() => removeAccess(entry.user)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="error-text">No allowed addresses found.</p>
      )}
    </div>
  );
};

AccessList.propTypes = {
  contract: PropTypes.shape({
    shareAccess: PropTypes.func.isRequired,
    disallow: PropTypes.func.isRequired,
  }).isRequired,
};

export default AccessList;
