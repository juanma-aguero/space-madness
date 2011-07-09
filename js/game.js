/*********************
 * GAME class
 *
 */
function game(){
	this.rect1 = new ship();
	this.ctx = undefined;
	this.intLoop = null;
	this.rocks=[];
	this.points = 0;
}


/*
 * Draw objects on canvas
 */
game.prototype.drawObject=function (object) {
	if(object.isSprited){
		this.ctx.drawImage(imageBuffer[object.img], object.spriteX, object.spriteY, object.width, object.height, object.posX, object.posY, object.width, object.height);
	}else{
		this.ctx.drawImage(imageBuffer[object.img], object.posX, object.posY, object.width, object.height);
	}
}


/*
 * Delete objects on canvas
 */
game.prototype.deleteObject=function (object) {
	this.ctx.clearRect(object.posX,object.posY,object.width,object.height);
}


/*
 * Init game functionalitys
 */
game.prototype.init=function(){
	var canvas = document.getElementById("canvas-layer");
	this.ctx = canvas.getContext("2d");
			
	this.rocks.push(new rock());
	this.rocks.push(new rock());
	
	this.startLoop();
	
	
}

game.prototype.startLoop=function(){
	var gameObj = this;
	
	function loop(){
		// delete old objects
		gameObj.deleteObject(gameObj.rect1);
		for (i=0; i<gameObj.rocks.length; i++){
			gameObj.deleteObject(gameObj.rocks[i]);
		}
		
		// update states
		gameObj.update();

		// draw new objects
		gameObj.drawObject(gameObj.rect1);
		for (i=0; i<gameObj.rocks.length; i++){
			gameObj.drawObject(gameObj.rocks[i]);
		}
		
	}
	
	this.stop();
	
	this.intLoop = setInterval(loop, 30);
}

/*
 * Stop game
 */
game.prototype.stop=function(){
	clearInterval(this.intLoop);
}


/*
 * Update all components
 */
game.prototype.update=function(){
	
	if( this.rect1.state <= 8 ){
		this.rect1.update(this.ctx);
	}else{
		this.stop();
		gameOver()
	}
	
	for (var i=0; i<this.rocks.length; i++){
		
		if( this.rocks[i].state <= 1 ){
			this.rocks[i].update(this.rect1);
		}
		if(this.rocks[i].state == 2){
			this.rocks.splice ( i, 1 );
			this.rocks.push(new rock());
		}
		if(this.rocks[i].state == 3){
			this.rocks.splice ( i, 1 );
			this.generateRocks();
		}
		
	}

}

game.prototype.generateRocks=function(){
	var count = ( 1 + (Math.random()*(2-1)) );
	for(var i=0; i < count; i++){
		this.rocks.push(new rock());
	}
}

/*
 * Notify event to all components
 */
game.prototype.notify=function(e){

	this.rect1.notify(e);
	//this.rock.notify(e);
}
