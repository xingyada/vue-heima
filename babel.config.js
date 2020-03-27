module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
   "plugins": [["component", 
    {
      "libraryName": "mint-ui",
      "style": true
    }
   ], ['transform-remove-strict-mode']],
  "ignore": ["./lib/mui/js/mui.js", "./lib/mui/js/mui.min.js"]
}
