import React, { useEffect, useState } from "react";
import {
  getResponseData,
  postResponseData,
  putResponseData,
  deleteResponseData,
} from "../common/Api";
import moment from "moment";
import { MessageIcon } from "../common/Validations";

export default function Message(props) {
  const [messageData, setMessageData] = useState([]);
  const [messageID, setMessageID] = useState(null);
  const [messageEditData, setMessageEditData] = useState({});
  const [showEditDetails, setShowEditDetails] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
      ApiCalls();
  }, []);
  
  function RefreshPage() {
    setMessageData([]);
    setPage(0);
    getMessageData(0);
  }
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
      `GetMessageById?_id=${message._id}`
    ).then((res) => {
      if (res) {
        console.log(res.data.MessageDetailsById[0], "GetMessageById");
        onAdd();
        setShowEditDetails(true);
        setMessageEditData(res.data.MessageDetailsById[0]);
        if (!res.data.MessageDetailsById[0]?.is_read) {
          updateMessageData(
            res.data.MessageDetailsById[0]?._id,
            res.data.MessageDetailsById[0]?.is_read
          );
        }
      }
    });
  }

  async function updateMessageData(m_id, is_read) {
    await putResponseData(`EditMessageStatus?_id=${m_id}`, {
      is_read: !is_read,
    }).then((res) => {
      if (res) {
        setMessageData((e) =>
          e.map((item) => {
            if (item._id === m_id) {
              return { ...item, is_read: !item.is_read };
            }
            return item;
          })
        );
        setMessageEditData((e) => {
          return { ...e, is_read: !is_read };
        });
        props.messagecall()
      }
    });
  }

  const deleteMessageData = async (id, type) => {
    let eleId;
    if (type === "list") {
      eleId = `deleteIcon_${id}`;
    } else {
      eleId = `deleteIcon2_${id}`;
    }
    let btn = document.getElementById("fullpage-loader");
    btn.style.display = "block";
    await deleteResponseData(`messages/${id}`).then((res) => {
      if (res) {
        setShowEditDetails(false);
        setMessageData((e) => e.filter((e) => e._id !== id));
        btn.style.display = "none";
        props.messagecall();
      }
    });
  };

  function onAdd() {
    setMessageID("");
  }

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      getMessageData(page + 1);
    }
  };

  return (
    <div className="pd-20">
      <div className="delta-card pd-15">        
        <div className="card-header">
          <div className="page-title">
            <h3>Message</h3>
            <button type="button" className="btn btn-outline-dark" onClick={() => RefreshPage()}>
              <i className="fa fa-refresh" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <div className="message msg-scroll" onScroll={handleScroll}>
          {messageData.map((message, index) => {
              return (
            <div key={index} data={message.is_read} className={`message-card ${message.is_read ? "" : "read-msg"}`}>
              <div className="user-pic">
                {MessageIcon(message?.type)}
              </div>
              <div className="msg-info">
                <div className="message-sender">
                  <div className="user-name">{message.recipient}</div>
                  <div className="msg-time">{moment(message.date).format("h:mm a, DD MMM YYYY")}</div>
                  <div className="msg-icon">
                    <span className="d-tooltip env-btn" onClick={(e) =>
                          updateMessageData(message._id, message.is_read)
                        }>
                      <i
                        className={`fa ${
                          message.is_read ? "fa-envelope" : "fa-envelope-open"
                        }`}
                      ></i>
                      <div className="tooltiptext">
                        Mark as {message.is_read ? "Unread" : "Read"}
                      </div>
                    </span>
                    <span className="d-tooltip bin-btn" onClick={(e) => deleteMessageData(message._id, "list")}>
                      <i className="fa fa-trash-o"></i>
                      <div className="tooltiptext">Delete</div>
                    </span>
                  </div>
                </div>
                <div className="msg-severity">
                  <div>
                    {message.message}
                    {/* <a href="#" data-toggle="modal" data-target="#exampleModal">
                      more
                    </a> */}
                  </div>
                  <div>
                    <span className={`m-${message.severity}`}>
                        {message?.severity}
                    </span>
                  </div>
                </div>
              </div>
            </div>
              )
          })}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  erver 9.0 is activated by license, but the option of enable
                  guest account is grey.erver 9.0 is activated by license, but
                  the option of enable guest account is grey.erver 9.0 is
                  activated by license, but the option of enable guest account
                  is grey.erver 9.0 is activated by license, but the option of
                  enable guest account is grey.erver 9.0 is activated by
                  license, but the option of enable guest account is grey.erver
                  9.0 is activated by license, but the option of enable guest
                  account is grey.erver 9.0 is activated by license, but the
                  option of enable guest account is grey.erver 9.0 is activated
                  by license, but the option of enable guest account is
                  grey.erver 9.0 is activated by license, but the option of
                  enable guest account is grey.erver 9.0 is activated by
                  license, but the option of enable guest account is grey.erver
                  9.0 is activated by license, but the option of enable guest
                  account is grey.
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
}
