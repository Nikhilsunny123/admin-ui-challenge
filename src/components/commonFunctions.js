export const fetchData = (setData) => {
  const convertUpper = (str) => {
    const newstr = str.charAt(0).toUpperCase() + str.slice(1);
    return newstr;
  };
  const response = fetch(
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const sortedData = data.sort((a, b) => a.id - b.id);
      const updated = sortedData.map((member) => {
        return {
          ...member,
          role: convertUpper(member.role),
          isEdit: false,
          isDelete: false,
        };
      });
      setData(updated);
      console.log(updated);
    })
    .catch((error) => {
      console.error(error);
    });
  return response;
};

export const filterData = (key, data, setData) => {
  const searchQuery = key.target.value.toLowerCase();
  const filtered = data.filter((row) =>
    Object.values(row).join(" ").toLowerCase().includes(searchQuery)
  );
  setData(searchQuery ? filtered : data);
};

export const handleEdit = (id, data, isEdit, setData) => {
  const updatedData = data.map((member) => {
    if (member.id === id) {
      return { ...member, isEdit: !isEdit };
    }
    return member;
  });
  setData(updatedData);
  console.log(updatedData);
};

export const editData = (
  id,
  data,
  isEdit,
  newName,
  newEmail,
  newRole,
  setData
) => {
  const updatedData = data.map((member) => {
    if (member.id === id) {
      return {
        ...member,
        name: newName,
        email: newEmail,
        role: newRole,
        isEdit: !isEdit,
      };
    }
    return member;
  });
  setData(updatedData);
  console.log(updatedData);
};
