

var angle1 = 0.1;
var angle2 = 0;
var angle3 = 0;

var center_x = 750;
var center_y = 450;
var x1 =0;
var y1 =0;
var x2 =0;
var y2 =0;
var x3 =0;
var y3 =0;

var r1 = 200;
var r2 = 100;
var r3=  50;

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



async function draw()
{
	var audio = new Audio('music.mp3');
	audio.duration = 5;
	audio.play();
	
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
    var f=0;
    while(true) {

        await sleep(15);
        angle1 += .10;
        angle2 += .5002;
        angle3 += .022;
        rotate1( center_x,center_y,r1,angle1 );
        rotate2( x1,y1,r2,angle2 );
        rotate3( x2,y2,r3,angle3 );
       // alert(x22+" "+y22);
       last+= x3.toString()+","+y3.toString()+" ";
		pp.setAttribute('points', last);
		if(f<5)
		//alert(last);
        //}
        f++;
    }

}
