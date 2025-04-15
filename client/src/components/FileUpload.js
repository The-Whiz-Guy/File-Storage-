import React, { useState } from "react";
import PropTypes from "prop-types";
import { create } from "ipfs-http-client";
import Modal from "./Modal";
import "./Spinner.css";
import "./FileUpload.css";



const ipfs = create({ host: "localhost", port: "5001", protocol: "http" });

const FileUpload = ({ contract, account, provider, refreshAccessList }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentButton, setCurrentButton] = useState("upload");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadAndPinFile = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus(<span style={{ color: "white" }}>Please select a file first.</span>);
      return;
    }

    try {
      setLoading(true);
      setStatus(<span style={{ color: "white" }}>Uploading file to IPFS...</span>);
      const added = await ipfs.add(file);
      const cid = added.cid.toString();

      setStatus(<span style={{ color: "white" }}>Pinning file to local IPFS node...</span>);
      await ipfs.pin.add(cid);

      setStatus(
        <span style={{ color: "white" ,fontSize: "10px"}}>
          File uploaded and pinned successfully! CID: {cid}
        </span>
      );

      const signer = contract.connect(provider.getSigner());
      const tx = await signer.add(account, cid);
      await tx.wait();
      setStatus(<span style={{ color: "white" }}>File hash saved to blockchain!</span>);
      setFile(null);
    } catch (error) {
      console.error("Error uploading or pinning file:", error);
      setStatus(<span style={{ color: "white" }}>Error uploading or pinning file.</span>);
    } finally {
      setLoading(false);
    }
  };

  const retrieveFile = (e) => {
    const input = e.target;
    const label = document.getElementById("fileLabel");
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      setFile(file);
      label.textContent = "";
    } else if (!file) {
      label.innerHTML = '<i className="fa-solid fa-cloud-arrow-up fa-bounce"></i>';
      document.getElementById("upload-para").style.display = "block";
    }
  };

  const renderPreview = () => {
    if (file) {
      const fileType = file.type.split("/")[0];

      switch (fileType) {
        case "image":
          return (
            <img
              src={URL.createObjectURL(file)}
              alt="Uploaded file"
              className="preview-image"
            />
          );
        case "video":
          return (
            <video
              src={URL.createObjectURL(file)}
              className="preview-video"
              controls
              height={150}
              width={320}
            />
          );
        case "audio":
          return (
            <audio
              src={URL.createObjectURL(file)}
              className="preview-audio"
              controls
            />
          );
        case "application":
          if (file.type === "application/pdf") {
            return (
              <div className="preview-file">
                <i className="fa-solid fa-file-pdf"></i>
                <p>PDF FILE</p>
              </div>
            );
          } else {
            return (
              <div className="preview-file">
                <i className="fa-solid fa-file"></i>
                <p>{fileType.toUpperCase()} FILE</p>
              </div>
            );
          }
        default:
          return (
            <div className="preview-file">
              <i className="fa-solid fa-file"></i>
              <p>{fileType.toUpperCase()} FILE</p>
            </div>
          );
      }
    }

    return null;
  };

  return (
    <>
      <div className="upload-share-container">
        <div className="toggle-wrapper">
          <span className="toggle-label">UPLOAD</span>
          <label className="switch">
            <input
              type="checkbox"
              onChange={() =>
                setCurrentButton(currentButton === "share" ? "upload" : "share")
              }
            />
            <span className="slider"></span>
          </label>
          <span className="toggle-label">SHARE</span>
        </div>
        {currentButton === "upload" && (
          <div className="wrapper">
            <h3>Upload Your Files</h3>
            <p className="first-desc">
              File supported type : PNG , MP3 ,MP4, WEBP{" "}
            </p>
            <div
              className="form"
              onClick={() => document.getElementById("my-file").click()}
            >
              <label
                htmlFor="my-file"
                id="fileLabel"
                className="custom-file-upload"
              >
                <i className="fa-solid fa-cloud-arrow-up fa-bounce"></i>
              </label>
              <input
                type="file"
                id="my-file"
                name="myfile"
                disabled={!account}
                onChange={(e) => {
                  retrieveFile(e);
                  document.getElementById("upload-para").style.display = "none";
                }}
              />
              {file && renderPreview()}

              <p id="upload-para" className="upload-para">
                Browse or Drag here to upload
              </p>
            </div>
            <button
              type="submit"
              className="upload"
              disabled={!file}
              onClick={uploadAndPinFile}
            >
              Upload and Pin
            </button>
            {loading && (
              <div className="spinner">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            <p>{status}</p>
          </div>
        )}
        {currentButton === "share" && (
          <div className="share-wrapper">
            <h3>Share Your Files</h3>
            <Modal contract={contract} onShare={refreshAccessList} />
          </div>
        )}
      </div>
    </>
  );
};

FileUpload.propTypes = {
  contract: PropTypes.shape({
    connect: PropTypes.func,
  }),
  account: PropTypes.string,
  provider: PropTypes.shape({
    getSigner: PropTypes.func,
  }),
  refreshAccessList: PropTypes.func.isRequired,
};
export default FileUpload;
