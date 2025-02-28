/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import svgMap from "svgmap";
import "svgmap/dist/svgMap.min.css";
import "./Map.css";

const SvgMapComponent = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      setLoading(false);
      const map = new svgMap({
        targetElementID: "svgMap",
        colorMax: "green",
        colorNoData: "white",
        noDataText: "Здесь нет чайных плантаций...",
        data: {
          data: {
            gdp: {
              name: "Виды:",
              thresholdMax: 20,
              thresholdMin: 1,
            },
          },
          applyData: "gdp",
          values: {
            CN: {
              gdp: "Эрл Грей, Белый чай Бай Му Дань, Улун Те Гуань Инь, Пуэр, Жасминовый чай, Лапсанг Сушонг, Хуан Шань Мао Фэн",
              link: "/teas?location=cn",
            },
            IN: {
              gdp: "Дарджилинг, Ассам",
              link: "/teas?location=in",
              color: "yellow",
            },
            JP: {
              gdp: "Зелёный чай Сенча, Маття, Спирулина Чай",
              link: "/teas?location=jp",
            },
            TW: { gdp: "Габа Чай", link: "/teas?location=tw", color: "yellow" },
            ZA: { gdp: "Ройбуш", link: "/teas?location=za", color: "yellow" },
            EG: {
              gdp: "Мята перечная",
              link: "/teas?location=eg",
              color: "yellow",
            },
            BR: {
              gdp: "Бразильский Зелёный Чай, Бразильский Чёрный Чай",
              link: "/teas?location=br",
              color: "yellow",
            },
            LK: {
              gdp: "Цейлонский чай (Димбула), Кандийский чай, Рухуна",
              link: "/teas?location=lk",
            },
            AF: { gdp: "Афганский Зелёный Чай", link: "/teas?location=af" },
          },
        },
      });
    }
  }, []);

  return (
    <>
      <div id="svgMap" style={{ width: "80%", justifyContent: "center", }}></div>
    </>
  );
};

export default SvgMapComponent;
