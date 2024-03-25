export const createMap = () => {
  const map = new ymaps.Map("map", {
    center: [59.842503, 30.938881],
    zoom: 16,
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
  map.behaviors.disable("drag");

  map.geoObjects.add(placemark);
};
