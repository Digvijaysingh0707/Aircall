import React, { useState } from 'react'
import { archiveCall, getCallDetailsById } from '../services/call'
import moment from 'moment'
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DownArrow from "../assests/down-arrow.png";
import LeftArrow from "../assests/icons8-left-50.png";


const ArchivedCall = ({ list, checkArchived, setCheckArchived }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [toggleArchiveButton, setToggleArchiveButton] = useState([])
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

  const handleLinkClick = async (id, i) => {
    try {
      let archiveButtonList = [...toggleArchiveButton]
      archiveButtonList[i] = true
      setToggleArchiveButton(archiveButtonList)
      const response = await getCallDetailsById(id)

      if (response) {
        let archiveButtonList = [...toggleArchiveButton]
        archiveButtonList[i] = true
        setToggleArchiveButton(archiveButtonList)
      }

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
      <ul className="chat-list">
        {list.map((contact, i) => (
          contact?.to && (
            <li key={contact?.id} className="chat-item" onClick={() => handleLinkClick(contact?.id, i)}>

              <span
                style={{
                  cursor: 'pointer',
                  color: 'red',
                  fontSize: '25px',
                  fontWeight: 'bold'
                }}
                className="direction"
              >
                {contact.to ?? "NA"}
              </span>
              <span style={{ fontSize: '12px', color: 'gray', marginLeft: '5px' }}>{contact.call_type ?? "NA"}</span>
              <span style={{ fontSize: '12px', color: 'gray', marginLeft: '5px', float: 'right' }}>
                {moment(contact?.created_at).format('hh:mm A')}
              </span>

              {toggleArchiveButton?.[i] &&
                <div>
                  <Button variant='outlined' onClick={(e) => {
                    e.stopPropagation(); // Prevent the row click event from being triggered
                    handleArchiveAndClose(contact);
                  }}>
                    Archive
                  </Button>

                </div>
              }
            </li>
          )
        ))}

      </ul>

    </ div>
  )
}

export default ArchivedCall