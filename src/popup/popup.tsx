import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import {Iframe} from "./iframe";
import {getData, getData2, getMetaData} from "./helpers";

const appContainer = document.getElementById("app");
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
            <Iframe url={`https://findbusinesses4sale.retool.com/embedded/public/51c1eb5c-df14-4c7c-8147-a3af5af0c55a${search}`}/>
          );
          break;
        case "https://findbusinesses4sale.retool.com/embedded/public/5930af07-b2d5-4070-90d3-9e863e2b1c03":
          setIframeContent(
          <Iframe url={`https://findbusinesses4sale.retool.com/embedded/public/5930af07-b2d5-4070-90d3-9e863e2b1c03${search}`}/>
          );
          break;
        case `https://findbusinessesforsale.pipedrive.com/deal/${id}`:
          const user = await getData(id);
          setIframeContent(
          <Iframe url={`https://findbusinesses4sale.retool.com/embedded/public/d3afb7a7-9e26-4fc7-94a9-c6a6d4619871?email_value=${user}`}/>
          );
          break;
        case `https://manojkukreja.followupboss.com/2/people/view/${id}`:
          const user_fub = await getData2(id);
          setIframeContent(
          <Iframe url={`https://findbusinesses4sale.retool.com/embedded/public/d3afb7a7-9e26-4fc7-94a9-c6a6d4619871?email_value=${user_fub}`}/>
          );
          break;
        default:
          setIframeContent(
            <img src="404.png" alt="404"/>
          );
          break;
      }
    });
  }, []);

  return iframeContent;
}


ReactDOM.createRoot(appContainer).render(<IframeData/>);
