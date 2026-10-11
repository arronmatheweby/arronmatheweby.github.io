// Name: YouTube Operations
// ID: SPyoutubeoperations
// Description: Fetch and play Youtube videos and statistics in your project.
// By: SharkPool Remixed by ArronMathewEby
// Contributed By: Nekl300
// Contributed By: Clickertale2 <https://github.com/Clickertale2>
// Contributed by: MubiLop https://github.com/cicerorph
// License: GNU

// Version V.1.8.07_Patched

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("YouTube Operations must run unsandboxed");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDUuMzU4IiBoZWlnaHQ9IjE0NS4zNTgiIHZpZXdCb3g9IjAgMCAxNDUuMzU4IDE0NS4zNTgiPjxwYXRoIGQ9Ik0wIDcyLjY3OUMwIDMyLjUzOSAzMi41NCAwIDcyLjY3OSAwczcyLjY3OSAzMi41NCA3Mi42NzkgNzIuNjc5LTMyLjU0IDcyLjY3OS03Mi42NzkgNzIuNjc5UzAgMTEyLjgxOCAwIDcyLjY3OSIgZmlsbD0iI2MzMDAwMCIvPjxwYXRoIGQ9Ik05LjA0MSA3Mi42NzljMC0zNS4xNDYgMjguNDkyLTYzLjYzOCA2My42MzgtNjMuNjM4czYzLjYzOCAyOC40OTIgNjMuNjM4IDYzLjYzOC0yOC40OTIgNjMuNjM4LTYzLjYzOCA2My42MzhTOS4wNDEgMTA3LjgyNSA5LjA0MSA3Mi42NzkiIGZpbGw9InJlZCIvPjxwYXRoIGQ9Ik05OS40MTQgNzYuNjQxYy0xMC41ODYgNS44Ni0zMC4xIDE2LjY1OS0zNi4yODcgMjAuMDgzLTMuNjk1IDIuMDQ1LTcuOTEyIDEuMDM5LTcuOTEyLTMuOTEzdi0zOS4zN2MwLTQuMTg1IDMuNTI0LTcuMDU1IDYuNzctNS4yNThsMzcuNDI5IDIwLjcxNWM0LjIwNiAyLjMyOCA0LjIgNS40MTkgMCA3Ljc0MyIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==";

  const blockIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMy4yMDYiIGhlaWdodD0iMjUuMTp2aWV3Qm94PSIwIDAgMzMuMjA2IDI1LjE5NiI+PHBhdGggZD0iTTMzLjIwNiAxMi41OThzMCA1Ljg1OC0uNjk0IDguNjYzYy0uMzgzIDEuNTUtMS41MDcgMi43NjgtMi45MzYgMy4xODItMi41ODkuNzUzLTEyLjk3My43NTMtMTIuOTczLjc1M3MtMTAuMzg0IDAtMTIuOTczLS43NTNjLTEuNDMtLjQxNC0yLjU1My0xLjYzMi0yLjkzNi0zLjE4MkMwIDE4LjQ1NiAwIDEyLjU5OCAwIDEyLjU5OFMwIDYuNzQuNjk0IDMuOTM1QzEuMDc3IDIuMzg1IDIuMjAxIDEuMTY3IDMuNjMuNzUyIDYuMjE5IDAgMTYuNjAzIDAgMTYuNjAzIDBzMTAuMzg0IDAgMTIuOTczLjc1MmMxLjQzLjQxNSAyLjU1MyAxLjYzMyAyLjkzNiAzLjE4My42OTEgMi44MDUuNjk0IDguNjYzLjY5NCA4LjY2MyIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0zMC44ODggMTIuNTk4czAgNC42NS0uNTk3IDYuODc3YTMuNTggMy41OCAwIDAgMS0yLjUyNiAyLjUyNmMtMi4yMjcuNTk3LTExLjE2Mi41OTctMTEuMTYyLjU5N3MtOC45MzUgMC0xMS4xNjItLjU5N2EzLjU4IDMuNTggMCAwIDEtMi41MjYtMi41MjZjLS41OTctMi4yMjctLS41OTctNi44NzctLjU5Ny02Ljg3N3MwLTQuNjUuNTk3LTYuODc3YTMuNTggMy41OCAwIDAgMSAyLjUyNi0yLjUzMmMyLjIyNy0uNTk3IDExLjE2Mi0uNTk3IDExLjE2Mi0uNTk3czguOTM1IDAgMTEu1OTdaMy41OCAzLjU4IDAgMCAxIDIuNTI2IDIuNTI2Yy41OTUgMi4yMjcuNTk3IDYuODc3LjA5NyA2Ljg3NyIgZmlsbD0icmVkIi8+PHBhdGggZD0ibTEzLjc0MyA4LjMxMyA3LjQyMyA0LjI4NS03LjQyMyA0LjI4NXoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=";

  const Cast = Scratch.Cast;
  const vm = Scratch.vm;
  const runtime = vm.runtime;

  /**
   * Corrected public CORS proxy pathways to accept raw stream routing queries
   */
  const proxies = [
     "https://allorigins.win", 
     "https://herokuapp.com",
     "https://onrender.com"
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
    
    // Explicit feature policies applied directly to enable cross-origin video processing
    canvasPlayer.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture");

    // Decodes link string configuration straight to stable privacy embed endpoint
    let cleanSrc = src;
    if (src.includes("yout-ube.com")) {
       cleanSrc = src.replace("yout-ube.com", "://youtube-nocookie.com");
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
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
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
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "https://www.youtube.com/@SharkPool_SP" },
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
        ]
      };
    }
  }

  Scratch.extensions.register(new YTOperationsSP());
})(Scratch);
