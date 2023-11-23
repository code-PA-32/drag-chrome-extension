import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Iframe } from "./iframe";
import { ErrorMessage } from "./error-message";
import { getEmailByID, getChatID, getMetaData, encryptedAndEncodeURLKey, getFUBBootstrapData } from "./helpers";

const appContainer = document.getElementById("app");
const IframeData = () => {
  const [iframeContent, setIframeContent] = useState(null);

  useEffect(() => {
    chrome.storage.local.get(["currentUrl"]).then(async (result): Promise<void> => {
      const url: URL = new URL(result.currentUrl);
      const baseUrl: string = url.origin + url.pathname;
      const pathNames: string[] = url.pathname.split("/") ?? [];
      const id: string = pathNames[pathNames.length - 1] ?? "";
      const metaData: { listingId: string, userEmail: string } = await getMetaData();
      if (baseUrl.includes("https://www.findbusinesses4sale.com/listing") || baseUrl.includes("https://www.findbusinesses4sale.com/commercial-listing")) {
        if (metaData.listingId === "N/A" || metaData.userEmail === "N/A") {
          setIframeContent(
            <ErrorMessage
              err="An error occurred while getting data from metaData or user is not logged in, case: listing, commercial-listing"/>
          );
          console.info("An error occurred while getting data from metaData or user is not logged in, case: listing, commercial-listing");
          return;
        }

        const encrypted_emailFBS: string = encryptedAndEncodeURLKey(metaData.userEmail)
        const encrypted_profile_keyFBS: string = encryptedAndEncodeURLKey(metaData.listingId)

        setIframeContent(
          <Iframe
            url={`https://findbusinesses4sale.retool.com/embedded/public/74e99d98-a3b8-4cf2-b901-6cac17f48bcf?chrome_extension_key=${encrypted_emailFBS}&profile_key=${encrypted_profile_keyFBS}`}/>
        );
        return;
      } else if (baseUrl.includes("https://www.findbusinesses4sale.com/broker-dashboard/")) {
        if (metaData.userEmail === "N/A") {
          setIframeContent(
            <ErrorMessage
              err="An error occurred while getting data from metaData or user is not logged in, case: broker-dashboard"/>
          );
          console.info("An error occurred while getting data from metaData or user is not logged in, case: broker-dashboard");
          return;
        }

        const encrypted_emailBRK: string = encryptedAndEncodeURLKey(metaData.userEmail)
        setIframeContent(
          <Iframe
            url={`https://findbusinesses4sale.retool.com/embedded/public/cf559bd3-933a-4a04-9687-3ebaa3e0570f?chrome_extension_key=${encrypted_emailBRK}`}/>
        );
        return;
      } else if (baseUrl.includes("https://findbusinessesforsale.pipedrive.com/deal")) {

        const userEmail: string = await getEmailByID(id);
        if (!userEmail) {
          setIframeContent(
            <ErrorMessage
              err="An error occurred while getting data from Pipedrive, case: deal"/>
          );
          console.info("An error occurred while getting data from Pipedrive, case: deal");
          return;
        }
        const encrypted_emailPD: string = encryptedAndEncodeURLKey(userEmail)
        setIframeContent(
          <Iframe
            url={`https://findbusinesses4sale.retool.com/embedded/public/37827805-e6f2-49a6-a7a1-8577d0d4669a?retool_dashboard_public_key=467f8c24-2333-49fe-9de8-3f58b085939e&profile_ekey=${encrypted_emailPD}`}/>
        );
      } else if (baseUrl.includes("https://manojkukreja.followupboss.com/2/people/view")) {
        const base64: { customFB4SLeadID: string, id: number } = await getChatID(id)
        if (base64 === null) {
          setIframeContent(
            <ErrorMessage
              err="An error occurred while getting data from FollowUpBoss"/>
          );
          console.info("An error occurred while getting data from FollowUpBoss");
          return;
        }
        const data: { chat_id: number } = JSON.parse(atob(base64.customFB4SLeadID))
        const encrypted_chat_id: string = encryptedAndEncodeURLKey(data.chat_id.toString())

        const currentUserEmail: string = await getFUBBootstrapData();
        console.log(currentUserEmail, "currentUSerEmail")
        if (!currentUserEmail) {
          setIframeContent(
            <ErrorMessage
              err="An error occurred while getting data from FollowUpBoss"/>
          );
          console.info("An error occurred while getting data from FollowUpBoss");
          return;
        }
        const encrypted_current_user_emailFUB: string = encryptedAndEncodeURLKey
        (currentUserEmail)
        console.log(encrypted_current_user_emailFUB, "encrypted_current_user_emailFUB")
        setIframeContent(
          <Iframe
            url={`https://findbusinesses4sale.retool.com/embedded/public/37827805-e6f2-49a6-a7a1-8577d0d4669a?access_level_key=${encrypted_current_user_emailFUB}&profile_ikey=${encrypted_chat_id}`}/>
        );
        return;
      } else {
        setIframeContent(
          <ErrorMessage
            err="This page is out of ecosystem"/>
        );
        console.info("This page is out of ecosystem");
        return;
      }
    });
  }, []);
  return iframeContent;
}


ReactDOM.createRoot(appContainer).render(<IframeData/>);
