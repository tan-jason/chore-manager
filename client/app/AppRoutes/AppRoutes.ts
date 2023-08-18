export const getUserById = async (userId: string) => {
  fetch(`http://localhost:8000/users/v1/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(async (response) => {
    const data = await response.json();
    return data;
  });
};

export const getUserByUsername = async (username: string) => {
  fetch(`http://localhost:8000/users/${username}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const data = await res.json();
    return data;
  });
};

export const addUserToHouse = async (userId: string, houseCode: string) => {
  fetch(`http://localhost:8080/houses/v1/${houseCode}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    res.json().then((data) => {
      fetch("https://localhost:8080/houseuser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: String(userId),
          houseId: data.id,
        }),
      }).then((response) => response.ok);
    });
  });
};

export const getAllHouseChores = async (houseCode: string) => {
  return fetch(`http://localhost:8080/houses/v1/${houseCode}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json().then((data) => data.chores));
};

const verifyUser = async (userId: string | null | undefined) => {
  if (!userId) {
    return false;
  }
  return fetch(`http://localhost:8080/users/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.ok);
};

export const createChore = async (
  houseId: number,
  choreTitle: string,
  userId?: string | null,
  time?: Date | null
) => {
  console.log(houseId);
  return fetch("http://localhost:8080/chores", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: choreTitle,
      houseId: houseId,
      userId: (await verifyUser(userId)) ? userId : null,
      time: time,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json().then((data) => data);
    } else {
      return false;
    }
  });
};
