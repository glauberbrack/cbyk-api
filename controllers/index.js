// 'use strict';

// var Indexdata = require('../datas/index');


// module.exports = function (router) {

//     var data = new Indexdata();

//     router.get('/', function (req, res) {


//         res.render('index', data);


//     });

// };

"use strict";

module.exports = function (router) {
  const data = {
    airports: 0,
    clouds: 0,
    rows: 0,
    columns: 0,

    grid: [],
    airports_position: [],
    clouds_position: [],
    clouds_airports_position: [],
    day: 0,
    first_day_airport_cloud: 0,
    last_day_airport_cloud: 0,
  };

  router.get("/", function (req, res) {
    const { airports, clouds, rows, columns } = req.query;

    if(airports < 3) {
        return res.json({error: 'You must insert more than 3 airports'})
    }else if(clouds < 4) {
        return res.json({error: 'You must insert more than 4 clouds'})
    }else if (rows < 10) {
        return res.json({error: 'You must insert more than 10 rows'})
    }else if (columns < 10) {
        return res.json({error: 'You must insert more than 10 columns'})
    }


    data.airports = parseInt(airports);
    data.clouds = parseInt(clouds);
    data.rows = parseInt(rows);
    data.columns = parseInt(columns);
    data.grid = [];
    data.airports_position = [];
    data.clouds_position = [];
    data.clouds_airports_position = [];
    data.day = 0;
    data.first_day_airport_cloud = 0;
    data.last_day_airport_cloud = 0;

    Array(Number(rows))
      .fill()
      .forEach((r, i) => {
        Array(Number(columns))
          .fill()
          .forEach((j, k) => {
            data.grid.push({ x: i, y: k });
          });
      });

    Array(Number(airports))
      .fill()
      .forEach((a, i) => {
        const xa = Math.floor(Math.random() * rows) + 0;
        const ya = Math.floor(Math.random() * columns) + 0;

        data.airports_position[i] = { x: xa, y: ya };
      });

    Array(Number(clouds))
      .fill()
      .forEach((c, i) => {
        let equals = true;

        while (equals) {
          const xc = Math.floor(Math.random() * rows) + 0;
          const yc = Math.floor(Math.random() * columns) + 0;

          equals = !!data.airports_position.filter(
            (a) => a.x === xc && a.y === yc
          ).length;

          if (!equals) {
            data.clouds_position[i] = { x: xc, y: yc };
          }
        }
      });

    data.day = 1;

    return res.json({
      grid: data.grid,
      airports: data.airports_position,
      clouds: data.clouds_position,
      day: data.day,
    });
  });

  router.get("/next", function (req, res) {
    const day = data.day + 1;
    data.day = day;

    data.clouds_position.map((cp) => {
      const foundAddX = data.grid.find(
        (g) => g.x === cp.x + 1 && g.y === cp.y
      );

      if (foundAddX) {
        const capFound = data.clouds_position.find(
          (cap) => cap.x === cp.x + 1 && cap.y === cp.y
        );

        if (!capFound) {
          data.clouds_position.push({ x: cp.x + 1, y: cp.y });
        }

        const clouds_airport = data.airports_position.find(
          (ap) => ap.x === foundAddX.x && ap.y === foundAddX.y
        );

        if (clouds_airport) {
          const capFound = data.clouds_airports_position.find(
            (cap) => cap.x === clouds_airport.x && cap.y === clouds_airport.y
          );

          if (!capFound) {
            data.clouds_airports_position.push(clouds_airport);
          }

          data.first_day_airport_cloud = data.first_day_airport_cloud || day;
        }
      }

      const foundAddY = data.grid.find(
        (g) => g.x === cp.x && g.y === cp.y + 1
      );

      if (foundAddY) {
        const capFound = data.clouds_position.find(
          (cap) => cap.x === cp.x && cap.y === cp.y + 1
        );

        if (!capFound) {
          data.clouds_position.push({ x: cp.x, y: cp.y + 1 });
        }

        const clouds_airport = data.airports_position.find(
          (ap) => ap.x === foundAddY.x && ap.y === foundAddY.y
        );

        if (clouds_airport) {
          const capFound = data.clouds_airports_position.find(
            (cap) => cap.x === clouds_airport.x && cap.y === clouds_airport.y
          );

          if (!capFound) {
            data.clouds_airports_position.push(clouds_airport);
          }

          data.first_day_airport_cloud = data.first_day_airport_cloud || day;
        }
      }

      const foundSubX = data.grid.find(
        (g) => g.x === cp.x - 1 && g.y === cp.y
      );

      if (foundSubX) {
        const capFound = data.clouds_position.find(
          (cap) => cap.x === cp.x - 1 && cap.y === cp.y
        );

        if (!capFound) {
          data.clouds_position.push({ x: cp.x - 1, y: cp.y });
        }

        const clouds_airport = data.airports_position.find(
          (ap) => ap.x === foundSubX.x && ap.y === foundSubX.y
        );

        if (clouds_airport) {
          const capFound = data.clouds_airports_position.find(
            (cap) => cap.x === clouds_airport.x && cap.y === clouds_airport.y
          );

          if (!capFound) {
            data.clouds_airports_position.push(clouds_airport);
          }

          data.first_day_airport_cloud = data.first_day_airport_cloud || day;
        }
      }

      const foundSubY = data.grid.find(
        (g) => g.x === cp.x && g.y === cp.y - 1
      );

      if (foundSubY) {
        const capFound = data.clouds_position.find(
          (cap) => cap.x === cp.x && cap.y === cp.y - 1
        );

        if (!capFound) {
          data.clouds_position.push({ x: cp.x, y: cp.y - 1 });
        }

        const clouds_airport = data.airports_position.find(
          (ap) => ap.x === foundSubY.x && ap.y === foundSubY.y
        );

        if (clouds_airport) {
          const capFound = data.clouds_airports_position.find(
            (cap) => cap.x === clouds_airport.x && cap.y === clouds_airport.y
          );

          if (!capFound) {
            data.clouds_airports_position.push(clouds_airport);
          }

          data.first_day_airport_cloud = data.first_day_airport_cloud || day;
        }
      }

      if (
        data.clouds_airports_position.length === data.airports_position.length
      ) {
        data.last_day_airport_cloud = data.last_day_airport_cloud || day;
      }
    });

    return res.json({
      grid: data.grid,
      day: data.day,
      first_day_airport_cloud: data.first_day_airport_cloud,
      last_day_airport_cloud: data.last_day_airport_cloud,
      airports: data.airports_position,
      clouds: data.clouds_position,
      clouds_airports: data.clouds_airports_position,
    });
  });
};
