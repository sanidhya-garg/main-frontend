

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  
    ,  "./src/components/timer.js",
    ,  "./src/pages/student/dashboard/index.js",
    "./src/components/student/sidebar.js",
    "./src/components/startUp/AI/Aipopup.js",
    "./src/components/student/popupwindow.js",
    "./src/components/Loadpopup.js",
    "./src/components/responsiveAppBar.js",
    "./src/components/otpBox/otpBox.js",
    "./src/pages/signIn.js",
    "./src/pages/signUp.js",
    "./src/pages/startUp/addNew.js"

  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'),],

  daisyui: {
    themes: ["light"],
  },

}
