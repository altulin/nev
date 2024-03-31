import { width } from "../../modules/sliders/dubrovka.js";
import { body } from "../header/menu.js";

export const createMap = () => {
  const el = body.querySelector("#map");

  if (!el) return;

  const map = new ymaps.Map("map", {
    center: [59.84347032994195, 30.938058359802223],
    zoom: 16,
    controls: [],
  });

  const placemark = new ymaps.Placemark(
    [59.84294662775576, 30.94030068653868],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "./img/map-mark.png",
      iconImageSize: width < 769 ? [60, 60] : [86, 86],
      iconImageOffset: width < 769 ? [-20, -20] : [-40, -40],
    },
  );

  const ZoomLayout = ymaps.templateLayoutFactory.createClass(
      "<div class='zoom-control'>" +
        "<div id='zoom-in' class='zoom-control__btn zoom-control__btn--in'><i class='icon-plus'></i></div>" +
        "<div id='zoom-out' class='zoom-control__btn zoom-control__btn--out'><i class='icon-minus'></i></div>" +
        "</div>",
      {
        build: function () {
          ZoomLayout.superclass.build.call(this);

          const zoomInBtn = body.querySelector("#zoom-in");
          const zoomOutBtn = body.querySelector("#zoom-out");

          if (!zoomInBtn || !zoomOutBtn) return;

          this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
          this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

          zoomInBtn.addEventListener("click", this.zoomInCallback);
          zoomOutBtn.addEventListener("click", this.zoomOutCallback);
        },

        zoomIn: function () {
          const map = this.getData().control.getMap();
          map.setZoom(map.getZoom() + 1, { checkZoomRange: true });
        },

        zoomOut: function () {
          const map = this.getData().control.getMap();
          map.setZoom(map.getZoom() - 1, { checkZoomRange: true });
        },
      },
    ),
    zoomControl = new ymaps.control.ZoomControl({
      options: { layout: ZoomLayout },
    });

  map.controls.add(zoomControl, {
    position: {
      float: "none",
      top: `${width < 769 ? "9rem" : "20rem"}`,
      left: `${width < 769 ? "0.5rem" : "3rem"}`,
    },
  });
  map.behaviors.disable("scrollZoom");
  map.geoObjects.add(placemark);

  if (width > 768) return;
  map.behaviors.disable("drag");
};
