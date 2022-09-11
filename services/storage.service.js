import { homedir } from "os";
import { join } from "path";
import { promises } from "fs";

const filePath = join(process.cwd(), "weather-data.json");

const TOKEN = "token";
const CITY = "city";

const isExists = async (path) => {
    try {
        await promises.stat(path);
        return true;
    } catch (e) {
        return false;
    }
};

const saveKeyValue = async (key, value) => {
    let data = {};
    if (await isExists(filePath)) {
        const file = await promises.readFile(filePath);
        data = JSON.parse(file);
    }

    data[key] = value;
    console.log(data);

    await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
    if (await isExists(filePath)) {
        const file = await promises.readFile(filePath);
        const data = JSON.parse(file);

        return data[key];
    }
};

export { saveKeyValue, getKeyValue, TOKEN, CITY };
