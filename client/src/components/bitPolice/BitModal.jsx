import React from "react";
import "./BitModal.css";
import imgUrl from "../../imgUrl";
import dummyImage from "../../assets/DomDaines.png";

const BitModal = ({ showModal, closeModal, info }) => {
  const { data, index } = info;
  // console.log("data", data);
  // CSS class to show/hide the modal
  const modalClassName = showModal ? "modal show" : "modal";
  console.log(data);
  return (
    <div className={modalClassName}>
      {/* Modal content goes here */}
      <div className="modal__dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Details</h5>
            <button type="button" className="close" onClick={closeModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body setup-card">
            <div className="scroll-sidebar g-doc-scroll">
              <div className="row">
                <div className="col-md-8">
                  <table className="table table table-bordered border table-hover">
                    <tbody>
                      <tr>
                        <td className="fw-bold">বিট নং</td>
                        <td>{index + 1}.</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">ঠিকানা</td>
                        <td>{data?.address}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">অবস্থান</td>
                        <td>{data?.current_address}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">পদবী</td>
                        <td>{data?.designation}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">নাম</td>
                        <td>{data?.name}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">মোবাইল</td>
                        <td>{data?.mobile}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">ফোন</td>
                        <td>{data?.phone}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">ফ্যাক্স</td>
                        <td>{data?.fax}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">ই-মেইল</td>
                        <td>{data?.email}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-4">
                  <div style={{ textAlign: "center" }}>
                    {data?.image ? (
                      <img
                        src={`${imgUrl}/${data.image}`}
                        className="img-fluid"
                        style={{ width: "100%" }}
                        alt="image"
                        loading="lazy"
                      />
                    ) : (
                      <img
                        src={dummyImage}
                        className="img-fluid"
                        style={{ width: "100%" }}
                        alt="image"
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
              </div>
              {data?.location && (
                <iframe
                  src={`${data?.location}`}
                  width="100%"
                  height="250"
                  style={{ border: "0" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              )}
            </div>
          </div>

          {/* <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>
              Close
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BitModal;
