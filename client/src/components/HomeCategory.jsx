import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import imgUrl from "../imgUrl";
import { Link } from "react-router-dom";

const HomeCategory = () => {
  const [rightInfoData, setRightInfoData] = useState([]);
  useEffect(() => {
    axios
      .get("/work-document-section")
      .then((res) => {
        setRightInfoData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="container p-lg-0">
      <div className="p-3">
        <div className="row g-2 pt-2">
          {rightInfoData !== undefined &&
            rightInfoData.map((item) => {
              return (
                <div key={item.id} className="col-md-6">
                  <div className="rc__card">
                    <div className="card">
                      <h6 className="rc__hd__txt">{item.title}</h6>
                      <div className="row g-0">
                        <div className="col-4">
                          <div className="card__rc__img">
                            <img
                              src={`${imgUrl}/${item.image}`}
                              className="img-fluid"
                              alt="..."
                              loading="lazy"
                            />
                          </div>
                        </div>
                        <div className="col-8">
                          <div className="card-body">
                            <ul className="list-unstyled right__info">
                              {item?.works?.map((list) => {
                                return (
                                  <li key={list.id}>
                                    <i className="me-2 right__info__list__arrow  fa-solid fa-play"></i>
                                    <Link
                                      to={`/view-action-details/${list.id}`}
                                      className="right__info__list"
                                    >
                                      {list.title}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default HomeCategory;
