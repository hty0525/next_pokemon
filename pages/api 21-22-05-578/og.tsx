import { ImageResponse } from "@vercel/og";
import Image from "next/image";

export const config = {
  runtime: "edge",
};

export default function og() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <Image src="iamge/ogImg.png" />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
