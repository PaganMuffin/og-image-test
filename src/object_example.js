import { initWasm, Resvg } from "@resvg/resvg-wasm";
import satori, { init } from "satori/wasm";

const objExample = async (robotoArrayBuffer, request) => {
    const url = new URL(request.url);
    const urlSearch = url.searchParams;

    const bb = url.pathname.includes("bb");

    const title = urlSearch.get("title") || "test";
    const bg = urlSearch.get("bg") || "white";
    const width = bb ? 1024 : Number(urlSearch.get("w")) || 200;
    const height = bb ? 512 : Number(urlSearch.get("h")) || 200;

    const standardObj = {
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

    const svg = await satori(bb ? bb_example : standardObj, {
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

export default objExample;
