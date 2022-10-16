import { Resvg } from "@resvg/resvg-wasm";
import satori from "satori/wasm";

const simpleExample = async (robotoArrayBuffer, request) => {
    const url = new URL(request.url);
    const urlSearch = url.searchParams;

    const title = urlSearch.get("title") || "test";
    const bg = urlSearch.get("bg") || "white";
    const width = Number(urlSearch.get("w")) || 200;
    const height = Number(urlSearch.get("h")) || 200;

    const simpleObj = {
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
    };

    const svg = await satori(simpleObj, {
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
    });

    const resvg = new Resvg(svg);
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    return new Response(pngBuffer, {
        headers: {
            "content-type": "image/png",
        },
    });
};

export default simpleExample;
