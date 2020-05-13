import api from "../Api";

export const post = async (route, obj) => {
  return await api
    .post(route, obj)
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
  try {
    return await api.get(route).then((res) => {
      if (res.data) {
        return res.data;
      }
      return false;
    });
  } catch (err) {
    return err;
  }
};

export const remove = async (route, obj) => {
  try {
    return await api.delete(route, { data: obj }).then((res) => {
      if (res.data) {
        return true;
      }
      return false;
    });
  } catch (err) {
    return false;
  }
};
