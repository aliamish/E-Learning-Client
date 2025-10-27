import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  console.log("Video ID received in frontend:", videoUrl);

  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    if (!videoUrl) {
      console.warn("No videoUrl provided to CoursePlayer!");
      return;
    }

    axios
      .post(
        `https://e-learning-server-brown.vercel.app/api/v1/getVdoCipherOTP`,
        { videoId: videoUrl },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("OTP Response:", res.data);
        setVideoData(res.data);
      })
      .catch((err) => {
        // Log all possible error details
        console.error("Error fetching OTP:");
        console.log("Status:", err.response?.status);
        console.log("Data:", err.response?.data);
        console.log("Message:", err.message);
      });
  }, [videoUrl]);

  return (
    <div style={{ paddingTop: "41%", position: "relative" }}>
      {videoData.otp && videoData.playbackInfo && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=iV6RxAdWiIbG3yLU`}
          style={{
            border: 0,
            width: "90%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          allowFullScreen
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
