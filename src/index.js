import { initWasm } from "@resvg/resvg-wasm";
import { init } from "satori/wasm";
import initYoga from "yoga-wasm-web";
import yogaWasm from "../node_modules/yoga-wasm-web/dist/yoga.wasm";
import resvgWasm from "../node_modules/@resvg/resvg-wasm/index_bg.wasm";
import objExample from "./object_example";
import jsxExample from "./jsx_example";

let initialized = false;
let robotoArrayBuffer = null;

const initialize = async () =>
    Promise.all([
        await initWasm(resvgWasm),
        init(await initYoga(yogaWasm)),
        (robotoArrayBuffer = await (
            await fetch(
                "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.1/fonts/roboto/Roboto-Regular.ttf"
            )
        ).arrayBuffer()),
    ]);
export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;

        if (path.includes("favicon.ico")) return new Response("");

        if (!initialized) {
            await initialize();
            initialized = true;
        }

        if (path.includes("jsx")) {
            return await jsxExample(robotoArrayBuffer);
        }

        return await objExample(robotoArrayBuffer, request);
    },
};
