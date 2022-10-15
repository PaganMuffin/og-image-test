import { initWasm, Resvg } from "@resvg/resvg-wasm";
import satori, { init } from "satori/wasm";
import initYoga from "yoga-wasm-web";
import yogaWasm from "../node_modules/yoga-wasm-web/dist/yoga.wasm";
import resvgWasm from "../node_modules/@resvg/resvg-wasm/index_bg.wasm";

export default {
    async fetch(request, env, ctx) {
        if (request.url.includes("favicon")) return new Response("");

        const urlSearch = new URL(request.url).searchParams;

        const title = urlSearch.get("title") || "test";
        const bg = urlSearch.get("bg") || "white";
        const width = Number(urlSearch.get("w")) || 200;
        const height = Number(urlSearch.get("h")) || 200;
        const f = await fetch(
            "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.1/fonts/roboto/Roboto-Regular.ttf"
        );
        const robotoArrayBuffer = await f.arrayBuffer();
        const yoga = await initYoga(yogaWasm);
        init(yoga);

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
        try {
            await initWasm(resvgWasm);
        } catch (e) {}
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
