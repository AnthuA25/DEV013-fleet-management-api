// node upload-gps-data.js <path-to-files>
// --type=taxis|trajectories
// --dbname=<dbname>
// --host=<hostname>
// --port=<port>
// --username=<username>
import * as fs from 'fs';
import { PrismaClient } from '@prisma/client';
import  * as path from 'path';
// import inquirer from 'inquirer';


async function createModel() {
    const prisma = new PrismaClient();

    console.log("process",process.argv)
    const args:string[] = process.argv.slice(2); // los argumentos que escribo por la terminal
    console.log("🚀 ~ createModel ~ args:", args)

    let folderPath:string | undefined = undefined;
    let type: string | undefined = undefined;
    for (const arg of args) {
        if (arg.startsWith('--type=')) {
            type = arg.split('=')[1]; // Extraer solo el valor del tipo
        } else {
            folderPath = arg;
        }
    }
    
    if (folderPath === undefined || type === undefined) {
        console.error("Missing folder path or type argument.");
        return;
    }

    const folderToProcess:string = path.join(folderPath, type);
    console.log("🚀 ~ createModel ~ folderToProcess:", folderToProcess)
    const files:string[] = fs.readdirSync(folderToProcess);
    console.log("🚀 ~ createModel ~ files:", files)
    for (const file of files) {
        console.log("🚀 ~ createModel ~ file:", file)
        if (!file.endsWith('.txt')) {
            continue;
        }
        const filePath = path.join(folderToProcess, file);
        console.log("🚀 ~ createModel ~ filePath:", filePath)

        const readFiles = fs.readFileSync(filePath, 'utf-8');
        const lines = readFiles.split('\n').map(line => line.trim()).filter(Boolean);
        // console.log("🚀 ~ createModel ~  lines :",  lines )
        for (const line of lines) {
            const [field1, field2, field3, field4] = line.split(',');
            try {
                
                if (type === 'taxis') {
                    await prisma.taxis.createMany({
                        data: {
                            id: parseInt(field1),
                            plate: field2
                        },
                    });
                } else if (type === 'trajectories') {
                    await prisma.trajectories.createMany({
                        data: {
                            taxiId: parseInt(field1),
                            date: new Date(field2),
                            latitude: parseFloat(field3),
                            longitude: parseFloat(field4)
                        },
                    });
                }
            } catch (error) {
                console.error(error);
                continue;
            }
        }

    }
    console.log("All lines processed successfully.");
}


createModel()

