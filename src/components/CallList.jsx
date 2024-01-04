import React, { useEffect, useState } from 'react';
import { getCallList } from '../services/call';
import ArchivedCall from './ArchivedCall';
import UnArchivedCall from './UnArchivedCall';
import "../App.css"
import ArchiveIcon from "../assests/archive.png";

const options = [
  {
    id: "1",
    created_at: "2024-01-04T12:00:00",
    direction: "inbound",
    from: "123-456-7890",
    to: "987-654-3210",
    via: "Aircall-1",
    duration: 180,
    is_archived: false,
    call_type: "answered",
  },
  {
    id: "2",
    created_at: "2024-01-04T12:15:00",
    direction: "outbound",
    from: "987-654-3210",
    to: "234-567-8901",
    via: "Aircall-2",
    duration: 120,
    is_archived: true,
    call_type: "missed",
  },
  {
    id: "3",
    created_at: "2024-01-04T12:30:00",
    direction: "inbound",
    from: "345-678-9012",
    to: "789-012-3456",
    via: "Aircall-3",
    duration: 240,
    is_archived: false,
    call_type: "voicemail",
  },
  {
    id: "4",
    created_at: "2024-01-04T12:45:00",
    direction: "outbound",
    from: "789-012-3456",
    to: "123-456-7890",
    via: "Aircall-4",
    duration: 150,
    is_archived: true,
    call_type: "answered",
  },
  {
    id: "5",
    created_at: "2024-01-04T13:00:00",
    direction: "inbound",
    from: "234-567-8901",
    to: "345-678-9012",
    via: "Aircall-5",
    duration: 180,
    is_archived: false,
    call_type: "missed",
  },
  {
    id: "6",
    created_at: "2024-01-04T13:15:00",
    direction: "outbound",
    from: "456-789-0123",
    to: "567-890-1234",
    via: "Aircall-6",
    duration: 210,
    is_archived: true,
    call_type: "answered",
  },
  {
    id: "7",
    created_at: "2024-01-04T13:30:00",
    direction: "inbound",
    from: "567-890-1234",
    to: "678-901-2345",
    via: "Aircall-7",
    duration: 90,
    is_archived: false,
    call_type: "voicemail",
  },
  {
    id: "8",
    created_at: "2024-01-04T13:45:00",
    direction: "outbound",
    from: "678-901-2345",
    to: "789-012-3456",
    via: "Aircall-8",
    duration: 120,
    is_archived: true,
    call_type: "missed",
  },
  {
    id: "9",
    created_at: "2024-01-04T14:00:00",
    direction: "inbound",
    from: "789-012-3456",
    to: "123-456-7890",
    via: "Aircall-9",
    duration: 180,
    is_archived: false,
    call_type: "answered",
  },
  {
    id: "10",
    created_at: "2024-01-04T14:15:00",
    direction: "outbound",
    from: "123-456-7890",
    to: "234-567-8901",
    via: "Aircall-10",
    duration: 150,
    is_archived: true,
    call_type: "voicemail",
  },
];


const CallList = () => {



  const [archivedCallList, setArchivedCallList] = useState([])
  const [checkArchived, setCheckArchived] = useState(false)
  const [callList, setCallList] = useState([]);

  const sortCallList = (list) => {
    const sortedArchivedCalllist = list.sort((a, b) => {
      const dateA = new Date(a?.created_at);
      const dateB = new Date(b?.created_at);
      return dateB - dateA;
    });
    return sortedArchivedCalllist
  }


  const fetchActivitiesData = async () => {
    try {
      // const response = await getCallList();
      // const data = response?.data
      const data = options
      console.log("callList",data)
      const unarchivedCalllist = data?.filter(item => item?.is_archived == false)
      const archivedCalllist = data?.filter(item => item?.is_archived == true)
      const sortedCallListArchived = sortCallList(archivedCalllist)
      const sortedCallListUnArchived = sortCallList(unarchivedCalllist)


      // const groupedByDay = sortedCallListArchived.reduce((result, item) => {
      //   const date = new Date(item.created_at).toLocaleDateString();
      //   console.log(date,'...............date')
      //   if (!result[date]) {
      //     result[date] = [];
      //   }
      //   result[date].push(item);
      //   return result;
      // }, {});

      //  console.log(groupedByDay,'..............groupedByDay')

      setArchivedCallList(sortedCallListArchived)
      setCallList(sortedCallListUnArchived)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchActivitiesData();
  }, []);

  return (    
    <div className="aircall-phone-container">
=      {!checkArchived ?
        <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc' }}>
          <img src={ArchiveIcon} style={{ width: '20px', height: '20px' }} />
          <div className="chat-item" style={{ fontSize: '20px', color: 'gray', marginLeft: '5px', cursor: 'pointer' }} onClick={() => setCheckArchived(!checkArchived)}>
            Archived ({archivedCallList?.length})
          </div>
        </div>

        : null
      }
      {checkArchived ?
        <ArchivedCall list={archivedCallList} checkArchived={checkArchived} setCheckArchived={setCheckArchived} />
        :
        <UnArchivedCall list={callList} />
      }
    </div>
  );
};

export default CallList;
