module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: ['168'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        WebViewJavascriptBridge: 'readonly',
        uni: 'readonly',
        wx: 'readonly',
        Page: 'writable',
        getCurrentPages: 'readonly',
        getApp: 'readonly'
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: ['vue'],
    rules: {
        camelcase: 0
    }
}
