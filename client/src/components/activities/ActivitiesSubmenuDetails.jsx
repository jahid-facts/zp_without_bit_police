import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LeftHomePage from '../mainHomePage/LeftHomePage';
import axios from 'axios';
import PageVisitorSection from '../utils/page_visitor_section';

const ActivitiesSubmenuDetails = () => {

    const [activitiesData, setActivitiesData] = useState();

    const {id} = useParams();

    useEffect(() => {
      axios.get(`activities-sub-pages/${id}`)
        .then(res => {
          setActivitiesData(res.data)
        })  
    },[id])
   
    return (
        <div className="container py-3">
            <div className="row g-3">
                <div className="col-md-9">
                    <PageVisitorSection />
                    <div className="geo__familarity">
                        <h6 className="geo__familarity__title">{activitiesData?.title}</h6>
                    </div>
                    <div dangerouslySetInnerHTML={{__html:activitiesData?.content}}></div>


                </div>
                <div className="col-md-3">
                    <LeftHomePage />
                </div>
            </div>

        </div>
    );
};

export default ActivitiesSubmenuDetails;