import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export const usePageVisitor = () => {
  const { pathname } = useLocation(); // Destructure pathname directly from useLocation
  console.log(pathname);
  const cleanedPathname = useMemo(
    () => pathname.replace(/\/(en|bn)\b/, ""),
    [pathname]
  );
  const serverPath = useMemo(
    () => cleanedPathname.replace(/\//g, ""),
    [cleanedPathname]
  );
  const [pageVisitor, setPageVisitor] = useState({});

  const path = serverPath ? serverPath : "home";

  console.log(cleanedPathname, path);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/visit/${path}`);
        console.log(response.data);
        setPageVisitor(response.data);
      } catch (error) {
        console.error("Error fetching visit statistics:", error);
      }
    };

    fetchData();
  }, [serverPath]);

  return useMemo(() => pageVisitor, [pageVisitor]);
};
