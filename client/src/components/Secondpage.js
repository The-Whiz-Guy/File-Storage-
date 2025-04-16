import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Navbar from "./Navbar";
import "./Secondfile.css";
import "./FileUpload.css";
import FileUpload from "./FileUpload";
import Display from "./Display";
import AccessList from "./AccessList";
import Footer from "./Footer";
import myvideo from "./videos/secondpage-video.mp4";

const Secondpage = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [accessListUpdated, setAccessListUpdated] = useState(false);

  useEffect(() => {
    const loadProvider = async () => {
      if (!window.ethereum) {
        console.error("MetaMask is not installed");
        return;
      }

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        const contractAddress = "0x7dc306f2e18f982E245ab01ceF7812856c0D5e9a";
        const contract = new ethers.Contract(contractAddress, Upload.abi, signer);
        setContract(contract);
        setProvider(provider);
      } catch (error) {
        console.error("Error loading provider:", error);
      }
    };

    loadProvider();
  }, []);

  const refreshAccessList = () => {
    setAccessListUpdated((prev) => !prev);
  };

  return (
    <>
      <Navbar />
      <div className="video-background">
        <video autoPlay muted loop>
          <source src={myvideo} type="video/mp4" />
        </video>
        <div className="file-container">
          <h1> Store and Share Your Files with Ease</h1>
          <FileUpload
            account={account}
            provider={provider}
            contract={contract}
            refreshAccessList={refreshAccessList}
          />
        </div>
      </div>

      <div className="upload-check-section">
        <h2 className="check-head">My Uploads</h2>
        <p className="check-para">
          The 'My Uploads' section allows you to view and manage files stored on the decentralized network.
        </p>
        <Display contract={contract} account={account} />
      </div>
      <Footer />
    </>
  );
};

export default Secondpage;
