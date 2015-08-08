/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
window.onload = function(){
     
    
    // объект хранящий 2 массива верхенго и нижнего холста
    var objMap = {
        setDataPixel: setData(1200, 600),
        setDat: setData(20, 10),
        actionPoint: setData(20, 10)
    }; 
    
    // объект с параметрами главного героя
    var heroMove = {
        start : false,
        y: 300,
        x: 600,
        pos: 0,
        life: 1,
        notDead: true,
        endX: 0,
        endY: 0,
        up : false,
        down : false,
        right : false,
        left : false,
        timeStep: 0,
        pushButton: true,
        pause: true,
        invulnerable: false
    };
    
    // объект с параметрами босса 1 ур
    var monster4 = {
        y: 0,
        x: 480,
        pos: 0,
        check: 1,
        point: 0,
        life: 3,
        dead: false
    };
    
    // объект с параметрами монстра №1
    var monster1 = {
        y: 300,
        x: 360,
        pos: 0,
        check: 1,
        point: 0,
        dead: false
    };
    
    // объект с параметрами монстра №2
    var monster2 = {
        y: 540,
        x: 1140,
        pos: 0,
        check: 1,
        point: 0,
        dead: false
    };
    
    // объект с параметрами монстра №3
    var monster3 = {
        y: 480,
        x: 0,
        pos: 0,
        check: 1,
        point: 0,
        dead: false
    };
    
    // объект с параметрами магии замедления
    var selfSkill = {
        normalTime: 34,
        clearTime: 0,
        timer: 0
    };
    
    // объект с параметрами активации взятого свитка
    var actSkill = {
        blastPos: 60,
        blastX: 0,
        blastY: 0,
        blastEndX: 0,
        blastEndY: 0,
        clock: 0,
        checkDraw: false
    };
    
    // объект с параметрами свитка который подобрали
    var scroll = {
        x: 0,
        y: 0,
        img: null,
        life: true,
        useImg: null,
        item: 0,
        numItem: 0,
        time: 0
    };
    
    // объект с параметрами перехода на следуйщий уровень
    var portal = {
        x: null,
        y: null,
        stop: false
    };
    
    // объект для выводимого текста при брифинге
    var moveText = {
        timerHistor: null,
        stageHistor: false,
        pos: 0
    };
     
    // конструктор массив всех изображений
    var objCanvasImg = new CanvasObj();
     
     
    mainMenu();
    
     
    //функция для начала игры 
    function startGame(){
        objCanvasImg.canvasFon.clearRect(0, 0, objCanvasImg.c.width, objCanvasImg.c.height);
        objCanvasImg.canvas.clearRect(0, 0, objCanvasImg.c.width, objCanvasImg.c.height);
        document.onmousemove = function(e) { 
                if(!e){
                    e = event;
                }
             };
        document.onclick = function(e) { 
                if(!e){
                    e = event;
                }
        };
        refreshAllParam();
        stage1Map();
        compareArrays(objMap.setDat, objMap.setDataPixel, 60, 60);
        objCanvasImg.canvasFon.drawImage(objCanvasImg.img[3], 0, 0);
        objCanvasImg.canvasFon.drawImage(objCanvasImg.img[9], 0, 0);
        textDraw();
        getData(objMap.setDat, 60, 60);
        getScroll();
        normal(monster4,monster1,monster2,monster3);
     }
     
    // функция которая сбрасывает все параметры объектов в начальное состояние
    function refreshAllParam(){
         heroMove.start = true;
         heroMove.y = 300; 
         heroMove.x = 600;
         heroMove.pos = 0;
         heroMove.life = 1;
         heroMove.notDead = true;
         heroMove.endX = 0;
         heroMove.endY = 0;
         heroMove.up = false;
         heroMove.down = false;
         heroMove.right = false;
         heroMove.left = false;
         heroMove.timeStep = 0;
         heroMove.pushButton = true;
         heroMove.pause = true;
         heroMove.invulnerable = false;
        
         monster4.y = 0; 
         monster4.x = 480;
         monster4.pos = 0;
         monster4.check = 1;
         monster4.point = 0;
         monster4.life = 3;
         monster4.dead = false;
         
         monster1.y = 300; 
         monster1.x = 360;
         monster1.pos= 0;
         monster1.check = 1;
         monster1.point = 0;
         monster1.dead = false;
 
         monster2.y = 540; 
         monster2.x = 1140;
         monster2.pos= 0;
         monster2.check = 1;
         monster2.point = 0;
         monster2.dead = false;
 
         monster3. y = 480; 
         monster3. x = 0;
         monster3. pos= 0;
         monster3. check = 1;
         monster3. point = 0;
         monster3. dead = false;
 
         selfSkill.normalTime = 34;
         selfSkill.clearTime = 0;
         selfSkill.timer = 0;
         
         actSkill.blastPos = 60;
         actSkill.blastX = 0;
         actSkill.blastY = 0;
         actSkill.blastEndX = 0;
         actSkill.blastEndY = 0;
         actSkill.clock = 0;
         actSkill.checkDraw = false;
         
         scroll.x = 0;
         scroll.y = 0;
         scroll.img = null;
         scroll.life = true;
         scroll.useImg = null;
         scroll.item = 0;
         scroll.numItem = 0;
         scroll.time = 0;
 
         portal.x = null;
         portal.y = null;
         portal.stop = false;
         
         moveText.timerHistor = null;
         moveText.stageHistor = false;
         moveText.pos = 0;

          
         
    }
     
    // функция заставки вступительной истории
    function history(){
        var img = objCanvasImg.img[17],
                img1 = objCanvasImg.img[20],
                skip = "Skip";
             objCanvasImg.canvasFon.clearRect(0, 0, objCanvasImg.c.width, objCanvasImg.c.height);
             objCanvasImg.canvas.clearRect(0, 0, objCanvasImg.c.width, objCanvasImg.c.height);
             objCanvasImg.canvasFon.drawImage(objCanvasImg.img[18], 0, 0);
             objCanvasImg.canvasFon.drawImage(objCanvasImg.img[22], 60, 38);
             objCanvasImg.canvasFon.drawImage(objCanvasImg.img[23], 650, 55);
             objCanvasImg.canvasFon.drawImage(objCanvasImg.img[24], 940, 85);
             objCanvasImg.canvasFon.drawImage(img, 473, 540);
             objCanvasImg.canvasFon.fillStyle = "#696969";
             objCanvasImg.canvasFon.font = 'italic 12pt Arial';
             objCanvasImg.canvasFon.fillText("Skip", 610, 575);
             objCanvasImg.canvasFon.fillText("Мермидовинил", 1000, 470);
             document.onmousemove = function(e) { 
                if(!e){
                    e = event;
                }
                lightButton(e, img, img1, 473, 540, skip, 610);
             };
             document.onclick = function(e) { 
                if(!e){
                    e = event;
                }
                if(e.clientX > 473+50 && e.clientX < 473+280 && e.clientY > 540+30 && e.clientY < 540+70){
                    clearTimeout(moveText.timerHistor);
                    moveText.timerHistor = null;
                    moveText.stageHistor = false;
                    moveText.pos = 0;
                    startGame();
                }
        };
             scrollText();
              
    }
    
    //функция движения текста
    function scrollText(){
        objCanvasImg.canvas.clearRect(0, 0, objCanvasImg.c.width, objCanvasImg.c.height);
        objCanvasImg.canvas.drawImage(objCanvasImg.img[25], 0, moveText.pos, 230, 400, 680, 95, 230, 400);
        moveText.pos += 1;
        moveText.timerHistor = setTimeout(function(){
            scrollText();
        },30);
        if(moveText.pos > 400){
            clearTimeout(moveText.timerHistor);
            moveText.pos = 0;
            objCanvasImg.canvasFon.drawImage(objCanvasImg.img[28], 60, 38);
             objCanvasImg.canvasFon.drawImage(objCanvasImg.img[23], 650, 55);
             objCanvasImg.canvasFon.drawImage(objCanvasImg.img[27], 940, 85);
             objCanvasImg.canvasFon.fillStyle = "#696969";
             objCanvasImg.canvasFon.font = 'italic 12pt Arial';
             objCanvasImg.canvasFon.fillText("Зидрончониз", 1000, 470);
            brifing();
        }
    };
    
     //функция движения текста описания уровня
    function brifing(){
        objCanvasImg.canvas.clearRect(0, 0, objCanvasImg.c.width, objCanvasImg.c.height);
        objCanvasImg.canvas.drawImage(objCanvasImg.img[26], 0, moveText.pos, 230, 400, 680, 95, 230, 400);
        moveText.pos += 1;
        moveText.timerHistor = setTimeout(function(){
            brifing();
        },30);
        if(moveText.pos > 355){
            clearTimeout(moveText.timerHistor);
            
            moveText.pos = 0;
        }
    };
    
    // функция обучающая управлению в игре
    function controls(){
        objCanvasImg.canvas.clearRect(0, 0, objCanvasImg.c.width, objCanvasImg.c.height);
        objCanvasImg.canvasFon.clearRect(0, 0, objCanvasImg.c.width, objCanvasImg.c.height);
        var img = objCanvasImg.img[17],
                img1 = objCanvasImg.img[20],
                main = "Main Menu";
        objCanvasImg.canvasFon.drawImage(objCanvasImg.img[21], 0, 0);
        objCanvasImg.canvasFon.drawImage(img, 445, 250);
        objCanvasImg.canvasFon.fillStyle = "#696969";
        objCanvasImg.canvasFon.font = 'italic 12pt Arial';
        objCanvasImg.canvasFon.fillText("Main Menu", 550, 285);
        
        document.onmousemove = function(e) { 
            
            if(!e){
                e = event;
            }
            lightButton(e, img, img1, 445, 250, main, 550);
            
        };
        document.onclick = function(e) { 
                if(!e){
                    e = event;
                }
                if(e.clientX > 445+50 && e.clientX < 445+280 && e.clientY > 250+30 && e.clientY < 250+70){
                    mainMenu();
                }
        };
    }
    
    // функция для последуйщего создания объекта конструктора objCanvasImg, содержит массив рисунков
    function CanvasObj() {
         var self = this;
         this.c = document.getElementById('Canvas');
         this.canvas = self.c.getContext('2d');
         this.img = [document.getElementById('hero'), document.getElementById('block'), document.getElementById('lose'), document.getElementById('fon'),
                     document.getElementById('crazymage'), document.getElementById('werewolf'), document.getElementById('killer'), document.getElementById('goblin'),
                     document.getElementById('blast'), document.getElementById('ramka'), document.getElementById('scrollD'), document.getElementById('scrollG'),
                     document.getElementById('scrollI'), document.getElementById('life'), document.getElementById('slow'), document.getElementById('invulnerable'),
                     document.getElementById('exit'), document.getElementById('menu'), document.getElementById('fontrack'), document.getElementById('mainpage'),
                     document.getElementById('gems'), document.getElementById('controls'), document.getElementById('library'), document.getElementById('book'),
                     document.getElementById('heroMage'), document.getElementById('histor'), document.getElementById('hist1level'), document.getElementById('crazy'),
                     document.getElementById('undeadgr')];
         this.cf = document.getElementById("CanvasFon");
         this.canvasFon = self.cf.getContext("2d");
     }
     
    // функция главного меню игры
    function mainMenu(){
        var img = objCanvasImg.img[17],
                img1 = objCanvasImg.img[20],
                start = "Start Game",
                control = "Read Me",
                exit = "Exit";
        objCanvasImg.canvas.clearRect(0, 0, objCanvasImg.c.width, objCanvasImg.c.height);
        objCanvasImg.canvasFon.clearRect(0, 0, objCanvasImg.c.width, objCanvasImg.c.height);
        objCanvasImg.canvasFon.drawImage(objCanvasImg.img[19], 0, 0);
        objCanvasImg.canvasFon.drawImage(img, 500, 350);
        objCanvasImg.canvasFon.drawImage(img, 500, 408);
        objCanvasImg.canvasFon.drawImage(img, 500, 466);
        objCanvasImg.canvasFon.fillStyle = "#696969";
        objCanvasImg.canvasFon.font = 'italic 12pt Arial';
        objCanvasImg.canvasFon.fillText("Start Game", 610, 385);
        objCanvasImg.canvasFon.fillText("Read Me", 620, 443);
        objCanvasImg.canvasFon.fillText("Exit", 630, 501);
        
        document.onmousemove = function(e) { 
            
            if(!e){
                e = event;
            }
            lightButton(e, img, img1, 500, 350, start, 610);
            lightButton(e, img, img1, 500, 408, control, 620);
            lightButton(e, img, img1, 500, 466, exit, 630);
        };
        document.onclick = function(e) { 
            if(!e){
                e = event;
            }
            if(e.clientX > 550 && e.clientX < 780 && e.clientY > 380 && e.clientY < 420){
                history();
            }
            if(e.clientX > 500+50 && e.clientX < 500+280 && e.clientY > 408+30 && e.clientY < 408+70){
                controls();
            }
            if(e.clientX > 550 && e.clientX < 780 && e.clientY > 466+30 && e.clientY < 466+70){
                location="http://mykytenko.info/portfolio/";
            }
        };
        
        
    }
    
    // проиграш
    function gameOver(){
        var img = objCanvasImg.img[17],
                img1 = objCanvasImg.img[20],
                main = "Main Menu",
                exit = "Replay";
             objCanvasImg.canvas.clearRect(0, 0, objCanvasImg.c.width, objCanvasImg.c.height);
             objCanvasImg.canvasFon.clearRect(0, 0, objCanvasImg.c.width, objCanvasImg.c.height);
             objCanvasImg.canvasFon.drawImage(objCanvasImg.img[18], 0, 0);
             objCanvasImg.canvasFon.drawImage(objCanvasImg.img[2], 500, 175);
             objCanvasImg.canvasFon.drawImage(img, 473, 425);
             objCanvasImg.canvasFon.drawImage(img, 473, 482);
             objCanvasImg.canvasFon.fillStyle = "#696969";
             objCanvasImg.canvasFon.font = 'italic 12pt Arial';
             objCanvasImg.canvasFon.fillText("Main Menu", 580, 460);
             objCanvasImg.canvasFon.fillText("Replay", 600, 518);
             document.onmousemove = function(e) { 

                if(!e){
                    e = event;
                }
                lightButton(e, img, img1, 473, 425, main, 580);
                lightButton(e, img, img1, 473, 482, exit, 600);

            };
             document.onclick = function(e) { 
                if(!e){
                    e = event;
                }
                if(e.clientX > 473+50 && e.clientX < 473+280 && e.clientY > 425+30 && e.clientY < 425+70){
                    mainMenu();
                }
                if(e.clientX > 473+50 && e.clientX < 473+280 && e.clientY > 482+30 && e.clientY < 482+70){
                    startGame();
                }
        };
    }
    
    // фун для начала брифинга 2 ур
    function brLevel2(){
        var img = objCanvasImg.img[17],
                img1 = objCanvasImg.img[20],
                skip = "Main menu";
             objCanvasImg.canvasFon.clearRect(0, 0, objCanvasImg.c.width, objCanvasImg.c.height);
             objCanvasImg.canvas.clearRect(0, 0, objCanvasImg.c.width, objCanvasImg.c.height);
             objCanvasImg.canvasFon.drawImage(objCanvasImg.img[18], 0, 0);
             objCanvasImg.canvasFon.drawImage(objCanvasImg.img[23], 410, 55);
             objCanvasImg.canvasFon.drawImage(img, 473, 540);
             objCanvasImg.canvasFon.fillStyle = "#696969";
             objCanvasImg.canvasFon.font = 'italic 14pt Arial';
             objCanvasImg.canvasFon.fillText("Main menu", 580, 575);
             objCanvasImg.canvasFon.fillText("Второй уровень", 475, 275);
             objCanvasImg.canvasFon.fillText("в разработке", 475, 300);
             document.onmousemove = function(e) { 
                if(!e){
                    e = event;
                }
                lightButton(e, img, img1, 473, 540, skip, 580);
             };
             document.onclick = function(e) { 
                if(!e){
                    e = event;
                }
                if(e.clientX > 473+50 && e.clientX < 473+280 && e.clientY > 540+30 && e.clientY < 540+70){
                    mainMenu();
                }
            };
    }
    
    //подсветка кнопок при наведении
    function lightButton(e, normalB, lightB, x, y, name, textX){
        var imgIsset = false, imgOut = false;
        if(imgIsset === false){
            if(e.clientX > x+50 && e.clientX < x+280 && e.clientY > y+30 && e.clientY < y+70){
                objCanvasImg.canvasFon.drawImage(lightB, x, y);
                objCanvasImg.canvasFon.fillStyle = "#000000";
                objCanvasImg.canvasFon.fillText(name, textX, y+35);
                imgIsset = true;
                imgOut = false;
            }
            } 
            if(imgOut === false){
            if(e.clientX > x+50 && e.clientX < x+280 && e.clientY > y+30 && e.clientY < y+70){
            }else{
                objCanvasImg.canvasFon.drawImage(normalB, x, y);
                objCanvasImg.canvasFon.fillStyle = "#696969";
                objCanvasImg.canvasFon.fillText(name, textX, y+35);
                imgOut = true;
                imgIsset === false;
            }
            }
    }
    
    //блок управления
    
    document.onkeydown = function(e){
        event = e || window.event;
        if(heroMove.start === true){
        if(heroMove.notDead === true){
        //pause on space
        if(event.keyCode === 32 && heroMove.pause === true && heroMove.pushButton === true ){
            clearTimeout(selfSkill.clearTime);
            clearTimeout(scroll.time);
            heroMove.pushButton = false;
            heroMove.pause = false;
            objCanvasImg.canvas.drawImage(objCanvasImg.img[17], 450, 250);
            objCanvasImg.canvas.fillStyle = "#696969";
            objCanvasImg.canvas.font = 'italic 12pt Arial';
            objCanvasImg.canvas.fillText("Pause", 580, 285);
        }else if(event.keyCode === 32 && heroMove.pause === false ){
            if(portal.stop === false){
            normal(monster4,monster1,monster2,monster3);
            reloadScroll();
            heroMove.pushButton = true;
            heroMove.pause = true;
            }
        }

        // left    
        if(event.keyCode === 37 && heroMove.pushButton === true){
            heroMove.endX = heroMove.x - 60;
            checkLeft();
        }
        if(event.keyCode === 37 && heroMove.endX === null && heroMove.pushButton === false){
            heroMove.right = false;
            heroMove.left = true;
        }

        // right
        if(event.keyCode === 39 && heroMove.pushButton === true){
            heroMove.endX = heroMove.x + 60;
            checkRight();
        }
        if(event.keyCode === 39 && heroMove.endX === null && heroMove.pushButton === false){
            heroMove.right = true;
            heroMove.left = false;
        }
 
        // up
        if(event.keyCode === 38 && heroMove.pushButton === true){
            heroMove.endY = heroMove.y - 60;
            checkUp();
        }
        if(event.keyCode === 38 && heroMove.endY === null && heroMove.pushButton === false){
            heroMove.up = true;
            heroMove.down = false;
        }
 
        // down
        if(event.keyCode === 40 && heroMove.pushButton === true){
            heroMove.endY = heroMove.y + 60;
            checkDown();
        }
        if(event.keyCode === 40 && heroMove.endY === null && heroMove.pushButton === false){
            heroMove.down = true;
            heroMove.up = false;
        }
 
        //letter A
        if(event.keyCode === 65 && selfSkill.timer === 0 && heroMove.pushButton === true){ 
            activeSkill();
        }
        
        //letter S
        if(event.keyCode === 83 && heroMove.pushButton === true){
            if(scroll.item === 10){
                blast();
            }
            if(scroll.item === 12){
                teleport();
            }
            if(scroll.item === 11){
                heal();
            }
        }
        }
        }        
        }; 
       
    //функция создания массива холста с входящими параметрами высоты и ширины.
    function setData(widthHolst, heightHolst) {
        var 
         data = new Array("widthHolst");
        for (var i = 0; i < widthHolst; i += 1) {
            data[i] = new Array("heightHolst");
        }
        for (var i = 0; i < widthHolst; i += 1) {
            for (var j = 0; j < heightHolst; j += 1) {
                data[i][j] = 0;
            }
        }
           return data;
    }
    
    // функция отрисовки массива с нужной шириной и высотой ячейки
    function getData(data, width, height){
        var func = objCanvasImg.canvasFon;
        for(var i = 0; i < 20; i+=1){
            for(var j = 0; j < 10; j+=1 ){
                if (data[i][j] !== 0) {
                    func.drawImage(data[i][j], i*width, j*height); 
                }
            }
        }
    }

    // отрисовка перемещения героя
    function moveHero(){
        unitsStage1();
    }  

    // data - массив который хранит в себе картинки
    // data1 - массив который заполняется попиксельно единицами там где находятся картинки в массиве data
    // width, height - ширина и высота картинки в массиве data
    function compareArrays(data, data1, width, height){
        var m, n, k, l;
        for(var i = 0; i < 20; i+=1){
            for(var j = 0; j < 10; j+=1 ){
                if (data[i][j] !== 0){

                    m = i * width;
                    n = m + width;
                    k = j * height;
                    l = k + height;

                    for (var f = m; f < n; f += 1){
                         for (var d = k; d < l; d += 1) {
                         data1[f][d] = 1;
                         }
                    }
                }
            }
        }
        return true;
    }

    //бок движения--------------------------------------------
    //движения влево
    function checkLeft(){
        var arr = objMap.setDataPixel;
        if(heroMove.x !== heroMove.endX && arr[heroMove.x-2] !== undefined && arr[heroMove.x-2][heroMove.y] === 0 ){
            if(heroMove.pushButton === true){
                heroMove.pushButton = false;
            }
            if(heroMove.pos >= 280){
                heroMove.pos = 0;
            }
            if(heroMove.pos < 280 || heroMove.pos >= 0){

                heroMove.x-=2;
                moveHero();
                if(heroMove.x %10 === 0){
                    heroMove.pos+=40;
                }
            }
        }
        if(heroMove.x === heroMove.endX || arr[heroMove.x-2] === undefined || arr[heroMove.x-2][heroMove.y] !== 0 ){
            takeItem();
            clearTimeout(heroMove.timeStep);
            heroMove.endX = null;
            if(portal.stop === false){
                heroMove.pushButton = true;
                if(heroMove.up === true){
                    heroMove.up = false;
                    heroMove.endY = heroMove.y - 60;
                    checkUp();
                }
                if(heroMove.down === true){
                    heroMove.down = false;
                    heroMove.endY = heroMove.y + 60;
                    checkDown();
                }
            }
            return false;
        }
        heroMove.timeStep = setTimeout(function(){
            checkLeft();
        } ,20);
    } 

    //движение вправо
    function checkRight(){
        var arr = objMap.setDataPixel;
        if(heroMove.x !== heroMove.endX && arr[heroMove.x+60] !== undefined && arr[heroMove.x+60][heroMove.y] === 0 ){
            if(heroMove.pushButton === true){
                heroMove.pushButton = false;
            }
            if(heroMove.pos < 640 || heroMove.pos >= 920){
               heroMove.pos = 640;
            }
            if(heroMove.pos >= 640 || heroMove.pos < 920 ){

                heroMove.x+=2;
                moveHero();
                if(heroMove.x %10 === 0){
                    heroMove.pos+=40;
                }
            }
        }
        if(heroMove.x === heroMove.endX || arr[heroMove.x+60] === undefined || arr[heroMove.x+60][heroMove.y] !== 0 ){
            takeItem();
            clearTimeout(heroMove.timeStep);
            heroMove.endX = null;
            if(portal.stop === false){
                heroMove.pushButton = true;
                if(heroMove.up === true){
                    heroMove.up = false;
                    heroMove.endY = heroMove.y - 60;
                    checkUp();
                }
                if(heroMove.down === true){
                    heroMove.down = false;
                    heroMove.endY = heroMove.y + 60;
                    checkDown();
                }
            }
            return false;
        }
        heroMove.timeStep = setTimeout(function(){
            checkRight();
        } ,20);
    }

    // движение вверх
    function checkUp(){
        var arr = objMap.setDataPixel;
        if(heroMove.y !== heroMove.endY && arr[heroMove.x][heroMove.y-2] === 0){
            if(heroMove.pushButton === true){
                heroMove.pushButton = false;
            }
            if(  heroMove.pos < 320 || heroMove.pos >= 600){ 
                heroMove.pos = 320;
            }
            if( heroMove.pos >= 320 || heroMove.pos < 600){ 
                heroMove.y-=2;

                moveHero();
                if(heroMove.y %10 === 0){
                    heroMove.pos+=40;
                }
            }
        }
        if(heroMove.y === heroMove.endY || arr[heroMove.x][heroMove.y-2] !== 0 ){
            takeItem();
            clearTimeout(heroMove.timeStep);
            heroMove.endY = null;
            if(portal.stop === false){
                heroMove.pushButton = true;
                if(heroMove.left === true){
                    heroMove.left = false;
                    heroMove.endX = heroMove.x - 60;
                    checkLeft();
                }
                if(heroMove.right === true){
                    heroMove.right = false;
                    heroMove.endX = heroMove.x + 60;
                    checkRight();
                }
            }
            return false;
        }
        heroMove.timeStep = setTimeout(function(){
            checkUp();
        } ,20);
    }

    // движение вниз
    function checkDown(){
        var arr = objMap.setDataPixel;
        if(heroMove.y !== heroMove.endY && arr[heroMove.x][heroMove.y+60] === 0 ){
            if(heroMove.pushButton === true){
                heroMove.pushButton = false;
            }
            if(heroMove.pos < 960 || heroMove.pos >= 1240){
               heroMove.pos = 960;
            }
            if(heroMove.pos >= 960 ||  heroMove.pos < 1240){

                heroMove.y+=2;
                moveHero();
                if(heroMove.y %10 === 0){
                   heroMove.pos+=40;
                }
            }
        }
        if(heroMove.y === heroMove.endY || arr[heroMove.x][heroMove.y+60] !== 0 ){
            takeItem();
            clearTimeout(heroMove.timeStep);
            heroMove.endY = null;
            if(portal.stop === false){
                heroMove.pushButton = true;
                if(heroMove.left === true){
                    heroMove.left = false;
                    heroMove.endX = heroMove.x - 60;
                    checkLeft();
                }
                if(heroMove.right === true){
                    heroMove.right = false;
                    heroMove.endX = heroMove.x + 60;
                    checkRight();
                }
            }
            return false;
        }
        heroMove.timeStep = setTimeout(function(){
            checkDown();
        } ,20);
    }

    // активация A замедление
    function activeSkill(){
        selfSkill.timer = 1;
        selfSkill.normalTime = 70;
        setTimeout(function(){
            selfSkill.normalTime = 34;
        }, 5000);
        setTimeout(function(){
            selfSkill.timer = 0;
        }, 30000);
    }
    //----------------------------------------------------------
    
    // функция запускающая движения монстров в стандартном режиме; a,b,c,d - входящие объекты с параметрами монстров 
    function normal(a,b,c,d){
        
         if(heroMove.notDead === true){
             if(monster4.dead === false){
                 move4(a);
             }
             if(monster1.dead === false){
                 move1(b);
             }
             if(monster2.dead === false){
                 move2(c);
             }
             if(monster3.dead === false){
                 move3(d);
             }
             moveHero();
         }
         if(heroMove.notDead === false){
             heroMove.endX = heroMove.x;
             heroMove.endY = heroMove.y;
             clearTimeout(selfSkill.clearTime);
             clearTimeout(scroll.time);
             gameOver();
          }
          if(heroMove.notDead === true){
              selfSkill.clearTime = setTimeout(function() {
            normal(a,b,c,d);
         }, selfSkill.normalTime);
          }
     }
    
    // логика движения монстров------
    function move4(monsterMove){
         unitsStage1();

         if(monsterMove.x >= heroMove.x-40 && monsterMove.x <= heroMove.x+40 && monsterMove.y >= heroMove.y-40 && monsterMove.y <= heroMove.y+40 && heroMove.invulnerable === false){
             if(heroMove.life > 0){
                heroMove.life -= 1;
                heroMove.x = 600;
                heroMove.y = 300;
                heroMove.endX = 600;
                heroMove.endY = 300;
                heroMove.invulnerable = true;
                setTimeout(function(){
                    heroMove.invulnerable = false;
                }, 5000);
             }else{
                heroMove.notDead = false; 
             }
         }

         //вправо
         if(Math.floor(heroMove.x/60)*60 > monsterMove.x+300 && monsterMove.x >= 0 && monsterMove.x <= 1138 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y] === 0 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y+59] === 0){
             monsterMove.x +=2;
             if(monsterMove.pos >= 1380 || monsterMove.pos < 960){
                 monsterMove.pos = 960;
             }else{
                 if(monsterMove.pos >= 960 && monsterMove.pos < 1380){
                     if(monsterMove.x %10 === 0){
                     monsterMove.pos +=60;
                     }
                 }
             }
         }
         // влево
         if(Math.floor(heroMove.x/60)*60 < monsterMove.x+300 && monsterMove.x >= 2 && monsterMove.x<=1200 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y] === 0 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y+59] === 0){
             monsterMove.x -=2;
             if(monsterMove.pos >= 420){
                 monsterMove.pos = 0;
             }else{
                 if(monsterMove.pos >= 0 && monsterMove.pos < 420){
                     if(monsterMove.x %10 === 0){
                     monsterMove.pos +=60;
                     }
                 }
             }
         }
         //вверх
         if(Math.floor(heroMove.y/60)*60 < monsterMove.y-240 && monsterMove.y >= 2  && monsterMove.y <= 600 && objMap.setDataPixel[monsterMove.x][monsterMove.y-2] === 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y-2] === 0){
             monsterMove.y -=2;
             if(monsterMove.pos >= 900 || monsterMove.pos < 480){
                 monsterMove.pos = 480;
             }else{
                 if(monsterMove.pos >= 480 && monsterMove.pos < 900){
                     if(monsterMove.y %10 === 0){
                     monsterMove.pos +=60;
                     }
                 }
             }
         }
         //вниз
         if(Math.floor(heroMove.y/60)*60 > monsterMove.y-240 && monsterMove.y>=0 && monsterMove.y <= 548 && objMap.setDataPixel[monsterMove.x][monsterMove.y+60] === 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y+60] === 0){
             monsterMove.y +=2;
             if(monsterMove.pos >= 1860 || monsterMove.pos < 1440){
                 monsterMove.pos = 1440;
             }else{
                 if(monsterMove.pos >= 1440 && monsterMove.pos < 1860){
                     if(monsterMove.y %10 === 0){
                     monsterMove.pos +=60;
                     }
                 }
             }
         }

    } 

    function move1(monsterMove){

         unitsStage1();

         if(monsterMove.x >= heroMove.x-40 && monsterMove.x <= heroMove.x+40 && monsterMove.y >= heroMove.y-40 && monsterMove.y <= heroMove.y+40 && heroMove.invulnerable === false){
             if(heroMove.life > 0){
                heroMove.life -= 1;
                heroMove.x = 600;
                heroMove.y = 300;
                heroMove.endX = 600;
                heroMove.endY = 300;
                heroMove.invulnerable = true;
                setTimeout(function(){
                    heroMove.invulnerable = false;
                }, 5000);
             }else{
                heroMove.notDead = false; 
             }
         }

          if(monsterMove.check === 1){
         //вправо
         if(Math.floor(heroMove.x/60)*60 > monsterMove.x && monsterMove.x >= 0 && monsterMove.x <= 1138 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y] === 0 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y+59] === 0){
             monsterMove.x +=2;
             if(monsterMove.pos >= 1380 || monsterMove.pos < 960){
                 monsterMove.pos = 960;
             }else{
                 if(monsterMove.pos >= 960 && monsterMove.pos < 1380){
                     if(monsterMove.x %10 === 0){
                         monsterMove.pos +=60;
                     }
                 }
             }
         }
         // влево
         if(Math.floor(heroMove.x/60)*60 < monsterMove.x && monsterMove.x >= 2 && monsterMove.x<=1200 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y] === 0 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y+59] === 0){
             monsterMove.x -=2;
             if(monsterMove.pos >= 420){
                 monsterMove.pos = 0;
             }else{
                 if(monsterMove.pos >= 0 && monsterMove.pos < 420){
                     if(monsterMove.x %10 === 0){
                         monsterMove.pos +=60;
                     }
                 }
             }
         }
         //вверх
         if(Math.floor(heroMove.y/60)*60 < monsterMove.y && monsterMove.y >= 2  && monsterMove.y <= 600 && objMap.setDataPixel[monsterMove.x][monsterMove.y-2] === 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y-2] === 0){
             monsterMove.y -=2;
             if(monsterMove.pos >= 900 || monsterMove.pos < 480){
                 monsterMove.pos = 480;
             }else{
                 if(monsterMove.pos >= 480 && monsterMove.pos < 900){
                     if(monsterMove.y %10 === 0){
                         monsterMove.pos +=60;
                     }
                 }
             }
         }
         //вниз
         if(Math.floor(heroMove.y/60)*60 > monsterMove.y && monsterMove.y>=0 && monsterMove.y <= 548 && objMap.setDataPixel[monsterMove.x][monsterMove.y+60] === 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y+60] === 0){
             monsterMove.y +=2;
             if(monsterMove.pos >= 1860 || monsterMove.pos < 1440){
                 monsterMove.pos = 1440;
             }else{
                 if(monsterMove.pos >= 1440 && monsterMove.pos < 1860){
                     if(monsterMove.y %10 === 0){
                         monsterMove.pos +=60;
                     }
                 }
             }
         }


         //х-совпадают у-вверх в тупике
         if(Math.floor(heroMove.x/60)*60 === monsterMove.x && monsterMove.y >= 2  && monsterMove.y <= 600 && objMap.setDataPixel[monsterMove.x][monsterMove.y-2] !== 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y-2] !== 0){
             monsterMove.check = 7;
             monsterMove.point = Math.floor(monsterMove.x/60)*60-120;
         }
         //х-совпадают x-право и у-вверх в тупике
         if(Math.floor(heroMove.x/60)*60 === monsterMove.x && monsterMove.y >= 2  && monsterMove.y <= 600 && objMap.setDataPixel[monsterMove.x][monsterMove.y-2] !== 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y-2] !== 0
            && monsterMove.x >= 0 && monsterMove.x <= 1138 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y] !== 0 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y+59] !== 0){
             monsterMove.check = 7.1;
             monsterMove.point = Math.floor(monsterMove.x/60)*60-120;
         }
         //х-совпадают у-низ в тупике
         if(Math.floor(heroMove.x/60)*60 === monsterMove.x && monsterMove.y>=0 && monsterMove.y <= 548 && objMap.setDataPixel[monsterMove.x][monsterMove.y+60] !== 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y+60] !== 0){
             monsterMove.check = 7;
             monsterMove.point = Math.floor(monsterMove.x/60)*60+120;
         }
         //х-совпадают x-право и у-низ в тупике
         if(Math.floor(heroMove.x/60)*60 === monsterMove.x && monsterMove.y>=0 && monsterMove.y <= 548 && objMap.setDataPixel[monsterMove.x][monsterMove.y+60] !== 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y+60] !== 0
             && monsterMove.x >= 0 && monsterMove.x <= 1138 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y] !== 0 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y+59] !== 0){
             monsterMove.check = 7.1;
             monsterMove.point = Math.floor(monsterMove.x/60)*60+120;
         }
         //---------------------------------------------------------
         //у-совпадают х-лево в тупике
         if(Math.floor(heroMove.y/60)*60 === monsterMove.y && monsterMove.x >= 2 && monsterMove.x<=1200 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y] !== 0 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y+59] !== 0){
             monsterMove.check = 9;
             monsterMove.point = Math.floor(monsterMove.y/60)*60-120;
         }
         //у-совпадают х-лево и у-низ в тупике
         if(Math.floor(heroMove.y/60)*60 === monsterMove.y && monsterMove.x >= 2 && monsterMove.x<=1200 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y] !== 0 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y+59] !== 0
         && monsterMove.y>=0 && monsterMove.y <= 548 && objMap.setDataPixel[monsterMove.x][monsterMove.y+60] !== 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y+60] !== 0){
             monsterMove.check = 9.1;
             monsterMove.point = Math.floor(monsterMove.y/60)*60+120;
         }
         //у-совпадают х-право в тупике
         if(Math.floor(heroMove.y/60)*60 === monsterMove.y && monsterMove.x >= 0 && monsterMove.x <= 1138 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y] !== 0 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y+59] !== 0){
             monsterMove.check = 9;
             monsterMove.point = Math.floor(monsterMove.y/60)*60-120;
         }
         //у-совпадают х-право и у-низ в тупике
         if(Math.floor(heroMove.y/60)*60 === monsterMove.y && monsterMove.x >= 0 && monsterMove.x <= 1138 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y] !== 0 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y+59] !== 0
            && monsterMove.y>=0 && monsterMove.y <= 548 && objMap.setDataPixel[monsterMove.x][monsterMove.y+60] !== 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y+60] !== 0){
             monsterMove.check = 9.1;
             monsterMove.point = Math.floor(monsterMove.y/60)*60+120;
         }
         }

          if(monsterMove.check === 2){
          //вверх
         if(Math.floor(heroMove.y/60)*60 < monsterMove.y && monsterMove.y >= 2  && monsterMove.y <= 600 && objMap.setDataPixel[monsterMove.x][monsterMove.y-2] === 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y-2] === 0){
             monsterMove.y -=2;
             if(monsterMove.pos >= 900 || monsterMove.pos < 480){
                 monsterMove.pos = 480;
             }else{
                 if(monsterMove.pos >= 480 && monsterMove.pos < 900){
                     if(monsterMove.y %10 === 0){
                         monsterMove.pos +=60;
                     }
                 }
             }
         }
         //вниз
         if(Math.floor(heroMove.y/60)*60 > monsterMove.y && monsterMove.y>=0 && monsterMove.y <= 548 && objMap.setDataPixel[monsterMove.x][monsterMove.y+60] === 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y+60] === 0){
             monsterMove.y +=2;
             if(monsterMove.pos >= 1860 || monsterMove.pos < 1440){
                 monsterMove.pos = 1440;
             }else{
                 if(monsterMove.pos >= 1440 && monsterMove.pos < 1860){
                     if(monsterMove.y %10 === 0){
                         monsterMove.pos +=60;
                     }
                 }
             }
         }
            //вправо
         if(Math.floor(heroMove.x/60)*60 > monsterMove.x && monsterMove.x >= 0 && monsterMove.x <= 1138 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y] === 0 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y+59] === 0){
             monsterMove.x +=2;
             if(monsterMove.pos >= 1380 || monsterMove.pos < 960){
                 monsterMove.pos = 960;
             }else{
                 if(monsterMove.pos >= 960 && monsterMove.pos < 1380){
                     if(monsterMove.x %10 === 0){
                         monsterMove.pos +=60;
                     }
                 }
             }
         }
         // влево
         if(Math.floor(heroMove.x/60)*60 < monsterMove.x && monsterMove.x >= 2 && monsterMove.x<=1200 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y] === 0 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y+59] === 0){
             monsterMove.x -=2;
             if(monsterMove.pos >= 420){
                 monsterMove.pos = 0;
             }else{
                 if(monsterMove.pos >= 0 && monsterMove.pos < 420){
                     if(monsterMove.x %10 === 0){
                         monsterMove.pos +=60;
                     }
                 }
             }
         }




         //х-совпадают у-вверх в тупике
         if(Math.floor(heroMove.x/60)*60 === monsterMove.x && monsterMove.y >= 2  && monsterMove.y <= 600 && objMap.setDataPixel[monsterMove.x][monsterMove.y-2] !== 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y-2] !== 0){
             monsterMove.check = 7;
             monsterMove.point = Math.floor(monsterMove.x/60)*60-120;
         }
         //х-совпадают x-право и у-вверх в тупике
         if(Math.floor(heroMove.x/60)*60 === monsterMove.x && monsterMove.y >= 2  && monsterMove.y <= 600 && objMap.setDataPixel[monsterMove.x][monsterMove.y-2] !== 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y-2] !== 0
            && monsterMove.x >= 0 && monsterMove.x <= 1138 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y] !== 0 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y+59] !== 0){
             monsterMove.check = 7.1;
             monsterMove.point = Math.floor(monsterMove.x/60)*60-120;
         }
         //х-совпадают у-низ в тупике
         if(Math.floor(heroMove.x/60)*60 === monsterMove.x && monsterMove.y>=0 && monsterMove.y <= 548 && objMap.setDataPixel[monsterMove.x][monsterMove.y+60] !== 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y+60] !== 0){
             monsterMove.check = 7;
             monsterMove.point = Math.floor(monsterMove.x/60)*60+120;
         }
         //х-совпадают x-право и у-низ в тупике
         if(Math.floor(heroMove.x/60)*60 === monsterMove.x && monsterMove.y>=0 && monsterMove.y <= 548 && objMap.setDataPixel[monsterMove.x][monsterMove.y+60] !== 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y+60] !== 0
             && monsterMove.x >= 0 && monsterMove.x <= 1138 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y] !== 0 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y+59] !== 0){
             monsterMove.check = 7.1;
             monsterMove.point = Math.floor(monsterMove.x/60)*60+120;
         }
         //---------------------------------------------------------
         //у-совпадают х-лево в тупике
         if(Math.floor(heroMove.y/60)*60 === monsterMove.y && monsterMove.x >= 2 && monsterMove.x<=1200 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y] !== 0 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y+59] !== 0){
             monsterMove.check = 9;
             monsterMove.point = Math.floor(monsterMove.y/60)*60-120;
         }
         //у-совпадают х-лево и у-низ в тупике
         if(Math.floor(heroMove.y/60)*60 === monsterMove.y && monsterMove.x >= 2 && monsterMove.x<=1200 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y] !== 0 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y+59] !== 0
         && monsterMove.y>=0 && monsterMove.y <= 548 && objMap.setDataPixel[monsterMove.x][monsterMove.y+60] !== 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y+60] !== 0){
             monsterMove.check = 9.1;
             monsterMove.point = Math.floor(monsterMove.y/60)*60+120;
         }
         //у-совпадают х-право в тупике
         if(Math.floor(heroMove.y/60)*60 === monsterMove.y && monsterMove.x >= 0 && monsterMove.x <= 1138 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y] !== 0 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y+59] !== 0){
             monsterMove.check = 9;
             monsterMove.point = Math.floor(monsterMove.y/60)*60-120;
         }
         //у-совпадают х-право и у-низ в тупике
         if(Math.floor(heroMove.y/60)*60 === monsterMove.y && monsterMove.x >= 0 && monsterMove.x <= 1138 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y] !== 0 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y+59] !== 0
            && monsterMove.y>=0 && monsterMove.y <= 548 && objMap.setDataPixel[monsterMove.x][monsterMove.y+60] !== 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y+60] !== 0){
             monsterMove.check = 9.1;
             monsterMove.point = Math.floor(monsterMove.y/60)*60+120;
         }
         }

         if(monsterMove.check === 7.1){
             if(monsterMove.point !== monsterMove.x){
                 if(monsterMove.x >= 2 && monsterMove.x<=1200 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y] === 0 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y+59] === 0){
                    if(monsterMove.x >= 2 && monsterMove.x<=1200 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y] === 0 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y+59] === 0){
                        monsterMove.x -=2;
                        if(monsterMove.pos >= 420){
                            monsterMove.pos = 0;
                        }else{
                            if(monsterMove.pos >= 0 && monsterMove.pos < 420){
                                if(monsterMove.x %10 === 0){
                                    monsterMove.pos +=60;
                                }
                            }
                        }
                    }

                 }else{
                    monsterMove.check = 2;
                 }
                 }else{
                    monsterMove.check = 2;
                 }
         }
         if(monsterMove.check === 7){
             if(monsterMove.point !== monsterMove.x){
                 if(monsterMove.x >= 0 && monsterMove.x <= 1138 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y] === 0 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y+59] === 0){
                    if(monsterMove.x >= 0 && monsterMove.x <= 1138 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y] === 0 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y+59] === 0){
                        monsterMove.x +=2;
                        if(monsterMove.pos >= 1380 || monsterMove.pos < 960){
                            monsterMove.pos = 960;
                        }else{
                            if(monsterMove.pos >= 960 && monsterMove.pos < 1380){
                                if(monsterMove.x %10 === 0){
                                    monsterMove.pos +=60;
                                }
                            }
                        }
                    }

             }else{
                 monsterMove.check = 2;
             }
             }else{
                 monsterMove.check = 2;
             }
         }

         if(monsterMove.check === 9.1){
             if(monsterMove.point !== monsterMove.y){
                 if(monsterMove.y >= 2  && monsterMove.y <= 600 && objMap.setDataPixel[monsterMove.x][monsterMove.y-2] === 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y-2] === 0){

                    if(monsterMove.y >= 2  && monsterMove.y <= 600 && objMap.setDataPixel[monsterMove.x][monsterMove.y-2] === 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y-2] === 0){
                        monsterMove.y -=2;
                        if(monsterMove.pos >= 900 || monsterMove.pos < 480){
                            monsterMove.pos = 480;
                        }else{
                            if(monsterMove.pos >= 480 && monsterMove.pos < 900){
                                if(monsterMove.y %10 === 0){
                                    monsterMove.pos +=60;
                                }
                            }
                        }
                    }
                 }else{
                    monsterMove.check = 1;
                 }
             }else{
                 monsterMove.check = 1;
             }
         }
         if(monsterMove.check === 9){
             if(monsterMove.point !== monsterMove.y){
                 if(monsterMove.y>=0 && monsterMove.y <= 548 && objMap.setDataPixel[monsterMove.x][monsterMove.y+60] === 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y+60] === 0){

                    if(monsterMove.y>=0 && monsterMove.y <= 548 && objMap.setDataPixel[monsterMove.x][monsterMove.y+60] === 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y+60] === 0){
                        monsterMove.y +=2;
                        if(monsterMove.pos >= 1860 || monsterMove.pos < 1440){
                            monsterMove.pos = 1440;
                        }else{
                            if(monsterMove.pos >= 1440 && monsterMove.pos < 1860){
                                if(monsterMove.y %10 === 0){
                                    monsterMove.pos +=60;
                                }
                            }
                        }
                    }
             }else{
                 monsterMove.check = 1;
             }
             }else{
                 monsterMove.check = 1;
             }
         }


    }

    function move2(monsterMove){

        unitsStage1();

         if(monsterMove.x >= heroMove.x-40 && monsterMove.x <= heroMove.x+40 && monsterMove.y >= heroMove.y-40 && monsterMove.y <= heroMove.y+40 && heroMove.invulnerable === false){
             if(heroMove.life > 0){
                heroMove.life -= 1;
                heroMove.x = 600;
                heroMove.y = 300;
                heroMove.endX = 600;
                heroMove.endY = 300;
                heroMove.invulnerable = true;
                setTimeout(function(){
                    heroMove.invulnerable = false;
                }, 5000);
             }else{
                heroMove.notDead = false; 
             }
         }

         if(monsterMove.check === 1){
         //вправо
         if(Math.floor(heroMove.x/60)*60 > monsterMove.x && monsterMove.x >= 0 && monsterMove.x <= 1138 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y] === 0 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y+59] === 0){
             monsterMove.x +=2;
             if(monsterMove.pos >= 1380 || monsterMove.pos < 960){
                 monsterMove.pos = 960;
             }else{
                 if(monsterMove.pos >= 960 && monsterMove.pos < 1380){
                     if(monsterMove.x %10 === 0){
                     monsterMove.pos +=60;
                     }
                 }
             }
         }
         // влево
         if(Math.floor(heroMove.x/60)*60 < monsterMove.x && monsterMove.x >= 2 && monsterMove.x<=1200 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y] === 0 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y+59] === 0){
             monsterMove.x -=2;
             if(monsterMove.pos >= 420){
                 monsterMove.pos = 0;
             }else{
                 if(monsterMove.pos >= 0 && monsterMove.pos < 420){
                     if(monsterMove.x %10 === 0){
                     monsterMove.pos +=60;
                     }
                 }
             }
         }
         //вверх
         if(Math.floor(heroMove.y/60)*60 < monsterMove.y && monsterMove.y >= 2  && monsterMove.y <= 600 && objMap.setDataPixel[monsterMove.x][monsterMove.y-2] === 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y-2] === 0){
             monsterMove.y -=2;
             if(monsterMove.pos >= 900 || monsterMove.pos < 480){
                 monsterMove.pos = 480;
             }else{
                 if(monsterMove.pos >= 480 && monsterMove.pos < 900){
                     if(monsterMove.y %10 === 0){
                     monsterMove.pos +=60;
                     }
                 }
             }
         }
         //вниз
         if(Math.floor(heroMove.y/60)*60 > monsterMove.y && monsterMove.y>=0 && monsterMove.y <= 548 && objMap.setDataPixel[monsterMove.x][monsterMove.y+60] === 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y+60] === 0){
             monsterMove.y +=2;
             if(monsterMove.pos >= 1860 || monsterMove.pos < 1440){
                 monsterMove.pos = 1440;
             }else{
                 if(monsterMove.pos >= 1440 && monsterMove.pos < 1860){
                     if(monsterMove.y %10 === 0){
                     monsterMove.pos +=60;
                     }
                 }
             }
         }


         //х-совпадают у-вверх в тупике
         if(Math.floor(heroMove.x/60)*60 === monsterMove.x && monsterMove.y >= 2  && monsterMove.y <= 600 && objMap.setDataPixel[monsterMove.x][monsterMove.y-2] !== 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y-2] !== 0){
             monsterMove.check = 7;
             monsterMove.point = Math.floor(monsterMove.x/60)*60-120;
         }
         //х-совпадают x-лево и у-вверх в тупике
         if(Math.floor(heroMove.x/60)*60 === monsterMove.x && monsterMove.y >= 2  && monsterMove.y <= 600 && objMap.setDataPixel[monsterMove.x][monsterMove.y-2] !== 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y-2] !== 0
            && monsterMove.x >= 2 && monsterMove.x<=1200 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y] !== 0 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y+59] !== 0){
             monsterMove.check = 7.1;
             monsterMove.point = Math.floor(monsterMove.x/60)*60-120;
         }
         //х-совпадают у-низ в тупике
         if(Math.floor(heroMove.x/60)*60 === monsterMove.x && monsterMove.y>=0 && monsterMove.y <= 548 && objMap.setDataPixel[monsterMove.x][monsterMove.y+60] !== 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y+60] !== 0){
             monsterMove.check = 7;
             monsterMove.point = Math.floor(monsterMove.x/60)*60+120;
         }
         //х-совпадают x-лево и у-низ в тупике
         if(Math.floor(heroMove.x/60)*60 === monsterMove.x && monsterMove.y>=0 && monsterMove.y <= 548 && objMap.setDataPixel[monsterMove.x][monsterMove.y+60] !== 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y+60] !== 0
             && monsterMove.x >= 2 && monsterMove.x<=1200 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y] !== 0 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y+59] !== 0){
             monsterMove.check = 7.1;
             monsterMove.point = Math.floor(monsterMove.x/60)*60+120;
         }
         //---------------------------------------------------------
         //у-совпадают х-лево в тупике
         if(Math.floor(heroMove.y/60)*60 === monsterMove.y && monsterMove.x >= 2 && monsterMove.x<=1200 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y] !== 0 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y+59] !== 0){
             monsterMove.check = 9;
             monsterMove.point = Math.floor(monsterMove.y/60)*60-120;
         }
         //у-совпадают х-лево и у-вверх в тупике
         if(Math.floor(heroMove.y/60)*60 === monsterMove.y && monsterMove.x >= 2 && monsterMove.x<=1200 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y] !== 0 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y+59] !== 0
         && monsterMove.y >= 2  && monsterMove.y <= 600 && objMap.setDataPixel[monsterMove.x][monsterMove.y-2] !== 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y-2] !== 0){
             monsterMove.check = 9.1;
             monsterMove.point = Math.floor(monsterMove.y/60)*60+120;
         }
         //у-совпадают х-право в тупике
         if(Math.floor(heroMove.y/60)*60 === monsterMove.y && monsterMove.x >= 0 && monsterMove.x <= 1138 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y] !== 0 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y+59] !== 0){
             monsterMove.check = 9;
             monsterMove.point = Math.floor(monsterMove.y/60)*60-120;
         }
         //у-совпадают х-право и у-вверх в тупике
         if(Math.floor(heroMove.y/60)*60 === monsterMove.y && monsterMove.x >= 0 && monsterMove.x <= 1138 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y] !== 0 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y+59] !== 0
            && monsterMove.y >= 2  && monsterMove.y <= 600 && objMap.setDataPixel[monsterMove.x][monsterMove.y-2] !== 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y-2] !== 0){
             monsterMove.check = 9.1;
             monsterMove.point = Math.floor(monsterMove.y/60)*60+120;
         }
         }

          if(monsterMove.check === 2){
         //вверх
         if(Math.floor(heroMove.y/60)*60 < monsterMove.y && monsterMove.y >= 2  && monsterMove.y <= 600 && objMap.setDataPixel[monsterMove.x][monsterMove.y-2] === 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y-2] === 0){
             monsterMove.y -=2;
             if(monsterMove.pos >= 900 || monsterMove.pos < 480){
                 monsterMove.pos = 480;
             }else{
                 if(monsterMove.pos >= 480 && monsterMove.pos < 900){
                     if(monsterMove.y %10 === 0){
                     monsterMove.pos +=60;
                     }
                 }
             }
         }
         //вниз
         if(Math.floor(heroMove.y/60)*60 > monsterMove.y && monsterMove.y>=0 && monsterMove.y <= 548 && objMap.setDataPixel[monsterMove.x][monsterMove.y+60] === 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y+60] === 0){
             monsterMove.y +=2;
             if(monsterMove.pos >= 1860 || monsterMove.pos < 1440){
                 monsterMove.pos = 1440;
             }else{
                 if(monsterMove.pos >= 1440 && monsterMove.pos < 1860){
                     if(monsterMove.y %10 === 0){
                     monsterMove.pos +=60;
                     }
                 }
             }
         }
            //вправо
         if(Math.floor(heroMove.x/60)*60 > monsterMove.x && monsterMove.x >= 0 && monsterMove.x <= 1138 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y] === 0 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y+59] === 0){
             monsterMove.x +=2;
             if(monsterMove.pos >= 1380 || monsterMove.pos < 960){
                 monsterMove.pos = 960;
             }else{
                 if(monsterMove.pos >= 960 && monsterMove.pos < 1380){
                     if(monsterMove.x %10 === 0){
                     monsterMove.pos +=60;
                     }
                 }
             }
         }
         // влево
         if(Math.floor(heroMove.x/60)*60 < monsterMove.x && monsterMove.x >= 2 && monsterMove.x<=1200 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y] === 0 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y+59] === 0){
             monsterMove.x -=2;
             if(monsterMove.pos >= 420){
                 monsterMove.pos = 0;
             }else{
                 if(monsterMove.pos >= 0 && monsterMove.pos < 420){
                     if(monsterMove.x %10 === 0){
                     monsterMove.pos +=60;
                     }
                 }
             }
         }




         //х-совпадают у-вверх в тупике
         if(Math.floor(heroMove.x/60)*60 === monsterMove.x && monsterMove.y >= 2  && monsterMove.y <= 600 && objMap.setDataPixel[monsterMove.x][monsterMove.y-2] !== 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y-2] !== 0){
             monsterMove.check = 7;
             monsterMove.point = Math.floor(monsterMove.x/60)*60-180;
         }
         //х-совпадают x-лево и у-вверх в тупике
         if(Math.floor(heroMove.x/60)*60 === monsterMove.x && monsterMove.y >= 2  && monsterMove.y <= 600 && objMap.setDataPixel[monsterMove.x][monsterMove.y-2] !== 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y-2] !== 0
            && monsterMove.x >= 2 && monsterMove.x<=1200 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y] !== 0 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y+59] !== 0){
             monsterMove.check = 7.1;
             monsterMove.point = Math.floor(monsterMove.x/60)*60+180;
         }
         //х-совпадают у-низ в тупике
         if(Math.floor(heroMove.x/60)*60 === monsterMove.x && monsterMove.y>=0 && monsterMove.y <= 548 && objMap.setDataPixel[monsterMove.x][monsterMove.y+60] !== 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y+60] !== 0){
             monsterMove.check = 7;
             monsterMove.point = Math.floor(monsterMove.x/60)*60-180;
         }
         //х-совпадают x-лево и у-низ в тупике
         if(Math.floor(heroMove.x/60)*60 === monsterMove.x && monsterMove.y>=0 && monsterMove.y <= 548 && objMap.setDataPixel[monsterMove.x][monsterMove.y+60] !== 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y+60] !== 0
             && monsterMove.x >= 2 && monsterMove.x<=1200 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y] !== 0 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y+59] !== 0){
             monsterMove.check = 7.1;
             monsterMove.point = Math.floor(monsterMove.x/60)*60+180;
         }
         //---------------------------------------------------------
         //у-совпадают х-лево в тупике
         if(Math.floor(heroMove.y/60)*60 === monsterMove.y && monsterMove.x >= 2 && monsterMove.x<=1200 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y] !== 0 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y+59] !== 0){
             monsterMove.check = 9;
             monsterMove.point = Math.floor(monsterMove.y/60)*60-180;
         }
         //у-совпадают х-лево и у-вверх в тупике
         if(Math.floor(heroMove.y/60)*60 === monsterMove.y && monsterMove.x >= 2 && monsterMove.x<=1200 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y] !== 0 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y+59] !== 0
         && monsterMove.y >= 2  && monsterMove.y <= 600 && objMap.setDataPixel[monsterMove.x][monsterMove.y-2] !== 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y-2] !== 0){
             monsterMove.check = 9.1;
             monsterMove.point = Math.floor(monsterMove.y/60)*60+180;
         }
         //у-совпадают х-право в тупике
         if(Math.floor(heroMove.y/60)*60 === monsterMove.y && monsterMove.x >= 0 && monsterMove.x <= 1138 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y] !== 0 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y+59] !== 0){
             monsterMove.check = 9;
             monsterMove.point = Math.floor(monsterMove.y/60)*60-180;
         }
         //у-совпадают х-право и у-вверх в тупике
         if(Math.floor(heroMove.y/60)*60 === monsterMove.y && monsterMove.x >= 0 && monsterMove.x <= 1138 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y] !== 0 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y+59] !== 0
            && monsterMove.y >= 2  && monsterMove.y <= 600 && objMap.setDataPixel[monsterMove.x][monsterMove.y-2] !== 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y-2] !== 0){
             monsterMove.check = 9.1;
             monsterMove.point = Math.floor(monsterMove.y/60)*60+180;
         }
         }

         if(monsterMove.check === 7){
             if(monsterMove.point !== monsterMove.x){
                 if(monsterMove.x >= 2 && monsterMove.x<=1200 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y] === 0 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y+59] === 0){
                    if(monsterMove.x >= 2 && monsterMove.x<=1200 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y] === 0 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y+59] === 0){
                        monsterMove.x -=2;
                        if(monsterMove.pos >= 420){
                            monsterMove.pos = 0;
                        }else{
                            if(monsterMove.pos >= 0 && monsterMove.pos < 420){
                                if(monsterMove.x %10 === 0){
                                    monsterMove.pos +=60;
                                }
                            }
                        }
                    }

                 }else{
                    monsterMove.check = 2;
                 }
                 }else{
                    monsterMove.check = 2;
                 }
         }
         if(monsterMove.check === 7.1){
             if(monsterMove.point !== monsterMove.x){
                 if(monsterMove.x >= 0 && monsterMove.x <= 1138 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y] === 0 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y+59] === 0){
                    if(monsterMove.x >= 0 && monsterMove.x <= 1138 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y] === 0 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y+59] === 0){
                        monsterMove.x +=2;
                        if(monsterMove.pos >= 1380 || monsterMove.pos < 960){
                            monsterMove.pos = 960;
                        }else{
                            if(monsterMove.pos >= 960 && monsterMove.pos < 1380){
                                if(monsterMove.x %10 === 0){
                                    monsterMove.pos +=60;
                                }
                            }
                        }
                    }

             }else{
                 monsterMove.check = 2;
             }
             }else{
                 monsterMove.check = 2;
             }
         }

         if(monsterMove.check === 9){
             if(monsterMove.point !== monsterMove.y){
                 if(monsterMove.y >= 2  && monsterMove.y <= 600 && objMap.setDataPixel[monsterMove.x][monsterMove.y-2] === 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y-2] === 0){

                    if(monsterMove.y >= 2  && monsterMove.y <= 600 && objMap.setDataPixel[monsterMove.x][monsterMove.y-2] === 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y-2] === 0){
                        monsterMove.y -=2;
                        if(monsterMove.pos >= 900 || monsterMove.pos < 480){
                            monsterMove.pos = 480;
                        }else{
                            if(monsterMove.pos >= 480 && monsterMove.pos < 900){
                                if(monsterMove.y %10 === 0){
                                    monsterMove.pos +=60;
                                }
                            }
                        }
                    }
                 }else{
                    monsterMove.check = 1;
                 }
             }else{
                 monsterMove.check = 1;
             }
         }
         if(monsterMove.check === 9.1){
             if(monsterMove.point !== monsterMove.y){
                 if(monsterMove.y>=0 && monsterMove.y <= 548 && objMap.setDataPixel[monsterMove.x][monsterMove.y+60] === 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y+60] === 0){

                    if(monsterMove.y>=0 && monsterMove.y <= 548 && objMap.setDataPixel[monsterMove.x][monsterMove.y+60] === 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y+60] === 0){
                        monsterMove.y +=2;
                        if(monsterMove.pos >= 1860 || monsterMove.pos < 1440){
                            monsterMove.pos = 1440;
                        }else{
                            if(monsterMove.pos >= 1440 && monsterMove.pos < 1860){
                                if(monsterMove.y %10 === 0){
                                    monsterMove.pos +=60;
                                }
                            }
                        }
                    }
             }else{
                 monsterMove.check = 1;
             }
             }else{
                 monsterMove.check = 1;
             }
         }


    }

    function move3(monsterMove){

         unitsStage1();

         if(monsterMove.x >= heroMove.x-40 && monsterMove.x <= heroMove.x+40 && monsterMove.y >= heroMove.y-40 && monsterMove.y <= heroMove.y+40 && heroMove.invulnerable === false){
             if(heroMove.life > 0){
                heroMove.life -= 1;
                heroMove.x = 600;
                heroMove.y = 300;
                heroMove.endX = 600;
                heroMove.endY = 300;
                heroMove.invulnerable = true;
                setTimeout(function(){
                    heroMove.invulnerable = false;
                }, 5000);
             }else{
                heroMove.notDead = false; 
             }
         }

         if(Math.floor(heroMove.x/60)*60 > monsterMove.x && monsterMove.x >= 0 && monsterMove.x <= 1138 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y] === 0 && objMap.setDataPixel[monsterMove.x+60][monsterMove.y+59] === 0){
             monsterMove.x +=2;
             if(monsterMove.pos >= 1380 || monsterMove.pos < 960){
                 monsterMove.pos = 960;
             }else{
                 if(monsterMove.pos >= 960 && monsterMove.pos < 1380){
                     if(monsterMove.x %10 === 0){
                     monsterMove.pos +=60;
                     }
                 }
             }
         }
         // влево
         if(Math.floor(heroMove.x/60)*60 < monsterMove.x && monsterMove.x >= 2 && monsterMove.x<=1200 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y] === 0 && objMap.setDataPixel[monsterMove.x-2][monsterMove.y+59] === 0){
             monsterMove.x -=2;
             if(monsterMove.pos >= 420){
                 monsterMove.pos = 0;
             }else{
                 if(monsterMove.pos >= 0 && monsterMove.pos < 420){
                     if(monsterMove.x %10 === 0){
                     monsterMove.pos +=60;
                     }
                 }
             }
         }
         //вверх
         if(Math.floor(heroMove.y/60)*60 < monsterMove.y && monsterMove.y >= 2  && monsterMove.y <= 600 && objMap.setDataPixel[monsterMove.x][monsterMove.y-2] === 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y-2] === 0){
             monsterMove.y -=2;
             if(monsterMove.pos >= 900 || monsterMove.pos < 480){
                 monsterMove.pos = 480;
             }else{
                 if(monsterMove.pos >= 480 && monsterMove.pos < 900){
                     if(monsterMove.y %10 === 0){
                     monsterMove.pos +=60;
                     }
                 }
             }
         }
         //вниз
         if(Math.floor(heroMove.y/60)*60 > monsterMove.y && monsterMove.y>=0 && monsterMove.y <= 548 && objMap.setDataPixel[monsterMove.x][monsterMove.y+60] === 0 && objMap.setDataPixel[monsterMove.x+59][monsterMove.y+60] === 0){
             monsterMove.y +=2;
             if(monsterMove.pos >= 1860 || monsterMove.pos < 1440){
                 monsterMove.pos = 1440;
             }else{
                 if(monsterMove.pos >= 1440 && monsterMove.pos < 1860){
                     if(monsterMove.y %10 === 0){
                     monsterMove.pos +=60;
                     }
                 }
             }
         }



    }
    //--------------------------------
    
    
    // Массив даных, для построения карты 1 уровня
    function stage1Map(){       
         // стенки
         objMap.setDat[0][3] = objCanvasImg.img[1];
         objMap.setDat[1][1] = objCanvasImg.img[1];
         objMap.setDat[1][3] = objCanvasImg.img[1];
         objMap.setDat[1][5] = objCanvasImg.img[1];
         objMap.setDat[1][6] = objCanvasImg.img[1];
         objMap.setDat[1][8] = objCanvasImg.img[1];
         objMap.setDat[2][1] = objCanvasImg.img[1];
         objMap.setDat[2][5] = objCanvasImg.img[1];
         objMap.setDat[2][6] = objCanvasImg.img[1];
         objMap.setDat[3][3] = objCanvasImg.img[1];
         objMap.setDat[3][8] = objCanvasImg.img[1];
         objMap.setDat[4][1] = objCanvasImg.img[1];
         objMap.setDat[4][3] = objCanvasImg.img[1];
         objMap.setDat[4][5] = objCanvasImg.img[1];
         objMap.setDat[4][6] = objCanvasImg.img[1];
         objMap.setDat[5][5] = objCanvasImg.img[1];
         objMap.setDat[5][6] = objCanvasImg.img[1];
         objMap.setDat[5][8] = objCanvasImg.img[1];
         objMap.setDat[5][9] = objCanvasImg.img[1];
         objMap.setDat[6][0] = objCanvasImg.img[1];
         objMap.setDat[6][2] = objCanvasImg.img[1];
         objMap.setDat[6][3] = objCanvasImg.img[1];
         objMap.setDat[7][5] = objCanvasImg.img[1];
         objMap.setDat[7][7] = objCanvasImg.img[1];
         objMap.setDat[7][9] = objCanvasImg.img[1];
         objMap.setDat[8][1] = objCanvasImg.img[1];
         objMap.setDat[8][3] = objCanvasImg.img[1];
         objMap.setDat[8][9] = objCanvasImg.img[1];
         objMap.setDat[9][1] = objCanvasImg.img[1];
         objMap.setDat[9][3] = objCanvasImg.img[1];
         objMap.setDat[9][5] = objCanvasImg.img[1];
         objMap.setDat[9][7] = objCanvasImg.img[1];
         objMap.setDat[9][9] = objCanvasImg.img[1];
         objMap.setDat[11][1] = objCanvasImg.img[1];
         objMap.setDat[11][2] = objCanvasImg.img[1];
         objMap.setDat[11][4] = objCanvasImg.img[1];
         objMap.setDat[11][5] = objCanvasImg.img[1];
         objMap.setDat[11][7] = objCanvasImg.img[1];
         objMap.setDat[11][8] = objCanvasImg.img[1];
         objMap.setDat[13][1] = objCanvasImg.img[1];
         objMap.setDat[13][3] = objCanvasImg.img[1];
         objMap.setDat[13][5] = objCanvasImg.img[1];
         objMap.setDat[13][6] = objCanvasImg.img[1];
         objMap.setDat[13][8] = objCanvasImg.img[1];
         objMap.setDat[13][9] = objCanvasImg.img[1];
         objMap.setDat[14][3] = objCanvasImg.img[1];
         objMap.setDat[14][5] = objCanvasImg.img[1];
         objMap.setDat[14][6] = objCanvasImg.img[1];
         objMap.setDat[14][8] = objCanvasImg.img[1];
         objMap.setDat[14][9] = objCanvasImg.img[1];
         objMap.setDat[15][0] = objCanvasImg.img[1];
         objMap.setDat[15][1] = objCanvasImg.img[1];
         objMap.setDat[16][3] = objCanvasImg.img[1];
         objMap.setDat[16][4] = objCanvasImg.img[1];
         objMap.setDat[16][6] = objCanvasImg.img[1];
         objMap.setDat[16][8] = objCanvasImg.img[1];
         objMap.setDat[17][1] = objCanvasImg.img[1];
         objMap.setDat[17][3] = objCanvasImg.img[1];
         objMap.setDat[17][4] = objCanvasImg.img[1];
         objMap.setDat[17][8] = objCanvasImg.img[1];
         objMap.setDat[18][1] = objCanvasImg.img[1];
         objMap.setDat[18][6] = objCanvasImg.img[1];
         objMap.setDat[19][3] = objCanvasImg.img[1];
         objMap.setDat[19][4] = objCanvasImg.img[1];
         objMap.setDat[19][8] = objCanvasImg.img[1];

     }
     
    // Анимация----------------------
    // отрисовка юнитов 1 уровня
    function unitsStage1(){
         objCanvasImg.canvas.clearRect(0, 0, objCanvasImg.c.width, objCanvasImg.c.height);
         updateAnim();
         objCanvasImg.canvas.drawImage(objCanvasImg.img[0], 0, heroMove.pos, 40, 40, heroMove.x+5, heroMove.y+5, 50, 40);
         drawHearts();
         if(heroMove.invulnerable === true){
             objCanvasImg.canvas.drawImage(objCanvasImg.img[15], 0, 0, 60, 60, heroMove.x, heroMove.y, 60, 60);
         }
    }
    
    // дополнение к анимации юнитов скилов
    function updateAnim(){
         if(scroll.useImg !== null && scroll.item !== 0){
            objCanvasImg.canvas.drawImage(objCanvasImg.img[scroll.useImg], 1220, 200);
         }
         if(monster4.life > 0){
             objCanvasImg.canvas.drawImage(objCanvasImg.img[4], 0, monster4.pos, 60, 60, monster4.x, monster4.y, 60, 60);
         }
         if(monster1.dead === false){
            objCanvasImg.canvas.drawImage(objCanvasImg.img[5], 0, monster1.pos, 60, 60, monster1.x, monster1.y, 60, 60);
         }
         if(monster2.dead === false){
             objCanvasImg.canvas.drawImage(objCanvasImg.img[6], 0, monster2.pos, 60, 60, monster2.x, monster2.y, 60, 60);
         }
         if(monster3.dead === false){
             objCanvasImg.canvas.drawImage(objCanvasImg.img[7], 0, monster3.pos, 60, 60, monster3.x, monster3.y, 60, 60);
         }
         if(scroll.life === true && scroll.img !== null){
            objCanvasImg.canvas.drawImage(objCanvasImg.img[scroll.img], scroll.x, scroll.y);
         }
         if(selfSkill.timer === 0){
             objCanvasImg.canvas.drawImage(objCanvasImg.img[14], 1220, 300);
         }
         if(actSkill.checkDraw === true){
             objCanvasImg.canvas.drawImage(objCanvasImg.img[8], 0, actSkill.blastPos, 60, 60, actSkill.blastX, actSkill.blastY, 60, 60);
         }
         
         if(monster4.dead === true){
             objCanvasImg.canvas.drawImage(objCanvasImg.img[16], 0, 0, 60, 60, portal.x, portal.y, 60, 60);
         }
    }
    //-------------------------------
    
    // атакующая магия---------------
    function blast(){
        if(scroll.item === 10){
            scroll.item = 0;
        }
        if(heroMove.pos >= 0 && heroMove.pos < 280){
            actSkill.blastPos = 0;
            actSkill.blastX = heroMove.x;
            actSkill.blastY = heroMove.y;
            actSkill.blastEndX = heroMove.x-180;
            blastLeft();
        }

        if(heroMove.pos >= 320 && heroMove.pos < 600){
            actSkill.blastPos = 0;
            actSkill.blastX = heroMove.x;
            actSkill.blastY = heroMove.y;
            actSkill.blastEndY = heroMove.y-180;
            blastUp();
        }

        if(heroMove.pos >= 640 && heroMove.pos < 920){
            actSkill.blastPos = 0;
            actSkill.blastY = heroMove.y;
            actSkill.blastX = heroMove.x;
            actSkill.blastEndX = heroMove.x+180;
            blastRight();
        }

        if(heroMove.pos >= 960 && heroMove.pos < 1240){
            actSkill.blastPos = 0;
            actSkill.blastY = heroMove.y;
            actSkill.blastX = heroMove.x;
            actSkill.blastEndY = heroMove.y+180;
            blastDown();
        }
    }

    function blastLeft(){
        unitsStage1();

        if(actSkill.blastX !== actSkill.blastEndX){
            if(actSkill.checkDraw === false){
                actSkill.checkDraw = true;
            }
            updateBL(monster1);
            updateBL(monster2);
            updateBL(monster3);
            
            if(actSkill.blastX > monster4.x && actSkill.blastX < monster4.x+60 && actSkill.blastY >= monster4.y-30 && actSkill.blastY <= monster4.y+80){
                if(monster4.life === 1){
                    monster4.life -= 1;
                    portal.x = 1080;
                    portal.y = 540;
                    monster4.dead = true;
                }else{
                    monster4.life -= 1;
                    monster4.x = 1140;
                    monster4.y = 0;
                }
            }
            actSkill.blastX -= 5;
            if(actSkill.blastPos >= 1260 ){
                actSkill.blastPos = 0;
            }
            if(actSkill.blastX % 10){
                actSkill.blastPos +=60;
            }
        }
        if(actSkill.blastX === actSkill.blastEndX || objMap.setDataPixel[actSkill.blastX-5] === undefined || objMap.setDataPixel[actSkill.blastX-5][actSkill.blastY] !== 0){
            clearTimeout(actSkill.clock);
            actSkill.checkDraw = false;
            return false;
        }
         actSkill.clock = setTimeout(function() {
            blastLeft();
         }, 40);
    }

    function blastRight(){
        unitsStage1();

        if(actSkill.blastX !== actSkill.blastEndX){
            if(actSkill.checkDraw === false){
                actSkill.checkDraw = true;
            }
            updateBR(monster1);
            updateBR(monster2);
            updateBR(monster3);
            if(actSkill.blastX > monster4.x && actSkill.blastX < monster4.x+60 && actSkill.blastY >= monster4.y-30 && actSkill.blastY <= monster4.y+80){
                if(monster4.life === 1){
                    monster4.dead = true;
                    monster4.life -= 1;
                    portal.x = 1080;
                    portal.y = 540;
                }else{
                    monster4.life -= 1;
                    monster4.x = 1140;
                    monster4.y = 0;
                }
            }
            actSkill.blastX += 5;
            if(actSkill.blastPos >= 1260 ){
                actSkill.blastPos = 0;
            }
            if(actSkill.blastX % 10){
                actSkill.blastPos +=60;
            }
        }
        if(actSkill.blastX === actSkill.blastEndX || objMap.setDataPixel[actSkill.blastX+65] === undefined || objMap.setDataPixel[actSkill.blastX+65][actSkill.blastY] !== 0){
            return clearTimeout(actSkill.clock), actSkill.checkDraw = false;
        }
         actSkill.clock = setTimeout(function() {
            blastRight();
         }, 40);
    }

    function blastUp(){
        unitsStage1();

        if(actSkill.blastY !== actSkill.blastEndY){
            if(actSkill.checkDraw === false){
                actSkill.checkDraw = true;
            }
            updateBU(monster1);
            updateBU(monster2);
            updateBU(monster3);

            if(actSkill.blastX > monster4.x-30 && actSkill.blastX < monster4.x+80 && actSkill.blastY > monster4.y && actSkill.blastY < monster4.y+80){
                if(monster4.life === 1){
                    monster4.life -= 1;
                    monster4.dead = true;
                    portal.x = 1080;
                    portal.y = 540;
                }else{
                    monster4.life -= 1;
                    monster4.x = 1140;
                    monster4.y = 0;
                }

            }
            actSkill.blastY -= 5;
            if(actSkill.blastPos >= 1260 ){
                actSkill.blastPos = 0;
            }
            if(actSkill.blastY % 10){
                actSkill.blastPos +=60;
            }
        }
        if(actSkill.blastY === actSkill.blastEndY || objMap.setDataPixel[actSkill.blastX][actSkill.blastY-5] === undefined || objMap.setDataPixel[actSkill.blastX][actSkill.blastY-2] !== 0){
            return clearTimeout(actSkill.clock), actSkill.checkDraw = false;
        }
         actSkill.clock = setTimeout(function() {
            blastUp();
         }, 40);
    }

    function blastDown(){
        unitsStage1();

        if(actSkill.blastY !== actSkill.blastEndY){
            if(actSkill.checkDraw === false){
                actSkill.checkDraw = true;
            }

            updateBD(monster1);
            updateBD(monster2);
            updateBD(monster3);

            if(actSkill.blastX > monster4.x-30 && actSkill.blastX < monster4.x+80 && actSkill.blastY > monster4.y-20 && actSkill.blastY < monster4.y+60){
                if(monster4.life === 1){
                    monster4.life -= 1;
                    monster4.dead = true;
                    portal.x = 1080;
                    portal.y = 540;
                }else{
                    monster4.life -= 1;
                    monster4.x = 1140;
                    monster4.y = 0;
                }
            }
            actSkill.blastY += 5;
            if(actSkill.blastPos >= 1260 ){
                actSkill.blastPos = 0;
            }
            if(actSkill.blastY % 10){
                actSkill.blastPos +=60;
            }
            
            
        }
        if(actSkill.blastY === actSkill.blastEndY || objMap.setDataPixel[actSkill.blastX][actSkill.blastY+65] === undefined || objMap.setDataPixel[actSkill.blastX][actSkill.blastY+65] !== 0){
            return clearTimeout(actSkill.clock), actSkill.checkDraw = false;
        }
         actSkill.clock = setTimeout(function() {
            blastDown();
         }, 40);
    }
    
    // дополнение для BL - blastLeft и так далее
    function updateBL(monster){
        if(actSkill.blastX > monster.x && actSkill.blastX < monster.x+60 && actSkill.blastY >= monster.y-30 && actSkill.blastY <= monster.y+80){
                monster.dead = true;
                monster.x = 1300;
                monster.y = 700;
                resurrect(monster);
            }
    }

    function updateBR(monster){
        if(actSkill.blastX > monster.x && actSkill.blastX < monster.x+60 && actSkill.blastY >= monster.y-30 && actSkill.blastY <= monster.y+80){
                monster.dead = true;
                monster.x = 1300;
                monster.y = 700;
                resurrect(monster);
    }

    function updateAnim(){
        if(actSkill.checkDraw === true){
        objCanvasImg.canvas.drawImage(objCanvasImg.img[8], 0, actSkill.blastPos, 50, 50, actSkill.blastX, actSkill.blastY, 60, 60);
        }
    }
    }

    function updateBU(monster){
        if(actSkill.blastX > monster.x-30 && actSkill.blastX < monster.x+80 && actSkill.blastY > monster.y && actSkill.blastY < monster.y+60){
                monster.dead = true;
                monster.x = 1300;
                monster.y = 700;
                resurrect(monster);
            }
    }

    function updateBD(monster){
        if(actSkill.blastX > monster.x-30 && actSkill.blastX < monster.x+80 && actSkill.blastY > monster.y && actSkill.blastY < monster.y+60){
                monster.dead = true;
                monster.x = 1300;
                monster.y = 700;
                resurrect(monster);
            }
    }
    //-------------------------------
    
    // магия телепорт----------------
    function teleport(){
        var arr = objMap.setDataPixel;
        if(scroll.item === 12){
            scroll.item = 0;
        }
        if(heroMove.pos >= 0 && heroMove.pos < 280){
            if(arr[heroMove.x-300] !== undefined && arr[heroMove.x-300][heroMove.y] === 0){
                heroMove.x -=300;
            }else if(arr[heroMove.x-240] !== undefined && arr[heroMove.x-240][heroMove.y] === 0){
                heroMove.x -=240;
            }else if(arr[heroMove.x-180] !== undefined && arr[heroMove.x-180][heroMove.y] === 0){
                heroMove.x -=180;
            }else if(arr[heroMove.x-120] !== undefined && arr[heroMove.x-120][heroMove.y] === 0){
                heroMove.x -=120;
            }
        }

        if(heroMove.pos >= 320 && heroMove.pos < 600){
            if(arr[heroMove.x][heroMove.y-300] !== undefined && arr[heroMove.x][heroMove.y-300] === 0){
                heroMove.y -=300;
            }else if(arr[heroMove.x][heroMove.y-240] !== undefined && arr[heroMove.x][heroMove.y-240] === 0){
                heroMove.y -=240;
            }else if(arr[heroMove.x][heroMove.y-180] !== undefined && arr[heroMove.x][heroMove.y-180] === 0){
                heroMove.y -=180;
            }else if(arr[heroMove.x][heroMove.y-120] !== undefined && arr[heroMove.x][heroMove.y-120] === 0){
                heroMove.y -=120;
            }
        }

        if(heroMove.pos >= 640 && heroMove.pos < 920){
            if(arr[heroMove.x+300] !== undefined && arr[heroMove.x+300][heroMove.y] === 0){
                heroMove.x +=300;
            }else if(arr[heroMove.x+240] !== undefined && arr[heroMove.x+240][heroMove.y] === 0){
                heroMove.x +=240;
            }else if(arr[heroMove.x+180] !== undefined && arr[heroMove.x+180][heroMove.y] === 0){
                heroMove.x +=180;
            }else if(arr[heroMove.x+120] !== undefined && arr[heroMove.x+120][heroMove.y] === 0){
                heroMove.x +=120;
            }
        }

        if(heroMove.pos >= 960 && heroMove.pos < 1240){
            if(arr[heroMove.x][heroMove.y+300] !== undefined && arr[heroMove.x][heroMove.y+300] === 0){
                heroMove.y +=300;
            }else if(arr[heroMove.x][heroMove.y+240] !== undefined && arr[heroMove.x][heroMove.y+240] === 0){
                heroMove.y +=240;
            }else if(arr[heroMove.x][heroMove.y+180] !== undefined && arr[heroMove.x][heroMove.y+180] === 0){
                heroMove.y +=180;
            }else if(arr[heroMove.x][heroMove.y+120] !== undefined && arr[heroMove.x][heroMove.y+120] === 0){
                heroMove.y +=120;
            }
        }
    }
    //-------------------------------
    
    // магия +1 жизнь----------------
    function heal(){
        if(scroll.item === 11){
            scroll.item = 0;
        }
        if(heroMove.life < 2){
            heroMove.life += 1;
        }
        if(monster4.life > 0 && monster4.life < 6){
            monster4.life += 1;
        }
    }
    //-------------------------------

    // функция для рандомного числа
    function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

    // получение случайного свитка
    function getScroll(){
        
        scroll.img = getRandomInt(1,3)+9;
        var a = getRandomInt(1,3)-1;
        var arrX = [60, 1020, 1020],
            arrY = [0, 0, 540];  
        scroll.numItem = scroll.img;
        scroll.x = arrX[a];
        scroll.y = arrY[a];
        scroll.life = true;
        scroll.time = setTimeout(function() {
            getScroll();
         }, 30000);
    }
    
    // обновление свитка на поле
    function reloadScroll(){
        setTimeout(function() {
            getScroll();
         }, 20000);
    }
    
    // воскрешение умерших монстров через 30 сек
    function resurrect(monster){
        setTimeout(function(){
            if(monster.dead === true){
            monster.dead = false;
            monster.x = 480;
            monster.y = 300;
        }
        }, 30000);
        
    }
    
    // отрисовка текста в рамках
    function textDraw(){
        objCanvasImg.canvasFon.fillStyle = "#F0F8FF";
        objCanvasImg.canvasFon.font = 'italic 11pt Arial';
        objCanvasImg.canvasFon.fillText("Life Hero", 1220, 25);
        objCanvasImg.canvasFon.fillText("Life Boss", 1220, 95);
        objCanvasImg.canvasFon.fillText("Scroll", 1225, 195);
        objCanvasImg.canvasFon.fillText("Slowing", 1220, 295);
        objCanvasImg.canvasFon.fillText("Books", 1225, 395);
    }
    
    // отрисовка сердец в рамках
    function drawHearts(){
        if(heroMove.life === 1){
            objCanvasImg.canvas.drawImage(objCanvasImg.img[13], 0, 0, 25, 25, 1210, 30, 25, 25);
        }
        if(heroMove.life === 2){
            objCanvasImg.canvas.drawImage(objCanvasImg.img[13], 0, 0, 50, 25, 1210, 30, 50, 25);
        }
        if(monster4.life === 1){
            objCanvasImg.canvas.drawImage(objCanvasImg.img[13], 0, 0, 25, 25, 1210, 100, 25, 25);
        }
        if(monster4.life === 2){
            objCanvasImg.canvas.drawImage(objCanvasImg.img[13], 0, 0, 50, 25, 1210, 100, 50, 25);
        }
        if(monster4.life === 3){
            objCanvasImg.canvas.drawImage(objCanvasImg.img[13], 0, 0, 75, 25, 1210, 100, 75, 25);
        }
        if(monster4.life === 4){
            objCanvasImg.canvas.drawImage(objCanvasImg.img[13], 0, 0, 75, 25, 1210, 100, 75, 25);
            objCanvasImg.canvas.drawImage(objCanvasImg.img[13], 0, 0, 25, 25, 1210, 130, 25, 25);
        }
        if(monster4.life === 5){
            objCanvasImg.canvas.drawImage(objCanvasImg.img[13], 0, 0, 75, 25, 1210, 100, 75, 25);
            objCanvasImg.canvas.drawImage(objCanvasImg.img[13], 0, 0, 50, 25, 1210, 130, 50, 25);
        }
        if(monster4.life === 6){
            objCanvasImg.canvas.drawImage(objCanvasImg.img[13], 0, 0, 75, 25, 1210, 100, 75, 25);
            objCanvasImg.canvas.drawImage(objCanvasImg.img[13], 0, 0, 75, 25, 1210, 130, 75, 25);
        }
        
    }
    
    // взятие вещи
    function takeItem(){
        if(heroMove.x === scroll.x && heroMove.y === scroll.y){
             scroll.x = 1300;
             scroll.item = scroll.numItem;
             scroll.useImg = scroll.img;
             scroll.life = false;              
        }
        if(heroMove.x === portal.x && heroMove.y === portal.y){
            clearTimeout(selfSkill.clearTime);
            clearTimeout(scroll.time);
            portal.stop = true;
            heroMove.pushButton = false;
            brLevel2();
        }
    }
};

