function init(){
	canvas = document.getElementById('mycanvas');
	pen = canvas.getContext('2d');
	W = canvas.width;
	H = canvas.height;
	score = 0;
    max_score = score;
    cw = 20;

	snake = {
		length : 5,
		color : "red",
		cells : [],
		direction : "right",

		createSnake : function(){
			for(var i=this.length-1; i>=0 ;i--){
				this.cells.push( {x:i,y:0})

			}
		},

		drawSnake : function(){
			this.cells.forEach(function(cell){
				pen.fillStyle = snake.color;
				pen.lineWidth = 5;
				pen.strokeStyle = "white";
				pen.strokeRect(cell.x*20,cell.y*20,20,20);
				pen.fillRect(cell.x*20,cell.y*20,20,20);

			});
		},

		updateSnake : function(){


			var newX = this.cells[0].x;
			var newY = this.cells[0].y;

			if(newX == particle.x && newY == particle.y)
			{
				particle = generateParticle();
				score++;
                
                if(max_score<score){
                    max_score = score;
                }

			}
			else{
				var lastCell = this.cells.pop();
			}

			if(this.direction == "right"){
					newX++;
			}
			else if(this.direction == "left"){
				newX--;
			}
			else if(this.direction == "up"){
				newY--;
			}
			else if(this.direction == "down"){
				newY++;
			}
            
            if (newX == -1)
            {
                newX = W / cw - 1;
            } 
            else if (newX == W / cw)
            {
                newX = 0;
            }
            if (newY == -1)
            {
                newY = H / cw - 1;
            }
            else if (newY == H / cw)
            {
                newY = 0;
            }
            
            if (check_collision(newX, newY, this.cells))
            {
                //restart game
                alert("Game Over Your score is " + score);
                init();
                //play();
                return;
            }

			this.cells.unshift({x:newX,y:newY});
            
            
		}

	};

	snake.createSnake();

	function changeDir(e){
		if(e.key=="ArrowLeft"){
			snake.direction = "left";
		}
 		else if(e.key=="ArrowRight"){
			snake.direction = "right";
		}
        else if(e.key=="ArrowUp"){
			snake.direction = "up";
		}
		else if(e.key=="ArrowDown"){
			snake.direction = "down";
		}
	}

	// Listener for Keyboard Inputs
	document.addEventListener('keydown',changeDir);

	particle = generateParticle();
    
    function check_collision(x, y, array)
    {
        //This function will check if the provided x/y coordinates exist in an array of cells or not
        for (var i = 0; i < array.length; i++)
        {
            if (array[i].x == x && array[i].y == y)
                return true;
        }
        return false;
    }

    }

function draw(){
	pen.clearRect(0,0,W,H);
	snake.drawSnake();

	pen.fillStyle = "blue";
	pen.fillRect(particle.x*20,particle.y*20,20,20);
	pen.font = "30px Arial";
	pen.fillText("Score : " + score,10,70);
    
    //pen.font = "30px Arial";
	//pen.fillText("High Score : " + max_score,10,30);
}

function generateParticle(){
	var x = Math.round(Math.random()*(W - 20)/20);
	var y = Math.round(Math.random()*(H - 20)/20);

	return {x:x, y:y};
}

function update(){
	snake.updateSnake();

}

function render(){
	draw();
	update();
	console.log("In render")
}
init();
setInterval(render,60);

