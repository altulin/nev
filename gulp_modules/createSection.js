import pluginsObject from "./plugins.js";
import { paths } from "./variables.js";

const { fs } = pluginsObject;

const {
  section: { pug, sass, index, style },
} = paths;

export const createSection = async () => {
  const list = [];

  for (const name of list) {
    fs.writeFile(`${pug}/${name}.pug`, "", function (err) {
      if (err) throw err;
    });

    fs.writeFile(`${sass}/${name}.scss`, "", function (err) {
      if (err) throw err;
    });

    fs.appendFile(
      index,
      `\n\tinclude ../sections/${name}.pug`,
      "utf-8",
      (err) => {
        if (err) {
          throw err;
        }
      }
    );

    fs.appendFile(style, `\n@import "./blocks/${name}";`, "utf-8", (err) => {
      if (err) {
        throw err;
      }
    });
  }
};
