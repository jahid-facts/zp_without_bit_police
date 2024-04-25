import axios from "axios";
import moment from "moment";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import pdf_icon from "../../assets/pdf_icon.png";
import imgUrl from "../../imgUrl";
import LeftHomePage from "../mainHomePage/LeftHomePage";
import "./notice.css";
import PageVisitorSection from "../utils/page_visitor_section";

const Notice = () => {
  const [noticeBoardData, setNoticeBoardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams();
  const [perPage, setPerPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    fetchNoticeData();
  }, [id, currentPage]); // Reload data when id or currentPage changes

  const fetchNoticeData = () => {
    axios.get(`notice-by-category/${id}?page=${currentPage}`).then((res) => {
      setNoticeBoardData(res.data?.notices);
      setPerPage(res.data?.perPage);
      setCurrentPage(res.data?.currentPage);
      setTotalPages(res.data?.totalPages);
    });
  };

  const startIndex = (currentPage - 1) * perPage + 1;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePageChange = (number) => {
    setCurrentPage(number);
  };

  return (
    <div className="container py-3">
      <div className="row g-3 pt-2 ">
        <div className="col-md-9">
          <PageVisitorSection />
          <h4 className="rc__hd__txt">{noticeBoardData[0]?.category.title}</h4>
          <div className="d-flex justify-content-start">
            <table className="table table-bordered notice__tenders__table">
              <thead>
                <tr>
                  <th className="th__sr">Sr. No.</th>
                  <th>Title</th>
                  <th>Date of Publication</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {noticeBoardData.length > 0 ? (
                  noticeBoardData.reverse().map((item, index) => (
                    <tr key={index} className="tr__body">
                      <td>{startIndex + index}.</td>
                      <td>
                        <Link
                          to={`/notice-board-details/${item.notice.id}`}
                          className="notice__tenders__link"
                          rel="bookmark"
                          title={item.notice.title}
                        >
                          {item.notice.title}
                        </Link>
                      </td>
                      <td className="text-center">
                        {moment(item.notice.updatedAt).format("DD-MM-YYYY")}
                      </td>
                      <td className="text-center">
                        {item.notice.file && (
                          <a
                            download
                            href={`${imgUrl}/${item.notice.file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              className="img-fluid"
                              src={pdf_icon}
                              alt="icon"
                            />
                          </a>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div>
            <button
              className="rc__hd__txt"
              style={{ border: "none" }}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-3">
              {currentPage} of {totalPages}
            </span>
            <button
              className="rc__hd__txt px-3"
              style={{ border: "none" }}
              onClick={handleNextPage}
            >
              Next
            </button>
          </div>
          <div className="pt-4">
            {totalPages > 1 && (
              <ul className="pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNumber) => (
                    <li
                      key={pageNumber}
                      className={`page-item ${
                        pageNumber === currentPage ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        </div>
        <div className="col-md-3">
          <LeftHomePage />
        </div>
      </div>
    </div>
  );
};

export default Notice;
