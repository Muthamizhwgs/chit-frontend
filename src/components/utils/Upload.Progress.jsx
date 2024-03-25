import React from "react";
import { Progress } from "antd";
import "./upload.css";

const UploadProgress = (data) => {
  const [loader, setLoader] = React.useState(false);
  React.useEffect(() => {
    setLoader(data.data.upload);
    console.log(data.data.upload);
  }, [loader]);

  const twoColors = {
    "0%": "#108ee9",
    "100%": "#87d068",
  };
  return (
    <>
      {loader ? (
        <div className="progress-loader">
            <div className="progress-container">
          <Progress type="dashboard" percent={data.data.load} strokeColor={twoColors} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UploadProgress;
