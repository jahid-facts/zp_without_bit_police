import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import SideBar from "../layouts/SideBar";
import News from "../pages/setup/LatestNews/News";
import TopSlider from "../pages/setup/TopSlider/TopSlider";
import TopBanner from "../pages/setup/TopSlider Banner/TopBanner";
import BottomNews from "../pages/setup/BottomNews/BottomNews";
import RecentActivity from "../pages/setup/Recent Activity/RecentActivity";
import ActivitySlider from "../pages/setup/Activity Slider/ActivitySlider";
import WorkSubCategory from "../pages/setup/WorkSubCategory/WorkSubCategory";
import ImageGallery from "../pages/setup/ImageGallery/ImageGallery";
import VideoGallery from "../pages/setup/VideoGallery/VideoGallery";
import FooterHeadings from "../pages/setup/FooterHeadings/FooterHeadings";
import FooterContent from "../pages/setup/FooterContent/FooterContent";
import ZillaPolicePages from "../pages/setup/Zilla Police/ZillaPolicePages";
import ZillaPoliceSubPage from "../pages/setup/Zilla Police/ZillaPoliceSubPage";
import Employees from "../pages/setup/Administration/Employees";
import Officers from "../pages/setup/Administration/Officers";
import ExSp from "../pages/setup/Administration/ExSp";
import Units from "../pages/setup/Units/Units";
import AdministrationPages from "../pages/setup/Administration/AdministrationPages";
import AdministrationSubPage from "../pages/setup/Administration/AdministrationSubPage";
import SubUnits from "../pages/setup/Units/SubUnits";
import Forces from "../pages/setup/Units/Forces";
import ActivitiesPages from "../pages/setup/Activities/ActivitiesPages";
import ActivitiesSubPages from "../pages/setup/Activities/ActivitiesSubPages";
import ServicesPages from "../pages/setup/Services/ServicesPages";
import ServicesSubPages from "../pages/setup/Services/ServicesSubPages";
import NoticeCategories from "../pages/setup/Notice Board/NoticeCategories";
import Notice from "../pages/setup/Notice Board/Notice";
import BitPolicePages from "../pages/setup/Bit Policing/BitPolicePages";
import Thana from "../pages/setup/Bit Policing/Thana";
import BitOfficers from "../pages/setup/Bit Policing/BitOfficers";
import PhoneDirectoryCategory from "../pages/setup/Phone Dircetory/PhoneDirectoryCategory";
import PhoneDirectories from "../pages/setup/Phone Dircetory/phoneDirectories";
import CrimeManagement from "../pages/setup/Crime Mangement/CrimeMangement";
import Sp from "../pages/setup/SP DIG/Sp";
import Dig from "../pages/setup/SP DIG/Dig";
import dashboard from "../front_assets/images/dashboard.png";
import Users from "../pages/setup/Users/Users";
import BitPolicingNews from "../pages/setup/Bit Policing/BitPolicingNews";
import Roles from "../pages/setup/Roles/Roles";
import AuthUser from "../components/AuthUser";
import { useState } from "react";
import { useEffect } from "react";
import http from "../http";
import NotFound from "./NotFound";
import { createContext } from "react";
import BitPoliceNewsSingle from "../pages/setup/Bit Policing/BitPoliceNewsSingle";
import UpdatePassword from "../components/UpdatePassword";
import FooterCompanySocialMedia from "../pages/setup/FooterSocialMedia/FooterCompanySocialMedia";
import ExUnitPolice from "../pages/setup/Units/ExUnitPolice";
import PhoneDirectorySubCategory from "../pages/setup/Phone Dircetory/PhoneDirectorySubCategory";
import ExPoliceSuper from "../pages/setup/Administration/ExPoliceSuper";
import RightSideBarImportantLinks from "../pages/setup/RightSideBar/RightSidebarImportanLinks";
import RightSidebarOthers from "../pages/setup/RightSideBar/RightSidebarOthers";
import FooterButtonLinks from "../pages/setup/FooterContent/FooterButtonLinks";
import Dashboard from "../components/Dashboard/Dashboard";
import ContactAddress from "../pages/setup/Contact/ConatactAddress";
import ContactPerson from "../pages/setup/Contact/ContactPerson";
import ImportantHeadings from "../pages/setup/ImportantHeadings/ImportantHeadings";
import ImportantContent from "../pages/setup/ImportantContent/ImportantContent";
import WorkCategory from "../pages/setup/WorkCategory/WorkCategory";
import ImageCategory from "../pages/setup/ImageCategory/ImageCategory";
export const RoleContext = createContext();

const Auth = () => {
  const { getToken } = AuthUser();
  const user = getToken();
  const location = useLocation();
  const [userRole, setUserRole] = useState({
    home_page: [],
    administration: [],
    service: [],
    user: [],
  });
  useEffect(() => {
    http.get(`users/${user.id}`).then((res) => {
      const { home_page, administration, service, user } = res.data?.role;
      setUserRole({
        home_page: home_page ? home_page.split(",") : [],
        administration: administration ? administration.split(",") : [],
        service: service ? service.split(",") : [],
        user: user ? user.split(",") : [],
      });
    });
  }, [user.id, location]);
  console.log(userRole);
  return (
    <RoleContext.Provider value={userRole}>
      <div className="main-wrapper">
        <SideBar />
        <div className="page-wrapper">
          <Navbar></Navbar>

          {/* <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes> */}
          <Routes>
            {user.permissions_module === "BitPolice" ? (
              <Route path="/" element={<BitPoliceNewsSingle />} />
            ) : (
              <Route
                path="/"
                element={
                  <>
                    {/* <img src={dashboard} style={{ marginTop: "60px", objectFit: "cover" }} className='img-fluid' alt="dashboard" /> */}
                    <Dashboard />
                  </>
                }
              />
            )}
            {userRole.home_page.length > 0 && (
              <>
                <Route path="/latest-news" element={<News />} />
                <Route path="/top-slide" element={<TopSlider />} />
                <Route path="/banner" element={<TopBanner />} />
                <Route path="/banner-bottom-slide" element={<BottomNews />} />
                <Route path="/recent-activity" element={<RecentActivity />} />
                <Route path="/activity-slider" element={<ActivitySlider />} />
                <Route path="/category" element={<WorkCategory />} />
                <Route path="/subcategory" element={<WorkSubCategory />} />
                <Route path="/image-category" element={<ImageCategory />} />
                <Route path="/image-gallery" element={<ImageGallery />} />
                <Route path="/video-gallery" element={<VideoGallery />} />
                <Route path="/footer-section" element={<FooterHeadings />} />
                <Route path="/footer-content" element={<FooterContent />} />
                <Route
                  path="/important-section"
                  element={<ImportantHeadings />}
                />
                <Route
                  path="/important-content"
                  element={<ImportantContent />}
                />
                <Route
                  path="/company-social-media"
                  element={<FooterCompanySocialMedia />}
                />
                <Route path="/right-officer-section" element={<Sp />} />
                <Route
                  path="/right-important-links"
                  element={<RightSideBarImportantLinks />}
                />
                <Route
                  path="/right-others-section"
                  element={<RightSidebarOthers />}
                />
                <Route path="/footer-button" element={<FooterButtonLinks />} />
                <Route path="/logo" element={<Dig />} />
                <Route path="/contact-address" element={<ContactAddress />} />
                <Route path="/contact-person" element={<ContactPerson />} />
              </>
            )}
            {userRole.administration.length > 0 && (
              <>
                <Route
                  path="/zilla-police-pages"
                  element={<ZillaPolicePages />}
                />
                <Route
                  path="/zilla-police-sub-pages"
                  element={<ZillaPoliceSubPage />}
                />
                <Route
                  path="/administration-pages"
                  element={<AdministrationPages />}
                />
                <Route
                  path="/administration-sub-pages"
                  element={<AdministrationSubPage />}
                />
                <Route path="/employees" element={<Employees />} />
                <Route path="/officers" element={<Officers />} />
                <Route path="/ex-sps" element={<ExSp />} />
                <Route path="/ex-police-super" element={<ExPoliceSuper />} />
                <Route path="/unit" element={<Units />} />
                <Route path="/sub-unit" element={<SubUnits />} />
                <Route path="/unit-forces" element={<Forces />} />
                <Route path="/ex-unit-forces" element={<ExUnitPolice />} />
                <Route path="/activities-pages" element={<ActivitiesPages />} />
                <Route
                  path="/activities-sub-pages"
                  element={<ActivitiesSubPages />}
                />
                <Route path="/services-pages" element={<ServicesPages />} />
                <Route
                  path="/services-sub-pages"
                  element={<ServicesSubPages />}
                />
                <Route path="/notice-pages" element={<NoticeCategories />} />
                <Route path="/notice-sub-pages" element={<Notice />} />
                <Route path="/bit-police-pages" element={<BitPolicePages />} />
                <Route path="/bit-area" element={<Thana />} />
                <Route path="/bit-officers" element={<BitOfficers />} />
                <Route
                  path="/phone-directory-category"
                  element={<PhoneDirectoryCategory />}
                />
                <Route
                  path="/phone-directory-sub-category"
                  element={<PhoneDirectorySubCategory />}
                />
                <Route path="/phone-directory" element={<PhoneDirectories />} />
                <Route path="/crime-management" element={<CrimeManagement />} />
                <Route path="/bit-news" element={<BitPolicingNews />} />
              </>
            )}
            {userRole.user.length > 0 && (
              <Route path="/users" element={<Users />} />
            )}
            {userRole.administration.length > 0 && (
              <Route path="/roles" element={<Roles />} />
            )}
            {user.permissions_module === "BitPolice" && (
              <Route path="/" element={<BitPoliceNewsSingle />} />
            )}

            <Route path="/change-password" element={<UpdatePassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </RoleContext.Provider>
  );
};

export default Auth;
