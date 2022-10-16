import { Resvg } from "@resvg/resvg-wasm";
import satori from "satori/wasm";
import bbExample from "./bb_example";
import simpleExample from "./simple_example";

const objExample = async (robotoArrayBuffer, request) => {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path == "/obj/simple") {
        return await simpleExample(robotoArrayBuffer, request);
    }

    if (path == "/obj/bb") {
        return await bbExample(robotoArrayBuffer);
    }

    return new Response("", 404);
};

export default objExample;
