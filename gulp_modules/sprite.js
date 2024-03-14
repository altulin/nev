import pluginsObject from "./plugins.js";
import { paths } from "./variables.js";

const {
  imagemin,
  svgmin,
  cheerio,
  replace,
  svgstore,
  rename,
  deleteAsync,
  svgo,
  gulp: { src, dest },
} = pluginsObject;

const {
  project: { spriteFiles, spriteFile },
  made: { imgFolder, spriteFolder },
} = paths;

const createSprite = () => {
  deleteAsync(spriteFolder, { force: true });
  return (
    src(spriteFiles)
      // .pipe(imagemin([svgo()]))

      .pipe(
        svgmin({
          js2svg: {
            pretty: true,
            indent: 2,
          },
          multipass: true,
          plugins: [{ removeViewBox: false }],
        })
      )

      .pipe(
        cheerio({
          run($) {
            $("[fill]").removeAttr("fill");
            $("[stroke]").removeAttr("stroke");
            // $("[style]").removeAttr("style");
          },
          parserOptions: { xmlMode: true },
        })
      )

      .pipe(
        svgstore({
          inlineSvg: true,
        })
      )

      .pipe(replace("&gt;", ">"))
      .pipe(replace("><defs", ">\n\t<defs"))
      .pipe(replace("><symbol", ">\n\t<symbol"))
      .pipe(replace("</symbol>", "\t</symbol>"))
      .pipe(replace("<path", "\t<path"))
      .pipe(replace("<g", "\t<g"))
      .pipe(replace("</g>", "\t</g>"))
      .pipe(replace("></svg", ">\n</svg"))

      .pipe(rename(spriteFile))
      .pipe(dest(imgFolder))
  );
};

export default createSprite;
