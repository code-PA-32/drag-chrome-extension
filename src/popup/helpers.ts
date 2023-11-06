interface MetaData {
  metaData: {
    listingId: string;
    userEmail: string;
  }
}

export const getMetaData = async () => {
  return await chrome.storage.local.get(["metaData"]).then((result: MetaData) => result.metaData);
};

export const getEmailByID = async (id: string) => {
  if (!id) return;
  try {
    const response = await fetch(
      `https://api.pipedrive.com/v1/deals/${id}?api_token=3bfa120858adfd568037072d7e75886d7f10e4c5`
    );
    const res = await response.json();
    const url = new URL(res.data["d11fae2f25edbec3ee6f6b954fc5bcbc79b04baf"])
    return url.searchParams.get("email_value")
  } catch (e) {
    console.info(e)
  }
};

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Basic ${btoa("fka_07EXxVqqM3qQR2Zp74Ll35Oi5J9glTgQ9I")}`,
  },
};
export const getChatID = async (id: string): Promise<{ customFB4SLeadID: string, id: number } | null> => {
  if (!id) return;
  try {
    const res = await fetch(
      `https://api.followupboss.com/v1/people/${id}?fields=customFB4SLeadID`,
      options
    );
    const data = await res.json();
    if (data.customFB4SLeadID) return data;
    return null;
  } catch (e) {
    console.info(e)
  }
};
