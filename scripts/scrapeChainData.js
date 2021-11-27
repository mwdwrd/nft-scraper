import { config } from "../config.js";
import { contract } from "../utils/web3.js";
import { storeData } from "../utils/json.js";
import camelCase from "camelcase";
import getColors from "get-svg-colors";

let dataSet = [];

const processSkinTone = (palette) => {
  let tone;

  if (palette.includes('#eec39a')) {
    tone = {
      value: 'Human1',
      slug: 'human1'
    }
  } else if (palette.includes('#fff7e9')) {
    tone = {
      value: 'Human2',
      slug: 'human2'
    }
  } else if (palette.includes('#6a4c2e')) {
    tone = {
      value: 'Human3',
      slug: 'human3'
    }
  } else if (palette.includes('#e1d69a')) {
    tone = {
      value: 'Human4',
      slug: 'human4'
    }
  } else if (palette.includes('#d0a458')) {
    tone = {
      value: 'Human5',
      slug: 'human5'
    }
  } else {
    tone = {
      value: 'Human',
      slug: 'human'
    }
  }

  return tone;
}

const onlyUnique = (value, index, self) => { 
  return self.indexOf(value) === index;
}

const run = async () => {
  const totalSupply = await contract.methods.totalSupply().call();

  for (let i = 1; i <= totalSupply; i++) {
    const tokenBase64 = await contract.methods.tokenURI(i).call();
    let tokenMetaData = Buffer.from(tokenBase64.split(',')[1], 'base64');
    tokenMetaData = tokenMetaData.toString('ascii');
    tokenMetaData = JSON.parse(tokenMetaData);

    // Get SVG colors in Array;
    let svgColorArray = getColors(tokenMetaData.image_data);
    svgColorArray = svgColorArray.fills.map(color => color.hex())
    svgColorArray = svgColorArray.filter(onlyUnique);

    // CUSTOM EDITS - REMOVE THESE
    tokenMetaData.name = tokenMetaData.name.trim();
    tokenMetaData.attributes = tokenMetaData.attributes.map((attribute, i) => {
      const lineItem = Object.entries(attribute);

      if (lineItem[0][1].trim() == "Race" && lineItem[1][1].trim() == "Human") {
        const skinTone = processSkinTone(svgColorArray);

        return {
          "trait_type": lineItem[0][1].trim(),
          "value": skinTone.value,
          "trait_slug": camelCase(lineItem[0][1].trim()),
          "value_slug": skinTone.slug,
        };
      } else {
        return {
          "trait_type": lineItem[0][1].trim(),
          "value": lineItem[1][1].trim(),
          "trait_slug": camelCase(lineItem[0][1].trim()),
          "value_slug": camelCase(lineItem[1][1].trim()),
        };
      }
    })
    tokenMetaData.image = `${config.assetURL}/${i}`;
    // Reform Metadata
    tokenMetaData = {
      tokenId: i,
      image: tokenMetaData.image,
      attributes: tokenMetaData.attributes,
      image: tokenMetaData.image,
      palette: svgColorArray
    }
    // CUSTOM EDITS - REMOVE THESE

    dataSet.push(tokenMetaData);
    storeData(tokenMetaData, `./output/token/${i}`);
    console.log(`${i} Saved`);
  }

  storeData(dataSet, `./output/metadata`);
  console.log(`All Metadata Saved`);
};

run();

