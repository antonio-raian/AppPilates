import api from "../Api";

export const post = async (route, obj) => {
  const token = localStorage.getItem("token");
  return await api
    .post(route, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.data) {
        return res.data;
      }
      return false;
    })
    .catch((err) => {
      throw err;
    });
};

export const get = async (route) => {
  const token = localStorage.getItem("token");
  return await api
    .get(route, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.data) {
        return res.data;
      }
      return false;
    })
    .catch((err) => {
      throw err;
    });
};

export const remove = async (route, obj) => {
  const token = localStorage.getItem("token");
  return await api
    .delete(route, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.data) {
        return true;
      }
      return false;
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
};
