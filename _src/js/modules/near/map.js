import { width } from "../../modules/sliders/dubrovka.js";
import { body } from "../header/menu.js";

export const createMap = () => {
  const el = body.querySelector("#map");

  if (!el) return;

  const map = new ymaps.Map("map", {
    center: [59.842503, 30.938881],
    zoom: 16,
    controls: [],
  });

  const placemark = new ymaps.Placemark(
    [59.842503, 30.938881],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "/img/map-mark.png",
      iconImageSize: [80, 80],
      iconImageOffset: [-15, -15],
    },
  );

  map.controls.remove("geolocationControl"); // удаляем геолокацию
  map.controls.remove("searchControl"); // удаляем поиск
  map.controls.remove("trafficControl"); // удаляем контроль трафика
  map.controls.remove("typeSelector"); // удаляем тип
  map.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
  map.controls.remove("zoomControl"); // удаляем контрол зуммирования
  map.geoObjects.add(placemark);

  if (width > 768) return;
  map.behaviors.disable("drag");
};
