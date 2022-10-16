import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

const DEFAULT_PRODUCT =
  "https://images.printify.com/5d5d38714b5ca808b34518b7.jpg";
const DEFAULT_LOGO = "https://promohunt.com/images/promohunt.svg";
const DEFAULT_IMPRINT_LOCATION = "full_front";

const HEIGHT = 800;
const WIDTH = 800;

const DEFAULT_COODS = {
  //position: [top, left, width, height]
  left_chest: [455, 180, 70, 70],
  right_chest: [275, 180, 70, 70],
  full_front: [275, 180, 250, 280],
};

export default function (req, res) {
  const { searchParams } = new URL(req.url);

  const logoUrl = searchParams.get("logoUrl") || DEFAULT_LOGO;

  const productImageUrl =
    searchParams.get("productImageUrl") || DEFAULT_PRODUCT;

  const imprintLocation =
    searchParams.get("imprintLocation") || DEFAULT_IMPRINT_LOCATION;

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
            left: `${coords[0]}px`,
            top: `${coords[1]}px`,
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
