import React, { useState } from "react";
import { archiveCall, getCallDetailsById } from "../services/call";
import "../App.css";
import moment from "moment";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { HiOutlineDotsVertical } from "react-icons/hi";
import incommingCall from "../assests/incomming-.png";
import { MdCallMissed } from "react-icons/md";
import { MdCallReceived } from "react-icons/md";

const UnArchivedCall = ({ list, fetchActivitiesData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [toggleArchiveButton, setToggleArchiveButton] = useState([])
  const [rerenderKey, setRerenderKey] = useState(0);


  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleArchiveAndClose = (data) => {
    handleArchived(data);
    handleClose();
  };

  const handleArchived = async (data) => {
    try {
      let params = { is_archived: !data?.is_archived };
      let id = data?.id;
      const response = await archiveCall(id, params);
      forceRerender()
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleArchive = (i) => {
    let archiveButtonList = []
    archiveButtonList[i] = true
    setToggleArchiveButton(archiveButtonList)
  }

  const handleLinkClick = async (id, i) => {
    try {
      const response = await getCallDetailsById(id)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const forceRerender = () => {
    setRerenderKey((prevKey) => prevKey + 1);
  };

  const formatPhoneNumber = (phoneNumber) => {
    console.log(phoneNumber);
    const temp = phoneNumber.toString();
    if (temp && temp?.length >= 2) {
      // Insert a dash after the first two digits
      console.log(`${temp.substring(0, 2)}-${temp.substring(2)}`);
      return `${temp.substring(0, 2)}-${temp.substring(2)}`;
    }
    return phoneNumber;
  };

  return (
    <div key={rerenderKey} className="contact-history-container">
      <h2>Aircall Phone</h2>
      <ul
        className="chat-list"
        style={{
          border: "1px solid gray",
          borderRadius: "10px",
          paddingLeft: "1rem",
          paddingBottom: "1rem",
        }}
      >
        {list.map(
          (contact, i) =>
            contact?.to &&
            contact.from && (
              <li key={contact?.id} className="chat-item ccc" style={{ paddingBottom: '8px' }} onClick={() => toggleArchive(i)} >
                <div className="call">
                  {contact.call_type === "missed" ? (
                    <MdCallMissed size={25} style={{ color: "red" }} />
                  ) : (
                    <MdCallReceived size={25} style={{ color: "green" }} />
                  )}
                </div>
                <div className="contact-details">
                  <span
                    style={{
                      cursor: "pointer",
                      color: "black",
                      fontSize: "20px",
                      fontWeight: "bold",
                      fontFamily: "",
                    }}
                    onClick={() => handleLinkClick(contact?.id, i)}
                    className="direction"
                  >
                    {contact.from && formatPhoneNumber(contact.from)}
                  </span>
                  <span className="call-type">
                    tried to call {contact.to ?? "NA"}
                  </span>
                </div>

                {!toggleArchiveButton?.[i] ?
                  <span className="timestamp">
                    {moment(contact?.created_at).format("hh:mm A")}
                  </span>
                  :
                  <div>
                    <Button style={{ border: '1px solid gray', color: 'gray', marginBottom: '10px', height: '30px' }} onClick={(e) => {
                      e.stopPropagation();
                      handleArchiveAndClose(contact);
                    }}>
                      Archive
                    </Button>

                  </div>
                }
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default UnArchivedCall;