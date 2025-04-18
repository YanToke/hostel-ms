import { writeFile } from 'fs/promises';
import fs from "fs/promises"
import path from 'path';
export async function handleImage(folder, img) {
    const buffer = Buffer.from(await img.arrayBuffer());
    const filename = Date.now() + img.name.replaceAll(" ", "_");
    await writeFile(path.join(process.cwd(), `/public/${folder}/` + filename), buffer);
    return filename;
}

export async function deleteImage(folder,fileName){
    const filePath = path.join(process.cwd(),`/public/${folder}/${fileName}`);
    await fs.unlink(filePath);
    console.log("File deleted successfully")
}

export function getDataFromForm(formData, ...args) {
    let data = {};
    for (let i = 0; i < args.length; i++) {
        data[args[i]] = formData.get(args[i]);
    }
    return data;
}