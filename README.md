# RN_Bitopro_HW01

此為進入Bitopro第一個作業練習，目的是為了熟悉RN的寫法。因過去都是寫Android原生居多，跨平台也只有使用過Unity以及一點點的Flutter，算是第一次寫RN，因此架構以及語法上可能相對的比較亂，可能同一種功能今天用A寫法，明天改用B寫法，但這些都是熟悉一個語言的過程。

## 程式架構
大架構主要分為RN、DatabaseManager、Database三個部分.  
### React Native 
程式分為Login、Main兩個大頁面，再將Main利用 NavigationBottom 分成帳單以及朋友兩個單元，每個單元都有自己的新增以及瀏覽詳細資訊，最後將每個頁面之間資料的溝通以及與API後端的串接。主要用到的元件除了有基本的Text、Button之外，還使用了SectionList、FlatList、Navigation.....等等。比較麻煩的是RN在Class與
Function之間的切換，還有中間傳值傳Callback的方法需要熟悉。

   
### API
API Root : GET https://script.google.com/macros/s/AKfycbxqE5ulad6Eud76--JfHMj9wBimTfXpphxUtJ-7tNfuVTLPmzSA/exec
[Google App Script](https://script.google.com/d/1Vo5LciDOdjbkLBvATRZZfoBKYwYsdeUUsFZ80FjIwnZ2005hnLh0rzTR/edit?usp=sharing)    

##### action
* login :
  * account
  * passowrd
* get_bill_list :
  * name // user name.  
* edit_bill : 
  * id
  * from 
  * to 
  * unit
* add_bill:
  * owner
  * total 
  * revier
  * time
  * time
  * collection
* remove_bill:
  * id 
  * name
* get_friend_list:
  * name
* get_bill:
  * id
* add_friend:
  * name
* remove_friend:
  * name
* get_trade_history:
  * id
  * name

### Google Sheet Database


[Google SpeadSheet DB](https://docs.google.com/spreadsheets/d/1LaApddsT81_zN34lSmcMfg8MQV0yFtOfXHEFt-I4otg/edit#gid=420268058)
