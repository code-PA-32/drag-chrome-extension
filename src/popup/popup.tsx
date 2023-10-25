import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom/client";

interface MetaData {
  metaData: {
    listingId: string;
    userEmail: string;
  }
}

const appContainer = document.createElement("div");
document.body.appendChild(appContainer);
document.body.style.margin = "0px"
document.body.style.padding = "0px"
document.body.style.overflow = "hidden"
document.body.style.cssText += `
  scrollbar-width: none;        
  -ms-overflow-style: none;    
`;

const styleElement = document.createElement("style");

styleElement.innerHTML = `
    body::-webkit-scrollbar {
        display: none;
    }
`;
document.head.appendChild(styleElement);

const getMetaData = async () => {
  let data: MetaData;
  await chrome.storage.local.get(["metaData"]).then((result: MetaData) => {
    data = result;
  });
  return {data};
};


const getData = async (id: string) => {
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
const getData2 = async (id: string) => {
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


const IframeData = () => {
  const [iframeContent, setIframeContent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    chrome.storage.local.get(["currentUrl"]).then(async (result) => {
      const url = new URL(result.currentUrl);
      const search = url.search ?? "";
      const baseUrl = url.origin + url.pathname;
      const pathNames = url.pathname.split("/") ?? [];
      const id = pathNames[pathNames.length - 1] ?? "";

      const metaData = await getMetaData();
      console.log(metaData);

      switch (baseUrl) {
        case "https://findbusinesses4sale.retool.com/embedded/public/51c1eb5c-df14-4c7c-8147-a3af5af0c55a":
          setIframeContent(
            <iframe
              src={`https://findbusinesses4sale.retool.com/embedded/public/51c1eb5c-df14-4c7c-8147-a3af5af0c55a${search}`}
              width="500px"
              height="600px"
            ></iframe>
          );
          break;
        case "https://findbusinesses4sale.retool.com/embedded/public/5930af07-b2d5-4070-90d3-9e863e2b1c03":
          setIframeContent(
            <iframe
              src={`https://findbusinesses4sale.retool.com/embedded/public/5930af07-b2d5-4070-90d3-9e863e2b1c03${search}`}
              width="500px"
              height="600px"
            ></iframe>
          );
          break;
        case `https://findbusinessesforsale.pipedrive.com/deal/${id}`:
          const user = await getData(id);
          setIframeContent(
            <iframe
              src={`https://findbusinesses4sale.retool.com/embedded/public/d3afb7a7-9e26-4fc7-94a9-c6a6d4619871?email_value=${user}`}
              width="500px"
              height="600px"
            ></iframe>
          );
          break;
        case `https://manojkukreja.followupboss.com/2/people/view/${id}`:
          const user_fub = await getData2(id);
          setIframeContent(
            <iframe
              src={`https://findbusinesses4sale.retool.com/embedded/public/d3afb7a7-9e26-4fc7-94a9-c6a6d4619871?email_value=${user_fub}`}
              width="500px"
              height="600px"
            ></iframe>
          );
          break;
        default:
          setIframeContent(
            <iframe
              src="https://findbusinesses4sale.retool.com/embedded/public/cf559bd3-933a-4a04-9687-3ebaa3e0570f?retool_dashboard_public_key=467f8c24-2333-49fe-9de8-3f58b085939e"
              width="500px"
              height="600px"
            ></iframe>
          );
          break;
      }
    });
  }, []);

  return iframeContent;
}


ReactDOM.createRoot(appContainer).render(<IframeData/>);
