import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Iframe } from "./iframe";
import { ErrorMessage } from "./error-message";
import { getEmailByID, getChatID, getMetaData } from "./helpers";
import cryptoJS from "crypto-js";

const appContainer = document.getElementById("app");
const IframeData = () => {
  const [iframeContent, setIframeContent] = useState(null);

  useEffect(() => {
    chrome.storage.local.get(["currentUrl"]).then(async (result) => {
      const url = new URL(result.currentUrl);
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

        const encrypted_emailFBS = cryptoJS.AES.encrypt(metaData.userEmail, "FB4S").toString()
        const encrypted_profile_keyFBS = cryptoJS.AES.encrypt(metaData.listingId, "FB4S").toString()
        setIframeContent(
          <Iframe
            url={`https://findbusinesses4sale.retool.com/embedded/public/74e99d98-a3b8-4cf2-b901-6cac17f48bcf?chrome_extension_key=${encrypted_emailFBS}&profile_key=${encrypted_profile_keyFBS}`}/>
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

        const encrypted_emailBRK = cryptoJS.AES.encrypt(metaData.userEmail, "FB4S").toString()
        setIframeContent(
          <Iframe
            url={`https://findbusinesses4sale.retool.com/embedded/public/cf559bd3-933a-4a04-9687-3ebaa3e0570f?chrome_extension_key=${encrypted_emailBRK}`}/>
        );
        return;
      } else if (baseUrl.includes("https://findbusinessesforsale.pipedrive.com/deal")) {

        const userEmail = await getEmailByID(id);
        if (!userEmail) {
          setIframeContent(
            <ErrorMessage
              err="An error occurred while getting data from Pipedrive, case: deal"/>
          );
          console.info("An error occurred while getting data from Pipedrive, case: deal");
          return;
        }
        const encrypted_emailPD = cryptoJS.AES.encrypt(userEmail, "FB4S").toString()
        setIframeContent(
          <Iframe
            url={`https://findbusinesses4sale.retool.com/embedded/public/37827805-e6f2-49a6-a7a1-8577d0d4669a?retool_dashboard_public_key=467f8c24-2333-49fe-9de8-3f58b085939e&profile_ekey=${encrypted_emailPD}`}/>
        );
      } else if (baseUrl.includes("https://manojkukreja.followupboss.com/2/people/view")) {
        const base64 = await getChatID(id)
        if (base64 === null) {
          setIframeContent(
            <ErrorMessage
              err="An error occurred while getting data from FollowUpBoss, case: chat"/>
          );
          console.info("An error occurred while getting data from FollowUpBoss, case: chat");
          return;
        }
        const data: { chat_id: number } = JSON.parse(atob(base64.customFB4SLeadID))
        const encrypted_chat_id = cryptoJS.AES.encrypt(data.chat_id.toString(), "FB4S").toString()
        setIframeContent(
          <Iframe
            url={`https://findbusinesses4sale.retool.com/embedded/public/37827805-e6f2-49a6-a7a1-8577d0d4669a?retool_dashboard_public_key=467f8c24-2333-49fe-9de8-3f58b085939e&profile_ikey=${encrypted_chat_id}`}/>
        );
        return;
      } else {
        setIframeContent(
          <ErrorMessage
            err="General Error"/>
        );
        console.info("Base error");
        return;
      }
    });
  }, []);
  return iframeContent;
}


ReactDOM.createRoot(appContainer).render(<IframeData/>);
