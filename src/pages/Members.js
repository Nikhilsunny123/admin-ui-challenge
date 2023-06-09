import React, { useEffect, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";

import "./Members.css";
import {
  editData,
  fetchData,
  filterData,
  handleEdit,
} from "../components/commonFunctions";
import ModalDelete from "../components/ModalDelete";
import ModalEdit from "../components/ModalEdit";
const Members = () => {
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //search
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const filteredData = filterData(data, searchQuery);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

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
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  //selecting rows
  const handleRowClick = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowid) => rowid !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAllRows = (event) => {
    if (event.target.checked) {
      setSelectedRows(currentRows.map((member) => member.id));
    } else {
      setSelectedRows([]);
    }
  };
  const isRowSelected = (id) => {
    return selectedRows.includes(id);
  };

  //Delete

  const handleDeleteSelectedRows = () => {
    const newData = data.filter((member) => !selectedRows.includes(member.id));
    setData(newData);
    setSelectedRows([]);
    setCurrentPage(1);
  };

  const ondeleteData = (member) => {
    const datas = data.filter((value) => value.id !== member.id);
    setData(datas);
    console.log(datas);
  };

  useEffect(() => {
    fetchData(setData);
  }, []);

  console.log(selectedRows);

  return (
    <div className="main">
      <input
        className="input"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search by name email or role"
      />
      <div className="container">
        <table className="table">
          <thead className="thead">
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedRows.length === 0 ? false : true}
                  onClick={handleSelectAllRows}
                />
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
                  onClick={() => setIsEdit(true)}
                  setData={setData}
                  data={data}
                  member={member}
                  setIsEdit={setIsEdit}
                  handleEdit={handleEdit}
                  isEdit={isEdit}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
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
                      <ModalDelete
                        ondeleteData={ondeleteData}
                        member={member}
                      />
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      {!isEdit && (
        <div className="bottom">
          {selectedRows.length !== 0 ? (
            <button onClick={handleDeleteSelectedRows}>Delete Selected</button>
          ) : (
            <div></div>
          )}
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
      )}
    </div>
  );
};

export default Members;

const Edit = ({
  member,
  isEdit,
  setIsEdit,
  isModalOpen,
  setIsModalOpen,
  data,
  setData,
}) => {
  const [newName, setName] = useState(member.name);
  const [newEmail, setEmail] = useState(member.email);
  const [newRole, setRole] = useState(member.role);

  const onInputChange = (e, edit) => {
    edit(e.target.value);
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
        <ModalEdit
          setIsEdit={setIsEdit}
          editData={editData}
          id={member.id}
          data={data}
          isEdit={member.isEdit}
          newName={newName}
          newEmail={newEmail}
          newRole={newRole}
          setData={setData}
        />
      </td>
    </tr>
  );
};
