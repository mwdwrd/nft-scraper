import fetch from "node-fetch";
import fs from "fs";
import { config } from "../config.js";

const start = async () => {
  console.clear();

  let id = config.tokenRangeStart;

  const runFetch = (id) => {
    const imageURL = `${config.assetURL}/${id}`;

    fetch(imageURL)
      .then((res) => {
        res
          .buffer()
          .then((buffer) => {
            fs.writeFile(`./output/images/${id}.png`, buffer, () =>
              console.log(`${id} Downloaded`)
            );
            if (id !== config.tokenRangeEnd) runFetch(Number(id) + 1);
          })
          .catch((err) => {
            console.error("Buffer Error", err);
          });
      })
      .catch((err) => {
        console.error("Fetch Error", err);
      });
  };

  runFetch(id);
};

start();
