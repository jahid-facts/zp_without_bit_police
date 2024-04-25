import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hotline_img from "../../assets/hotline_img.jpg";
import Wear_mask_img from "../../assets/Wear_mask_img.jpeg";
import Corona_virus_img from "../../assets/Corona_virus_img.jpg";
import prevent_dengue_img from "../../assets/prevent_dengue_img.jpg";
import list_icon from "../../assets/list_icon.png";
import axios from "axios";
import imgUrl from "../../imgUrl";
import "./LeftHomePage.css";

const LeftHomePage = () => {
  const [digData, setDigData] = useState({});
  const [spData, setSpData] = useState([]);

  // const [title, setTitle] = useState("");

  useEffect(() => {
    axios.get(`dig`).then((res) => setDigData(res.data));
    axios.get(`police-super`).then((res) => setSpData(res.data));
  }, []);

  const [govImportenceLinkData, setGovImportenceLinkData] = useState([]);

  const [dynamicTitle, setDynamicTitle] = useState("");

  const [weatherData, setWeatherData] = useState({});
  const [rightOthers, setRightOthers] = useState([]);

  const [importantData, setImportantData] = useState([]);

  useEffect(() => {
    axios.get(`important-heading`).then((res) => {
      setImportantData(res.data);
    });

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=` +
          "bangladesh" +
          `&APPID=381e82a6a7d50e7c90e00887344e21c5&units=metric`
      )
      .then((response) => {
        // console.log("weather", response.data);
        setWeatherData(response.data.main);
      });
    axios
      .get(`important-link`)
      .then((res) => setGovImportenceLinkData(res.data));

    // axios.get(`important-link`)
    //     .then(res => {
    //         setGovImportenceLinkData(res.data);
    //         setTitle(res.data.title); // Assuming title is part of your API response
    //     })

    axios.get(`right-side-others`).then((res) => setRightOthers(res.data));

    // axios.get(`right-links`)
    //     .then(res => setDynamicTitle(res.data.title))
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/titles`);
        const data = await response.json();
        console.log(response);
        console.log(data);

        setDynamicTitle(data[0].title); // Assuming your API returns an object with a 'title' property
      } catch (error) {
        console.error("Error fetching title:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="mt__top__lfh">
        <div className="row g-1">
          {spData?.length > 0 &&
            spData.map((item, index) => {
              return (
                <div className="col-12" key={index}>
                  <div className="home__dig__card">
                    <div className="card police-card">
                      <h6 className="card__title pt-2">{item?.title}</h6>
                      <div className="home__dig text-center">
                        <img
                          src={`${imgUrl}/${item?.image}`}
                          className="img-fluid"
                          alt="image"
                          loading="lazy"
                        />
                      </div>
                      <h6 className="card__subtitle pt-3">{item?.name}</h6>
                      <p className="card__desc">{item?.designation}</p>
                      <Link
                        to={`/sp-details/${item?.id}`}
                        className="text-decoration-none text-center"
                      >
                        বিস্তারিত
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="row g-3 pt-1">
          <div className="col-12">
            <h6 className="home__left__title">ফেসবুক পেজ</h6>
            {/* <div className="facebook__page__container">
                            <div className="facebook__page__banner">
                                <img src={kishorgonj_police_banner} className="img-fluid" alt="image" loading='lazy' />
                            </div>
                            <div className="facebook__page__content">
                                <div className="kishorgonj__area">
                                    <div className="kishorgonj__page__logo">
                                        <img src={kishorgonj_police_logo} className="img-fluid" alt="image" loading='lazy' />
                                    </div>
                                    <div className="kishorgonj__txt__area">
                                        <p className="kishorgonj__txt" rel="bookmark" title="জেলা পুলিশ কিশোরগঞ্জ District Police Kishoreganj">জেলা পুলিশ কিশোরগঞ্জ</p>
                                        <small className="kishorgonj__txt__follower">26,800 followers</small>
                                    </div>
                                </div>
                            </div>
                            <div className="facebook__btn__content">
                                <a href="https://www.facebook.com/Kdistrictpolice/" target="_blank" className="facebook__btn" rel="bookmark" title="Facebook page">
                                    <span><i className="fa-brands fa-facebook"></i></span> <span>Follow page</span>
                                </a>
                            </div>
                            <div className="share__btn__content">
                                <a href="https://www.facebook.com/login.php?skip_api_login=1&api_key=776730922422337&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fsharer%2Fsharer.php%3Fapp_id%3D776730922422337%26u%3Dhttps%253A%252F%252Fwww.facebook.com%252F1315481051928211%26display%3Dpopup%26ref%3Dplugin%26src%3Dpage&cancel_url=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Fclose_window%2F%3Fapp_id%3D776730922422337%26connect%3D0%23_%3D_&display=popup&locale=en_GB" target="_blank" className="facebook__btn" rel="bookmark" title="Share page">
                                    <span><i className="fa-solid fa-share-nodes"></i></span> <span>Share</span>
                                </a>
                            </div>
                        </div> */}
            {/* <div className="fb-page"
                            data-href="https://www.facebook.com/Kdistrictpolice"
                            data-width="380"
                            data-height="380"
                            data-hide-cover="false"
                            data-show-facepile="false">
                        </div> */}
            {/* <div className="fb__page">
                            <iframe src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/Kdistrictpolice%2Ffacebook&tabs=timeline&width=270&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="100%" height="500" style={{ border: "none", overflow: "hidden", }} scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                        </div> */}
            <div className="fb__page">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/Kdistrictpolice%2Ffacebook&tabs=timeline&width=336&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width="100%"
                height="500"
                style={{
                  border: "none",
                  overflow: "hidden",
                  minWidth: "100%",
                  width: "100%",
                }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="row g-3 pt-1">
          <div className="col-12">
            <div className="home__left__content__area">
              {importantData.map((item) => (
                <div key={item.id} className="setup-card">
                  <h6 className="home__left__title">{item.title}</h6>
                  <div
                    className="home__left__content g-doc-scroll pt-2"
                    style={{ maxHeight: "45vh", overflowX: "scroll" }}
                  >
                    <ul className="list-unstyled mb-0">
                      {item.importantData !== undefined &&
                        item.importantData.map((item) => {
                          return (
                            <li key={item.id}>
                              <a
                                href={`${item.link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-decoration-none"
                              >
                                <div className="gov__import__list__area d-flex align-items-center">
                                  <div className="gov__import__list__icon me-2">
                                    <span>
                                      <img
                                        src={list_icon}
                                        className="img-fluid"
                                        alt="image"
                                        loading="lazy"
                                      />
                                    </span>
                                  </div>
                                  <p className="gov__import__list__title">
                                    {item.title}
                                  </p>
                                </div>
                              </a>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {rightOthers?.length > 0 &&
          rightOthers.map((item, index) => (
            <div key={index} className="row g-1">
              <div className="col-12">
                <h6 className="home__left__title">{item.title}</h6>
                <div className="home__hotline">
                  <img
                    src={`${imgUrl}/${item.image}`}
                    className="img-fluid"
                    alt="image"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}

        {/* <div className="row g-3 pt-4">
                    <div className="col-12">
                        <h6 className="home__left__title">আবহাওয়া</h6>
                        <p>Content upcomming soon</p>
                        <div className="d-flex justify-content-center">
                            <p>Dhaka</p>
                            <p>{weatherData.temp}</p>
                        </div>
                    </div>
                </div> */}
      </div>
    </>
  );
};

export default LeftHomePage;
