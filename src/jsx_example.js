import { initWasm, Resvg } from "@resvg/resvg-wasm";
import satori, { init } from "satori/wasm";

const jsxExample = async (robotoArrayBuffer) => {
    const title = "test";
    const bg = "white";
    const width = 1024;
    const height = 512;

    const standardObj = <div>TEST</div>;

    const svg = await satori(standardObj, {
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

export default jsxExample;
