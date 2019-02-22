function initMap(){
	//Map options
	var options = {
		zoom:8,
		center:{lat:39.9526,lng:-75.1652} 
	}
	//New map		
	var map = new google.maps.Map(document.getElementById("map"),options)
	
	/*
	//Add marker
	var marker = new google.maps.Marker({
		position:{lat:39.9526,lng:-75.1652},
		map:map,
		icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
	})
	
	//if click then a window pops up
	//
	var infoWindow = new google.maps.InfoWindow({
		content:"<h1>Philadelphia</h1>"
	})

	//an event listener for clicks
	//
	marker.addListener('click',()=>{
		infoWindow.open(map, marker);
	})*/

	//the arguments is a JSON object
	//
	addMarker({
		coords:{lat:39.9526,lng:-75.1652},
		iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
		content:'<h1>Philadelphia PA</h1>'
	});
	
	//Add Marker function
	//call the function like this: addMarker({coords{lat:<stuff1>,lng:<stuff2>}})
	//
	
	function addMarker(props){
		var marker = new google.maps.Marker({
                	position:props.coords,
                	map:map,
        		//icon:props.iconImage
		});

		//check for custom icon
		if(props.iconImage){
			//Set icon image
			marker.setIcon(props.iconImage);
		}
		//check for content
		if(props.content){
			var infoWindow = new google.maps.InfoWindow({
				content:props.content
			});
			
			/*marker.addListener('click', () =>{
				//infoWindow will be loaded on top of the marker
				//but we dont want that
				infoWindow.open(map,marker);
			});*/
			marker.addListener('click', ()=>{
				/*var content = document.getElementById('map-intro')
				.cloneNode(true);
				content.removeAttribute('id');
				content.style.display='block';
				infoWindow.setContent(content);
				infoWindow.open(map,marker);			
				*/
				$('#div-info-left').css('display','block')
				$('#div-info-right').css('display','block')
			})
		}
	}
}

function myMap() {
    var mapProp= {
	center:new google.maps.LatLng(51.508742,-0.120850),
	zoom:5,
    };
    var map = new google.maps.Map(document.getElementById("map"),mapProp);
}
