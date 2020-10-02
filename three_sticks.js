

var angle1 =  10;
var angle2 = 10;
var angle3 = 0;

var center_x = 850;
var center_y = 650;
var x1 =0;
var y1 =0;
var x2 =0;
var y2 =0;
var x3 =0;
var y3 =0;

var r1 = 150;
var r2 = 430;
var r3=  10;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function dist(x1,y1,x2,y2) {
    x2-=x1;
    y2-=y1;
    return Math.sqrt((x2*x2) + (y2*y2));
}

function clearLineRounded(context,x1,y1,x2,y2,thickness) {
    if (thickness <= 2) {
        clearLineSquared(context,x1,y1,x2,y2,thickness);
        return;
    }

    var tmp, half_thickness = thickness / 2, length,
             PI15 = 1.5 * Math.PI, PI05 = 0.5 * Math.PI
                                          ;

    // swap coordinate pairs if x-coordinates are RTL to make them LTR
    if (x2 < x1) {
        tmp = x1;
        x1 = x2;
        x2 = tmp;
        tmp = y1;
        y1 = y2;
        y2 = tmp;
    }

    length = dist(x1,y1,x2,y2);

    context.save();
    context.translate(x1,y1);
    context.rotate(Math.atan2(y2-y1,x2-x1));
    x1 = 0;
    y1 = 0;
    x2 = length - 1;
    y2 = 0;
    // draw a complex "line" shape with rounded corner caps

    context.moveTo(x1,y1-half_thickness);
    context.lineTo(x2,y2-half_thickness);
    context.arc(x2,y2,half_thickness,PI15,PI05,false);
    context.lineTo(x1,y1-half_thickness+thickness);
    context.arc(x1,y1,half_thickness,PI05,PI15,false);
    context.closePath();
    x1 -= half_thickness;
    y1 -= half_thickness;

    context.clip();
    context.clearRect(x1,y1,length+thickness,thickness);
    context.restore();
}

var f=0;

var a1 = 0;
var a2 = 0;

function set_all()
{
	
	r1 = parseInt(document.getElementById("R1").value);
	
	r2 = parseInt(document.getElementById("R2").value);
	a1 = parseInt(document.getElementById("angle1").value);
	a2 = parseInt(document.getElementById("angle2").value);
	
	console.log(r1+" "+r2+" "+a1+" "+a2);
	
	clear_draw();
	
}


async function draw()
{
	f=1;
	set_all();
	
	
	
	//async sleep(1000);
	

    // var canvas  =document.getElementById('canvas');

    // if(canvas.getContext) {



    var line = document.getElementById("line");
    var line2 = document.getElementById("line2");
    var line3 = document.getElementById("line3");
    // alert("canvas");
    //  var ctx = canvas.getContext('2d');

    //ctx.fillStyle = "#FF77FF";
    //ctx.fillRect(120, 650,1100, -1000);
    // alert("canvas");

    //var centerX = center_x, centerY = center_y, radius = 200, angle = 0;
    var rotate1 = function(centerX,centerY,radius,angle) {
        var x11, y11, x22, y22;
        x11 = centerX ;
        y11 = centerY ;
        x22 = centerX - radius * Math.cos( angle );
        y22 = centerY - radius * Math.sin( angle );

        line.setAttribute( 'x1', x11 );
        line.setAttribute( 'y1', y11 );
        line.setAttribute( 'x2', x22 );
        line.setAttribute( 'y2', y22 );

        x1 = x22;
        y1 = y22;

    }

    var rotate2 = function(centerX,centerY,radius,angle) {
        var x11, y11, x22, y22;
        x11 = centerX ;
        y11 = centerY ;
        x22 = centerX - radius * Math.cos( angle );
        y22 = centerY - radius * Math.sin( angle );

        line2.setAttribute( 'x1', x11 );
        line2.setAttribute( 'y1', y11 );
        line2.setAttribute( 'x2', x22 );
        line2.setAttribute( 'y2', y22 );

        x2 = x22;
        y2 = y22;
    }
    
    var rotate3 = function(centerX,centerY,radius,angle) {
        var x11, y11, x22, y22;
        x11 = centerX ;
        y11 = centerY ;
        x22 = centerX - radius * Math.cos( angle );
        y22 = centerY - radius * Math.sin( angle );

        line3.setAttribute( 'x1', x11 );
        line3.setAttribute( 'y1', y11 );
        line3.setAttribute( 'x2', x22 );
        line3.setAttribute( 'y2', y22 );

        x3 = x22;
        y3 = y22;
    }
    
    
    
    var pp = document.getElementById('poi');
    var last ="";
    // animation
    
    while(f) {

        await sleep(20);
        angle1+= a1;
        angle2 += a2;
        //angle3 += 5;
        rotate1( center_x,center_y,r1,angle1 );
        rotate2( x1,y1,r2,angle2 );
        rotate3( x2,y2,r3,angle2);
       // alert(x22+" "+y22);
       last+= x2.toString()+","+y2.toString()+" ";
		pp.setAttribute('points', last);
		
		//alert(last);
        //}
       // f++;
    }
    

}

function clearLine(line)
{
	line.setAttribute( 'x1', 0 );
    line.setAttribute( 'y1', 0 );
    line.setAttribute( 'x2', 0 );
    line.setAttribute( 'y2', 0 );
}


function stop()
{
	f=0;
	
	
	console.log(document.getElementById("poi").points);
		
		
}

function clear_draw()
{
	var pp = document.getElementById("poi");
    var last ="";
    
    console.log(document.getElementById("poi").points);
    
   // pp.points.clear();
    pp.setAttribute('points', last);
    
}
