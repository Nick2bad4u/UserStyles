import nick2bad4u from "eslint-config-nick2bad4u";
import userstyles from "eslint-plugin-userscripts";

/** @type {import("eslint").Linter.Config[]} */
const config = [...nick2bad4u.configs.all, ...userstyles.configs.all];

export default config;
