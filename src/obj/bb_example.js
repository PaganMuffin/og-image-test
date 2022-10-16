import { Resvg } from "@resvg/resvg-wasm";
import satori from "satori/wasm";

const banner = "https://i.imgur.com/ZJS52PJ.jpg";
const cover = "https://i.imgur.com/1r6kpmB.jpg";

const bb_example = {
    type: "div",
    props: {
        style: {
            display: "flex",
            background: "grey",
        },
        children: [
            {
                type: "div", //22
                props: {
                    style: {
                        backgroundImage: `url(${banner})`,
                        width: "100%",
                        height: "100rem",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        filter: "blur(5px)",
                    },
                },
            },
            {
                //45
                type: "div",
                props: {
                    style: {
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        margin: "auto",
                        width: "70%",
                        display: "flex",
                        justifyContent: "space-between",
                    },
                    children: [
                        {
                            //54
                            type: "div",
                            props: {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    color: "white",
                                },
                                children: [
                                    {
                                        type: "div",
                                        props: {
                                            style: {
                                                fontSize: "28px",
                                            },
                                            children: "5 seasons / 2008",
                                        },
                                    },
                                    {
                                        type: "div",
                                        props: {
                                            style: {
                                                fontSize: "48px",
                                                paddingTop: "1rem",
                                                paddingBlock: "1rem",
                                            },
                                            children: "Breaking Bad",
                                        },
                                    },
                                    {
                                        type: "div",
                                        props: {
                                            style: {
                                                fontSize: "32px",
                                            },
                                            children: "Netflix",
                                        },
                                    },
                                    {
                                        type: "div",
                                        props: {
                                            style: {
                                                display: "flex",
                                                marginTop: "10px",
                                            },
                                            children: [
                                                {
                                                    type: "div",
                                                    props: {
                                                        style: {
                                                            backgroundColor:
                                                                "crimson",
                                                            padding: 5,
                                                            margin: 5,
                                                            borderRadius: "5px",
                                                        },
                                                        children:
                                                            "Bryan Cranston",
                                                    },
                                                },
                                                {
                                                    type: "div",
                                                    props: {
                                                        style: {
                                                            backgroundColor:
                                                                "crimson",
                                                            padding: 5,
                                                            margin: 5,
                                                            borderRadius: "5px",
                                                        },
                                                        children: "Aaron Paul",
                                                    },
                                                },
                                                {
                                                    type: "div",
                                                    props: {
                                                        style: {
                                                            backgroundColor:
                                                                "crimson",
                                                            padding: 5,
                                                            margin: 5,
                                                            borderRadius: "5px",
                                                        },
                                                        children: "Anna Gunn",
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            type: "img",
                            props: {
                                src: cover,
                                style: {
                                    aspectRatio: 8 / 11,
                                    borderRadius: "10px",
                                    placeSelf: "center",
                                    height: "25rem",
                                },
                            },
                        },
                    ],
                },
            },
        ],
    },
};

const bbExample = async (robotoArrayBuffer) => {
    const width = 1024;
    const height = 512;

    const svg = await satori(bb_example, {
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
