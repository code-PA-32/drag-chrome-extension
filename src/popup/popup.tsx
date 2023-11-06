import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Iframe } from "./iframe";
import { ErrorMessage } from "./error-message";
import { getData, getData2, getMetaData } from "./helpers";
import cryptoJS from "crypto-js";

const appContainer = document.getElementById("app");
const IframeData = () => {
  const [iframeContent, setIframeContent] = useState(null);

  useEffect(() => {
    chrome.storage.local.get(["currentUrl"]).then(async (result) => {
      const url = new URL(result.currentUrl);
      const search = url.search ?? "";
      const baseUrl = url.origin + url.pathname;
      const pathNames = url.pathname.split("/") ?? [];
      const id = pathNames[pathNames.length - 1] ?? "";
      const metaData = await getMetaData();


      if (baseUrl.includes("https://www.findbusinesses4sale.com/listing") || baseUrl.includes("https://www.findbusinesses4sale.com/commercial-listing")) {

        if (metaData.listingId === "N/A" || metaData.userEmail === "N/A") {
          setIframeContent(
            <ErrorMessage
              err="An error occurred while getting data from metaData or user is not logged in, case: listing, commercial-listing"/>
          );
          console.info("An error occurred while getting data from metaData or user is not logged in, case: listing, commercial-listing");
          return;
        }

        const crypted_email = cryptoJS.AES.encrypt(metaData.userEmail, "FB4S").toString()
        const profile_key = cryptoJS.AES.encrypt(metaData.listingId, "FB4S").toString()
        setIframeContent(
          <Iframe
            url={`https://findbusinesses4sale.retool.com/embedded/public/74e99d98-a3b8-4cf2-b901-6cac17f48bcf?chrome_extension_key=${crypted_email}&profile_key=${profile_key}`}/>
        );
        return;
      } else if (baseUrl.includes("https://www.findbusinesses4sale.com/broker-dashboard")) {

        if (metaData.userEmail === "N/A") {
          setIframeContent(
            <ErrorMessage
              err="An error occurred while getting data from metaData or user is not logged in, case: broker-dashboard"/>
          );
          console.info("An error occurred while getting data from metaData or user is not logged in, case: broker-dashboard");
          return;
        }

        const crypted_email = cryptoJS.AES.encrypt(metaData.userEmail, "FB4S").toString()
        setIframeContent(
          <Iframe
            url={`https://findbusinesses4sale.retool.com/embedded/public/cf559bd3-933a-4a04-9687-3ebaa3e0570f?chrome_extension_key=${crypted_email}`}/>
        );
        return;
      } else if (baseUrl.includes("https://findbusinessesforsale.pipedrive.com/deal")) {
        setIframeContent(
          <Iframe
            url={`https://findbusinesses4sale.retool.com/embedded/public/cf559bd3-933a-4a04-9687-3ebaa3e0570f?chrome_extension_key=`}/>
        );
      } else {
        setIframeContent(
          <ErrorMessage
            err=""/>
        );
        console.info("Error, extension is out of watched links");
        return;
      }


      // switch (baseUrl) {
      //   case "https://findbusinesses4sale.retool.com/embedded/public/51c1eb5c-df14-4c7c-8147-a3af5af0c55a":
      //     setIframeContent(
      //       <Iframe
      //         url={`https://findbusinesses4sale.retool.com/embedded/public/51c1eb5c-df14-4c7c-8147-a3af5af0c55a${search}`}/>
      //     );
      //     break;
      //   case "https://findbusinesses4sale.retool.com/embedded/public/5930af07-b2d5-4070-90d3-9e863e2b1c03":
      //     setIframeContent(
      //       <Iframe
      //         url={`https://findbusinesses4sale.retool.com/embedded/public/5930af07-b2d5-4070-90d3-9e863e2b1c03${search}`}/>
      //     );
      //     break;
      //   case `https://findbusinessesforsale.pipedrive.com/deal/${id}`:
      //     const user = await getData(id);
      //     setIframeContent(
      //       <Iframe
      //         url={`https://findbusinesses4sale.retool.com/embedded/public/d3afb7a7-9e26-4fc7-94a9-c6a6d4619871?email_value=${user}`}/>
      //     );
      //     break;
      //   case `https://manojkukreja.followupboss.com/2/people/view/${id}`:
      //     const user_fub = await getData2(id);
      //     setIframeContent(
      //       <Iframe
      //         url={`https://findbusinesses4sale.retool.com/embedded/public/d3afb7a7-9e26-4fc7-94a9-c6a6d4619871?email_value=${user_fub}`}/>
      //     );
      //     break;
      //   default:
      //     setIframeContent(
      //       <img src="404.png" alt="404"/>
      //     );
      //     break;
      // }
    });
  }, []);

  return iframeContent;
}


ReactDOM.createRoot(appContainer).render(<IframeData/>);
