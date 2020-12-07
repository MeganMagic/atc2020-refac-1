const webpack = require("webpack");

module.exports = {
    module : {
        rules: [
            {
                test: /\.(png|jpe?g|gif|xlsx|csv)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                        },
                    },
                ],
            },
        ],
    },
};
  