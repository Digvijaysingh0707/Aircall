import React, { useState } from 'react'
import { archiveCall, getCallDetailsById } from '../services/call'
import moment from 'moment'
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LeftArrow from "../assests/icons8-left-50.png";

import { HiOutlineDotsVertical } from "react-icons/hi";
import incommingCall from "../assests/incomming-.png";
import missedCall from "../assests/missed-call.png";


const ArchivedCall = ({ list, checkArchived, setCheckArchived }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleArchiveAndClose = (data) => {
    handleArchived(data);
    handleClose(); // Close the Popover after handling the archived action
  };


  const handleArchived = async (data) => {
    try {
      let params = { is_archived: !data?.is_archived }
      let id = data?.id

      const response = await archiveCall(id, params)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleLinkClick = async (id) => {
    try {
      const response = await getCallDetailsById(id)
      console.log(response, '..............response')
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }



  return (
    < div >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={LeftArrow}
          onClick={() => setCheckArchived(!checkArchived)}
          alt="Left Arrow"
          style={{ width: '30px', height: '30px', cursor: 'pointer' }}
        />
        <h2 style={{ marginLeft: '10px' }}>Archived Call</h2>
      </div>
      <ul
        className="chat-list"
        style={{
          border: '1px solid #ccc',
          borderRadius: "10px",
          paddingLeft: "1rem",
          paddingBottom: "1rem",
        }}
      >
        {list.map(
          (contact) =>
            contact?.to && (
              <li key={contact?.id} className="chat-item">
                <div className="call">
                  {contact.call_type === "missed" ? (
                    <img src={missedCall} className="call-image" />
                  ) : (
                    <img src={incommingCall} className="call-image" />
                  )}
                </div>
                <div className="contact-details">
                  <span
                    style={{
                      cursor: "pointer",
                      color: "red",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                    onClick={() => handleLinkClick(contact?.id)}
                    className="direction"
                  >
                    {contact.to ?? "NA"}
                  </span>
                  <span className="call-type">
                    {contact.call_type ?? "NA"}
                  </span>
                </div>
                <div className="options">
                  <Button aria-describedby={id} onClick={handleClick}>
                    <HiOutlineDotsVertical style={{ color: "gray" }} />
                  </Button>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    PaperProps={{ elevation: 0 }}
                  >
                    <Typography
                      sx={{
                        p: 2,
                        cursor: "pointer",
                        border: "1px solid #ccc",
                        borderRadius: "12px",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                      onClick={() => handleArchiveAndClose(contact)}
                    >
                      Archive
                    </Typography>
                  </Popover>
                </div>
                <span className="timestamp">
                  {moment(contact?.created_at).format("hh:mm A")}
                </span>
              </li>
            )
        )}
      </ul>

    </ div>
  )
}

export default ArchivedCall