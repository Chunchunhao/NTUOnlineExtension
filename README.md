
# NTU 選課 Extension
------
這份程式的代碼大部份不是我寫的，試看大大們的code慢慢學的
因為沒有事先告知大大們，所以使用大大們的程式碼的部分都沒有做任何修改

## 使用目的 
查詢 選課評價，歷屆分數，目前選課人數

## 使用方法 (Y78) 大大教學
- 把chrome_ntu.zip解壓縮成chrome_ntu資料夾
- 在網址列輸入chrome://extensions，按enter
- 右上角"開發人員模式" 打勾
- 按下"載入未封裝擴充功能"
- 選擇第一步解壓縮後的chrome_ntu資料夾

## 目前的問題
- 歷屆分數和已選上人數跑的速度很慢
- 以選上人數 在初選一階之前沒有資料 所以呈現
- ?


# Chrome Extension 部分

## 主要架構使用了 Courgle大大的Extension
- 請大家多下載他們的程式:D 
- https://chrome.google.com/webstore/detail/courgle/mcggpejjnbggdinebehabmihecojgpdf

## 另外也使用了 Y78 大大的 Extension
- 也請大家多多下載他們的程式 :D
- http://www.ptt.cc/bbs/NTU/M.1389714389.A.ECA.html

## 自己增加的部分
- 只有分數歷年GPA的部分

# Node 部分 

- Simple API :
- 把近三年的分數抓下來
- 抓的網址  http://if163.aca.ntu.edu.tw/eportfolio/student/Curve.asp?Year=101&Term=1&CouCode=103+51650&Class=02
