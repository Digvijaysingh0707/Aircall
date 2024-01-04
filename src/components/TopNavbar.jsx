
import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import activityCall from "../assests/activityCall.png";

const TopNavbar = () => {
  return (
    <div className="t-navbar">
      <div className="activity">
        <span>
          <img src={activityCall} alt="" className="activity-icon" />
        </span>
        Activity
      </div>
      <div>Inbox</div>
      <HiOutlineDotsVertical style={{ color: "#ccc" }} />
      <div>All calls</div>
      <HiOutlineDotsVertical style={{ color: "#ccc" }} />
    </div>
  );
};

export default TopNavbar;
