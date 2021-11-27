import fetch from "node-fetch";
import { config } from "../config.js";
import { storeData } from "../utils/json.js";

const start = async () => {
  console.clear();

  let dataSet = [];
  let errorSet = [];
  let id = config.tokenRangeStart;

  const runFetch = (id) => {
    fetch(`${config.metadataUrl}/${id}/`)
      .then((res) => res.json())
      .then((json) => {
        const _data = { id, ...json };
        dataSet.push(_data);
        storeData(id, _data, `./output/token/${id}`);
        if (id !== config.tokenRangeEnd) runFetch(id + 1);
        storeData("data", dataSet, `./output/metadata`);
        storeData("errors", errorSet, `./output/errors`);
        console.log(`${id} Saved`);
      })
      .catch((err) => {
        errorSet.push(id);
        console.error("Could not fetch URL", err);
      });
  };

  runFetch(id);
};

start();
