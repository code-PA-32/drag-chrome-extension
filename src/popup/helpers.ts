import cryptoJS from "crypto-js";
interface MetaData {
  metaData: {
    listingId: string;
    userEmail: string;
  }
}
const ciphertext = cryptoJS.AES.encrypt('my message', 'secret key 123').toString();
export default ciphertext

export const getMetaData = async () => {
  let data: MetaData;
  await chrome.storage.local.get(["metaData"]).then((result: MetaData) => {
    data = result;
  });
  console.log(data, "from helpers script")
  return { data };
};

export const getData = async (id: string) => {
  let data = "test";
  if (id) {
    const response = await fetch(
      `https://api.pipedrive.com/v1/deals/${id}?api_token=3bfa120858adfd568037072d7e75886d7f10e4c5`
    );
    const res = await response.json();
    data = res["data"]["d11fae2f25edbec3ee6f6b954fc5bcbc79b04baf"].replace(
      "https://findbusinesses4sale.retool.com/embedded/public/5930af07-b2d5-4070-90d3-9e863e2b1c03?is_market_leader=true&email_value=",
      ""
    );
  }
  return data;
};
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Basic ${btoa("fka_07EXxVqqM3qQR2Zp74Ll35Oi5J9glTgQ9I")}`,
  },
};
export const getData2 = async (id: string) => {
  let data: any;
  if (id) {
    data = await fetch(
      `https://api.followupboss.com/v1/people/${id}`,
      options
    );
    const res = await data.json();
    data = res["emails"][0]["value"];
  }
  return data;
};
