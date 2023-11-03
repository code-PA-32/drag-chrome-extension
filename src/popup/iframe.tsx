import React from "react";

interface IframeProps {
  url: string;
}

export const Iframe = ({url}: IframeProps) => <iframe src={url} width="500px"
                                                      height="600px"></iframe>
