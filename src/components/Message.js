import React, { useEffect, useState, useRef } from "react";
import {
  getResponseData,
  putResponseData,
  deleteResponseData,
} from "../common/Api";
import { openCloseModal } from "../common/CustomModal";
import moment from "moment";

export default function Message() {
  const [messageData, setMessageData] = useState([]);
  const [messageID, setMessageID] = useState(null);
  const [messageEditData, setMessageEditData] = useState({});
  const [showEditDetails, setShowEditDetails] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
      ApiCalls();
  }, []);

  const ApiCalls = async () => {
    await getMessageData(page);
  }  

  async function getMessageData(pageSize) {
    await getResponseData(
      `GetMessages?Page=${pageSize === 0 ? 1 : pageSize}&Limit=10&search&filter`
    ).then((res) => {
      if (page === pageSize) {
        if (res) setMessageData(res.data.output.results || []);
      } else {
        if (res?.data?.output?.results.length > 0) {
          setMessageData((e) => [...e, ...res.data.output.results]);
          setPage((e) => e + 1);
        }
      }
    });
  }

  async function getMessageDataById(message) {
    await getResponseData(
      `GetMessageById?message_id=${message.message_id}`
    ).then((res) => {
      if (res) {
        console.log(res.data.MessageDetailsById[0], "GetMessageById");
        onAdd();
        setShowEditDetails(true);
        setMessageEditData(res.data.MessageDetailsById[0]);
        if (!res.data.MessageDetailsById[0]?.is_read) {
          updateMessageData(
            res.data.MessageDetailsById[0]?.message_id,
            res.data.MessageDetailsById[0]?.is_read
          );
        }
      }
    });
  }

  useEffect(() =>{
    console.log(messageData[0]);
  },[messageData]);

  async function updateMessageData(m_id, is_read) {
    await putResponseData(`EditMessageStatus?message_id=${m_id}`, {
      is_read: !is_read,
    }).then((res) => {
      if (res) {
        setMessageData((e) =>
          e.map((item) => {
            if (item.message_id === m_id) {
              return { ...item, is_read: !item.is_read };
            }
            return item;
          })
        );
        setMessageEditData((e) => {
          return { ...e, is_read: !is_read };
        });
      }
    });
  }

  function onAdd() {
    setMessageID("");
  }

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      console.log("Scroll Down");
      getMessageData(page + 1);
    }
  };

  const processChange = async (id,type) => { 
    let eleId;
    if(type ==="list"){
      eleId = `deleteIcon_${id}`;
    }else {
      eleId = `deleteIcon2_${id}`;
    }  
    let btn = document.getElementById(eleId);
    btn.style.pointerEvents = 'none';
    btn.setAttribute("disabled", true);
    await deleteResponseData(`DeleteMessage/`, {
      message_id: id,
    }).then((res) => {
      if (res) {
        setShowEditDetails(false);
        setMessageData((e) => e.filter((e) => e.message_id !== id));
        btn.style.pointerEvents = 'auto';
        btn.removeAttribute("disabled");
      }
    });
  };  

  return (
    <div className="pd-20">
      <div className="delta-card">        
        <div className="card-header">
          <div className="page-title">
            <h3>Message</h3>
          </div>
        </div>
        <br/>
        <div className="message">
          <div className="row m-flex">
            <div className="col-lg-4" style={{ height: "100%" }}>
              <div className="m-card" onScroll={handleScroll}>
                {messageData.map((message, index) => {
                  return (
                    <div
                      key={index}
                      className={`m-item ${
                        message.message_id === messageID ? "m-read" : ""
                      } ${message.is_read ? "not-read" : ""}`}
                    >
                      <div className="m-item-container">
                        <div>
                          <img
                            src={
                              require("../assets/images/icons8-person-80.png")
                                .default
                            }
                            alt="Profile"
                            className="profile-pic"
                          />
                        </div>
                        <div
                          className="details"
                          onClick={() => getMessageDataById(message)}
                        >
                          <div className="name-date">
                            <p>{message.recipient}</p>
                            <p>
                              {moment(message.date).format("h:mm a, MMM YYYY")}
                            </p>
                          </div>
                          <div className="message-status">
                            <p className="msg-txt">{message.message}</p>
                            <div>
                              <span className={`m-${message.serverity}`}>
                                {message.serverity}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="m-action-icon-item">
                          <button
                            className="d-tooltip icon-button"
                            onClick={(e) =>
                              updateMessageData(
                                message.message_id,
                                message.is_read
                              )
                            }
                          >
                            <i
                              className={`fa ${
                                message.is_read
                                  ? "fa-envelope"
                                  : "fa-envelope-open"
                              }`}
                            ></i>
                            <div className="tooltiptext">
                              Mark as {message.is_read ? "Unread" : "Read"}
                            </div>
                          </button>
                          <button                            
                            id={`deleteIcon_${message.message_id}`}
                            className="d-tooltip icon-button"
                            onClick={(e) =>
                              processChange(message.message_id,'list')
                            }
                          >
                            <i className="fa fa-trash-o"></i>
                            <div className="tooltiptext">Delete</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-lg-8">
              <div className="m-card">
                {showEditDetails ? (
                  <div className="message-details">
                    <div className="message-header">
                      <div className="message-info">
                        <div className="m-action-icon">
                          <button
                            className="d-tooltip icon-button"
                            onClick={(e) =>
                              updateMessageData(
                                messageEditData.message_id,
                                messageEditData.is_read
                              )
                            }
                          >
                            <i
                              className={`fa ${
                                messageEditData.is_read
                                  ? "fa-envelope"
                                  : "fa-envelope-open"
                              }`}
                            ></i>
                            <div className="tooltiptext">
                              Mark as{" "}
                              {messageEditData.is_read ? "Unread" : "Read"}
                            </div>
                          </button>
                          <button
                            id={`deleteIcon2_${messageEditData.message_id}`}
                            className="d-tooltip icon-button"
                            onClick={(e) =>
                              processChange(messageEditData.message_id)
                            }
                          >
                            <i className="fa fa-trash-o"></i>
                            <div className="tooltiptext">Delete</div>
                          </button>
                        </div>
                        <div>
                          <img
                            src={
                              require("../assets/images/icons8-person-80.png")
                                .default
                            }
                            alt="Profile"
                            className="m-profile-pic"
                          />
                        </div>
                        <div>
                          <div>
                            <p>{messageEditData.recipient}</p>
                          </div>
                          <p>
                            {moment(messageEditData.date).format(
                              "h:mm a, MMM YYYY"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p>{messageEditData.message}</p>
                  </div>
                ) : (
                  <div
                    className="no-message"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <img src={require("../assets/images/mesage.svg").default} />
                    Inbox
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
