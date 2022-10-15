import { initWasm, Resvg } from "@resvg/resvg-wasm";
import satori, { init } from "satori/wasm";
import initYoga from "yoga-wasm-web";
import wasmModule from "../node_modules/yoga-wasm-web/dist/yoga.wasm";
import wasmModule2 from "../node_modules/@resvg/resvg-wasm/index_bg.wasm";

export default {
    async fetch(request, env, ctx) {
        if (request.url.includes("favicon")) return new Response("");

        const title = new URL(request.url).searchParams.get("title") || "test";
        const bg = new URL(request.url).searchParams.get("bg") || "white";
        const f = await fetch(
            "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.1/fonts/roboto/Roboto-Regular.ttf"
        );
        const robotoArrayBuffer = await f.arrayBuffer();
        const yoga = await initYoga(wasmModule);
        init(yoga);

        const svg = await satori(
            {
                type: "div",
                props: {
                    children: title,
                    style: {
                        backgroundColor: bg,
                        height: 200,
                        width: 200,
                        wordBreak: "break-all",
                        textAlign: "center",
                    },
                },
            },
            {
                width: 200,
                height: 200,
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
            await initWasm(wasmModule2);
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
