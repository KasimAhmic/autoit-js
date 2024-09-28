{
    "targets": [
        {
            "target_name": "autoit_js",
            "sources": ["<!@(node scripts/list-source-files.js)"],
            "include_dirs": ["<!(node -p \"require('node-addon-api').include\")"],
            "dependencies": [
                "<!(node -p \"require('node-addon-api').targets\"):node_addon_api"
            ],
            "cflags!": ["-fno-exceptions"],
            "cflags_cc!": ["-fno-exceptions"],
            "cflags_cc": ["-std=c++17"],
            "defines": ["NAPI_DISABLE_CPP_EXCEPTIONS"],
            "copies": [
                {
                    "files": ["./src/autoit/AutoItX3_x64.dll"],
                    "destination": "<(PRODUCT_DIR)",
                }
            ],
            "msvs_settings": {
                "VCCLCompilerTool": {
                    "AdditionalOptions": ["/Zc:__cplusplus", "-std:c++17"]
                }
            },
        }
    ]
}
