export const getUserById = async (userId: string) => {
  fetch(`http://localhost:8000/users/v1/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => {
    response.json().then((data) => data);
  });
};

export const getUserByUsername = async (username: string) => {
  fetch(`http://localhost:8000/users/${username}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    res.json().then((data) => data);
  });
};
