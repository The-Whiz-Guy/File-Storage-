import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Firstpage.css";
import "./Secondpage";
import myvideo from "./videos/fristpage-video.mp4";
import img1 from "./images/first-image-min.png";
import img2 from "./images/second-image-min.png";
import img3 from "./images/third-image-min.png";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Firstpage() {
  const [imageSrc, setImageSrc] = useState(img3);

  const handleHeadingClick = (newImageSrc) => {
    setImageSrc(newImageSrc);
  };

  return (
    <div>
      <div className="navbar-section">
        <Navbar />
      </div>
      <div className="hero">
        <div className="video-background">
          <video autoPlay muted loop>
            <source src={myvideo} type="video/mp4" />
          </video>
          <div className="hero-content">
            <div className="hero-heading-box">
              <h1 className="hero-heading">
                Revolutionize Your File Storage with Decentralized Technology
              </h1>
            </div>
            <h2 className="hero-subheading">Empowering You to Take Control of Your Data</h2>
          
            <button
              className="hero-button"
              onClick={() => {
                window.location.href = "/secondpage";
              }}
            >
              <Link className="hero-button-text" to="/secondpage">
                Start Uploading Your Files
              </Link>
            </button>
            
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="animate-section">
        <h2 className="animate-heading">What is BC-Store?</h2>
        <p className="animate-para">
          BC-Store is a cutting-edge decentralized file storage system designed to provide unparalleled security and transparency. By leveraging blockchain technology and IPFS, BC-Store ensures that your data remains private, immutable, and accessible only to authorized users. Our platform empowers individuals and organizations to store and share files with confidence, free from the limitations of traditional centralized systems.
        </p>
      </div>

      {/* Benefits Section */}
      <div className="product-section">
        <h2 className="product-head">
          Key Advantages of Blockchain-based File Storage
        </h2>
        <div className="product-content">
          <div className="product-left">
            <div className="Para-1">
              <h3
                id="para1-heading"
                className="para1-heading"
                onClick={() => handleHeadingClick(img2)}
              >
                Immutability
              </h3>
              <p className="para1-detail">
                Blockchain technology ensures that your files are tamper-proof and immutable. Once stored, files cannot be altered or deleted, guaranteeing the integrity of your data.
              </p>
            </div>
            <hr className="my-hr" />
            <div className="Para-2">
              <h3
                id="para2-heading"
                className="para2-heading"
                onClick={() => handleHeadingClick(img3)}
              >
                Decentralization
              </h3>
              <p className="para2-detail">
                Files are stored across a decentralized network, eliminating single points of failure. This ensures high availability and resilience, even in the face of network disruptions.
              </p>
            </div>
            <hr className="my-hr" />
            <div className="Para-3">
              <h3
                id="para3-heading"
                className="para3-heading"
                onClick={() => handleHeadingClick(img1)}
              >
                Transparency
              </h3>
              <p className="para3-detail">
                Blockchain provides a transparent and verifiable record of all transactions. This fosters trust and accountability, as users can independently verify the authenticity of stored files.
              </p>
            </div>
          </div>
          <div className="product-right">
            <img src={imageSrc} alt="Feature Illustration" />
          </div>
        </div>
      </div>     

      <Footer />
    </div>
  );
}

export default Firstpage;
