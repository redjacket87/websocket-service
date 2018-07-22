const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

// для 2 файлов - оверхед, но для масшстабируемости - окей
const makeEntry = () => {
    const ENTRIES_DIRECTORY = './client/entries';
    const entries = fs.readdirSync(ENTRIES_DIRECTORY);
    return entries.reduce((acc, entry) => {
        const entryKey = entry.split('.')[0];
        acc[entryKey] = `${ENTRIES_DIRECTORY}/${entry}`;
        return acc;
    }, {})
};

module.exports = {
    entry: makeEntry(),
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react',]
                    }
                }
            }
        ]
    }
};
