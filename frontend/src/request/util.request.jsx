// import * as axios from 'axios'

// const client = axios.default;

// const base = "http://127.0.0.1:7001";


 
// export async function verify(userName, password) {
//     return await client.post(base + "/api/verify",{userName:userName, password:password}).
//     then((response)=>{
//         return response.data
//     })
// }

// export async function getTitle() {
//     const result = await client.get(base);
//     return result.data;
// }
import axios from 'axios';

const client = axios.create({ baseURL: "http://127.0.0.1:7001" });

export async function verify(userName, password) {
  try {
    const response = await client.post('/api/verify', { userName, password });
    return response.data;
  } catch (error) {
    console.error("Error during verification:", error);
  }
}
