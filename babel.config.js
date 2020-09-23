// module.exports = {
//   presets: [
//     '@vue/cli-plugin-babel/preset'
   
//   ]
// }

module.exports = {
  presets: [
    ['@vue/app', {
      polyfills: [
        'es6.promise',
        'es6.symbol'
      ],
      useBuiltIns: "entry"
    }]
  ]
}