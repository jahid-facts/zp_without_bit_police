import React from "react";
import imagePath from "./../../assets/visitor.png";
import { usePageVisitor } from "../usePageVisitor";

const PageVisitorSection = () => {
  const pageVisitor = usePageVisitor();
  return (
    <div
      style={{
        border: "1px solid #d1d1d1",
        borderRadius: "5px",
        marginBottom: "5px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "7px",
          alignItems: "center",
          padding: "10px",
        }}
      >
        {imagePath && (
          <img
            style={{
              borderRight: "1px solid #d1d1d1",
              borderRadius: "5px",
              marginBottom: "5px",
            }}
            src={imagePath}
            alt="Page Visitor"
            width={150}
          />
        )}
        <div style={{ paddingLeft: "5px" }}>
          {/* <h3 className="text-md font-semibold">{t("footer.totalVisits")}</h3> */}
          <p style={{ margin: 0, fontSize: "13px", fontWeight: "600" }}>
            Today Visitors: {pageVisitor?.today_visits}
          </p>
          <p style={{ margin: 0, fontSize: "13px", fontWeight: "600" }}>
            Total Visitors: {pageVisitor?.total_visits}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageVisitorSection;
