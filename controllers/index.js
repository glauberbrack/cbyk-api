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
    console.log(airports, clouds, rows, columns)

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
      .forEach((row, rowNumber) => {
        Array(Number(columns))
          .fill()
          .forEach((column, columnNumber) => {
            data.grid.push({ x: rowNumber, y: columnNumber });
          });
      });

    Array(Number(airports))
      .fill()
      .forEach((airport, airportPosition) => {
        const airpotPositionX = Math.floor(Math.random() * rows) + 0;
        const airpotPositionY = Math.floor(Math.random() * columns) + 0;

        data.airports_position[airportPosition] = { x: airpotPositionX, y: airpotPositionY };
      });

    Array(Number(clouds))
      .fill()
      .forEach((cloud, cloudPosition) => {
        let equals = true;

        while (equals) {
          const cloudPositionX = Math.floor(Math.random() * rows) + 0;
          const cloudPositionY = Math.floor(Math.random() * columns) + 0;

          equals = !!data.airports_position.filter(
            (airport) => airport.x === cloudPositionX && airport.y === cloudPositionY
          ).length;

          if (!equals) {
            data.clouds_position[cloudPosition] = { x: cloudPositionX, y: cloudPositionY };
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

  router.get("/nextday", function (req, res) {
    const day = data.day + 1;
    data.day = day;

    data.clouds_position.map((cloudPosition) => {
      const foundAddX = data.grid.find(
        (gridContainer) => gridContainer.x === cloudPosition.x + 1 && gridContainer.y === cloudPosition.y
      );

      if (foundAddX) {
        const cloudAirportPositionFound = data.clouds_position.find(
          (cloudAirportPosition) => cloudAirportPosition.x === cloudPosition.x + 1 && cloudAirportPosition.y === cloudPosition.y
        );

        if (!cloudAirportPositionFound) {
          data.clouds_position.push({ x: cloudPosition.x + 1, y: cloudPosition.y });
        }

        const clouds_airport = data.airports_position.find(
          (ap) => ap.x === foundAddX.x && ap.y === foundAddX.y
        );

        if (clouds_airport) {
          const cloudAirportPositionFound = data.clouds_airports_position.find(
            (cloudAirportPosition) => cloudAirportPosition.x === clouds_airport.x && cloudAirportPosition.y === clouds_airport.y
          );

          if (!cloudAirportPositionFound) {
            data.clouds_airports_position.push(clouds_airport);
          }

          data.first_day_airport_cloud = data.first_day_airport_cloud || day;
        }
      }

      const foundAddY = data.grid.find(
        (g) => g.x === cloudPosition.x && g.y === cloudPosition.y + 1
      );

      if (foundAddY) {
        const cloudAirportPositionFound = data.clouds_position.find(
          (cloudAirportPosition) => cloudAirportPosition.x === cloudPosition.x && cloudAirportPosition.y === cloudPosition.y + 1
        );

        if (!cloudAirportPositionFound) {
          data.clouds_position.push({ x: cloudPosition.x, y: cloudPosition.y + 1 });
        }

        const clouds_airport = data.airports_position.find(
          (ap) => ap.x === foundAddY.x && ap.y === foundAddY.y
        );

        if (clouds_airport) {
          const cloudAirportPositionFound = data.clouds_airports_position.find(
            (cloudAirportPosition) => cloudAirportPosition.x === clouds_airport.x && cloudAirportPosition.y === clouds_airport.y
          );

          if (!cloudAirportPositionFound) {
            data.clouds_airports_position.push(clouds_airport);
          }

          data.first_day_airport_cloud = data.first_day_airport_cloud || day;
        }
      }

      const foundSubX = data.grid.find(
        (g) => g.x === cloudPosition.x - 1 && g.y === cloudPosition.y
      );

      if (foundSubX) {
        const cloudAirportPositionFound = data.clouds_position.find(
          (cloudAirportPosition) => cloudAirportPosition.x === cloudPosition.x - 1 && cloudAirportPosition.y === cloudPosition.y
        );

        if (!cloudAirportPositionFound) {
          data.clouds_position.push({ x: cloudPosition.x - 1, y: cloudPosition.y });
        }

        const clouds_airport = data.airports_position.find(
          (ap) => ap.x === foundSubX.x && ap.y === foundSubX.y
        );

        if (clouds_airport) {
          const cloudAirportPositionFound = data.clouds_airports_position.find(
            (cloudAirportPosition) => cloudAirportPosition.x === clouds_airport.x && cloudAirportPosition.y === clouds_airport.y
          );

          if (!cloudAirportPositionFound) {
            data.clouds_airports_position.push(clouds_airport);
          }

          data.first_day_airport_cloud = data.first_day_airport_cloud || day;
        }
      }

      const foundSubY = data.grid.find(
        (g) => g.x === cloudPosition.x && g.y === cloudPosition.y - 1
      );

      if (foundSubY) {
        const cloudAirportPositionFound = data.clouds_position.find(
          (cloudAirportPosition) => cloudAirportPosition.x === cloudPosition.x && cloudAirportPosition.y === cloudPosition.y - 1
        );

        if (!cloudAirportPositionFound) {
          data.clouds_position.push({ x: cloudPosition.x, y: cloudPosition.y - 1 });
        }

        const clouds_airport = data.airports_position.find(
          (ap) => ap.x === foundSubY.x && ap.y === foundSubY.y
        );

        if (clouds_airport) {
          const cloudAirportPositionFound = data.clouds_airports_position.find(
            (cloudAirportPosition) => cloudAirportPosition.x === clouds_airport.x && cloudAirportPosition.y === clouds_airport.y
          );

          if (!cloudAirportPositionFound) {
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
