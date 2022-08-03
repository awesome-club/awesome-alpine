import { serve } from "https://deno.land/std@0.150.0/http/server.ts";

const port = 8080;
const host = `http://localhost:${port}/`;

const is = (url: string, type: string) => url.indexOf(`.${type}`) > -1;
const isHTML = (url: string) => is(url, "html");
const isJS = (url: string) => is(url, "js");
const isCSS = (url: string) => is(url, "css");
const isJpeg = (url: string) => is(url, "jpeg");
const path = (url: string) => url.replace(host, "");

const handler = async (request: Request): Promise<Response> => {
  const { url } = request;

  let body: string | Uint8Array = "";
  let type = "";

  if (isHTML(url)) {
    body = await Deno.readTextFile(`./src/pages/${path(url)}`);
    type = "text/html";
  } else if (isCSS(url)) {
    body = await Deno.readTextFile(`./src/css/${path(url)}`);
    type = "text/css";
  } else if (isJS(url)) {
    body = await Deno.readTextFile(`./src/js/${path(url)}`);
    type = "text/javascript";
  } else if (isJpeg(url)) {
    body = await Deno.readFile(`./src/img/${path(url)}`);
    type = "image/jpeg";
  }

  return new Response(body, {
    status: 200,
    headers: {
      "content-type": type,
    },
  });
};

await serve(handler, { port });
