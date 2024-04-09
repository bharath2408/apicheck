import axios from "axios";

export default async function handler(req, res) {
  const response = await axios.get("https://catfact.ninja/fact");
  console.log(response.data);
  const data = response.data;

  return res.status(200).json({ status: 200, data });
}
