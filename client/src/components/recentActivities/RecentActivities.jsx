import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import imgUrl from "../../imgUrl";
import "./RecentActivitiesPage.css";

const RecentActivities = () => {
  const [recentActivityData, setRecentActivityData] = useState([]);

  // console.log("rcData", rcData);
  useEffect(() => {
    axios
      .get("/recent-activity")
      .then((response) => {
        setRecentActivityData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="pt-1">
      <h6 className="rc__hd__txt">সাম্প্রতিক কার্যক্রম সমূহ</h6>
      <div className="row g-1">
        {
          // recentActivityData !== undefined && recentActivityData.map((item) => {
          recentActivityData !== undefined &&
            recentActivityData
              .slice(0, 4)
              .reverse()
              .map((item) => {
                return (
                  <div key={item.id} className="col-md-6">
                    <Link
                      to={`/recent-activites-details/${item.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="rc__cardp-0">
                        <div className="card hover-effect">
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
                                <p className="card__rc__desc">{item.heading}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })
        }
      </div>

      <div className="row pt-3">
        <div className="col-12">
          <div className="text-center">
            <Link to="/recent-activities" className="rc__btn m-0">
              {" "}
              আরও সাম্প্রতিক কার্যক্রম সমূহ{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivities;
