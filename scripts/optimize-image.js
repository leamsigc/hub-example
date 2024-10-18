import { writeFile, readFile } from "fs/promises";
import { cpus } from "os";
import { existsSync } from "fs";
import { ImagePool } from "@squoosh/lib";

export async function optimizeImage(img) {
  // Get the current directory path with node
  const currentDir = process.cwd();
  const imagePath = `${currentDir}/${img}`;
  console.log("Image Exists:", imagePath);
  console.log("Image Exists:", !existsSync(imagePath));

  if (!existsSync(imagePath)) {
    return;
  }

  const imagePool = new ImagePool(cpus().length);
  const filePath = new URL(`../${img}`, import.meta.url);
  const file = await readFile(filePath);

  const image = imagePool.ingestImage(file);

  await image.encode({
    mozjpeg: {},
    oxipng: {
      quality: 60,
    },
  });
  console.log("After encoded:", img);

  if (!img.endsWith(".webp")) {
    const mozjpeg = await image.encodedWith.mozjpeg;
    await writeFile(imagePath, mozjpeg.binary);
  }

  const webp = await image.encodedWith.oxipng;
  await writeFile(imagePath.replace(/\.(png|jpg|jpeg|jpeg)$/, ".png"), webp.binary);

  await imagePool.close();
}
