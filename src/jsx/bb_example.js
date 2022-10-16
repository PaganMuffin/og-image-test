import { Resvg } from "@resvg/resvg-wasm";
import satori from "satori/wasm";
import React from "react";

const banner = "https://i.imgur.com/ZJS52PJ.jpg";
const cover = "https://i.imgur.com/1r6kpmB.jpg";

const bb_example = () => {
    return (
        <div
            style={{
                display: "flex",
                background: "grey",
            }}
        >
            <div
                style={{
                    backgroundImage: `url(${banner})`,
                    display: "flex",
                    width: "100%",
                    height: "100rem",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    filter: "blur(5px)",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    margin: "auto",
                    width: "70%",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        color: "white",
                    }}
                >
                    <div style={{ fontSize: "28px" }}>5 seasons / 2008</div>
                    <div
                        style={{
                            fontSize: "48px",
                            paddingTop: "1rem",
                            paddingBlock: "1rem",
                        }}
                    >
                        Breaking Bad
                    </div>
                    <div style={{ fontSize: "28px" }}>Netflix</div>
                    <div
                        style={{
                            display: "flex",
                            marginTop: "10px",
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: "crimson",
                                padding: 5,
                                margin: 5,
                                borderRadius: "5px",
                            }}
                        >
                            Bryan Cranston
                        </div>
                        <div
                            style={{
                                backgroundColor: "crimson",
                                padding: 5,
                                margin: 5,
                                borderRadius: "5px",
                            }}
                        >
                            Aaron Paul
                        </div>
                        <div
                            style={{
                                backgroundColor: "crimson",
                                padding: 5,
                                margin: 5,
                                borderRadius: "5px",
                            }}
                        >
                            Anna Gunn
                        </div>
                    </div>
                </div>
                <img
                    src={cover}
                    style={{
                        aspectRatio: 8 / 11,
                        borderRadius: "10px",
                        placeSelf: "center",
                        height: "25rem",
                    }}
                ></img>
            </div>
        </div>
    );
};

const bbExample = async (robotoArrayBuffer) => {
    const width = 1024;
    const height = 512;

    const svg = await satori(bb_example(), {
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

export default bbExample;
