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
    getWeather(city);
};

initCLI();
