import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import "./Members.css";
import {
  editData,
  fetchData,
  filterData,
  handleEdit,
} from "../components/commonFunctions";
const Members = () => {
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  // const [searchQuery, setSearchQuery] = useState("");

  // const handleSearchInputChange = (event) => {
  //   console.log(event.target.value);
  //   filterData(event.target.value);
  // };

  // const handleRowClick = (rowData) => {
  //   setSelectedRow(rowData);
  // };

  const ondeleteData = (member) => {
    const datas = data.filter((value) => value.id !== member.id);
    setData(datas);
    console.log(datas);
  };

  useEffect(() => {
    fetchData(setData);
  }, []);

  return (
    <div className="main">
      <input
        className="input"
        // value={searchQuery}
        onKeyUp={(e) => filterData(e, data, setData)}
        placeholder="Search by name email or role"
      />
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
              member.isEdit ? (
                <Edit
                  setData={setData}
                  data={data}
                  member={member}
                  setIsEdit={setIsEdit}
                  handleEdit={handleEdit}
                  isEdit={isEdit}
                  // handleRowClick={handleRowClick}
                />
              ) : (
                <tr id={member.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.role}</td>
                  <td
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <EditIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setIsEdit(true);
                        handleEdit(member.id, data, isEdit, setData);
                      }}
                    />
                    {!isEdit && (
                      <DeleteForeverIcon
                        style={{ cursor: "pointer" }}
                        onClick={(value) => {
                          ondeleteData(member);
                          console.log(value);
                        }}
                      />
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <button>Delete Selected</button>
    </div>
  );
};

export default Members;

const Edit = ({ member, isEdit, setIsEdit, handleEdit, data, setData }) => {
  const [newName, setName] = useState(member.name);
  const [newEmail, setEmail] = useState(member.email);
  const [newRole, setRole] = useState(member.role);

  const onInputChange = (e, edit) => {
    console.log(e.target.value);
    edit(e.target.value);
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <tr id={member.id}>
      <td>
        <input type="checkbox" />
      </td>

      <td>
        <input
          type="text"
          value={newName}
          onChange={(e) => onInputChange(e, setName)}
        />
      </td>
      <td>
        <input
          type="text"
          value={newEmail}
          onChange={(e) => onInputChange(e, setEmail)}
        />
      </td>
      <td>
        <input
          type="text"
          value={newRole}
          onChange={(e) => onInputChange(e, setRole)}
        />
      </td>
      <td style={{ display: "flex", justifyContent: "space-between" }}>
        <SaveIcon
          onSubmit={onSubmit}
          style={{ cursor: "pointer" }}
          onClick={(value) => {
            setIsEdit(false);
            editData(
              member.id,
              data,
              member.isEdit,

              newName,
              newEmail,
              newRole,
              setData
            );

            console.log(value);
          }}
        />
      </td>
    </tr>
  );
};
