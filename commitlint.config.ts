import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "header-max-length": [2, "always", 72],
        "subject-full-stop": [2, "never", "."],
        "subject-case": [2, "always", "lower-case"],
    },
};

export default config;
