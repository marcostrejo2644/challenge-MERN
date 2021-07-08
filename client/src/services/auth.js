import axios from 'axios';

const URL_API = `http://localhost:4000/api/login/`;

const login = async (email, password) => {
  try {
    const data = await axios.post(URL_API, {
      email,
      password,
    });
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = () => {
  localStorage.removeItem('user');
};

const verifyUser = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    const { status } = await axios.post(URL_API + 'auth', token, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    return {
      username: user.username,
      status,
    };
  } catch (error) {
    console.log(error);
  }
};

export default { login, deleteUser, verifyUser };
