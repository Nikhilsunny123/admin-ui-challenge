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
  const [selectedRows, setSelectedRows] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    if (
      pageNumber < 1 ||
      pageNumber > totalPages ||
      pageNumber === currentPage
    ) {
      return;
    }
    setCurrentPage(pageNumber);
  };
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  console.log({
    currentPage,
    rowsPerPage,
    indexOfLastRow,
    indexOfFirstRow,
    currentRows,
    totalPages,
    pageNumbers,
  });
  // const [searchQuery, setSearchQuery] = useState("");

  // const handleRowClick = (rowData) => {
  //   setSelectedRow(rowData);
  // };

  const ondeleteData = (member) => {
    const datas = data.filter((value) => value.id !== member.id);
    setData(datas);
    console.log(datas);
  };

  const handleRowClick = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowid) => rowid !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAllRows = (event) => {
    if (event.target.checked) {
      setSelectedRows(data.map((member) => member.id));
    } else {
      setSelectedRows([]);
    }
  };
  const isRowSelected = (id) => {
    return selectedRows.includes(id);
  };

  const handleDeleteSelectedRows = () => {
    const newData = data.filter((member) => !selectedRows.includes(member.id));
    setData(newData);
    setSelectedRows([]);
    setCurrentPage(1);
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
                <input type="checkbox" onClick={handleSelectAllRows} />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((member) =>
              member.isEdit ? (
                <Edit
                  setData={setData}
                  data={currentRows}
                  member={member}
                  setIsEdit={setIsEdit}
                  handleEdit={handleEdit}
                  isEdit={isEdit}
                  // handleRowClick={handleRowClick}
                />
              ) : (
                <tr
                  id={member.id}
                  style={{
                    backgroundColor: isRowSelected(member.id) && "grey",
                  }}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={isRowSelected(member.id)}
                      onClick={() => handleRowClick(member.id)}
                    />
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
      <div className="bottom">
        <button onClick={handleDeleteSelectedRows}>Delete Selected</button>
        <div>
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            {"<<"}
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>

          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={pageNumber === currentPage ? "active" : ""}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            {">>"}
          </button>
        </div>
      </div>
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
