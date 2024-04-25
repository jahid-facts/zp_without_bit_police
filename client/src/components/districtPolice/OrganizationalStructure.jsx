import React, { useState } from 'react';
import LeftHomePage from '../mainHomePage/LeftHomePage';
import map_kishorgonj from "../../assets/map_kishorgonj.jpg";

const OrganizationalStructure = () => {
    


    return (
        <div className="container py-3">
            <div className="row g-3">
                <div className="col-md-9">
                    <div className="geo__familarity">
                        <h6 className="geo__familarity__title">সাংগঠনিক কাঠামো</h6>
                    </div>
                   
                </div>
                <div className="col-md-3">
                    <LeftHomePage />
                </div>
            </div>
        </div>
    );
};

export default OrganizationalStructure;