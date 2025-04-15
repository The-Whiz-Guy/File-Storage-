import React from "react";
import Navbar from "./Navbar";
import "./Working.css";
import image1 from "./images/first-image-min.png";
import image2 from "./images/second-image-min.png";
import image3 from "./images/third-image-min.png";
import Footer from "./Footer";

const Working = () => {
    return (
        <div>
            <div className="navbar-section">
                <Navbar />
            </div>
            <h1 className="Work-heading">Working of File Storage System</h1>
            <div className="first-section">
                <p className="first-para">
                    Our decentralized file storage system leverages an IPFS (InterPlanetary File System) node that we host ourselves, ensuring complete control and security over the data. Unlike third-party services like Pinata, hosting our own IPFS node eliminates reliance on external providers, offering a truly decentralized and private solution for file storage.
                </p>
                <div className="image-1">
                    <img src={image3} alt="IPFS process" />
                </div>
            </div>
            <div className="second-section">
                <p className="second-para">
                    When a file is uploaded, it is stored on our IPFS node and assigned a unique Content Identifier (CID). The CID is a cryptographic hash that acts as a fingerprint for the file. This ensures that the file's integrity is maintained, as even a single byte change in the file would result in a completely different CID. The CID is then stored on the blockchain, providing an immutable record of the file's existence and ownership.
                </p>
                <div className="image-2">
                    <img src={image2} alt="Blockchain storage" />
                </div>
            </div>
            <div className="third-section">
                <p className="third-para">
                    File pinning is a crucial step in ensuring that files remain accessible on the IPFS network. When a file is pinned, it is stored persistently on our IPFS node, preventing it from being garbage collected. This guarantees that the file remains available for retrieval, even if other nodes on the network no longer have a copy. By pinning files, we ensure high availability and reliability for all stored data.
                </p>
                <div className="image-3">
                    <img src={image1} alt="Accessing IPFS" />
                </div>
            </div>
            <div className="fourth-section">
                <p className="fourth-para">
                    Sharing files is seamless and secure. Users can grant access to specific wallet addresses, allowing them to retrieve the file using its CID. The access control is managed through smart contracts, ensuring that only authorized users can access the file. This mechanism provides a robust and decentralized way to share files without compromising privacy or security.
                </p>
            </div>
            <div className="fifth-section">
                <p className="fifth-para">
                    By using our system, users benefit from the decentralized nature of IPFS and blockchain technology. Files are distributed across the IPFS network, ensuring high availability and resilience against failures. The blockchain provides a transparent and tamper-proof record of file ownership and sharing permissions, making it an ideal solution for secure and decentralized file storage and sharing.
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default Working;