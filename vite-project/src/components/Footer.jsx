import React from "react";

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footerContainer">
          <div className="mainBox">
            <div className="box box1">
              <h2>TRIDHA MEDITATION</h2>
              <p className="">
                ADDRESS: PCF WALI GALI, KANKERKHERA, MEERUT
                <br />
                UTTAR PRADESH
              </p>
            </div>

            <div className="box box2">
              <h2>CONTACTS</h2>
              <p className="">
                EMAIL:{" "}
                shivangi2020jyotish@gmail.com <br />pranprakashsharma@gmail.com
              </p>
              <p className="">
                PHONE: 7983314136, 9997525012
              </p>
            </div>
          </div>
          <div className="socialLinks">
            <div className="links">
              <div className="icon">

                <a href="https://www.facebook.com/profile.php?id=100068011635055" target="_blank"><i class="fa-brands fa-facebook"></i></a>

              </div>
              <div className="icon">

                <a href="https://www.youtube.com/@shivangijyotish6572" target="_blank"><i class="fa-brands fa-youtube"></i></a>
              </div>
              <div className="icon">

                <a href="https://x.com/JyotishShivangi" target="_blank">
                  <i class="fa-brands fa-square-x-twitter"></i>
                </a>
              </div>
            </div>

          </div>
        </div>

      </footer>
    </>
  );
}

export default Footer;
