
# deploy.

https://viblo.asia/p/deploy-ung-dung-reactjs-len-github-pages-1VgZvw3MlAw

1. Cài đặt gh-pages

  npm install --save gh-pages
 
2. Cần thêm code ở file package.json như sau:

// Thêm đường dẫn homepage

// https://uvsnag.github.io/tip_management_for_nodejs/

"homepage": "https://uvsnag.github.io/tip_management_for_nodejs/",
 
#
// Thêm command predeploy & deploy app

"predeploy": "npm run build",

"deploy": "gh-pages -d build",

3. Chạy deploy app

  npm run deploy
 

4. github page -> chọn branch gh-pages

đợi 15'

 

# KHI UPDATE CODE

commit code lên nhánh  main
  npm run deploy(nhánh main)


# link tham khao

1. icon
https://react-icons.github.io/react-icons/icons?name=fa


download reaktek audio:
https://www.realtek.com/en/component/zoo/category/pc-audio-codecs-high-definition-audio-codecs-software

# nodejs v16