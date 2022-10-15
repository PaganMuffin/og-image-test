import { initWasm, Resvg } from "@resvg/resvg-wasm";
import satori, { init } from "satori/wasm";
import initYoga from "yoga-wasm-web";
import yogaWasm from "../node_modules/yoga-wasm-web/dist/yoga.wasm";
import resvgWasm from "../node_modules/@resvg/resvg-wasm/index_bg.wasm";

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
        if (request.url.includes("favicon")) return new Response("");

        if (!initialized) {
            await initialize();
            initialized = true;
        }

        const urlSearch = new URL(request.url).searchParams;

        const title = urlSearch.get("title") || "test";
        const bg = urlSearch.get("bg") || "white";
        const width = Number(urlSearch.get("w")) || 200;
        const height = Number(urlSearch.get("h")) || 200;

        const svg = await satori(
            {
                type: "div",
                props: {
                    children: title,
                    style: {
                        backgroundColor: bg,
                        height: height,
                        width: width,
                        wordBreak: "break-all",
                    },
                },
            },
            {
                height: height,
                width: width,
                fonts: [
                    {
                        name: "Roboto",
                        data: robotoArrayBuffer,
                        weight: 400,
                        style: "normal",
                    },
                ],
            }
        );

        const resvg = new Resvg(svg);
        const pngData = resvg.render();
        const pngBuffer = pngData.asPng();

        return new Response(pngBuffer, {
            headers: {
                "content-type": "image/png",
            },
        });
    },
};
