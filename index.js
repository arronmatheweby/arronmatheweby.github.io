// Name: YouTube Operations
// ID: SPyoutubeoperations
// Description: Fetch and play Youtube videos and statistics in your project.
// By: SharkPool Remixed by ArronMathewEby
// Contributed By: Nekl300
// Contributed By: Clickertale2 <https://github.com>
// Contributed by: MubiLop https://github.com
// License: GNU

// Version V.1.8.07_Patched

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("YouTube Operations must run unsandboxed");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDUuMzU4IiBoZWlnaHQ9IjE0NS4zNTgiIHZpZXdCb3g9IjAgMCAxNDUuMzU4IDE0NS4zNTgiPjxwYXRoIGQ9Ik0wIDcyLjY3OUMwIDMyLjUzOSAzMi41NCAwIDcyLjY3OSAwczcyLjY3OSAzMi41NCA3Mi42NzkgNzIuNjc5LTMyLjU0IDcyLjY3OSRefTcyLjY3OS03Mi42NzkgTzExMi44MTggMCA3Mi42NzkiIGZpbGw9IiNjMzAwMDAiLz48cGF0aCBkPSJNOS4wNDEgNzIuNjc5YzAtMzUuMTQ2IDI4LjQ5Mi02My42MzggNjMuNjM4LTYzLjYzOHM2My42MzggMjguNDkyIDYzLjYzOCA2My42MzgtMjguNDkyIDYzLjYzOC02My42MzggNjMuNjM4UzkuMDQxIDEwNy44MjUgOS4wNDEgNzIuNzkiIGZpbGw9InJlZCIvPjxwYXRoIGQ9Ik05OS40MTQgNzYuNjQxYy0xMC41ODYgNS44Ni0zMC4xIDE2LjY1OS0zNi4yODcgMjAuMDgzLTMuNjk1IDIuMDQ1LTcuOTEyIDEuMDM5LTcuOTEyLTMuOTEzdi0zOS4zN2MwLTQuMTg1IDMuNTI0LTcuMDU1IDYuNzctNS4yNThsMzcuNDI5IDIwLjcxNWM0LjIwNiAyLjMyOCA0LjIgNS40MTkgMCA3Ljc0MyIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==";

  const blockIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSMzMy4yMDYiIGhlaWdodD0iMjUuMTk2IiB2aWV3Qm94PSIwIDAgMzMuMjA2IDI1LjE5NiI+PHBhdGggZD0iTTMzLjIwNiAxMi41OThzMCA1Ljg1OC0uNjk0IDguNjYzYy0uMzgzIDEuNTUtMS41MDcgMi43NjgtMi45MzYgMy4xODItMi41ODkuNzUzLTEyLjk3My43NTMtMTIuOTczLjc1M3MtMTAuMzg0IDAtMTIuOTczLS43NTNjLTEuNDMtLjQxNC0yLjU1My0xLjYzMi0yLjkzNi0zLjE4MkMwIDE4LjQ1NiAwIDEyLjU5OCAwIDEyLjU5OFMwIDYuNzQuNjk0IDMuOTM1QzEuMDc3IDIuMzg1IDIuMjAxIDEuMTY3IDMuNjMuNzUyIDYuMjE5IDAgMTYuNjMuMCAxNi42MDMgMHMxMC4zODQgMCAxMi45NzMuNzUyYzEuNDMuNDE1IDIuNTUzIDEuNjMzIDIuOTM2IDMuMTgzLjY5MSAyLjgwNS42OTQgOC42NjMuNjk0IDguNjYzIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTMwLjg4OCAxMi41OThzMCA0LjY1LS41OTcgNi44NzdhMy41OCAzLjU4IDAgMCAxLTIuNTI2IDIuNTI2Yy0yLjIyNy45NTargetMTEuMTYyLjU5Ny0xMS4xNjYuNTk3cy04LjkzNSAwLTExLjE2Mi0uNTk3YTMuNTggMy41OCAwIDAgMS0yLjUyNi0yLjUyNmMtLjU5Ny0yLjIyNy0uNTk3LTYuODc3LS41OTctNi44NzdzMC00LjY1LjU5Ny02LjY3N2EzLjU4IDMuNTggMCAwIDEgMi41MjYtMi41MjZjMi4yMjctLjU5NyAxMS4xNjItLjU5NyAxMS4xNjItLjU5N3M4LjkzNSAwIDExLjE2Mi41OTdhMy41IDMuNTggMCAwIDEgMi41MjYgMi41MjZjLjU5NSAyLjIyNy41OTcgNi44NzcuNTk3IDYuODc3IiBmaWxsPSJyZWQiLz48cGF0aCBkPSJtMTMuNzQzIDguMzEzIDcuNDIzIDQuMjg1LTcuNDIzIDQuMjg1eiIgZmlsbD0iI2ZmZiIv></c3ZnPg==";

  const Cast = Scratch.Cast;
  const vm = Scratch.vm;
  const runtime = vm.runtime;

  const proxies = [
     "https://allorigins.win", 
     "https://herokuapp.com"
  ];

  const YTCache_ = new Map();

  const setCache = (id, value, omit_expiration) => {
    YTCache_.set(id, {
      expires: omit_expiration ? NaN : Date.now() + (180 * 1000),
      value: value
    });
  };

  const getCache = (id) => {
    if (YTCache_.has(id)) {
      const item = YTCache_.get(id);
      if (Date.now() > item.expires) {
        YTCache_.delete(id);
      }
      return item.value;
    }
    return null;
  };

  const INVALID_ID = "Invalid URL";

  let PLAYER_MODE = "canvas";
  let canvasPlayer = null;
  const ytWindows = [];

  const createCanvasPlayer = (src, options) => {
    canvasPlayer = document.createElement("iframe");
    canvasPlayer.setAttribute("style", `width: ${options.width}px; height: ${options.height}px; position: absolute; transform: translate(${options.left}px, ${options.top}px); border: none; pointer-events: auto;`);
    canvasPlayer.setAttribute("allowtransparency", "true");
    canvasPlayer.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture");

    let cleanSrc = src;
    if (src.includes("yout-ube.com")) {
       cleanSrc = src.replace("yout-ube.com", "://youtube-nocookie.com");
    } else if (!src.includes("embed") && src.includes("watch?v=")) {
       const videoId = src.split("v=")[1].split("&")[0];
       cleanSrc = `https://www.://youtube-nocookie.com${videoId}`;
    }
    
    canvasPlayer.setAttribute("src", cleanSrc);
    vm.renderer.addOverlay(canvasPlayer, "scale-centered");
  };

  const updateCanvasPlayer = (options) => {
    if (!canvasPlayer) return;
    canvasPlayer.style.width = options.width + "px";
    canvasPlayer.style.height = options.height + "px";
    canvasPlayer.style.transform = `translate(${options.left}px, ${options.top}px)`;
  };

  const closeCanvasPlayer = () => {
    if (canvasPlayer) {
      vm.renderer.removeOverlay(canvasPlayer);
      canvasPlayer = null;
    }
  };

  runtime.on("RUNTIME_DISPOSED", closeCanvasPlayer);
  runtime.on("PROJECT_STOP_ALL", closeCanvasPlayer);

  class YTOperationsSP {
    getInfo() {
      return {
        id: "SPyoutubeoperations",
        name: "YouTube Operations",
        menuIconURI,
        blockIconURI,
        color1: "#ff0000",
        color2: "#c10000",
        color3: "#820000",
        blocks: [
          { blockType: Scratch.BlockType.LABEL, text: "Videos" },
          {
            opcode: "extractVideoID",
            blockType: Scratch.BlockType.REPORTER,
            text: "extract video ID from [URL]",
            arguments: {
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "https://youtube.com" }
            }
          },
          "---",
          {
            opcode: "fetchStats",
            blockType: Scratch.BlockType.REPORTER,
            text: "get [STAT] count of video [VIDEO_ID]",
            arguments: {
              STAT: { type: Scratch.ArgumentType.STRING, menu: "STAT_OPTIONS" },
              VIDEO_ID: { type: Scratch.ArgumentType.STRING, defaultValue: "dQw4w9WgXcQ" }
            }
          },
          {
            opcode: "fetchtitle",
            blockType: Scratch.BlockType.REPORTER,
            text: "get [STAT] of video [VIDEO_ID]",
            arguments: {
              STAT: { type: Scratch.ArgumentType.STRING, menu: "STAT_OPTION" },
              VIDEO_ID: { type: Scratch.ArgumentType.STRING, defaultValue: "dQw4w9WgXcQ" }
            }
          },
          {
            opcode: "vid2MP4",
            blockType: Scratch.BlockType.REPORTER,
            text: "video [VIDEO_ID] to [TYPE]",
            arguments: {
              VIDEO_ID: { type: Scratch.ArgumentType.STRING, defaultValue: "dQw4w9WgXcQ" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "EXPORT_TYPES" }
            }
          },
          "---",
          {
            opcode: "getResults",
            blockType: Scratch.BlockType.REPORTER,
            text: "search for videos with query [QUERY]",
            arguments: {
              QUERY: { type: Scratch.ArgumentType.STRING, defaultValue: "SharkPool" }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: "Users" },
          {
            opcode: "fetchUserThing",
            blockType: Scratch.BlockType.REPORTER,
            text: "get [THING] from channel [URL]",
            arguments: {
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "https://youtube.com" },
              THING: { type: Scratch.ArgumentType.STRING, menu: "USER_STUFF" }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: "Video Player" },
          {
            opcode: "setPlayer",
            blockType: Scratch.BlockType.COMMAND,
            text: "play videos on [TYPE]",
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "DISPLAY" }
            }
          },
          {
            opcode: "openYouTubeLinkInNewWindow",
            blockType: Scratch.BlockType.COMMAND,
            text: "open video [ID] with width: [WIDTH] height: [HEIGHT] x: [LEFT] y: [TOP]",
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "dQw4w9WgXcQ" },
              WIDTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 480 },
              HEIGHT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 360 },
              LEFT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              TOP: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          }
        ],
        menus: {
          STAT_OPTIONS: {
            acceptReporters: true,
            items: ["views", "likes", "comments"]
          },
          STAT_OPTION: {
            acceptReporters: true,
            items: ["title", "author", "duration"]
          },
          EXPORT_TYPES: {
            acceptReporters: true,
            items: ["mp4", "mp3"]
          },
          USER_STUFF: {
            acceptReporters: true,
            items: ["subscribers", "video count", "banner"]
          },
          DISPLAY: {
            acceptReporters: true,
            items: ["canvas", "new window"]
          }
        }
      };
    }

    extractVideoID(args) {
      const url = Cast.toString(args.URL);
      if (url.includes("v=")) return url.split("v=")[1].split("&")[0];
      if (url.includes("be/")) return url.split("be/")[1].split("?")[0];
      return url;
    }

    fetchStats(args) {
      return "0";
    }

    fetchtitle(args) {
      return "Loading Title...";
    }

    vid2MP4(args) {
      return "Feature Unavailable";
    }

    getResults(args) {
      return "[]";
    }

    fetchUserThing(args) {
      return "Loading Data...";
    }

    setPlayer(args) {
      PLAYER_MODE = Cast.toString(args.TYPE);
    }

    openYouTubeLinkInNewWindow(args) {
      const id = Cast.toString(args.ID);
      const url = `https://www.://youtube-nocookie.com${id}?autoplay=1`;
      createCanvasPlayer(url, args);
    }
  }

  Scratch.extensions.register(new YTOperationsSP());
})(Scratch);
