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
  // const handleRowClick = (rowData) => {
  //   setSelectedRow(rowData);
  // };

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
                  // handleRowClick={handleRowClick}
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

  data,
  setData,
}) => {
  const [name, setName] = useState(member.name);
  const [email, setEmail] = useState(member.email);
  const [role, setRole] = useState(member.role);
  const onInputChange = (e, edit) => {
    console.log(e.target.value);
    edit(e.target.value);
  };
  const onEdit = (value) => {
    const d = value.map((obj) => {
      if (obj.id === value.id) {
        return d;
      }
      return obj;
    });
    console.log(d);
  };

  return (
    <tr id={member.id}>
      <td>
        <input type="checkbox" />
      </td>
      <td>
        <input
          type="text"
          value={name}
          onChange={(e) => onInputChange(e, setName)}
        />
      </td>
      <td>
        <input
          type="text"
          value={email}
          onChange={(e) => onInputChange(e, setEmail)}
        />
      </td>
      <td>
        <input
          type="text"
          value={role}
          onChange={(e) => onInputChange(e, setRole)}
        />
      </td>
      <td style={{ display: "flex", justifyContent: "space-between" }}>
        <SaveIcon
          style={{ cursor: "pointer" }}
          onClick={(value) => {
            setIsEdit(false);
            // onEdit(value);
            console.log(value);
          }}
        />
      </td>
    </tr>
  );
};
