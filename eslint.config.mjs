import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import importX from "eslint-plugin-import-x";
import globals from "globals";

// ─── Global ignores ──────────────────────────────────────────────────────────
const ignoresConfig = globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "*.config.js",
    "*.config.mjs",
    "*.config.cjs",
    "*.config.ts",
]);

// ─── Main config ─────────────────────────────────────────────────────────────
const mainConfig = {
    files: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "lib/**/*.ts", "hooks/**/*.ts"],

    plugins: {
        "import-x": importX,
    },

    languageOptions: {
        globals: { ...globals.browser, ...globals.node },
        parserOptions: {
            project: "./tsconfig.json",
            ecmaFeatures: { jsx: true },
        },
    },

    rules: {
        // ── Base JS ────────────────────────────────────────────────────────
        ...js.configs.recommended.rules,

        // ── Security and Safety ────────────────────────────────────────────
        "no-eval": "error",
        "no-new-func": "error",
        "no-restricted-globals": ["error", "eval"],
        "@typescript-eslint/no-implied-eval": "error",

        // ── Best Practices ─────────────────────────────────────────────────
        "eqeqeq": ["error", "always"],
        "curly": ["error", "multi-line"],
        "no-return-assign": ["error", "always"],
        "no-param-reassign": ["error", { props: false }],
        "no-else-return": ["error", { allowElseIf: false }],
        "no-self-compare": "error",
        "no-useless-escape": "error",
        "radix": "error",
        "no-void": "error",
        "no-with": "error",
        "no-iterator": "error",
        "no-proto": "error",
        "default-case": "error",
        "no-restricted-properties": [
            "error",
            { object: "global", property: "isFinite", message: "Use Number.isFinite instead" },
            { object: "self", property: "isFinite", message: "Use Number.isFinite instead" },
            { object: "window", property: "isFinite", message: "Use Number.isFinite instead" },
            { object: "global", property: "isNaN", message: "Use Number.isNaN instead" },
            { object: "self", property: "isNaN", message: "Use Number.isNaN instead" },
            { object: "window", property: "isNaN", message: "Use Number.isNaN instead" },
            { property: "__defineGetter__", message: "Use Object.defineProperty instead" },
            { property: "__defineSetter__", message: "Use Object.defineProperty instead" },
            { object: "Math", property: "pow", message: "Use the ** operator instead" },
        ],
        "@typescript-eslint/no-shadow": "error",
        "@typescript-eslint/only-throw-error": "error",
        "@typescript-eslint/no-unused-expressions": "error",
        "@typescript-eslint/no-loop-func": "error",
        "@typescript-eslint/dot-notation": "error",
        "@typescript-eslint/no-use-before-define": [
            "error",
            { functions: false, classes: true, variables: true },
        ],

        // ── Modern JavaScript ──────────────────────────────────────────────
        "prefer-const": "error",
        "no-var": "error",
        "prefer-template": "error",
        "object-shorthand": ["error", "always"],
        "prefer-rest-params": "error",
        "prefer-spread": "error",
        "prefer-destructuring": ["error", { object: true, array: false }],
        "prefer-arrow-callback": ["error", { allowNamedFunctions: false }],
        "arrow-body-style": ["error", "as-needed"],
        "no-useless-rename": "error",
        "@typescript-eslint/no-useless-constructor": "error",

        // ── TypeScript Strict ──────────────────────────────────────────────
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-misused-promises": "error",
        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/no-unnecessary-type-assertion": "error",
        "@typescript-eslint/consistent-type-imports": [
            "error",
            { prefer: "type-imports", fixStyle: "inline-type-imports" },
        ],
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
        "@typescript-eslint/prefer-nullish-coalescing": "warn",
        "@typescript-eslint/prefer-optional-chain": "warn",
        "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        "@typescript-eslint/explicit-function-return-type": "off",

        // ── Style (non-formatting) ─────────────────────────────────────────
        "camelcase": ["error", { properties: "never", ignoreDestructuring: false }],
        "no-nested-ternary": "error",
        "no-unneeded-ternary": ["error", { defaultAssignment: false }],
        "new-cap": ["error", { newIsCap: true, capIsNew: false }],
        "one-var": ["error", "never"],
        "spaced-comment": ["error", "always"],
        "no-lonely-if": "error",

        // ── Import Hygiene ─────────────────────────────────────────────────
        "import-x/no-duplicates": "error",
        "import-x/no-mutable-exports": "error",
        "import-x/first": "error",
        "import-x/newline-after-import": "error",
        "import-x/no-self-import": "error",
        "import-x/no-useless-path-segments": "error",
        "import-x/no-cycle": ["warn", { maxDepth: 3 }],

        // ── Core rules OFF (replaced by TS equivalents) ────────────────────
        "no-shadow": "off",
        "no-use-before-define": "off",
        "no-loop-func": "off",
        "dot-notation": "off",
        "no-throw-literal": "off",
        "no-unused-expressions": "off",
        "no-implied-eval": "off",
        "no-useless-constructor": "off",
        "no-unused-vars": "off",
    },
};

// ─── Prettier compat (must be last) ──────────────────────────────────────────
const prettierConfig = {
    ...prettier,
    files: ["**/*.{ts,tsx,js,jsx,mjs,cjs}"],
};

export default defineConfig([ignoresConfig, ...nextVitals, ...nextTs, mainConfig, prettierConfig]);
