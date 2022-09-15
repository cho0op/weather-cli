#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printError, printHelper, printSuccess } from "./services/log.service.js";
import { CITY, getKeyValue, saveKeyValue, TOKEN } from "./services/storage.service.js";
import { getWeather } from "./services/api.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError("Token is required");
        return;
    }
    try {
        await saveKeyValue(TOKEN, token);
        printSuccess("TOKEN SAVED");
    } catch (e) {
        printError(e.message);
    }
};

const getForecast = async (city) => {
    try {
        const weather = await getWeather(city);
        console.log(weather);
    } catch (e) {
        if (e?.response?.status === 404) {
            printError("Wrong city");
        } else if (e?.response?.status === 401) {
            printError("API key is not valid");
        } else {
            printError("Something went wrong");
        }
    }

};

const initCLI = async () => {
    const args = getArgs(process.argv);
    if (args.h) {
        printHelper();
    }
    if (args.t) {
        await saveToken(args.t);
    }
    if (args.c) {
        await saveKeyValue(CITY, args.c);
    }
    const city = await getKeyValue(CITY);
    await getForecast(city);
};

initCLI();
