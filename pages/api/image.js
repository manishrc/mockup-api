import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

const DEFAULT_COODS = {
  left_chest: [240, 340, 60, 60], // [top, left, width, height]
};

export default function (req, res) {
  const query = req.query || {};
  const logoUrl =
    query.logo ||
    "https://cdnp.sanmar.com/medias/sys_master/images/images/hbd/hf2/10861561446430/Cotopaxi-logo-1200x755.png";
  const productImageUrl =
    query.productImage ||
    "https://images.printify.com/5d5d38714b5ca808b34518b7.jpg";
  const importLocation = query.location || "left_chest";
  const coords = query.coords?.split(",") || DEFAULT_COODS[importLocation];

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
      width: 600,
      height: 800,
    }
  );
}
