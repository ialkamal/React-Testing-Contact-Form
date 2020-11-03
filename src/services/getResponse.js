import axios from "axios";

function getResponse(data, setData) {
  axios
    .post("https://reqres.in/api/users", data)
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => console.log(err));
}

export default getResponse;
