import fs from "fs";

export const storeData = (data, path) => {
  try {
    fs.writeFileSync(`${path}.json`, JSON.stringify(data, undefined, 2));
  } catch (err) {
    console.error(err);
  }
};