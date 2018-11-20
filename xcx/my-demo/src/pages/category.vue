<template>
  <div class="container" :style="{backgroundPosition: '0 ' + backgroundPosition}">
    <div class="search-box-wrap">
      <div class="search-help flex items-center justify-center" @tap="linkTo('/pages/search-help')">
        <i class="iconfont icon-help"></i>教程
      </div>
      <div class="search-box">
        <view class="search flex items-center justify-center" @tap="toSearch('')">
          <i class="iconfont icon-sousuo-"></i>
          <text>请输入商品名称</text>
        </view>
        <view class="search-key flex justify-between">
          <div @tap="toSearch('全部商品')">全部商品</div>
          <div v-for="(item, index) in keyWords" :key="index" @tap="toSearch(item)">{{item}}</div>
        </view>
      </div>
    </div>
    <div class="category-box">
      <div class="categories">
        <div @tap="checkCatId(item.cat_id)"
             v-for="(item, index) in cat_list" :key="index"
             :class="{'category-item': true, selected: item.cat_id === selectedId}">
          {{item.cat_name}}
        </div>
      </div>
      <div class="details">
        <div class="details-list flex flex-wrap">
          <div class="detail-item flex flex-column justify-center"
               @tap="toCategory(items)"
               v-for="(items, index) in cat_list_two"
               :key="index"
          >
            <image :src="host + '2/101.jpg'" v-if="items.cat_id==101"></image>
            <image :src="host + '2/3853.jpg'" v-else-if="items.cat_id==3853"></image>
            <image :src="host + '2/3862.jpg'" v-else-if="items.cat_id==3862"></image>
            <image :src="host + '2/3867.jpg'" v-else-if="items.cat_id==3867"></image>
            <image :src="host + '2/3872.jpg'" v-else-if="items.cat_id==3872"></image>
            <image :src="host + '2/3876.jpg'" v-else-if="items.cat_id==3876"></image>
            <image :src="host + '2/3900.jpg'" v-else-if="items.cat_id==3900"></image>
            <image :src="host + '2/63.jpg'" v-else-if="items.cat_id==63"></image>
            <image :src="host + '2/64.jpg'" v-else-if="items.cat_id==64"></image>
            <image :src="host + '2/65.jpg'" v-else-if="items.cat_id==65"></image>
            <image :src="host + '2/92.jpg'" v-else-if="items.cat_id==92"></image>
            <image :src="host + '2/95.jpg'" v-else-if="items.cat_id==95"></image>
            <image :src="host + '2/99.jpg'" v-else-if="items.cat_id==99"></image>
            <image :src="host + '69/179.jpg'" v-else-if="items.cat_id==179"></image>
            <image :src="host + '69/3726.jpg'" v-else-if="items.cat_id==3726"></image>
            <image :src="host + '69/3732.jpg'" v-else-if="items.cat_id==3732"></image>
            <image :src="host + '69/3737.jpg'" v-else-if="items.cat_id==3737"></image>
            <image :src="host + '69/3746.jpg'" v-else-if="items.cat_id==3746"></image>
            <image :src="host + '69/3773.jpg'" v-else-if="items.cat_id==3773"></image>
            <image :src="host + '69/70.jpg'" v-else-if="items.cat_id==70"></image>
            <image :src="host + '69/71.jpg'" v-else-if="items.cat_id==71"></image>
            <image :src="host + '77/3943.jpg'" v-else-if="items.cat_id==3943"></image>
            <image :src="host + '77/3957.jpg'" v-else-if="items.cat_id==3957"></image>
            <image :src="host + '77/4018.jpg'" v-else-if="items.cat_id==4018"></image>
            <image :src="host + '77/4270.jpg'" v-else-if="items.cat_id==4270"></image>
            <image :src="host + '77/4271.jpg'" v-else-if="items.cat_id==4271"></image>
            <image :src="host + '77/4287.jpg'" v-else-if="items.cat_id==4287"></image>
            <image :src="host + '77/4299.jpg'" v-else-if="items.cat_id==4299"></image>
            <image :src="host + '77/4302.jpg'" v-else-if="items.cat_id==4302"></image>
            <image :src="host + '77/4334.jpg'" v-else-if="items.cat_id==4334"></image>
            <image :src="host + '77/4365.jpg'" v-else-if="items.cat_id==4365"></image>
            <image :src="host + '77/4647.jpg'" v-else-if="items.cat_id==4647"></image>
            <image :src="host + '77/4857.jpg'" v-else-if="items.cat_id==4857"></image>
            <image :src="host + '77/4866.jpg'" v-else-if="items.cat_id==4866"></image>
            <image :src="host + '77/5276.jpg'" v-else-if="items.cat_id==5276"></image>
            <image :src="host + '77/5296.jpg'" v-else-if="items.cat_id==5296"></image>
            <image :src="host + '77/78.jpg'" v-else-if="items.cat_id==78"></image>
            <image :src="host + '77/897.jpg'" v-else-if="items.cat_id==897"></image>
            <image :src="host + '77/898.jpg'" v-else-if="items.cat_id==898"></image>
            <image :src="host + '77/899.jpg'" v-else-if="items.cat_id==899"></image>
            <image :src="host + '77/900.jpg'" v-else-if="items.cat_id==900"></image>
            <image :src="host + '77/901.jpg'" v-else-if="items.cat_id==901"></image>
            <image :src="host + '77/902.jpg'" v-else-if="items.cat_id==902"></image>
            <image :src="host + '77/903.jpg'" v-else-if="items.cat_id==903"></image>
            <image :src="host + '77/904.jpg'" v-else-if="items.cat_id==904"></image>
            <image :src="host + '77/905.jpg'" v-else-if="items.cat_id==905"></image>
            <image :src="host + '77/906.jpg'" v-else-if="items.cat_id==906"></image>
            <image :src="host + '77/907.jpg'" v-else-if="items.cat_id==907"></image>
            <image :src="host + '77/908.jpg'" v-else-if="items.cat_id==908"></image>
            <image :src="host + '83/4485.jpg'" v-else-if="items.cat_id==4485"></image>
            <image :src="host + '83/4491.jpg'" v-else-if="items.cat_id==4491"></image>
            <image :src="host + '83/84.jpg'" v-else-if="items.cat_id==84"></image>
            <image :src="host + '83/85.jpg'" v-else-if="items.cat_id==85"></image>
            <image :src="host + '83/86.jpg'" v-else-if="items.cat_id==86"></image>
            <image :src="host + '83/87.jpg'" v-else-if="items.cat_id==87"></image>
            <image :src="host + '83/88.jpg'" v-else-if="items.cat_id==88"></image>
            <image :src="host + '83/89.jpg'" v-else-if="items.cat_id==89"></image>
            <image :src="host + '210/1533.jpg'" v-else-if="items.cat_id==1533"></image>
            <image :src="host + '210/1891.jpg'" v-else-if="items.cat_id==1891"></image>
            <image :src="host + '210/217.jpg'" v-else-if="items.cat_id==217"></image>
            <image :src="host + '210/218.jpg'" v-else-if="items.cat_id==218"></image>
            <image :src="host + '210/231.jpg'" v-else-if="items.cat_id==231"></image>
            <image :src="host + '210/232.jpg'" v-else-if="items.cat_id==232"></image>
            <image :src="host + '210/233.jpg'" v-else-if="items.cat_id==233"></image>
            <image :src="host + '210/234.jpg'" v-else-if="items.cat_id==234"></image>
            <image :src="host + '210/236.jpg'" v-else-if="items.cat_id==236"></image>
            <image :src="host + '210/3845.jpg'" v-else-if="items.cat_id==3845"></image>
            <image :src="host + '210/4649.jpg'" v-else-if="items.cat_id==4649"></image>
            <image :src="host + '210/5203.jpg'" v-else-if="items.cat_id==5203"></image>
            <image :src="host + '210/5210.jpg'" v-else-if="items.cat_id==5210"></image>
            <image :src="host + '239/245.jpg'" v-else-if="items.cat_id==245"></image>
            <image :src="host + '239/246.jpg'" v-else-if="items.cat_id==246"></image>
            <image :src="host + '239/248.jpg'" v-else-if="items.cat_id==248"></image>
            <image :src="host + '239/3848.jpg'" v-else-if="items.cat_id==3848"></image>
            <image :src="host + '239/5208.jpg'" v-else-if="items.cat_id==5208"></image>
            <image :src="host + '239/7281.jpg'" v-else-if="items.cat_id==7281"></image>
            <image :src="host + '239/7282.jpg'" v-else-if="items.cat_id==7282"></image>
            <image :src="host + '239/7283.jpg'" v-else-if="items.cat_id==7283"></image>
            <image :src="host + '239/7284.jpg'" v-else-if="items.cat_id==7284"></image>
            <image :src="host + '239/7285.jpg'" v-else-if="items.cat_id==7285"></image>
            <image :src="host + '239/7286.jpg'" v-else-if="items.cat_id==7286"></image>
            <image :src="host + '239/7287.jpg'" v-else-if="items.cat_id==7287"></image>
            <image :src="host + '239/7289.jpg'" v-else-if="items.cat_id==7289"></image>
            <image :src="host + '239/7290.jpg'" v-else-if="items.cat_id==7290"></image>
            <image :src="host + '239/7291.jpg'" v-else-if="items.cat_id==7291"></image>
            <image :src="host + '239/7292.jpg'" v-else-if="items.cat_id==7292"></image>
            <image :src="host + '239/7294.jpg'" v-else-if="items.cat_id==7294"></image>
            <image :src="host + '239/7295.jpg'" v-else-if="items.cat_id==7295"></image>
            <image :src="host + '239/7296.jpg'" v-else-if="items.cat_id==7296"></image>
            <image :src="host + '239/7297.jpg'" v-else-if="items.cat_id==7297"></image>
            <image :src="host + '259/1122.jpg'" v-else-if="items.cat_id==1122"></image>
            <image :src="host + '259/1123.jpg'" v-else-if="items.cat_id==1123"></image>
            <image :src="host + '259/1126.jpg'" v-else-if="items.cat_id==1126"></image>
            <image :src="host + '259/1127.jpg'" v-else-if="items.cat_id==1127"></image>
            <image :src="host + '259/1128.jpg'" v-else-if="items.cat_id==1128"></image>
            <image :src="host + '259/1129.jpg'" v-else-if="items.cat_id==1129"></image>
            <image :src="host + '259/1130.jpg'" v-else-if="items.cat_id==1130"></image>
            <image :src="host + '259/1131.jpg'" v-else-if="items.cat_id==1131"></image>
            <image :src="host + '259/1132.jpg'" v-else-if="items.cat_id==1132"></image>
            <image :src="host + '259/1133.jpg'" v-else-if="items.cat_id==1133"></image>
            <image :src="host + '259/1134.jpg'" v-else-if="items.cat_id==1134"></image>
            <image :src="host + '259/1135.jpg'" v-else-if="items.cat_id==1135"></image>
            <image :src="host + '259/260.jpg'" v-else-if="items.cat_id==260"></image>
            <image :src="host + '259/261.jpg'" v-else-if="items.cat_id==261"></image>
            <image :src="host + '259/262.jpg'" v-else-if="items.cat_id==262"></image>
            <image :src="host + '263/264.jpg'" v-else-if="items.cat_id==264"></image>
            <image :src="host + '263/265.jpg'" v-else-if="items.cat_id==265"></image>
            <image :src="host + '263/266.jpg'" v-else-if="items.cat_id==266"></image>
            <image :src="host + '263/267.jpg'" v-else-if="items.cat_id==267"></image>
            <image :src="host + '263/268.jpg'" v-else-if="items.cat_id==268"></image>
            <image :src="host + '263/269.jpg'" v-else-if="items.cat_id==269"></image>
            <image :src="host + '263/3200.jpg'" v-else-if="items.cat_id==3200"></image>
            <image :src="host + '263/4621.jpg'" v-else-if="items.cat_id==4621"></image>
            <image :src="host + '270/271.jpg'" v-else-if="items.cat_id==271"></image>
            <image :src="host + '270/272.jpg'" v-else-if="items.cat_id==272"></image>
            <image :src="host + '270/273.jpg'" v-else-if="items.cat_id==273"></image>
            <image :src="host + '270/274.jpg'" v-else-if="items.cat_id==274"></image>
            <image :src="host + '270/275.jpg'" v-else-if="items.cat_id==275"></image>
            <image :src="host + '270/276.jpg'" v-else-if="items.cat_id==276"></image>
            <image :src="host + '270/4481.jpg'" v-else-if="items.cat_id==4481"></image>
            <image :src="host + '270/4619.jpg'" v-else-if="items.cat_id==4619"></image>
            <image :src="host + '277/1546.jpg'" v-else-if="items.cat_id==1546"></image>
            <image :src="host + '277/278.jpg'" v-else-if="items.cat_id==278"></image>
            <image :src="host + '277/279.jpg'" v-else-if="items.cat_id==279"></image>
            <image :src="host + '277/280.jpg'" v-else-if="items.cat_id==280"></image>
            <image :src="host + '281/1014.jpg'" v-else-if="items.cat_id==1014"></image>
            <image :src="host + '281/3123.jpg'" v-else-if="items.cat_id==3123"></image>
            <image :src="host + '281/3709.jpg'" v-else-if="items.cat_id==3709"></image>
            <image :src="host + '281/4138.jpg'" v-else-if="items.cat_id==4138"></image>
            <image :src="host + '281/4143.jpg'" v-else-if="items.cat_id==4143"></image>
            <image :src="host + '281/4168.jpg'" v-else-if="items.cat_id==4168"></image>
            <image :src="host + '281/4172.jpg'" v-else-if="items.cat_id==4172"></image>
            <image :src="host + '282/283.jpg'" v-else-if="items.cat_id==283"></image>
            <image :src="host + '282/284.jpg'" v-else-if="items.cat_id==284"></image>
            <image :src="host + '282/285.jpg'" v-else-if="items.cat_id==285"></image>
            <image :src="host + '282/286.jpg'" v-else-if="items.cat_id==286"></image>
            <image :src="host + '282/287.jpg'" v-else-if="items.cat_id==287"></image>
            <image :src="host + '282/379.jpg'" v-else-if="items.cat_id==379"></image>
            <image :src="host + '282/380.jpg'" v-else-if="items.cat_id==380"></image>
            <image :src="host + '282/381.jpg'" v-else-if="items.cat_id==381"></image>
            <image :src="host + '282/382.jpg'" v-else-if="items.cat_id==382"></image>
            <image :src="host + '282/383.jpg'" v-else-if="items.cat_id==383"></image>
            <image :src="host + '479/480.jpg'" v-else-if="items.cat_id==480"></image>
            <image :src="host + '479/481.jpg'" v-else-if="items.cat_id==481"></image>
            <image :src="host + '479/482.jpg'" v-else-if="items.cat_id==482"></image>
            <image :src="host + '483/484.jpg'" v-else-if="items.cat_id==484"></image>
            <image :src="host + '483/485.jpg'" v-else-if="items.cat_id==485"></image>
            <image :src="host + '483/486.jpg'" v-else-if="items.cat_id==486"></image>
            <image :src="host + '483/487.jpg'" v-else-if="items.cat_id==487"></image>
            <image :src="host + '483/488.jpg'" v-else-if="items.cat_id==488"></image>
            <image :src="host + '483/951.jpg'" v-else-if="items.cat_id==951"></image>
            <image :src="host + '483/952.jpg'" v-else-if="items.cat_id==952"></image>
            <image :src="host + '483/953.jpg'" v-else-if="items.cat_id==953"></image>
            <image :src="host + '483/954.jpg'" v-else-if="items.cat_id==954"></image>
            <image :src="host + '489/4657.jpg'" v-else-if="items.cat_id==4657"></image>
            <image :src="host + '489/491.jpg'" v-else-if="items.cat_id==491"></image>
            <image :src="host + '489/493.jpg'" v-else-if="items.cat_id==493"></image>
            <image :src="host + '489/494.jpg'" v-else-if="items.cat_id==494"></image>
            <image :src="host + '489/497.jpg'" v-else-if="items.cat_id==497"></image>
            <image :src="host + '489/499.jpg'" v-else-if="items.cat_id==499"></image>
            <image :src="host + '489/500.jpg'" v-else-if="items.cat_id==500"></image>
            <image :src="host + '489/505.jpg'" v-else-if="items.cat_id==505"></image>
            <image :src="host + '489/506.jpg'" v-else-if="items.cat_id==506"></image>
            <image :src="host + '489/508.jpg'" v-else-if="items.cat_id==508"></image>
            <image :src="host + '489/5087.jpg'" v-else-if="items.cat_id==5087"></image>
            <image :src="host + '489/510.jpg'" v-else-if="items.cat_id==510"></image>
            <image :src="host + '489/5100.jpg'" v-else-if="items.cat_id==5100"></image>
            <image :src="host + '489/5102.jpg'" v-else-if="items.cat_id==5102"></image>
            <image :src="host + '489/511.jpg'" v-else-if="items.cat_id==511"></image>
            <image :src="host + '489/513.jpg'" v-else-if="items.cat_id==513"></image>
            <image :src="host + '489/515.jpg'" v-else-if="items.cat_id==515"></image>
            <image :src="host + '489/517.jpg'" v-else-if="items.cat_id==517"></image>
            <image :src="host + '489/518.jpg'" v-else-if="items.cat_id==518"></image>
            <image :src="host + '519/520.jpg'" v-else-if="items.cat_id==520"></image>
            <image :src="host + '519/521.jpg'" v-else-if="items.cat_id==521"></image>
            <image :src="host + '519/522.jpg'" v-else-if="items.cat_id==522"></image>
            <image :src="host + '519/523.jpg'" v-else-if="items.cat_id==523"></image>
            <image :src="host + '525/4049.jpg'" v-else-if="items.cat_id==4049"></image>
            <image :src="host + '525/4068.jpg'" v-else-if="items.cat_id==4068"></image>
            <image :src="host + '525/4074.jpg'" v-else-if="items.cat_id==4074"></image>
            <image :src="host + '525/4085.jpg'" v-else-if="items.cat_id==4085"></image>
            <image :src="host + '525/4086.jpg'" v-else-if="items.cat_id==4086"></image>
            <image :src="host + '525/4114.jpg'" v-else-if="items.cat_id==4114"></image>
            <image :src="host + '525/4115.jpg'" v-else-if="items.cat_id==4115"></image>
            <image :src="host + '525/4421.jpg'"
                   v-else-if="items.cat_id==4421 || items.cat_id==4448 || items.cat_id==4454 || items.cat_id==4546 || items.cat_id==8435 || items.cat_id==8436"></image>
            <image :src="host + '525/526.jpg'" v-else-if="items.cat_id==526"></image>
            <image :src="host + '525/527.jpg'" v-else-if="items.cat_id==527"></image>
            <image :src="host + '525/528.jpg'" v-else-if="items.cat_id==528"></image>
            <image :src="host + '525/529.jpg'" v-else-if="items.cat_id==529"></image>
            <image :src="host + '525/530.jpg'" v-else-if="items.cat_id==530"></image>
            <image :src="host + '525/531.jpg'" v-else-if="items.cat_id==531"></image>
            <image :src="host + '525/534.jpg'" v-else-if="items.cat_id==534"></image>
            <image :src="host + '873/874.jpg'" v-else-if="items.cat_id==874"></image>
            <image :src="host + '873/875.jpg'" v-else-if="items.cat_id==875"></image>
            <image :src="host + '873/877.jpg'" v-else-if="items.cat_id==877"></image>
            <image :src="host + '873/1501.jpg'" v-else-if="items.cat_id==1501"></image>
            <image :src="host + '873/1502.jpg'" v-else-if="items.cat_id==1502"></image>
            <image :src="host + '873/1503.jpg'" v-else-if="items.cat_id==1503"></image>
            <image :src="host + '873/1504.jpg'" v-else-if="items.cat_id==1504"></image>
            <image :src="host + '873/1505.jpg'" v-else-if="items.cat_id==1505"></image>
            <image :src="host + '873/1506.jpg'" v-else-if="items.cat_id==1506"></image>
            <image :src="host + '873/1507.jpg'" v-else-if="items.cat_id==1507"></image>
            <image :src="host + '873/1511.jpg'" v-else-if="items.cat_id==1511"></image>
            <image :src="host + '873/1512.jpg'" v-else-if="items.cat_id==1512"></image>
            <image :src="host + '873/1513.jpg'" v-else-if="items.cat_id==1513"></image>
            <image :src="host + '873/878.jpg'" v-else-if="items.cat_id==878"></image>
            <image :src="host + '879/1554.jpg'" v-else-if="items.cat_id==1554"></image>
            <image :src="host + '879/1555.jpg'" v-else-if="items.cat_id==1555"></image>
            <image :src="host + '879/1556.jpg'" v-else-if="items.cat_id==1556"></image>
            <image :src="host + '879/5274.jpg'" v-else-if="items.cat_id==5274"></image>
            <image :src="host + '879/880.jpg'" v-else-if="items.cat_id==880"></image>
            <image :src="host + '879/881.jpg'" v-else-if="items.cat_id==881"></image>
            <image :src="host + '879/882.jpg'" v-else-if="items.cat_id==882"></image>
            <image :src="host + '879/883.jpg'" v-else-if="items.cat_id==883"></image>
            <image :src="host + '879/884.jpg'" v-else-if="items.cat_id==884"></image>
            <image :src="host + '879/885.jpg'" v-else-if="items.cat_id==885"></image>
            <image :src="host + '879/886.jpg'" v-else-if="items.cat_id==886"></image>
            <image :src="host + '909/1627.jpg'" v-else-if="items.cat_id==1627"></image>
            <image :src="host + '909/1628.jpg'" v-else-if="items.cat_id==1628"></image>
            <image :src="host + '909/5575.jpg'" v-else-if="items.cat_id==5575"></image>
            <image :src="host + '909/5581.jpg'" v-else-if="items.cat_id==5581"></image>
            <image :src="host + '909/5585.jpg'" v-else-if="items.cat_id==5585"></image>
            <image :src="host + '909/5596.jpg'" v-else-if="items.cat_id==5596"></image>
            <image :src="host + '909/910.jpg'" v-else-if="items.cat_id==910"></image>
            <image :src="host + '909/911.jpg'" v-else-if="items.cat_id==911"></image>
            <image :src="host + '909/912.jpg'" v-else-if="items.cat_id==912"></image>
            <image :src="host + '909/913.jpg'" v-else-if="items.cat_id==913"></image>
            <image :src="host + '909/914.jpg'" v-else-if="items.cat_id==914"></image>
            <image :src="host + '990/4497.jpg'" v-else-if="items.cat_id==4497"></image>
            <image :src="host + '990/4645.jpg'" v-else-if="items.cat_id==4645"></image>
            <image :src="host + '990/5337.jpg'" v-else-if="items.cat_id==5337"></image>
            <image :src="host + '990/5347.jpg'" v-else-if="items.cat_id==5347"></image>
            <image :src="host + '990/5358.jpg'" v-else-if="items.cat_id==5358"></image>
            <image :src="host + '990/992.jpg'" v-else-if="items.cat_id==992"></image>
            <image :src="host + '990/993.jpg'" v-else-if="items.cat_id==993"></image>
            <image :src="host + '1366/1367.jpg'" v-else-if="items.cat_id==1367"></image>
            <image :src="host + '1366/1368.jpg'" v-else-if="items.cat_id==1368"></image>
            <image :src="host + '1366/1369.jpg'" v-else-if="items.cat_id==1369"></image>
            <image :src="host + '1366/1370.jpg'" v-else-if="items.cat_id==1370"></image>
            <image :src="host + '1366/1371.jpg'" v-else-if="items.cat_id==1371"></image>
            <image :src="host + '1366/1372.jpg'" v-else-if="items.cat_id==1372"></image>
            <image :src="host + '1366/1373.jpg'" v-else-if="items.cat_id==1373"></image>
            <image :src="host + '1366/1374.jpg'" v-else-if="items.cat_id==1374"></image>
            <image :src="host + '1366/1375.jpg'" v-else-if="items.cat_id==1375"></image>
            <image :src="host + '1366/4559.jpg'" v-else-if="items.cat_id==4559"></image>
            <image :src="host + '1366/4623.jpg'" v-else-if="items.cat_id==4623"></image>
            <image :src="host + '1366/4639.jpg'" v-else-if="items.cat_id==4639"></image>
            <image :src="host + '1432/1433.jpg'" v-else-if="items.cat_id==1433"></image>
            <image :src="host + '1432/1434.jpg'" v-else-if="items.cat_id==1434"></image>
            <image :src="host + '1432/1435.jpg'" v-else-if="items.cat_id==1435"></image>
            <image :src="host + '1432/1436.jpg'" v-else-if="items.cat_id==1436"></image>
            <image :src="host + '1432/1893.jpg'" v-else-if="items.cat_id==1893"></image>
            <image :src="host + '1629/1630.jpg'" v-else-if="items.cat_id==1630"></image>
            <image :src="host + '1629/1631.jpg'" v-else-if="items.cat_id==1631"></image>
            <image :src="host + '1629/1632.jpg'" v-else-if="items.cat_id==1632"></image>
            <image :src="host + '1629/1633.jpg'" v-else-if="items.cat_id==1633"></image>
            <image :src="host + '1629/1634.jpg'" v-else-if="items.cat_id==1634"></image>
            <image :src="host + '1629/1635.jpg'" v-else-if="items.cat_id==1635"></image>
            <image :src="host + '1629/1636.jpg'" v-else-if="items.cat_id==1636"></image>
            <image :src="host + '1629/1637.jpg'" v-else-if="items.cat_id==1637"></image>
            <image :src="host + '1629/1638.jpg'" v-else-if="items.cat_id==1638"></image>
            <image :src="host + '1629/1639.jpg'" v-else-if="items.cat_id==1639"></image>
            <image :src="host + '1629/1640.jpg'" v-else-if="items.cat_id==1640"></image>
            <image :src="host + '1629/1641.jpg'" v-else-if="items.cat_id==1641"></image>
            <image :src="host + '1629/1642.jpg'" v-else-if="items.cat_id==1642"></image>
            <image :src="host + '1715/1716.jpg'" v-else-if="items.cat_id==1716"></image>
            <image :src="host + '1715/1717.jpg'" v-else-if="items.cat_id==1717"></image>
            <image :src="host + '1715/1718.jpg'" v-else-if="items.cat_id==1718"></image>
            <image :src="host + '1715/1719.jpg'" v-else-if="items.cat_id==1719"></image>
            <image :src="host + '1715/1720.jpg'" v-else-if="items.cat_id==1720"></image>
            <image :src="host + '1715/1721.jpg'" v-else-if="items.cat_id==1721"></image>
            <image :src="host + '1715/1722.jpg'" v-else-if="items.cat_id==1722"></image>
            <image :src="host + '1715/1723.jpg'" v-else-if="items.cat_id==1723"></image>
            <image :src="host + '1889/1890.jpg'" v-else-if="items.cat_id==1890"></image>
            <image :src="host + '1889/2136.jpg'" v-else-if="items.cat_id==2136"></image>
            <image :src="host + '1889/2137.jpg'" v-else-if="items.cat_id==2137"></image>
            <image :src="host + '1889/2138.jpg'" v-else-if="items.cat_id==2138"></image>
            <image :src="host + '1889/2139.jpg'" v-else-if="items.cat_id==2139"></image>
            <image :src="host + '1889/2140.jpg'" v-else-if="items.cat_id==2140"></image>
            <image :src="host + '1889/2141.jpg'" v-else-if="items.cat_id==2141"></image>
            <image :src="host + '1889/2142.jpg'" v-else-if="items.cat_id==2142"></image>
            <image :src="host + '1889/2143.jpg'" v-else-if="items.cat_id==2143"></image>
            <image :src="host + '1889/3119.jpg'" v-else-if="items.cat_id==3119"></image>
            <image :src="host + '1889/5646.jpg'" v-else-if="items.cat_id==5646"></image>
            <image :src="host + '1896/1897.jpg'" v-else-if="items.cat_id==1897"></image>
            <image :src="host + '1896/1898.jpg'" v-else-if="items.cat_id==1898"></image>
            <image :src="host + '1896/1899.jpg'" v-else-if="items.cat_id==1899"></image>
            <image :src="host + '1896/1900.jpg'" v-else-if="items.cat_id==1900"></image>
            <image :src="host + '1896/1901.jpg'" v-else-if="items.cat_id==1901"></image>
            <image :src="host + '1896/1902.jpg'" v-else-if="items.cat_id==1902"></image>
            <image :src="host + '1896/1903.jpg'" v-else-if="items.cat_id==1903"></image>
            <image :src="host + '1896/1904.jpg'" v-else-if="items.cat_id==1904"></image>
            <image :src="host + '1896/1905.jpg'" v-else-if="items.cat_id==1905"></image>
            <image :src="host + '1896/1906.jpg'" v-else-if="items.cat_id==1906"></image>
            <image :src="host + '1896/1907.jpg'" v-else-if="items.cat_id==1907"></image>
            <image :src="host + '1896/1908.jpg'" v-else-if="items.cat_id==1908"></image>
            <image :src="host + '1896/1909.jpg'" v-else-if="items.cat_id==1909"></image>
            <image :src="host + '1896/1910.jpg'" v-else-if="items.cat_id==1910"></image>
            <image :src="host + '1896/1911.jpg'" v-else-if="items.cat_id==1911"></image>
            <image :src="host + '1896/1912.jpg'" v-else-if="items.cat_id==1912"></image>
            <image :src="host + '1896/1913.jpg'" v-else-if="items.cat_id==1913"></image>
            <image :src="host + '1896/5524.jpg'" v-else-if="items.cat_id==5524"></image>
            <image :src="host + '1896/5537.jpg'" v-else-if="items.cat_id==5537"></image>
            <image :src="host + '2351/2845.jpg'" v-else-if="items.cat_id==2845"></image>
            <image :src="host + '2351/2846.jpg'" v-else-if="items.cat_id==2846"></image>
            <image :src="host + '2351/2847.jpg'" v-else-if="items.cat_id==2847"></image>
            <image :src="host + '2351/4243.jpg'" v-else-if="items.cat_id==4243"></image>
            <image :src="host + '2479/2480.jpg'" v-else-if="items.cat_id==2480"></image>
            <image :src="host + '2479/2481.jpg'" v-else-if="items.cat_id==2481"></image>
            <image :src="host + '2479/2482.jpg'" v-else-if="items.cat_id==2482"></image>
            <image :src="host + '2479/2485.jpg'" v-else-if="items.cat_id==2485"></image>
            <image :src="host + '2479/2486.jpg'" v-else-if="items.cat_id==2486"></image>
            <image :src="host + '2479/4571.jpg'" v-else-if="items.cat_id==4571"></image>
            <image :src="host + '2479/4589.jpg'" v-else-if="items.cat_id==4589"></image>
            <image :src="host + '2479/5687.jpg'" v-else-if="items.cat_id==5687"></image>
            <image :src="host + '2603/2604.jpg'" v-else-if="items.cat_id==2604"></image>
            <image :src="host + '2603/2605.jpg'" v-else-if="items.cat_id==2605"></image>
            <image :src="host + '2603/2606.jpg'" v-else-if="items.cat_id==2606"></image>
            <image :src="host + '2603/2607.jpg'" v-else-if="items.cat_id==2607"></image>
            <image :src="host + '2603/2608.jpg'" v-else-if="items.cat_id==2608"></image>
            <image :src="host + '2603/2609.jpg'" v-else-if="items.cat_id==2609"></image>
            <image :src="host + '2603/2610.jpg'" v-else-if="items.cat_id==2610"></image>
            <image :src="host + '2603/2612.jpg'" v-else-if="items.cat_id==2612"></image>
            <image :src="host + '2603/2613.jpg'" v-else-if="items.cat_id==2613"></image>
            <image :src="host + '2603/2614.jpg'" v-else-if="items.cat_id==2614"></image>
            <image :src="host + '2603/2616.jpg'" v-else-if="items.cat_id==2616"></image>
            <image :src="host + '2603/2619.jpg'" v-else-if="items.cat_id==2619"></image>
            <image :src="host + '2603/2620.jpg'" v-else-if="items.cat_id==2620"></image>
            <image :src="host + '2603/2621.jpg'" v-else-if="items.cat_id==2621"></image>
            <image :src="host + '2603/2622.jpg'" v-else-if="items.cat_id==2622"></image>
            <image :src="host + '2603/2623.jpg'" v-else-if="items.cat_id==2623"></image>
            <image :src="host + '2603/2624.jpg'" v-else-if="items.cat_id==2624"></image>
            <image :src="host + '2603/2626.jpg'" v-else-if="items.cat_id==2626"></image>
            <image :src="host + '2603/4835.jpg'" v-else-if="items.cat_id==4835"></image>
            <image :src="host + '2603/4837.jpg'" v-else-if="items.cat_id==4837"></image>
            <image :src="host + '2603/4847.jpg'" v-else-if="items.cat_id==4847"></image>
            <image :src="host + '2629/2630.jpg'" v-else-if="items.cat_id==2630"></image>
            <image :src="host + '2629/2631.jpg'" v-else-if="items.cat_id==2631"></image>
            <image :src="host + '2629/2632.jpg'" v-else-if="items.cat_id==2632"></image>
            <image :src="host + '2629/2634.jpg'" v-else-if="items.cat_id==2634"></image>
            <image :src="host + '2629/2635.jpg'" v-else-if="items.cat_id==2635"></image>
            <image :src="host + '2629/2636.jpg'" v-else-if="items.cat_id==2636"></image>
            <image :src="host + '2629/2663.jpg'" v-else-if="items.cat_id==2663"></image>
            <image :src="host + '2629/2664.jpg'" v-else-if="items.cat_id==2664"></image>
            <image :src="host + '2629/2665.jpg'" v-else-if="items.cat_id==2665"></image>
            <image :src="host + '2629/2667.jpg'" v-else-if="items.cat_id==2667"></image>
            <image :src="host + '2629/2668.jpg'" v-else-if="items.cat_id==2668"></image>
            <image :src="host + '2629/2669.jpg'" v-else-if="items.cat_id==2669"></image>
            <image :src="host + '2629/2670.jpg'" v-else-if="items.cat_id==2670"></image>
            <image :src="host + '2629/2671.jpg'" v-else-if="items.cat_id==2671"></image>
            <image :src="host + '2629/2672.jpg'" v-else-if="items.cat_id==2672"></image>
            <image :src="host + '2629/5673.jpg'" v-else-if="items.cat_id==5673"></image>
            <image :src="host + '2933/2934.jpg'" v-else-if="items.cat_id==2934"></image>
            <image :src="host + '2933/2935.jpg'" v-else-if="items.cat_id==2935"></image>
            <image :src="host + '2933/2936.jpg'" v-else-if="items.cat_id==2936"></image>
            <image :src="host + '2933/2937.jpg'" v-else-if="items.cat_id==2937"></image>
            <image :src="host + '2933/2938.jpg'" v-else-if="items.cat_id==2938"></image>
            <image :src="host + '2933/2939.jpg'" v-else-if="items.cat_id==2939"></image>
            <image :src="host + '2933/2940.jpg'" v-else-if="items.cat_id==2940"></image>
            <image :src="host + '2933/2941.jpg'" v-else-if="items.cat_id==2941"></image>
            <image :src="host + '2933/2942.jpg'" v-else-if="items.cat_id==2942"></image>
            <image :src="host + '2933/2943.jpg'" v-else-if="items.cat_id==2943"></image>
            <image :src="host + '2933/2945.jpg'" v-else-if="items.cat_id==2945"></image>
            <image :src="host + '2933/2946.jpg'" v-else-if="items.cat_id==2946"></image>
            <image :src="host + '2933/2947.jpg'" v-else-if="items.cat_id==2947"></image>
            <image :src="host + '2933/2949.jpg'" v-else-if="items.cat_id==2949"></image>
            <image :src="host + '2933/2950.jpg'" v-else-if="items.cat_id==2950"></image>
            <image :src="host + '2933/2951.jpg'" v-else-if="items.cat_id==2951"></image>
            <image :src="host + '2933/2952.jpg'" v-else-if="items.cat_id==2952"></image>
            <image :src="host + '2933/2953.jpg'" v-else-if="items.cat_id==2953"></image>
            <image :src="host + '2933/3898.jpg'" v-else-if="items.cat_id==3898"></image>
            <image :src="host + '3202/3203.jpg'" v-else-if="items.cat_id==3203"></image>
            <image :src="host + '3202/3204.jpg'" v-else-if="items.cat_id==3204"></image>
            <image :src="host + '3202/3205.jpg'" v-else-if="items.cat_id==3205"></image>
            <image :src="host + '3202/3206.jpg'" v-else-if="items.cat_id==3206"></image>
            <image :src="host + '3202/3207.jpg'" v-else-if="items.cat_id==3207"></image>
            <image :src="host + '3202/3208.jpg'" v-else-if="items.cat_id==3208"></image>
            <image :src="host + '3202/3209.jpg'" v-else-if="items.cat_id==3209"></image>
            <image :src="host + '3202/3210.jpg'" v-else-if="items.cat_id==3210"></image>
            <image :src="host + '3202/3212.jpg'" v-else-if="items.cat_id==3212"></image>
            <image :src="host + '3202/3213.jpg'" v-else-if="items.cat_id==3213"></image>
            <image :src="host + '3202/3214.jpg'" v-else-if="items.cat_id==3214"></image>
            <image :src="host + '3202/3215.jpg'" v-else-if="items.cat_id==3215"></image>
            <image :src="host + '3202/3216.jpg'" v-else-if="items.cat_id==3216"></image>
            <image :src="host + '3202/3217.jpg'" v-else-if="items.cat_id==3217"></image>
            <image :src="host + '3202/3218.jpg'" v-else-if="items.cat_id==3218"></image>
            <image :src="host + '3202/3219.jpg'" v-else-if="items.cat_id==3219"></image>
            <image :src="host + '3202/3221.jpg'" v-else-if="items.cat_id==3221"></image>
            <image :src="host + '3202/3222.jpg'" v-else-if="items.cat_id==3222"></image>
            <image :src="host + '3202/3224.jpg'" v-else-if="items.cat_id==3224"></image>
            <image :src="host + '3202/3225.jpg'" v-else-if="items.cat_id==3225"></image>
            <image :src="host + '3202/3226.jpg'" v-else-if="items.cat_id==3226"></image>
            <image :src="host + '3202/3227.jpg'" v-else-if="items.cat_id==3227"></image>
            <image :src="host + '3202/3228.jpg'" v-else-if="items.cat_id==3228"></image>
            <image :src="host + '3202/3229.jpg'" v-else-if="items.cat_id==3229"></image>
            <image :src="host + '3202/3230.jpg'" v-else-if="items.cat_id==3230"></image>
            <image :src="host + '3202/3231.jpg'" v-else-if="items.cat_id==3231"></image>
            <image :src="host + '3202/3232.jpg'" v-else-if="items.cat_id==3232"></image>
            <image :src="host + '3202/3233.jpg'" v-else-if="items.cat_id==3233"></image>
            <image :src="host + '3202/3234.jpg'" v-else-if="items.cat_id==3234"></image>
            <image :src="host + '3202/3235.jpg'" v-else-if="items.cat_id==3235"></image>
            <image :src="host + '3202/3236.jpg'" v-else-if="items.cat_id==3236"></image>
            <image :src="host + '3817/3818.jpg'" v-else-if="items.cat_id==3818"></image>
            <image :src="host + '3817/3819.jpg'" v-else-if="items.cat_id==3819"></image>
            <image :src="host + '4173/4174.jpg'" v-else-if="items.cat_id==4174"></image>
            <image :src="host + '4173/4175.jpg'" v-else-if="items.cat_id==4175"></image>
            <image :src="host + '4173/4176.jpg'" v-else-if="items.cat_id==4176"></image>
            <image src="" v-else=""></image>
            <text>{{items.cat_name}}</text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { CAT_IMG_HOST} from '../constants';
  import { linkTo} from '../utils';
  import * as service from '../services/product';

  export default {
    name: "category",
    data () {
      return {
        title: '搜券',
        keyWords: [],
        host: CAT_IMG_HOST,
        cat_list: [ {
          level: 1,
          cat_id: 2,
          parent_cat_id: 0,
          cat_name: "美食饮料"
        }, {
          level: 1,
          cat_id: 69,
          parent_cat_id: 0,
          cat_name: "美容护肤"
        }, {
          level: 1,
          cat_id: 77,
          parent_cat_id: 0,
          cat_name: "母婴玩具"
        }, {
          level: 1,
          cat_id: 239,
          parent_cat_id: 0,
          cat_name: "男装"
        }, {
          level: 1,
          cat_id: 259,
          parent_cat_id: 0,
          cat_name: "饰品首饰"
        }, {
          level: 1,
          cat_id: 281,
          parent_cat_id: 0,
          cat_name: "健身"
        }, {
          level: 1,
          cat_id: 282,
          parent_cat_id: 0,
          cat_name: "厨房用品"
        }, {
          level: 1,
          cat_id: 479,
          parent_cat_id: 0,
          cat_name: "家庭清洁"
        }, {
          level: 1,
          cat_id: 483,
          parent_cat_id: 0,
          cat_name: "洗护纸品"
        }, {
          level: 1,
          cat_id: 489,
          parent_cat_id: 0,
          cat_name: "居家日用"
        }, {
          level: 1,
          cat_id: 519,
          parent_cat_id: 0,
          cat_name: "收纳整理"
        }, {
          level: 1,
          cat_id: 525,
          parent_cat_id: 0,
          cat_name: "宠物用品"
        }, {
          level: 1,
          cat_id: 873,
          parent_cat_id: 0,
          cat_name: "床上用品"
        }, {
          level: 1,
          cat_id: 879,
          parent_cat_id: 0,
          cat_name: "布艺家饰"
        }, {
          level: 1,
          cat_id: 1432,
          parent_cat_id: 0,
          cat_name: "个护美体"
        }, {
          level: 1,
          cat_id: 1629,
          parent_cat_id: 0,
          cat_name: "家居饰品"
        }, {
          level: 1,
          cat_id: 1715,
          parent_cat_id: 0,
          cat_name: "成人用品"
        }, {
          level: 1,
          cat_id: 1889,
          parent_cat_id: 0,
          cat_name: "鲜花园艺"
        }, {
          level: 1,
          cat_id: 1896,
          parent_cat_id: 0,
          cat_name: "住宅家具"
        }, {
          level: 1,
          cat_id: 2351,
          parent_cat_id: 0,
          cat_name: "运动"
        }, {
          level: 1,
          cat_id: 2479,
          parent_cat_id: 0,
          cat_name: "家居建材"
        }, {
          level: 1,
          cat_id: 2603,
          parent_cat_id: 0,
          cat_name: "办公用品"
        }, {
          level: 1,
          cat_id: 2629,
          parent_cat_id: 0,
          cat_name: "文化用品"
        }, {
          level: 1,
          cat_id: 2933,
          parent_cat_id: 0,
          cat_name: "3C数码配件"
        }, {
          level: 1,
          cat_id: 3202,
          parent_cat_id: 0,
          cat_name: "书籍杂志"
        }, {
          level: 1,
          cat_id: 4173,
          parent_cat_id: 0,
          cat_name: "户外"
        } ],
        cat_list_two: [],
        selectedId: 2
      }
    },
    methods: {
      toSearch (keyword = '') {
        let url = '/pages/search';
        if (keyword) {
          url += `?keyword=${keyword}`
        }
        linkTo(url);
      },
      async checkCatId (cat_id) {
        const res = await service.getProduct({
          type: 'pdd.goods.cats.get',
          parent_cat_id: cat_id
        });
        if (res.goods_cats_get_response && res.goods_cats_get_response.goods_cats_list) {
          this.cat_list_two = res.goods_cats_get_response.goods_cats_list;
          this.selectedId = cat_id;
        } else {
          wx.showToast({
            title: '获取分类数据失败',
            icon: 'none'
          });
        }
      },
      toCategory (item) {
        linkTo(`/pages/cat-products?catId=${item.cat_id}&catName=${item.cat_name}`);
      },
      async getHot () {
        const res = await service.getHot(3);
        if (res.status === 1) {
          this.keyWords = res.data.words;
        }
      },
      linkTo (url) {
        linkTo(url);
      }
    },
    onLoad () {
      this.keyWords = [];
      this.cat_list_two = [];
      this.selectedId = 2;
      this.checkCatId(this.selectedId);
      this.getHot();
    }
  };
</script>

<style scoped lang="less">
  @import "../less/main";
  .container {
    background: #e40501 url("http://img-cows.kkkd.com/FlLhLbjd_mz8jQxdb3HPB3dHsRbq") no-repeat 0 0;
    background-size: 100%;
    .search-box-wrap {
      width:100%;
      height:364rpx;
      position:relative;
      z-index:3;
      .search-box {
        position:relative;
        top:180rpx;
        z-index:2;
        height:100rpx;
        line-height:100rpx;
        .search {
          position:relative;
          width:700rpx;
          margin: 0 auto;
          height:80rpx;
          line-height:80rpx;
          background:#fff;
          border-radius:4rpx;
          font-size: 28rpx;
          color: #999;
          .iconfont {
            font-size: 30rpx;
            margin-right: 10rpx;
          }
        }
        .search-key {
          width: 700rpx;
          margin: 20rpx auto 0;
          > div {
            width:162rpx;
            height:60rpx;
            line-height:60rpx;
            font-size:24rpx;
            color:#fff;
            text-align:center;
            background:rgba(255,255,255,0.15);
            border-radius:4rpx;
            overflow:hidden;
          }
        }
      }
      .search-help {
        width:130rpx;
        height:60rpx;
        line-height:60rpx;
        background:rgba(128,14,6,0.4);
        border-top-left-radius:100rpx;
        border-bottom-left-radius:100rpx;
        font-size:24rpx;
        color:#fff;
        position:absolute;
        right:0;
        top:40rpx;
        .iconfont {
          margin-right: 10rpx;
        }
      }
    }
    .category-box {
      position: relative;
      top: 0;
      left: 0;
      width: 750rpx;
      z-index: 2;
      background: #fff;
      height: calc(100vh - 120rpx - 384rpx);
      .categories {
        position:absolute;
        left:0;
        top:0;
        width:200rpx;
        height:100%;
        font-size:28rpx;
        color:#333;
        text-align:center;
        background:#fff;
        overflow-y:auto;
        -webkit-overflow-scrolling:touch;
        .category-item {
          height:100rpx;
          line-height:100rpx;
          position:relative;
          &.selected {
            background:#f2f2f2;
            &:after {
              content: '';
              position:absolute;
              left:0;
              top: 50%;
              width:6rpx;
              height:60rpx;
              margin-top: -30rpx;
              display:inline-block;
              border-top-right-radius:1000rpx;
              border-bottom-right-radius:1000rpx;
              background:#ef1612;
            }
          }
        }
      }
      .details {
        position:absolute;
        right:0;
        top:0;
        width: 550rpx;
        height:100%;
        background: #fff;
        overflow:hidden;
        overflow-y:auto;
        -webkit-overflow-scrolling:touch;
        .detail-item {
          width: 33.33%;
          height: 230rpx;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          image {
            width: 146rpx;
            height: 146rpx;
            margin: auto;
          }
          text {
            display: block;
            margin: 0 10rpx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
</style>
