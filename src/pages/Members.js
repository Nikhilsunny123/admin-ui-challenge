import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import "./Members.css";
const Members = () => {
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const convertUpper = (str) => {
    const newstr = str.charAt(0).toUpperCase() + str.slice(1);
    return newstr;
  };
  const handleRowClick = (rowData) => {
    setSelectedRow(rowData);
  };

  const ondeleteData = (member) => {
    const datas = data.filter((value) => value.id !== member.id);
    setData(datas);
    console.log(datas);
  };

  const fetchData = () => {
    const response = fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
    return response;
  };
  useEffect(() => {
    fetchData();
  }, []);
  // console.log(selectedRow);
  return (
    <div className="main">
      <input
        className="input"
        placeholder="Search by name email or role"
      ></input>
      <div className="container">
        <table className="table">
          <thead className="thead">
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((member) =>
              isEdit ? (
                <Edit
                  setData={setData}
                  data={data}
                  member={member}
                  convertUpper={convertUpper}
                  setIsEdit={setIsEdit}
                  handleRowClick={handleRowClick}
                />
              ) : (
                <tr id={member.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{convertUpper(member.role)}</td>
                  <td
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <EditIcon
                      style={{ cursor: "pointer" }}
                      onClick={(value) => {
                        setIsEdit(true);
                        console.log(value);
                      }}
                    />
                    <DeleteForeverIcon
                      style={{ cursor: "pointer" }}
                      onClick={(value) => {
                        ondeleteData(member);
                        console.log(value);
                      }}
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;

const Edit = ({
  member,
  convertUpper,
  setIsEdit,
  handleRowClick,
  data,
  setData,
}) => {
  const [inputData, setInputData] = useState({
    name: member.name,
    email: member.email,
    role: convertUpper(member.role),
  });

  const onInputChange = (event) => {
    // const { name, value } = event.target;
    // setInputData({
    //   ...inputData,
    //   [name]: value,
    // });
    console.log(event);
  };

  return (
    <tr id={member.id} onClick={() => handleRowClick(member)}>
      <td>
        <input type="checkbox" />
      </td>
      <td>
        <input type="text" value={inputData.name} onChange={onInputChange} />
      </td>
      <td>
        <input type="text" value={inputData.email} onChange={onInputChange} />
      </td>
      <td>
        <input type="text" value={inputData.role} onChange={onInputChange} />
      </td>
      <td style={{ display: "flex", justifyContent: "space-between" }}>
        <SaveIcon
          style={{ cursor: "pointer" }}
          onClick={(value) => {
            setIsEdit(false);
            onInputChange(value);
          }}
        />
      </td>
    </tr>
  );
};
