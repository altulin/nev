import { body } from "../../header/menu.js";
import { customization } from "./customization.js";
import { markerElement, markerSetting } from "./marker.js";

export const createMap = async () => {
  const el = body.querySelector("#map");
  if (!el) return;
  await ymaps3.ready;
  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapMarker,
    YMapControls,
    YMapCollection,
    YMapControlButton,
  } = ymaps3;

  const map = new YMap(
    el,

    {
      location: {
        center: [30.938058, 59.84347],
        zoom: 16,
      },
      behaviors: ["drag"],
    },
  );

  const controls = new YMapControls({ position: "left" });

  const elIn = document.createElement("div");
  elIn.className = "zoom-control__btn zoom-control__btn--in";

  const elOut = document.createElement("div");
  elOut.className = "zoom-control__btn zoom-control__btn--out";

  const buttons = new YMapCollection()
    .addChild(
      new YMapControlButton({
        element: elIn,
        onClick: () =>
          map.update({ location: { zoom: map.zoom + 1, duration: 500 } }),
      }),
    )
    .addChild(
      new YMapControlButton({
        element: elOut,
        onClick: () =>
          map.update({ location: { zoom: map.zoom - 1, duration: 500 } }),
      }),
    );

  map.addChild(controls);
  controls.addChild(buttons);
  map.addChild(new YMapDefaultSchemeLayer({ customization }));
  map.addChild(new YMapDefaultFeaturesLayer());
  map.addChild(new YMapMarker(markerSetting, markerElement));
};
