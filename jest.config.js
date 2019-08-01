module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest",
        ".*": "<rootDir>/node_modules/webpack-babel-jest"
    },
}
