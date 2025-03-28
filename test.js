const path = require("path")
const fs = require("fs/promises");
console.log("This is starting with /",path.join(process.cwd(),"/public/img"));
console.log("This is not starting with /",path.join(process.cwd(),"public/img"));
console.log("/buiding-images/building.jpg".split("/")[2])

async function deleteImage(folder,fileName){
    const filePath = path.join(process.cwd(),`/public/${folder}/${fileName}`);
    await fs.unlink(filePath);
    console.log("File deleted successfully")
}

deleteImage("building-images",'ai.png').then(()=>console.log("Succdes"));
