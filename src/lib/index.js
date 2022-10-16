import { initWasm } from "@resvg/resvg-wasm";
import { init } from "satori/wasm";
import initYoga from "yoga-wasm-web";
import yogaWasm from "../node_modules/yoga-wasm-web/dist/yoga.wasm";
import resvgWasm from "../node_modules/@resvg/resvg-wasm/index_bg.wasm";

class ImageGenerator {
    initialized = false;
    robotoArrayBuffer = null;

    constructor() {}

    async init() {
        await Promise.all([
            await initWasm(resvgWasm),
            init(await initYoga(yogaWasm)),
            (this.robotoArrayBuffer = await (
                await fetch(
                    "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.1/fonts/roboto/Roboto-Regular.ttf"
                )
            ).arrayBuffer()),
        ]);
    }
}
