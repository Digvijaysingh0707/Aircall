import Button from "@mui/material/Button";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { MdCallMissed, MdCallReceived } from "react-icons/md";
import "../App.css";
import { archiveCall } from "../services/call";
import { calculateDaysFromToday, calculatePeriod } from "../utils/helperFunctions";

const AllCall = ({ list }) => {
  const [rerenderKey, setRerenderKey] = useState(0);
  const [toggleArchiveButton, setToggleArchiveButton] = useState([]);
  const [newList, setNewList] = useState([]);

  const handleArchived = async (data) => {
    try {
      let params = { is_archived: !data?.is_archived };
      let id = data?.id;
      const response = await archiveCall(id, params);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateCallArray = (list) => {
    const updatedArray = list.map((call) => {
      const daysDifference = calculateDaysFromToday(call.created_at);
      const callDay = daysDifference;

      return { ...call, call_day: callDay };
    });

    return updatedArray;
  };


  const formatPhoneNumber = (phoneNumber) => {

    const temp = phoneNumber.toString();
    if (temp && temp?.length >= 2) {
      return `${temp.substring(0, 2)}-${temp.substring(2)}`;
    }
    return phoneNumber;
  };

  const forceRerender = () => {
    setRerenderKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    if (!list || list?.length == 0) return
    if (list?.length > 0) {
      const updatedList = updateCallArray(list);
      updatedList?.length > 0 ? setNewList(updatedList) : setNewList([]);
    }
  }, [list]);


  return (
    <div className="contact-history-container">
      <h2>All Phone Calls</h2>
      <ul
        className="chat-list"
        style={{
          marginTop: "-10px",
        }}
      >
        {newList &&
          newList?.length > 0 &&
          newList.map(
            (contact, i) =>
              contact?.to &&
              contact.from && (
                <li
                  key={contact?.id}
                  className="chat-item ccc"
                  style={{
                    paddingBottom: "8px",
                    border: "1px solid #dfdfdf",
                    borderRadius: "10px",
                    margin: "20px 20px 10px 5px",
                    padding: "15px 15px 15px 15px",
                  }}
                >
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
                        color: "black",
                        fontSize: "20px",
                        fontWeight: "bold",
                        fontFamily: "",
                      }}
                      className="direction"
                    >
                      {contact.from && formatPhoneNumber(contact.from)}
                    </span>
                    <span className="call-type">
                      tried to call {contact.to ?? "NA"}
                    </span>
                  </div>

                  {!toggleArchiveButton?.[i] ? (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span className="timestamp">
                        {moment(contact?.created_at).format("hh:mm A")}
                      </span>
                      <span className="timestamp">
                        {calculatePeriod(contact.call_day)}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <Button
                        style={{
                          border: "1px solid gray",
                          color: "gray",
                          height: "30px",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleArchived(contact);
                          forceRerender();
                        }}
                      >
                        Archive
                      </Button>
                    </div>
                  )}
                </li>
              )
          )}
      </ul>
    </div>
  );
};

export default AllCall;