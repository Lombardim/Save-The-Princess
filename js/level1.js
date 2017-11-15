// Declaramos algunas variables  
// 1. Jugador
var jugador; // Personaje principal
var salto; //Sonido del personaje al saltar
var princess; // Personaje que se debe rescatar
var victory; // Sonido al ganar
var fin; //Sonido al perder el juego
var main; //Sonido del juego
var cage; //Jaula
var jaula;
// 2. Plataformas
var plataformas; // Lugares por los cuales el personaje se desplaza o camina
var plataformasF;
var plataformaM; //Plataforma en movimiento superior
var plataformaM1; //2da plataforma en movimiento
// 3. Teclado
var cursores; // Eventos de teclado
// 4. Estrellas
var estrellas; // Las estrellas que seran recolectadas
var picked; //El sonido de la estrella al ser recolectada
// 5. Puntaje
var puntaje = 0; // Contador de puntos
var puntajeTexto; // Texto que muestra el puntaje acumulado
var end = 0;
// 6. Barriles
var barriles, nBarriles = 0; // Variable que contiene los barriles y el numero de barriles que existen en el mundo
var arrBarriles = []; //Array que contiene los barriles para saber y controlar que hacen en todo momento
var generar = 2; // Cantidad de barriles que se generaran
// 7. Puerta
var cerrada = 1; // Para saber si está cerrada o abierta
var llave;
var abrir; //Sonido cuando la puerta se abre

var level1State = {
    create:function () {
        main = game.add.audio('main');
        main.volume = 0.4;
        main.play();
        game.physics.startSystem(Phaser.Physics.ARCADE);
        var fondo = game.add.sprite(0, 0, 'fondo');
        fondo.fixedToCamera = true; //to keep the background behind
        
        estrellas = game.add.group();
        estrellas.enableBody = true;

        plataformas = game.add.group(); 
        plataformas.enableBody = true;

        game.world.setBounds(0, 0, 1200, 600);

        for (var i = 0; i < 3; i++) {
            
            var piso = plataformas.create(300*i, game.world.height - 23, 'piso');    
            piso.body.immovable = true;

        }
        generateStar(game.world.centerX, game.world.height - 70);
        for (var i = 0; i < 3; i++) {
            
            if (i == 0) {
                piso = plataformas.create(0, 290, 'platform');
                generateStar(piso.body.position.x + 60, piso.body.position.y - 60);             
            }else if (i == 2) {
                piso = plataformas.create(1120, 290,'platform');
            }else{
                piso = plataformas.create(290*i, 290,'platform');   
            }
            piso.body.immovable = true;

        }

        for (var i = 0; i < 5; i++) {
            
            if (i == 0) {
                piso = plataformas.create(-100, 390, 'platform');                       
            }else if (i == 4) {
                piso = plataformas.create(1070, 390,'platform');
                generateStar(piso.body.position.x + 60, piso.body.position.y - 60);
            }else{
                if (i == 2) {
                    generateStar(piso.body.position.x + 60, piso.body.position.y - 60);
                }
                piso = plataformas.create(310*i - 150, 390,'platform'); 
            }
            piso.body.immovable = true;

        }
        for (var i = 0; i < 5; i++) {
            
            if (i == 0) {
                piso = plataformas.create(0, 490, 'platform');
                generateStar(piso.body.position.x + 60, piso.body.position.y - 60);                     
            }else if (i == 4) {
                piso = plataformas.create(1120, 490,'platform');
                generateStar(piso.body.position.x + 45, piso.body.position.y - 60);
            }else{
                if (i == 3) {
                    generateStar(piso.body.position.x + 60, piso.body.position.y - 60);
                }
                piso = plataformas.create(290*i, 490,'platform');   
            }
            piso.body.immovable = true;

        }
        
        var rn = Math.ceil(Math.random() * 3);
        switch(rn){

            case 1:
                llave = game.add.sprite(4, 350, 'key');
            break; 
            case 2:
                llave = game.add.sprite(1160, 250, 'key');
            break;
            case 3:
                llave = game.add.sprite(1160, game.world.height - 70, 'key');
            break;

        }

        game.physics.arcade.enable(llave);
        llave.body.gravity.y = 300;
        llave.body.bounce.y = 0.2;

        game.time.events.add(Phaser.Timer.SECOND * 2, generarBarriles, this);
        barriles = game.add.group();
        barriles.enableBody = true;
        
        jugador = game.add.sprite(0, game.world.height - 70, 'jugador');
        piso = plataformas.create(1100, 90, 'platform');
        piso.body.immovable = true;
        generateStar(piso.body.position.x + 10, piso.body.position.y - 60);

        plataformaM1 = plataformas.create(470, 290, 'platform');
        plataformaM1.body.immovable = true;
        plataformaM1.body.collideWorldBounds = true;
        plataformaM1.body.velocity.x = 70;
        generateStar(plataformaM1.body.position.x + 135, plataformaM1.body.position.y - 60);

        plataformaM = plataformas.create(0, 190, 'platform');
        plataformaM.body.immovable = true;
        plataformaM.body.collideWorldBounds = true;
        plataformaM.body.velocity.x = 70;
        generateStar(plataformaM.body.position.x + 135, plataformaM.body.position.y - 60);

        princess = game.add.sprite(1175, 10, 'princesa');
        princess.animations.add('cry', [0,1,2,3,4], 6, true);
        princess.animations.add('finish', [5,6,7], 6, true);
        princess.frame = 0;
        game.physics.arcade.enable(princess);
        princess.body.gravity.y = 300;

        jaula = game.add.group();
        jaula.enableBody = true;
        
        cage = jaula.create(1160, -10, 'cage');
        cage.body.immovable = true;

        game.physics.arcade.enable(jugador);
        //  Rebote del jugador
        jugador.body.bounce.y = 0,1;
        // Su aceleración de gravedad
        jugador.body.gravity.y = 300;
        // Le permitimos colisionar con los límites del juego
        jugador.body.collideWorldBounds = true;

        jugador.animations.add('left', [0, 1, 2, 3], 10, true);
        jugador.animations.add('right', [5, 6, 7, 8], 10, true);
        jugador.animations.add('upR', [9], 10, true);
        jugador.animations.add('upL', [10], 10, true);
        
        puerta = game.add.sprite(1130, 414,'puerta');
        game.physics.arcade.enable(puerta);
        puerta.frame = 9;
        puerta.animations.add('open', [9,8,7,6,5,4,3,2,1], 9, true);

        // Creamos un teclado  
        cursores = game.input.keyboard.createCursorKeys();

        //Agregamos el sonido al juego
        picked = game.add.audio('collected');
        abrir = game.add.audio('door');
        salto = game.add.audio('salto');
        victory = game.add.audio('victory');
        fin = game.add.audio('gameover');
        picked.volume = 0.1;
        salto.volume = 0.2;
        abrir.volume = 1;
        
        // Creamos un Sprite para contener el texto de puntaje y lo dejamos fijo en relación a la cámara. Esto quiere decir que se moverá con ella fixedToCamera = true
        var sprite = game.add.sprite(0, 0, 'invisible');
        // Lo dejará fijo ante la cámara
        sprite.fixedToCamera = true;
        // Creamos el texto y lo agregamos como hijo del objeto sprite con addChild
        puntajeTexto = game.add.text(5, 5, 'Estrellas: 0', {fontSize: '32px', fill: '#D7DF01'});
        sprite.addChild(puntajeTexto);

        // Ubicamos el sprite contenedor de la cámara en las coordenadas 5,5
        sprite.cameraOffset.x = 5;
        sprite.cameraOffset.y = 5;
        
    },
    update:function () {
        game.physics.arcade.collide(jugador, plataformas);
        game.physics.arcade.collide(jugador, puerta);
        game.physics.arcade.collide(jugador, cage);
        game.physics.arcade.collide(puerta, plataformas);
        game.physics.arcade.collide(barriles, plataformas);
        game.physics.arcade.collide(princess, plataformas);
        game.physics.arcade.collide(estrellas, plataformas);
        game.physics.arcade.collide(llave, plataformas);

        game.physics.arcade.overlap(jugador, llave, cogerLlave, null, this);
        game.physics.arcade.overlap(jugador, estrellas, cogerEstrella, null, this);
        game.physics.arcade.overlap(jugador, barriles, matarPersonaje, null, this);
        game.physics.arcade.overlap(jugador, princess, endGame, null, this);
        

        if (cerrada == 1) {
            puerta.body.immovable = true;
        }else{
            game.time.events.add(Phaser.Timer.SECOND * 1, abrirPuerta, this);
            puerta.animations.play('open');
        }

        jugador.body.velocity.x = 0;
        if (plataformaM.body.blocked.right) {

            plataformaM.body.velocity.x = -70;

        }else{
            if (plataformaM.body.blocked.left) {
                plataformaM.body.velocity.x = 70;
            }
        }

        if (plataformaM1.body.position.x == 954.166666666653) {
            plataformaM1.body.velocity.x = -70;
        }else{
            if (plataformaM1.body.position.x == 470) {
                plataformaM1.body.velocity.x = 70;
            }
        }

        for (var i = 0; i < nBarriles; i++) {
            if (arrBarriles[i].barril != null) {

                if (arrBarriles[i].barril.body.blocked.right || arrBarriles[i].barril.body.blocked.left) {

                    if (arrBarriles[i].barril.body.position.y == 543) {
                        
                        limpiarBarril(arrBarriles[i].barril);

                    }else{

                        if (arrBarriles[i].barril.body.blocked.right) {

                            arrBarriles[i].barril.body.velocity.x = -100;
                            
                        }else{

                            arrBarriles[i].barril.body.velocity.x = 100;
                            
                        }

                    }
                    
                }else{

                    if (arrBarriles[i].barril.body.touching.down) {

                        arrBarriles[i].barril.animations.play('roll');
                        
                        if (arrBarriles[i].barril.body.moves) {
                            if (arrBarriles[i].barril.body.velocity.x > 0) {
                                arrBarriles[i].barril.body.velocity.x = 100;
                            }else{
                                if (arrBarriles[i].barril.body.velocity.x < 0) {
                                    arrBarriles[i].barril.body.velocity.x = -100;
                                }else{
                                    if (Math.ceil((1 + Math.ceil(Math.random()*99)) % 2) == 1) {
                                        arrBarriles[i].barril.body.velocity.x = 100;
                                    }else{
                                        arrBarriles[i].barril.body.velocity.x = -100;
                                    }       
                                }                                   
                            }
                        }

                    }else{

                        arrBarriles[i].barril.body.velocity.x = 0;
                        arrBarriles[i].barril.frame = 4;
                    
                    }   

                }
            }
            
        }               

        if (cursores.left.isDown && end == 0){
            
            if (jugador.body.touching.down) {
                //  Move to the left on the ground
                jugador.body.velocity.x = -150;
                jugador.animations.play('left');

            }else{
                
                //  Move to the left on the air
                jugador.body.velocity.x = -150;
                jugador.animations.play('upL');

            }
            
        }
        else if (cursores.right.isDown && end == 0){

            if (jugador.body.touching.down) {
                //  Move to the right on the ground
                jugador.body.velocity.x = 150;
                jugador.animations.play('right');

            }else{
                
                //  Move to the right on the air
                jugador.body.velocity.x = 150;
                jugador.animations.play('upR');

            }

        }else{

            //  Stand still
            jugador.animations.stop();
            
            jugador.frame = 4;
        }

        // Si estamos presionando el botón UP y estamos colisionando con alguna plataforma
        if (cursores.up.isDown && jugador.body.touching.down  && end == 0) {
            salto.play();
            jugador.body.velocity.y = -250;                   
        }
    }
};

function endGame (jugador, princesa){

    if (puntaje == 10 && end == 0) {
        end = 1;                
        main.stop();
        princess.animations.play('finish');
        victory.play();
        for (var i = 0; i < nBarriles; i++) {
            limpiarBarril(arrBarriles[i].barril);
        }
        game.time.events.add(Phaser.Timer.SECOND * 4, win, this);
    }

}

function win() {
    puntaje = 0;
    generar = 2;
    nBarriles = 0;
    end = 0;
    cerrada = 1;
    game.state.start('win');
}

function abrirPuerta (){

    puerta.kill();
    puerta = game.add.sprite(1130, 414,'puerta')
    puerta.frame = 0;

}

function matarPersonaje(jugador, barril){

    if (end == 0) {
        main.stop();
        jugador.kill();
        fin.play();
        limpiarBarril(barril);

        for (var i = 0; i < nBarriles; i++) {
            limpiarBarril(arrBarriles[i].barril);
        }
        end = 1;
        
        princess.animations.play('cry');
        game.time.events.add(Phaser.Timer.SECOND * 4, lose, this);

    }

}
function lose(){
    puntaje = 0;
    arrBarriles = [];
    cerrada = 1;
    generar = 2;
    nBarriles = 0;
    end = 0;
    game.state.start('lose');

}

function generarBarriles(){
    
    if (end == 0) {

        for (var i = 0; i < generar; i++) {
            var barril;
            barril = barriles.create(Math.ceil(Math.random() * 900), 10, 'barril');
            barril.animations.add('roll', [0,1,2,3,4,5,6,7], 10, true);
            game.physics.arcade.enable(barril);
            barril.body.gravity.y = 200;
            barril.body.collideWorldBounds = true;

            var barrilsito = { "barril": barril, "gravity_y":300};
            arrBarriles.push(barrilsito);
            nBarriles++;

        }
        if (generar < 11) {
            generar++;
        }               
        if (end == 0) {
            game.time.events.add(Phaser.Timer.SECOND * 6, generarBarriles, this);  
        }

    }                      

}

function limpiarBarril(barril){

    barril.kill();

}

function generateStar(pX, pY){
    var star;
    star = estrellas.create(pX, pY, 'estrella');
    star.body.bounce.y = 0.5;
    star.body.gravity.y = 300;
    star.animations.add('rotate', [0,1,2,3,4,5,6,7,8], 10, true);
    star.animations.play('rotate');

}

function cogerEstrella (jugador, estrella) { //deletes the Stars from the game when the player walks over them

    // Removes the star from the screen
    estrella.kill();
    picked.play();
    //  Add and update the score

    puntaje += 1;
    puntajeTexto.text = 'Estrellas: ' + puntaje;

    if(puntaje == 10){

        cage.kill();
        puntajeTexto.text = '¡Rescata a la princesa!'

    }
}

function cogerLlave(jugador, llave){

    llave.kill();
    abrir.play()
    cerrada = 0;

}