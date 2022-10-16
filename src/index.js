import { initWasm } from "@resvg/resvg-wasm";
import { init } from "satori/wasm";
import initYoga from "yoga-wasm-web";
import yogaWasm from "../node_modules/yoga-wasm-web/dist/yoga.wasm";
import resvgWasm from "../node_modules/@resvg/resvg-wasm/index_bg.wasm";
import jsxExample from "./jsx";
import objExample from "./obj";

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

        if (!initialized) {
            await initialize();
            initialized = true;
        }

        if (path.startsWith("/jsx")) {
            return await jsxExample(robotoArrayBuffer, request);
        }

        if (path.startsWith("/obj")) {
            return await objExample(robotoArrayBuffer, request);
        }

        if (path == "/favicon.ico") {
            return new Response("", 404);
        }

        return new Response("", {
            status: 307,
            headers: {
                location: "https://github.com/PaganMuffin/og-image-test",
            },
        });
    },
};
