/* 

 * To change this license header, choose License Headers in Project Properties.

 * To change this template file, choose Tools | Templates

 * and open the template in the editor.

 */



    

window.onload = function(){



    var levelArray = [];

    var arr_mask = [];

    var helpArr = [];

    var upd_fill = [], checkResult = 0, numPicture = 0, hard = 5, checkOptions = 0, checkButons = 1, numHelp = 0, timer = 0, startDate, checkHelp = 0;

    var canvasImg = new CanvasObj();

    

    var cordCenterXY = {

      cX : (window.innerWidth)/2 - 135,

      cY : (window.innerHeight)/2 - 145,

      number : null

    };

    

    function CanvasObj() {

         this.c = document.getElementById('canvas');

         this.canvas = this.c.getContext('2d');

         this.img = [

                     [document.getElementById("zero"),

                      document.getElementById("ramka"),

                      document.getElementById("red"),

                      document.getElementById("ngame"),

                      document.getElementById("trAgain"),

                      document.getElementById("redbord"),

                      document.getElementById("lose"),

                      document.getElementById("win"),

                      document.getElementById("menu"),

                      document.getElementById("fon"),

                      document.getElementById("ease"),

                      document.getElementById("normal"),

                      document.getElementById("dificalt"),

                      document.getElementById("testing"),

                      document.getElementById("yellow"),

                      document.getElementById("start"),

                      document.getElementById("greenStart"),

                      document.getElementById("tools"),

                      document.getElementById("toolsShine"),

                      document.getElementById("helpEasy"),

                      document.getElementById("minihelp"),

                      document.getElementById("helpNormal"),

                      document.getElementById("helpHard"),

                      document.getElementById("empty"),

                      document.getElementById("fiolRamka"),

                      document.getElementById("shineRestart"),

                      document.getElementById("allFon"),

                      document.getElementById("newRecord"),

                      document.getElementById("help"),

                      document.getElementById("goHelp"),

                      document.getElementById("goHelpShine"),

                      document.getElementById("return"),

                      document.getElementById("returnShine"),

                      document.getElementById("exitGrey"),

                      document.getElementById("exit")],

                     [document.getElementById("1"), document.getElementById("11"), document.getElementById("12") ],

                     [document.getElementById("2"), document.getElementById("21"), document.getElementById("22") ],

                     [document.getElementById("3"), document.getElementById("31"), document.getElementById("32") ],

                     [document.getElementById("4"), document.getElementById("41"), document.getElementById("42") ],

                     [document.getElementById("5"), document.getElementById("51"), document.getElementById("52") ],

                     [document.getElementById("6"), document.getElementById("61"), document.getElementById("62") ],

                     [document.getElementById("7"), document.getElementById("71"), document.getElementById("72") ],

                     [document.getElementById("8"), document.getElementById("81"), document.getElementById("82") ],

                     [document.getElementById("9"), document.getElementById("91"), document.getElementById("92") ]

                    ];

         this.c.width = window.innerWidth;

         this.c.height = window.innerHeight;

    }



    main();

    



    // главная функция

    function main(){

      menu();

    }

    



    // Фун для отрисовки меню

    function menu(){

      canvasImg.c.addEventListener('click', clickButtonRefreshGame);

      canvasImg.c.addEventListener('click', clickButtonNewGame);

      canvasImg.c.addEventListener('click', changeOptions);

      canvasImg.c.addEventListener('click', clickTools);

      canvasImg.c.addEventListener('mousemove', shiningButton);

      checkResult = 0;

      numPicture = 0;

      hard = 5;

      checkOptions = 0;

      checkButons = 1;

      canvasImg.canvas.clearRect(0,0, canvasImg.c.width, canvasImg.c.height);

      draw(canvasImg.img[0][26], cordCenterXY.cX - 80, cordCenterXY.cY - 115);

      draw(canvasImg.img[0][8], cordCenterXY.cX, cordCenterXY.cY-45);

      draw(canvasImg.img[0][33], cordCenterXY.cX -50, cordCenterXY.cY + 290);

      for(var i = 0, k = 0; i < 3; i+=1, k+=35){

        // рисовка тем выбора тем оформления

        draw(canvasImg.img[0][9], cordCenterXY.cX+55+k, cordCenterXY.cY+90);

        draw(canvasImg.img[1][i], cordCenterXY.cX+55+k, cordCenterXY.cY+90);

        draw(canvasImg.img[0][2], cordCenterXY.cX+55+k, cordCenterXY.cY+90);

      }

      for(var n = 0, m = 0; n < 4; n+=1, m+=55){

      // рисовка выбора уровней сложности

        draw(canvasImg.img[0][9], cordCenterXY.cX+35+m, cordCenterXY.cY+230);

        draw(canvasImg.img[0][10+n], cordCenterXY.cX+35+m, cordCenterXY.cY+230);

        draw(canvasImg.img[0][2], cordCenterXY.cX+35+m, cordCenterXY.cY+230);

      }

      draw(canvasImg.img[0][14], cordCenterXY.cX+55, cordCenterXY.cY+90);

      draw(canvasImg.img[0][14], cordCenterXY.cX+35, cordCenterXY.cY+230);

    }



    // фун начало новой игры

    function newGame(){

        checkOptions = 1;

        checkButons = 0;

        checkResult = null;

        numHelp = hard - 2;

        timer = 1;

        arr_mask = setData(9, 9);

        upd_fill = setData(9, 9);

        helpArr = setData(9, 9);

        

        canvasImg.canvas.clearRect(0,0, canvasImg.c.width, canvasImg.c.height);

        draw(canvasImg.img[0][26], cordCenterXY.cX - 80, cordCenterXY.cY - 115);

        draw(canvasImg.img[0][1], cordCenterXY.cX, cordCenterXY.cY);

        draw(canvasImg.img[0][29], cordCenterXY.cX + 270, cordCenterXY.cY + 290);

        draw(canvasImg.img[0][33], cordCenterXY.cX - 50 , cordCenterXY.cY + 290);



        moveObj();

        createNewField();

        mask(hard);

        fillField();

        buttons();

        copyArr();

        changeLevelArray();

        timeGame();

    }



    //функция проверки побития рекорда

    function checkRecord(record){

      if (record != "" && record != null) {

          if(record > startDate){

            draw(canvasImg.img[0][27], cordCenterXY.cX-60, cordCenterXY.cY-10);

            canvasImg.canvas.fillStyle = "#black";

            canvasImg.canvas.font = 'italic bold 12pt Britannik Bold';

            canvasImg.canvas.fillText(convertTime(startDate), cordCenterXY.cX+120, cordCenterXY.cY+144);

            canvasImg.canvas.fillText("- " + convertTime(record - startDate), cordCenterXY.cX+173, cordCenterXY.cY+163);

            localStorage.removeItem("time");

            localStorage.setItem("time", startDate);

          } else {

            draw(canvasImg.img[0][7], cordCenterXY.cX-60, cordCenterXY.cY-10);

            canvasImg.canvas.fillStyle = "#black";

            canvasImg.canvas.font = 'italic bold 12pt Britannik Bold';

            canvasImg.canvas.fillText(convertTime(startDate), cordCenterXY.cX+150, cordCenterXY.cY+148);

            canvasImg.canvas.fillText(convertTime(record), cordCenterXY.cX+170, cordCenterXY.cY+170);

          }

      }

      else 

        {

          draw(canvasImg.img[0][27], cordCenterXY.cX-60, cordCenterXY.cY-10);

            canvasImg.canvas.fillStyle = "#black";

            canvasImg.canvas.font = 'italic bold 12pt Britannik Bold';

            canvasImg.canvas.fillText(convertTime(startDate), cordCenterXY.cX+120, cordCenterXY.cY+144);

            canvasImg.canvas.fillText("- 0:0:0", cordCenterXY.cX+173, cordCenterXY.cY+163);

            localStorage.setItem("time", startDate);

        }

    }

    

    // вытаскивание резултатов рекорда согласно уровня сложности

    function checkStorage() {

      // localStorage.clear();

      var recordTest = localStorage.getItem("time"), recordEasy = localStorage.getItem("time"), recordNormal = localStorage.getItem("time"), recordHard = localStorage.getItem("time");

      switch(hard) {

        case 3:

          checkRecord(recordHard);

          break;

        case 4:

          checkRecord(recordNormal);

          break;

        case 5:

          checkRecord(recordEasy);

          break;

      }

      if (hard > 5) {

        checkRecord(recordTest);

      } 

    }



    // отрисовка кнопок

    function buttons(){

        draw(canvasImg.img[0][3], cordCenterXY.cX + 60, cordCenterXY.cY - 100);

        draw(canvasImg.img[0][4], cordCenterXY.cX + 60, cordCenterXY.cY + 320);

    }

    

    //фун времени игры

    function timeGame(){

      var  endDate, sec, minute, hours;

      if(timer == 1){

        startDate = new Date();

      }

      if(timer == 0){

        endDate = new Date();

        startDate = Math.round((endDate.getTime() - startDate.getTime())/1000);

               

        //console.log(convertTime(startDate));

      }

    }



    function convertTime(clock){

      var   minute, hours, result;

        minute = Math.floor(clock/60);

        hours = Math.floor(minute/60);

        result = hours + ":" + (minute - hours*60) + ":" + (clock - minute*60);

      return result;

    }

         

    // фун клик выбора уровня сложности и оформления

    function changeOptions(){

      var x = event.clientX;

        var y = event.clientY;

        if(checkOptions == 0){

          // выбор темы оформления

          for(var i = 0, k = 0; i < 3; i+=1, k+=35){

            if(x > cordCenterXY.cX+50+k && x < cordCenterXY.cX+85+k && y > cordCenterXY.cY+85 && y < cordCenterXY.cY+120){ 

                draw(canvasImg.img[0][2], cordCenterXY.cX+55, cordCenterXY.cY+90);

                draw(canvasImg.img[0][2], cordCenterXY.cX+90, cordCenterXY.cY+90);

                draw(canvasImg.img[0][2], cordCenterXY.cX+125, cordCenterXY.cY+90);

                draw(canvasImg.img[0][14], cordCenterXY.cX+55+k, cordCenterXY.cY+90);

                numPicture = i;

            }

          }

          // для выбора сложности

          for(var n = 0, m = 0; n < 4; n+=1, m+=55){

            if(x > cordCenterXY.cX+30 + m && x < cordCenterXY.cX+70+m && y > cordCenterXY.cY+225 && y < cordCenterXY.cY+260){ 

                draw(canvasImg.img[0][2], cordCenterXY.cX+35, cordCenterXY.cY+230);

                draw(canvasImg.img[0][2], cordCenterXY.cX+90, cordCenterXY.cY+230);

                draw(canvasImg.img[0][2], cordCenterXY.cX+145, cordCenterXY.cY+230);

                draw(canvasImg.img[0][2], cordCenterXY.cX+200, cordCenterXY.cY+230);

                draw(canvasImg.img[0][14], cordCenterXY.cX+35+m, cordCenterXY.cY+230);



                if(n == 3){

                  hard = 30;

                } else {

                  hard = 5 - n;

                }

            }

          }





          // начать игру

          if(x > cordCenterXY.cX+205 && x < cordCenterXY.cX+275 && y > cordCenterXY.cY+259 && y < cordCenterXY.cY+329){

            newGame();

          }

        }

    }



    // фун подсветки кнопок старта и tools

    function shiningButton(){

      var x = event.clientX;

        var y = event.clientY;

        if(checkOptions == 0){

          //------------------------Подсветка кнопок----------------------------------------

          //подсветка кнопки старт

          if(x > cordCenterXY.cX+205 && x < cordCenterXY.cX+275 && y > cordCenterXY.cY+259 && y < cordCenterXY.cY+329){ 

            draw(canvasImg.img[0][15], cordCenterXY.cX+204, cordCenterXY.cY+259);

          }



          //отключение подсветки

          if(y < cordCenterXY.cY+260 && y > cordCenterXY.cY+220 ||

            y > cordCenterXY.cY+330 && y < cordCenterXY.cY+360 ||

            x < cordCenterXY.cX+204 && x > cordCenterXY.cX+170 ||

            x > cordCenterXY.cX+276 && x < cordCenterXY.cX+300 ) {



            draw(canvasImg.img[0][16], cordCenterXY.cX+204, cordCenterXY.cY+259);

          }

        }



        // ------------------для кнопки tools----------------------

        if(checkButons == 0){

          //подсветка кнопки tools 

          if(x > cordCenterXY.cX + 270 && x < cordCenterXY.cX + 340 && y > cordCenterXY.cY-70 && y < cordCenterXY.cY){ 

            draw(canvasImg.img[0][18], cordCenterXY.cX + 270, cordCenterXY.cY-70);

          }



          // отключение подсветки кнопки tools

          if(y < cordCenterXY.cY-100 && y > cordCenterXY.cY-70 ||

            y > cordCenterXY.cY && y < cordCenterXY.cY+30 ||

            x < cordCenterXY.cX+370 && x > cordCenterXY.cX+340 ||

            x > cordCenterXY.cX+240 && x < cordCenterXY.cX+270 ) {



            draw(canvasImg.img[0][17], cordCenterXY.cX + 270, cordCenterXY.cY-70);

          }

        



          //-----------------------для кнопки New Game---------------------

        

            if(x > cordCenterXY.cX + 60 && x < cordCenterXY.cX + 200 && y > cordCenterXY.cY - 100 && y < cordCenterXY.cY - 50){ 

              draw(canvasImg.img[0][5], cordCenterXY.cX + 60, cordCenterXY.cY - 100);

            }

          //отключение подсветки кнопки New Game

          if(x > cordCenterXY.cX + 20 && x < cordCenterXY.cX + 60 ||

             x > cordCenterXY.cX + 200 && x < cordCenterXY.cX + 240 ||

             y > cordCenterXY.cY - 140 && y < cordCenterXY.cY - 100 ||

             y > cordCenterXY.cY - 50 && y < cordCenterXY.cY - 10 ) {



             draw(canvasImg.img[0][3], cordCenterXY.cX + 60, cordCenterXY.cY - 100);

          }

        

          //-----------------------для кнопки Restart---------------------

          if(x > cordCenterXY.cX + 60 && x < cordCenterXY.cX + 200 && y > cordCenterXY.cY + 320 && y < cordCenterXY.cY + 370){ 

            draw(canvasImg.img[0][25], cordCenterXY.cX + 60, cordCenterXY.cY + 320);

          }

          //отключение подсветки кнопки Restart

          if(x > cordCenterXY.cX + 20 && x < cordCenterXY.cX + 60 ||

             x > cordCenterXY.cX + 200 && x < cordCenterXY.cX + 240 ||

             y > cordCenterXY.cY + 280 && y < cordCenterXY.cY + 320 ||

             y > cordCenterXY.cY + 370 && y < cordCenterXY.cY + 410 ) {



            draw(canvasImg.img[0][4], cordCenterXY.cX + 60, cordCenterXY.cY + 320);

          }



          //---------------для кнопки помощь-----------------------------

          if (x > cordCenterXY.cX + 270 && x < cordCenterXY.cX + 320 && y > cordCenterXY.cY + 290 && y < cordCenterXY.cY + 340) {

            draw(canvasImg.img[0][30], cordCenterXY.cX + 270, cordCenterXY.cY + 290);

          }



          //отключение подсветки кнопки помощь

          if(x > cordCenterXY.cX + 230 && x < cordCenterXY.cX + 270 ||

             x > cordCenterXY.cX + 320 && x < cordCenterXY.cX + 360 ||

             y > cordCenterXY.cY + 250 && y < cordCenterXY.cY + 290 ||

             y > cordCenterXY.cY + 340 && y < cordCenterXY.cY + 380 )

          {

            draw(canvasImg.img[0][29], cordCenterXY.cX + 270, cordCenterXY.cY + 290);

          }

        }

        //-------------------------------------------------------------

        //---------------для кнопки выход-----------------------------

          if (x > cordCenterXY.cX - 50 && x < cordCenterXY.cX  && y > cordCenterXY.cY + 290 && y < cordCenterXY.cY + 340) {

            draw(canvasImg.img[0][34], cordCenterXY.cX -50, cordCenterXY.cY + 290);

          }



          //отключение подсветки кнопки помощь

          if(x > cordCenterXY.cX - 90 && x < cordCenterXY.cX - 50 ||

             x > cordCenterXY.cX  && x < cordCenterXY.cX + 40 ||

             y > cordCenterXY.cY + 250 && y < cordCenterXY.cY + 290 ||

             y > cordCenterXY.cY + 340 && y < cordCenterXY.cY + 380 )

          {

            draw(canvasImg.img[0][33], cordCenterXY.cX -50, cordCenterXY.cY + 290);

          }

        //------------------------------------------------------------

        

        if (checkHelp == 1) {

          //-----------------------для кнопки Return---------------------

          if(x > cordCenterXY.cX + 60 && x < cordCenterXY.cX + 200 && y > cordCenterXY.cY + 320 && y < cordCenterXY.cY + 370){ 

            draw(canvasImg.img[0][32], cordCenterXY.cX + 60, cordCenterXY.cY + 320);

          }

          //отключение подсветки кнопки Return

          if(x > cordCenterXY.cX + 20 && x < cordCenterXY.cX + 60 ||

             x > cordCenterXY.cX + 200 && x < cordCenterXY.cX + 240 ||

             y > cordCenterXY.cY + 280 && y < cordCenterXY.cY + 320 ||

             y > cordCenterXY.cY + 370 && y < cordCenterXY.cY + 410 ) {



            draw(canvasImg.img[0][31], cordCenterXY.cX + 60, cordCenterXY.cY + 320);

          }

          //---------------------------------------------------------------

        } 

    }



    // фун копирует массив mas в массив arr в тех местах где маска равна 0

    function copyArr(){

      for (var i = 0; i < levelArray.length; i++) {

        for (var j = 0; j < levelArray[i].length; j++) {

          if (arr_mask[i][j] == 0) {

            helpArr[i][j] = levelArray[i][j];  

          }

        }

      }

    }



    // кнопка начать новую игру

    function clickButtonNewGame(){

        var x = event.clientX;

        var y = event.clientY;

        if(checkButons == 0){

          //------------------------------------нажатие кнопки новая игра------------------------------------

          if(x > cordCenterXY.cX + 60 && x < cordCenterXY.cX + 60 +137 && y > cordCenterXY.cY - 80 && y < cordCenterXY.cY - 80 +40){ 

              newGame();

          }



          //------------------------------------нажатие кнопки помощь----------------------------------------

          if (x > cordCenterXY.cX + 270 && x < cordCenterXY.cX + 320 && y > cordCenterXY.cY + 290 && y < cordCenterXY.cY + 340) {

            draw(canvasImg.img[0][28], cordCenterXY.cX - 80, cordCenterXY.cY - 115);

            draw(canvasImg.img[0][31], cordCenterXY.cX + 60, cordCenterXY.cY + 320);

            draw(canvasImg.img[0][33], cordCenterXY.cX -50, cordCenterXY.cY + 290);

            checkResult = true;

            checkButons = 1;

            checkHelp = 1;

          }          

        }



        if (checkButons == 1) {

          //------------------------------------нажатие Return----------------------------------------

          if(x > cordCenterXY.cX + 60 && x < cordCenterXY.cX + 200 && y > cordCenterXY.cY + 320 && y < cordCenterXY.cY + 370){ 

            

            reDrawField();

            checkHelp = 0;

            checkResult = null;

            checkButons = 0;

            checkHelp = 0;

          }

        } 

        //----------------нажатие кнопки выход из игры-------------

        if (x > cordCenterXY.cX - 50 && x < cordCenterXY.cX  && y > cordCenterXY.cY + 290 && y < cordCenterXY.cY + 340) {

            location="../../index.html";

          }

        //---------------------------------------------------------



    }



    // кнопка включить опцыи

    function clickTools(){

        var x = event.clientX;

        var y = event.clientY;

        if(checkButons == 0){

          if(x > cordCenterXY.cX + 270 && x < cordCenterXY.cX + 340 && y > cordCenterXY.cY-70 && y < cordCenterXY.cY){ 

              menu();

          }

        }

    }



    // кнопка переиграть игру

    function clickButtonRefreshGame(){

        var x = event.clientX;

        var y = event.clientY;

        if(checkButons == 0){

          if(x > cordCenterXY.cX + 60 && x < cordCenterXY.cX + 200 && y > cordCenterXY.cY + 320 && y < cordCenterXY.cY + 370){ 

                  checkOptions = 1;

                  checkButons = 0;

                  checkResult = null;

                  numHelp = hard - 2;

                  timer = 1;

                  canvasImg.canvas.clearRect(0,0, canvasImg.c.width, canvasImg.c.height);

                  draw(canvasImg.img[0][26], cordCenterXY.cX - 80, cordCenterXY.cY - 115);

                  draw(canvasImg.img[0][29], cordCenterXY.cX + 270, cordCenterXY.cY + 290);

                  draw(canvasImg.img[0][1], cordCenterXY.cX, cordCenterXY.cY);

                  moveObj();

                  fillField();

                  upd_fill = setData(9, 9);

                  changeLevelArray();

                  buttons();

                  timeGame();

          }

        }

    }



    // функция для рисования объектов на игровом поле судоку

    function fillField(){

        var num;

        for(var i = 0, k = 0; i < 9; k += 30, i += 1){

            for(var j = 0, n = 0; j < 9; n += 30, j += 1){

               num = arr_mask[i][j];

               if(num !== 0){

                    draw(canvasImg.img[num][numPicture], cordCenterXY.cX + 2 + n, cordCenterXY.cY+2 + k);

                    if (numPicture == 2) {

                      draw(canvasImg.img[0][24], cordCenterXY.cX + 1 + n, cordCenterXY.cY+1 + k);

                    } else{

                      draw(canvasImg.img[0][2], cordCenterXY.cX + 1 + n, cordCenterXY.cY+1 + k);

                    }

               }

            }

        }

        draw(canvasImg.img[0][17], cordCenterXY.cX + 270, cordCenterXY.cY-70);

        switch(numHelp){

          case 0:

            draw(canvasImg.img[0][23], cordCenterXY.cX - 50, cordCenterXY.cY-70);

            break;

          case 1:

            draw(canvasImg.img[0][22], cordCenterXY.cX - 50, cordCenterXY.cY-70);

            break;

          case 2:

            draw(canvasImg.img[0][21], cordCenterXY.cX - 50, cordCenterXY.cY-70);

            break;

          case 3: 

            draw(canvasImg.img[0][19], cordCenterXY.cX - 50, cordCenterXY.cY-70); 

            break;

        }

    }

    

    // фун добавляет изменненые элементы на поле судоку

    function updateField(){

        var num;

        for(var i = 0, k = 0; i < 9; k += 30, i += 1){

            for(var j = 0, n = 0; j < 9; n += 30, j += 1){

               num = upd_fill[i][j];

               if(num !== 0){

                    draw(canvasImg.img[num][numPicture], cordCenterXY.cX+2 + n, cordCenterXY.cY+2 + k);

               }

            }

        }

    }

    

    // фун перерысовывает поле

    function reDrawField(){

        canvasImg.canvas.clearRect(0,0, canvasImg.c.width, canvasImg.c.height);

        draw(canvasImg.img[0][26], cordCenterXY.cX - 80, cordCenterXY.cY - 115);

        draw(canvasImg.img[0][29], cordCenterXY.cX + 270, cordCenterXY.cY + 290);

        draw(canvasImg.img[0][33], cordCenterXY.cX -50, cordCenterXY.cY + 290);

        draw(canvasImg.img[0][1], cordCenterXY.cX, cordCenterXY.cY);

        moveObj();

        fillField();

        updateField();

        buttons();

    }

    

    // фун двойным щелчком убирает элемент с поля

    document.ondblclick = function(){

        var x = event.clientX;

        var y = event.clientY;

        if(cordCenterXY.number === null && checkResult === null){

            for(var i = 0, m = 0; i < 9; m += 30, i += 1){

                for(var j = 0, n = 0; j < 9; n += 30, j += 1){

                    if(x > cordCenterXY.cX + n && x < cordCenterXY.cX + n + 29 && y > cordCenterXY.cY + m && y < cordCenterXY.cY + m + 29){

                        if(arr_mask[i][j] === 0){

                            upd_fill[i][j] = 0;

                            levelArray[i][j] = 0;

                            reDrawField();

                        }

                    }

                }

            }

        }

        if(checkResult === null){

            if(x > cordCenterXY.cX + 270 || x < cordCenterXY.cX || y > cordCenterXY.cY + 270 || y < cordCenterXY.cY){

                reDrawField();

            }

        }

    };

    

    // фун при отпускание элемента над ячейкой поля записывает его в ту ячейку

    document.onmouseup = function(){

        var x = event.clientX;

        var y = event.clientY;

        if(checkResult === null){

          document.onmousemove = null;

          reDrawField();

          if(cordCenterXY.number !== null ){

                for(var i = 0, m = 0; i < 9; m += 30, i += 1){

                    for(var j = 0, n = 0; j < 9; n += 30, j += 1){

                        if(x > cordCenterXY.cX + n && x < cordCenterXY.cX + n + 29 && y > cordCenterXY.cY + m && y < cordCenterXY.cY + m + 29){

                            if(arr_mask[i][j] === 0){

                              if(cordCenterXY.number < 10){

                                upd_fill[i][j] = cordCenterXY.number;

                                levelArray[i][j] = cordCenterXY.number;

                                reDrawField();

                                cordCenterXY.number = null;

                                verificationUserResult();

                              }

                                if (numHelp != 0 && cordCenterXY.number == 10) {

                                  numHelp -= 1;

                                  upd_fill[i][j] = helpArr[i][j];

                                  levelArray[i][j] = helpArr[i][j];

                                  reDrawField();

                                  cordCenterXY.number = null;

                                  verificationUserResult();

                                };

                            }else{

                                reDrawField();

                            }

                        }

                    }

                }



          }

          if(x > cordCenterXY.cX + 270 || x < cordCenterXY.cX || y > cordCenterXY.cY + 270 || y < cordCenterXY.cY){

              reDrawField();

          }

        }

    };



    // фун перетягивания элементов с боковой панели в ячейки поля

    document.onmousedown = function(){

        var x = event.clientX;

        var y = event.clientY;

        if(checkResult === null){

          for(var i = 1, n = 0; i <= 9; n += 30, i += 1){

               if(x > cordCenterXY.cX + n && x < cordCenterXY.cX + n + 29 && y > cordCenterXY.cY - 34 && y < cordCenterXY.cY - 34 + 29){

                   cordCenterXY.number = i;

                   document.onmousemove = function(){

                        var x = event.clientX;

                        var y = event.clientY;

                        reDrawField();                   

                        draw(canvasImg.img[cordCenterXY.number][numPicture], x-20, y-20);

                   };

                   return;

               }

               if(x > cordCenterXY.cX - 34 && x < cordCenterXY.cX - 34 + 29 && y > cordCenterXY.cY + n && y < cordCenterXY.cY + n + 29){

                   cordCenterXY.number = i;

                   document.onmousemove = function(){

                        var x = event.clientX;

                        var y = event.clientY;

                        reDrawField();                   

                        draw(canvasImg.img[cordCenterXY.number][numPicture], x-20, y-20);

                   };

                   return;

               }

               if(x > cordCenterXY.cX + n && x < cordCenterXY.cX + n + 29 && y > cordCenterXY.cY + 270 + 10 && y < cordCenterXY.cY + 270 + 10 + 29){

                   cordCenterXY.number = i;

                   document.onmousemove = function(){

                        var x = event.clientX;

                        var y = event.clientY;

                        reDrawField();                   

                        draw(canvasImg.img[cordCenterXY.number][numPicture], x-20, y-20);

                   };

                   return;

               }

               if(x > cordCenterXY.cX + 270 + 10 && x < cordCenterXY.cX + 270 + 10 + 29 && y > cordCenterXY.cY + n && y < cordCenterXY.cY + n + 29){

                   cordCenterXY.number = i;

                   document.onmousemove = function(){

                        var x = event.clientX;

                        var y = event.clientY;

                        reDrawField();                   

                        draw(canvasImg.img[cordCenterXY.number][numPicture], x-20, y-20);

                   };

                   

                   return;

               }

          }

          if (x > cordCenterXY.cX - 50 && x < cordCenterXY.cX && y > cordCenterXY.cY - 70 && y < cordCenterXY.cY - 20) {

            cordCenterXY.number = 10;

            document.onmousemove = function(){

                        var x = event.clientX;

                        var y = event.clientY;

                        reDrawField();                   

                        draw(canvasImg.img[0][20], x-20, y-20);

                   };

          };

        }

    };



    // в массиве levelArray отставляет только значения маски

    function changeLevelArray() {

      var  upd;

      for(var k = 0; k < 9; k+=1){

        for(var m = 0; m < 9; m+=1){

          upd = arr_mask[k][m];

          if(upd != 0){

            levelArray[k][m] = arr_mask[k][m]

          }else{

            levelArray[k][m] = 0;

          }

        }

      }

    }

    //-----------------блок проверки конечно массива согласно правилам судоку----------------

    // функция проверки - заполнен ли судоку играком, согласно правил.

    function verificationUserResult(){

      for(var k = 0; k < 9; k+=1){

        for(var m = 0; m < 9; m+=1){

          upd = levelArray[k][m];

          if(upd == 0 || upd == undefined || upd == null){

            return false;

          }

        }

      }



      // проверка правельности заполнения строк

      row = checkRow();

      col = checkCols();

      square = checkAllSquare();

      if(row == true && col == true && square == true){

        checkResult = true;

        draw(canvasImg.img[0][7], cordCenterXY.cX-60, cordCenterXY.cY-10);

        timer = 0;

        timeGame();

        checkStorage();

      } else {

        checkResult = false;

        draw(canvasImg.img[0][6], cordCenterXY.cX-50, cordCenterXY.cY-60);

        timer = 0;

      }

    }

    // функция проверки строк на уникальность чисел

    function checkRow() {

      var count = 0;

      for(var i = 0; i < 9; i+=1){

        var arr = [1,2,3,4,5,6,7,8,9];

        for(var j = 0; j < 9; j+=1){

          for (n in arr) {

            if(arr[n] == levelArray[i][j]){

              arr.splice(n, 1);

              count +=1;

            }

          }

        }

      }

      if(count == 81) {

        return true;

      } else {

        return false;

      }

    }



    // функция проверки столбцов на уникальность чисел

    function checkCols() {

      var count = 0;

      for(var i = 0; i < 9; i+=1){

        var arr = [1,2,3,4,5,6,7,8,9];

        for(var j = 0; j < 9; j+=1){

          for (n in arr) {

            if(arr[n] == levelArray[j][i]){

              arr.splice(n, 1);

              count +=1;

            }

          }

        }

      }

      if(count == 81) {

        return true;

      } else {

        return false;

      }

    }



    // функция проверки уникальности числе в квадрате 9x9

    function checkAllSquare() {

        var unicalNumbers;

        for(var i = 0; i < 6; i+=3){

          for(var j = 0; j < 6; j+=3){

            unicalNumbers = checkSquare(i, j);

            if(unicalNumbers){



            } else {

              return false;

            }

          }

        }

        return true;

    }



    // функция проверки уникальности числе в квадрате 3x3

    function checkSquare(n, m) {

      var count = 0;

      var arr = [1,2,3,4,5,6,7,8,9];



      for(var i = n; i < 3 + n; i+=1){

        for(var j = m; j < 3 + m; j+=1){

          for (k in arr) {

            if(arr[k] == levelArray[i][j]){

              arr.splice(k, 1);

              count +=1;

            }

          }

        }

      }

      if(count == 9) {

        return true;

      } else {

        return false;

      }

    }

    //---------------------------------------------------------------------------------------

    

    // функция наложения отсеивания видимых объектов

    function mask(k){

        var n;

        for(var j = 0; j <= 6; j +=3){

          for(var m = 0; m <= 6; m += 3){

            for(var i = 0; i < k; i += 1){

                n = getRandomInt(1, 9);

                switch (n) {

                    case 1:

                        arr_mask[0 + m][0 + j] = levelArray[0 + m][0 + j];

                        break;

                    case 2:

                        arr_mask[0 + m][1 + j] = levelArray[0 + m][1 + j];

                        break;

                    case 3:

                        arr_mask[0 + m][2 + j] = levelArray[0 + m][2 + j];

                        break;

                    case 4:

                        arr_mask[1 + m][0 + j] = levelArray[1 + m][0 + j];

                        break;

                    case 5:

                        arr_mask[1 + m][1 + j] = levelArray[1 + m][1 + j];

                        break;

                    case 6:

                        arr_mask[1 + m][2 + j] = levelArray[1 + m][2 + j];

                        break;

                    case 7:

                        arr_mask[2 + m][0 + j] = levelArray[2 + m][0 + j];

                        break;

                    case 8:

                        arr_mask[2 + m][1 + j] = levelArray[2 + m][1 + j];

                        break;

                    case 9:

                        arr_mask[2 + m][2 + j] = levelArray[2 + m][2 + j];

                        break;

                }

            }

          }

        }

    }

    

    //функция создания массива холста с входящими параметрами высоты и ширины.

    

    function setData(widthHolst, heightHolst) {

        var data = new Array(widthHolst);

        for (var i = 0; i < widthHolst; i += 1) {

            data[i] = new Array(heightHolst);

        }

        for (var i = 0; i < widthHolst; i += 1) {

            for (var j = 0; j < heightHolst; j += 1) {

                data[i][j] = 0;

            }

        }

           return data;

    }

    

                        

    

    // объекты размещенные по бокам судоку цыферки, картинки

    function moveObj(){

        for(var i = 1, n = 0; i <= 9; n += 30, i += 1){

            draw(canvasImg.img[i][numPicture], cordCenterXY.cX + n, cordCenterXY.cY - 34);

            draw(canvasImg.img[i][numPicture], cordCenterXY.cX - 34, cordCenterXY.cY + n);

            draw(canvasImg.img[i][numPicture], cordCenterXY.cX + n, cordCenterXY.cY + 270 + 10);

            draw(canvasImg.img[i][numPicture], cordCenterXY.cX + 270 + 10, cordCenterXY.cY + n);

        }

    }



    

    // Ривосвание

    function draw(img, x, y){

        canvasImg.canvas.drawImage(img, x, y);

    }

    // функция для рандомного числа

    function getRandomInt(min, max) {

        return Math.floor(Math.random() * (max - min + 1)) + min;

    }

    

    

    // набор функций для случайного генератора чисел-------------------------- 

    

    function createNewField() {



        // Заполнение поля размером 9х9

        for (var i = 0; i < 9; i++) {

            levelArray[i] = new Array(9);

        }    



        setFirstRow();

        setRestRows(); 

    }



    function setFirstRow() {

        var numb = [1,2,3,4,5,6,7,8,9],

            r;



        for (var i = 0; i < 9; i++) {

            r = Math.floor(Math.random() * numb.length);

            levelArray[i][0] = numb[r];

            numb.splice(r, 1);

        }

    }



    function setRestRows() {

        var possibleNumbers,

                count = 0;



        for (var j = 1; j < 9; j++) {

            for (var i = 0; i < 9; i++) {

                possibleNumbers = getPossibleNumbers(i, j);



                // Стереть предыдущий и текущий ряды при достижении лимита повторов цикла

                if (count >= 9) {

                    count = 0;

                    i = -1;

                    levelArray = clearRow(j, levelArray);

                    levelArray = clearRow(--j, levelArray);



                    // Стереть и текущий ряд, если не найдено допустимых комбинаций

                } else if (possibleNumbers.length == 0) {

                    i = -1;

                    count++;

                    levelArray = clearRow(j, levelArray);

                } else {

                    setUniqueElement(i, j, possibleNumbers);

                }



            }

        }

    }



    

    function setUniqueElement(i, j, numb) { 

        var r = Math.floor(Math.random() * numb.length);



        // Проверка на существование элемента по вертикали

        if (!hasNoVerticalNumber(i, numb[r])) return arguments.callee(i, j, numb);    



        // Проверка на существование элемента по горизонтали

        if (!hasNoHorizontalNumber(j, numb[r])) return arguments.callee(i, j, numb);



        // Проверка на существование элемента в квадрате

        if (!hasNoNumberInSquare(i, j, numb[r])) return arguments.callee(i, j, numb);



        levelArray[i][j] = numb[r];

    }



    function clearRow(j, arr) {

        for (var i = 0; i < 9; i++) {

            arr[i][j] = 0;

        }

        return arr;

    }



    function getPossibleNumbers(i, j) {

        var arr = [1,2,3,4,5,6,7,8,9];



        // Отсеивание уже существующих в горизонтальном ряде

        arr = filterExistingHorizontal(j, arr);



        // Отсеивание уже существующих в вертикальном ряде

        arr = filterExistingVertical(i, arr);



        // Отсеивание уже существующих в квадрате

        arr = filterSquare(i, j, arr);



        /*

         * Проверка для второго ряда

         * Обязательное использование элементов, которые есть в третьем ряде

         */ 

        if (i > 2 && i < 6) {

            arr = filterSecondRow(i, j, arr);

        }



        return arr;

    }



    function filterSquare(i,j,arr) {

        var square_elems = getSquareElements(i,j);

        for (var n = arr.length - 1; n >= 0; n--) {

            if (square_elems.some(function(e) {

                return e == arr[n];

            })) {

                arr.splice(n, 1);

            }

        }  

        return arr;  

    }



    function filterExistingVertical(i, arr) {

        for (var j = arr.length - 1; j >= 0; j--) {

            if (levelArray[i].some(function(e) {

                    return e == arr[j];

                })) {

                arr.splice(j, 1);    

            }

        }



        return arr;

    }



    function filterExistingHorizontal(j, arr) {

        for (var i = arr.length - 1; i >= 0; i--) {

            if (levelArray.some(function(e) {

                    return e[j] == arr[i];

                })) {

                arr.splice(i, 1);    

            }

        }



        return arr;

    }



    function filterSecondRow(i, j, arr) {

        var square_elems = getSquareElements(6, j),

            priority_array = [];



        // Поиск наличия совпадения

        for (var n = 0; n < arr.length; n++) {

            if (square_elems.some(function(e) {

                return e == arr[n];

            })) {

                priority_array.push(arr[n]);

            }

        }



        if (priority_array.length > 0) {

            return priority_array; 

        } else {

            return arr;    

        }

    }



    function hasNoVerticalNumber(row, num) {

        return levelArray[row].every(function(e) {return e != num;});

    }



    function hasNoHorizontalNumber(col, num) {

        for (var i = 0; i < 9; i++) {

            if (levelArray[i][col] == num) return false;

        }



        return true;

    }



    function hasNoNumberInSquare(i, j, num) {



        // Получить элементы квадрата

        var arrElems = getSquareElements(i,j);



        return arrElems.every(function(e) {return e != num;});

    }



    function getSquareElements(i,j) {

        var arr = [],

            borders = getBorders(i,j); // Получить границы квадрата



        for (var i = 0; i < 9; i++) {

            for (var j = 0; j < 9; j++) {    



                if (i >= borders.i_b && i <= borders.i_t && 

                    j >= borders.j_b && j <= borders.j_t) {



                    // Элемент находится в рамках квадрата    

                    arr.push(levelArray[i][j]);    



                }



            }

        }  



        return arr;   

    }



    function getBorders(i,j) {

        var i_b, i_t, j_b, j_t;



        switch (i) {

            case 0:

            case 1:

            case 2:

                i_b = 0;

                i_t = 2;

                break;



            case 3:

            case 4:

            case 5:

                i_b = 3;

                i_t = 5;        

                break;



            case 6:

            case 7:

            case 8:

                i_b = 6;

                i_t = 8;        

                break;

        }



        switch (j) {

            case 0:

            case 1:

            case 2:

                j_b = 0;

                j_t = 2;

                break;



            case 3:

            case 4:

            case 5:

                j_b = 3;

                j_t = 5;        

                break;



            case 6:

            case 7:

            case 8:

                j_b = 6;

                j_t = 8;        

                break;

        }



        return {i_b: i_b, i_t: i_t, j_b: j_b, j_t: j_t};

    }

    //------------конец генератора рандомных чисел-----------------------------

};









