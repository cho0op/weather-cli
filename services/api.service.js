import https from "https";
import { getKeyValue, TOKEN } from "./storage.service.js";
import axios from "axios";

export const getWeather = async (city) => {
    const token = await getKeyValue(TOKEN);
    if (!token) {
        throw new Error("Token is npt specified");
    }


    const { data } = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
            q: city,
            appid: token,
            units: "metric",
            lang: "ru",
        }
    });

    return data;

    // url.searchParams.append("q", city);
    // url.searchParams.append("appid", token);
    // url.searchParams.append("units", "metric");
    //
    // console.log("url", url);
    //
    // https.get(url, response => {
    //     let res = "";
    //
    //     response.on("data", (chunk) => {
    //         res += chunk;
    //     });
    //
    //     response.on("end", () => {
    //         console.log("res", res);
    //     });
    //
    //     response.on("error", (error) => {
    //         console.log(error);
    //     });
    // });
};
