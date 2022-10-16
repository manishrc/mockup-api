import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

const HEIGHT = 800;
const WIDTH = 800;

const DEFAULT_COODS = {
  left_chest: [180, 470, 70, 70], // [top, left, width, height]
  right_chest: [180, 260, 70, 70],
  full_front: [180, 260, 280, 280],
};

export default function (req, res) {
  const { searchParams } = new URL(req.url);

  const logoUrl =
    searchParams.get("logoUrl") || "https://promohunt.com/images/promohunt.svg";
  const productImageUrl =
    searchParams.get("productImageUrl") ||
    "https://images.printify.com/5d5d38714b5ca808b34518b7.jpg";

  const imprintLocation = searchParams.get("location") || "left_chest";
  const coords =
    searchParams.get("coords")?.split(",") || DEFAULT_COODS[imprintLocation];

  const debug = searchParams.get("debug") == "true" || false;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
          src={productImageUrl}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: `${coords[0]}px`,
            left: `${coords[1]}px`,
            width: `${coords[2]}px`,
            height: `${coords[3]}px`,
            border: debug ? "1px dashed red" : "none",
          }}
        >
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              opacity: 0.9,
            }}
            src={logoUrl}
          />
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
    }
  );
}
