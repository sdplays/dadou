var padding = {top:20, right:40, bottom:0, left:0},
            w = 500 - padding.left - padding.right,
            h = 500 - padding.top  - padding.bottom,
            r = Math.min(w, h)/2,
            rotation = 0,
            oldrotation = 0,
            picked = 100000,
            oldpick = [],
            color = d3.scale.category20();//category20c()
            //randomNumbers = getRandomNumbers();
        
//http://osric.com/bingo-card-generator/?title=HTML+and+CSS+BINGO!&words=padding%2Cfont-family%2Ccolor%2Cfont-weight%2Cfont-size%2Cbackground-color%2Cnesting%2Cbottom%2Csans-serif%2Cperiod%2Cpound+sign%2C%EF%B9%A4body%EF%B9%A5%2C%EF%B9%A4ul%EF%B9%A5%2C%EF%B9%A4h1%EF%B9%A5%2Cmargin%2C%3C++%3E%2C{+}%2C%EF%B9%A4p%EF%B9%A5%2C%EF%B9%A4!DOCTYPE+html%EF%B9%A5%2C%EF%B9%A4head%EF%B9%A5%2Ccolon%2C%EF%B9%A4style%EF%B9%A5%2C.html%2CHTML%2CCSS%2CJavaScript%2Cborder&freespace=true&freespaceValue=Web+Design+Master&freespaceRandom=false&width=5&height=5&number=35#results
    var count = 10 
    const videos = ["v1.mp4","v2.mp4","v3.mp4","v4.mp4" ,"v5.mp4","v6.mp4","v7.mp4","v8.mp4" ,"v9.mp4","v10.mp4"  ]
    var data = [
                    {"label":"Eye",  "value":1,  "question":"“Le rêve est le phénomène que nous n'observons que pendant son absence. Le verbe rêver n'a presque pas de présent. Je rêve, tu rêves.” Paul Valery", "video":"v1.mp4"}, // padding
                    {"label":"Door",  "value":2,  "question":"“Certes, un rêve de beignet, c’est un rêve, pas un beignet. Mais un rêve de voyage, c’est déjà un voyage.”","video":"v2.mp4"}, //font-family
                    {"label":"Heaven",  "value":3,  "question":" Les rêves ont rarement la vie longue, mais ils l'ont intense. Citation de Anne Barratin ; Les pensées in Œuvres posthumes (1920)","video":"v3.mp4"}, //color
                    {"label":"Evil",  "value":4,  "question":" Fais de ta vie un rêve, et d'un rêve une réalité. Citation de Antoine de Saint-Exupéry ; Cahiers de Saint-Exupéry (1900-1944)","video":"v4.mp4"}, //font-weight
                    {"label":"Scary",  "value":5,  "question":"J'aime mieux rêver mon âme que vivre ma vie. Citation de Gustave Thibon ; Vous serez comme des dieux (1959)","video":"v5.mp4"}, //font-size
                    {"label":"weird",  "value":6,  "question":" Réfléchir sur ce que c'est que vivre : c'est rêver sa vie. Citation de Gabriel Marcel ; Être et avoir (1918-1933)","video":"v6.mp4"}, //background-color
                    {"label":"Run",  "value":7, "question":" La vie est un rêve, fais en une réalité. Citation de Mère Teresa ; Une pensée par jour avec Mère Teresa (2005)","video":"v7.mp4"}, //nesting
                    {"label":"LAND",  "value":8,  "question":"Le meilleur de ma vie a passé comme un rêve. Citation de Alfred de Musset ; Silvia, À Madame ***, le 18 décembre 1839.","video":"v8.mp4"}, //bottom
                    {"label":"Product",  "value":9,  "question":" Les rêves sont de la vie sans souvenir. Citation de Henry de Montherlant ; Les carnets (1932-1934)","video":"v9.mp4"}, //sans-serif
                    {"label":"beaux", "value":10, "question":"S'il existe une réalité qui dépasse le rêve, c'est ceci : Vivre. Citation de Victor Hugo ; Les misérables (1862)","video":"v10.mp4"},
        ];
        var svg = d3.select('#chart')
            .append("svg")
            .data([data])
            .attr("width",  w + padding.left + padding.right)
            .attr("height", h + padding.top + padding.bottom);
        var container = svg.append("g")
            .attr("class", "chartholder")
            .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");
        var vis = container
            .append("g");
            
        var pie = d3.layout.pie().sort(null).value(function(d){return 1;});
        // declare an arc generator function
        var arc = d3.svg.arc().outerRadius(r);
        // select paths, use arc generator to draw
        var arcs = vis.selectAll("g.slice")
            .data(pie)
            .enter()
            .append("g")
            .attr("class", "slice");
            
        arcs.append("path")
            .attr("fill",function(d, i){ return color('black') ; })
            .attr("d", function (d) { return arc(d); });
        // add the text
        arcs.append("text").attr("transform", function(d){
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle)/2;
                return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
            })
            .attr("text-anchor", "end")
            .text( function(d, i) {
                return data[i].label;
            });
        container.on("click", spin);
        function spin(d){
            
            
            //all slices have been seen, all done
            console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
            if(oldpick.length == data.length){
                console.log("done");
                
                return;
            }
            var  ps       = 360/data.length ,
                 pieslice = Math.round(1440/data.length),
                 rng      = Math.floor((Math.random() * 1440) + 360);
                
            rotation = (Math.round(rng / ps) * ps);
            
            picked = Math.round(data.length - (rotation % 360)/ps);
            picked = picked >= data.length ? (picked % data.length) : picked;
            if(oldpick.indexOf(picked) !== -1){
                d3.select(this).call(spin);
                return;
            } 
            rotation += 90 - Math.round(ps/2);
            vis.transition()
                .duration(3000)
                .attrTween("transform", rotTween)
                .each("end", function(){
                    //mark question as seen
                    d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                        .attr("fill", "#111");
                    //populate question
                    d3.select("#question h1")
                        .text(data[picked].question);
                    oldrotation = rotation;
              
                    /* Get the result value from object "data" */
                    console.log(data[picked].value)
                    console.log(data[picked].question)
		    		    document.getElementById("video").setAttribute("src",data[picked].video)
		    function videoPlay(videoNum)
    				{
			document.getElementById("video").setAttribute("src",videos[videoNum]);
			document.getElementById("video").load();
			document.getElementById("video").play();
    				}
          	document.getElementById('video').addEventListener('ended',myHandler,false);
function myHandler() {
i++ ;
if(i == (Count-1)){
i = 0;
videoPlay(i);
}
else{
videoPlay(i);
} }	    		    	

                    /* Comment the below line for restrict spin to sngle time */
                    container.on("click", spin);
                });
        }
		    
                    
               			
   
		     
  

                   
                    /* Comment the below line for restrict spin to sngle time */
           

        //make arrow
        svg.append("g")
            .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h/2)+padding.top) + ")")
            .append("path")
            .attr("d", "M-" + (r*.15) + ",0L0," + (r*.05) + "L0,-" + (r*.05) + "Z")
            .style({"fill":"black"});
        //draw spin circle
        container.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 60)
            .style({"fill":"white","cursor":"pointer"});
        //spin text
        container.append("text")
            .attr("x", 0)
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .text("spin")
            .style({"font-weight":"bold", "font-size":"30px"});
        
        
        function rotTween(to) {
          var i = d3.interpolate(oldrotation % 360, rotation);
          return function(t) {
            return "rotate(" + i(t) + ")";
          };
        }
        
        
        function getRandomNumbers(){
            var array = new Uint16Array(1000);
            var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
            if(window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function"){
                window.crypto.getRandomValues(array);
                console.log("works");
            } else {
                //no support for crypto, get crappy random numbers
                for(var i=0; i < 1000; i++){
                    array[i] = Math.floor(Math.random() * 100000) + 1;
                }
            }
            return array;
        }
