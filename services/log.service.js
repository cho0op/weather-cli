import chalk from "chalk";
import dedent from "dedent-js";

const printError = (error) => {
    console.log(chalk.bgRed("ERROR") + " " + error);
};

const printSuccess = (message) => {
    console.log(chalk.bgGreen("SUCCESS") + " " + message);
};

const printHelper = () => {
    console.log(dedent(`
    ${chalk.bgCyan("HELP")}
    без параметров - вывод погоды
    -s [CITY] для установки города
    -h помощь
    -t сохранение токена
    `));
};

export { printSuccess, printError, printHelper };
