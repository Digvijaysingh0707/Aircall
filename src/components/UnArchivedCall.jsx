import React, { useState } from 'react'
import { archiveCall, getCallDetailsById } from '../services/call'
import "../App.css"
import moment from 'moment'
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DownArrow from "../assests/down-arrow.png";


const UnArchivedCall = ({ list }) => {
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
    handleClose(); 
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
    < div  >
      <h2>Aircall Phone</h2>
      <ul className="chat-list">
        {list.map((contact) => (
          contact?.to && (
            <li key={contact?.id} className="chat-item" >

              <span
                style={{
                  cursor: 'pointer',
                  color: 'red',
                  fontSize: '25px',
                  fontWeight: 'bold'
                }}
                onClick={() => handleLinkClick(contact?.id)}
                className="direction"
              >
                {contact.to ?? "NA"}
              </span>
              <span style={{ fontSize: '12px', color: 'gray', marginLeft: '5px' }}>{contact.call_type ?? "NA"}</span>
              <span style={{ fontSize: '12px', color: 'gray', marginLeft: '5px', float: 'right' }}>
                {moment(contact?.created_at).format('hh:mm A')}
              </span>

              <div>
                <Button aria-describedby={id} onClick={handleClick}>
                  <img src={DownArrow} alt="Down Arrow" style={{ width: '16px', height: '16px' }} />
                </Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'right',
                    horizontal: 'right',
                  }}
                  PaperProps={{ elevation: 0 }}
                >

                  <Typography sx={{ p: 2, cursor: 'pointer', border: '1px solid #ccc',borderRadius:'12px', display: 'flex', justifyContent: 'flex-end' }} onClick={() => handleArchiveAndClose(contact)}>Archive</Typography>
                </Popover>
              </div>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default UnArchivedCall