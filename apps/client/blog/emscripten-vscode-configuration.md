---
title: Emscripten VSCode configuration
lede: Configure Visual Studio Code for Emscripten
authors:
  - name: Jeremy Nguyen
tags:
  - vscode
  - emscripten
mastodonId: "117166086429105275"
---

<!-- Originally posted on https://gist.github.com/jeremy-code/825752985d55d0b8ea86f58cd502a109/edit -->

Suppose you want to set up VSCode with Emscripten. In my case, I am using devcontainers with Docker and Emscripten's official Docker image ([`emscripten/emsdk`](https://hub.docker.com/r/emscripten/emsdk)), but any VSCode installation should do.

Run `emconfigure env` and you should get an output similar to this:

```shell
...
EMSDK_NODE=/emsdk/node/22.16.0_64bit/bin/node
EMSDK=/emsdk
EM_CONFIG=/emsdk/.emscripten
CC=/emsdk/upstream/emscripten/emcc
CXX=/emsdk/upstream/emscripten/em++
AR=/emsdk/upstream/emscripten/emar
LD=/emsdk/upstream/emscripten/emcc
NM=/emsdk/upstream/bin/llvm-nm
LDSHARED=/emsdk/upstream/emscripten/emcc
RANLIB=/emsdk/upstream/emscripten/emranlib
EMSCRIPTEN_TOOLS=/emsdk/upstream/emscripten/tools
HOST_CC=/emsdk/upstream/bin/clang
HOST_CXX=/emsdk/upstream/bin/clang++
HOST_CFLAGS=-W
HOST_CXXFLAGS=-W
PKG_CONFIG_LIBDIR=/emsdk/upstream/emscripten/cache/sysroot/local/lib/pkgconfig:/emsdk/upstream/emscripten/cache/sysroot/lib/pkgconfig
PKG_CONFIG_PATH=
EMSCRIPTEN=/emsdk/upstream/emscripten
ACLOCAL_PATH=/emsdk/upstream/emscripten/cache/sysroot/share/aclocal
CROSS_COMPILE=/emsdk/upstream/emscripten/em
EMMAKEN_JUST_CONFIGURE=1
```

The specific environment variables you're looking for is `$HOST_CC` or `$HOST_CXX`. By default, you will be using `$HOST_CXX` even when compiling only C, since [`DEFAULT_TO_CXX`](https://emscripten.org/docs/tools_reference/settings_reference.html) is enabled by default.

The reason for this is we need to set up the `Compiler Path` for the C/C++ VSCode extension. The thing is, our typical entrypoint `emcc` won't work since it's set up to only work with `MSVC`, `gcc`, or `Clang`, (See [emscripten-core/emscripten#11163](https://github.com/emscripten-core/emscripten/issues/11163), [microsoft/vscode-cpptools#4269](https://github.com/microsoft/vscode-cpptools/issues/4269)). You could install a different extension for this (e.g. [`ms-vscode.cmake-tools`](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cmake-tools)) for additional configurations, but there is no official Emscripten VSCode extension unfortunately.

In Visual Studio Code, you can store a `.vscode/c_cpp_properties.json` file for configuring the C++ extension.

If you run `emcc --cflags`, you'll see output like this:

```shell
emcc --cflags
# -target wasm32-unknown-emscripten -fignore-exceptions -mllvm -combiner-global-alias-analysis=false -mllvm -enable-emscripten-sjlj -mllvm -disable-lsr --sysroot=/emsdk/upstream/emscripten/cache/sysroot -DEMSCRIPTEN -Xclang -iwithsysroot/include/fakesdl -Xclang -iwithsysroot/include/compat
```

If you check out the [`emcc` documentation](https://emscripten.org/docs/tools_reference/emcc.html), it says:

> `--cflags`
> \[other] Prints out the flags emcc would pass to clang to compile source code to object form. You can use this to invoke clang yourself, and then run emcc on those outputs just for the final linking+conversion to JS.

Somewhat annoyingly, though, `compilerArgs` in VSCode must be an array of strings and can't be a string. So, using `jq` (which comes pre-installed in macOS Sequoia), we can do something like this:

```shell
jq --arg cflags "$(emcc --cflags)" '.env.EMSCRIPTEN_CFLAGS = ($cflags | split(" "))' << EOF > .vscode/c_cpp_properties.json
{
  "configurations": [
    {
      "name": "Emscripten",
      "compilerPath": "/emsdk/upstream/bin/clang++",
      "compilerArgs": ["\${EMSCRIPTEN_CFLAGS}"],
      "intelliSenseMode": "linux-clang-x64",
      "includePath": ["\${workspaceFolder}/**"]
    }
  ],
  "version": 4,
  "enableConfigurationSquiggles": true
}
EOF
```

which will output this JSON to `.vscode/c_cpp_properties.json` and update the VSCode C/C++ settings:

```json
{
  "env": {
    "EMSCRIPTEN_CFLAGS": [
      "-target",
      "wasm32-unknown-emscripten",
      "-fignore-exceptions",
      "-mllvm",
      "-combiner-global-alias-analysis=false",
      "-mllvm",
      "-enable-emscripten-sjlj",
      "-mllvm",
      "-disable-lsr",
      "--sysroot=/emsdk/upstream/emscripten/cache/sysroot",
      "-DEMSCRIPTEN",
      "-Xclang",
      "-iwithsysroot/include/fakesdl",
      "-Xclang",
      "-iwithsysroot/include/compat"
    ]
  }
  "configurations": [
    {
      "name": "Emscripten",
      "compilerPath": "/emsdk/upstream/bin/clang++",
      "compilerArgs": ["${EMSCRIPTEN_CFLAGS}"],
      "intelliSenseMode": "linux-clang-x64",
      "includePath": ["${workspaceFolder}/**"]
    }
  ],
  "version": 4,
  "enableConfigurationSquiggles": true
}
```

where `configurations[0].compilerPath` is `$HOST_CXX` and `intelliSenseMode` is your OS (`windows`, `linux`, `macos`) `-clang-x64` (Interestingly, when I tried `-clang-arm64` it kept rejecting it and switching to `x64` even on an ARM system).

You would only have to run this command once. There's probably a way to make it always up-to-date using Go templates or using the aforementioned devcontainers, but I can't imagine that the Emscripten changes C flags incredibly frequently.

I included an `includePath` to `${workspaceFolder}/**` directory in case you wanted to do that, but if all your libraries headers' are all in the system include directories (e.g. `/usr/include`, `/usr/local/include`), it's not necessary.

You may want to also include `-std=c99` or `-std=c++17` (when using Embind) since those are the version requirements for using Emscripten.[^1]

That's all. There's probably a couple of different ways to do this such as using CMake (Emscripten includes an [Emscripten.cmake](https://github.com/emscripten-core/emscripten/blob/main/cmake/Modules/Platform/Emscripten.cmake) file) or just listing out Emscripten's include directories in `includePath` (e.g. `/emsdk/upstream/emscripten/cache/sysroot/include`) but IMO this way is probably as close as you'll get to replicating the behavior of `emcc`.

[^1]: https://github.com/emscripten-core/emscripten/blob/b1fc37fb8516edc2dbd98a5c1b6313ad2a0bf7b0/ChangeLog.md?plain=1#L397
