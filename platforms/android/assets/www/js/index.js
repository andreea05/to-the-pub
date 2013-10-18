var app = {
   
    utils: appUtils,

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
   
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
   
    onDeviceReady: function() {
        app.receivedEvent('deviceready'); 
    },

    onSucces: function(position){
        var latitude  = position.coords.latitude,
            longitude = position.coords.longitude;

        $('#geolocation p').text("Lat: " + latitude + ", Long: " + longitude);

        for(var i=0; i<pois.length; i++){
            pois[i].distance = app.utils.toKm(app.utils.getDistance(pois[i].latitude, latitude, pois[i].longitude, longitude));
        }

        app.refreshPoi();
    },

    onError: function(){
        alert("Doesn't work");
    },

    refreshPoi: function() {
        $('#poi p').html(pois[currentPoi].name);
        $('#distance p').text(pois[currentPoi].distance);
        $("#buttons a.active").click();
    },

    receivedEvent: function(id) {
        if (id === "deviceready") {
          navigator.geolocation.getCurrentPosition(app.onSucces,app.onError);
        } else {
            app.onSucces({coords: {latitude: 45.796719, longitude: 24.150093}});
        }

        $("#buttonw").on("click", function(){
            $("#buttons a").removeClass('active');
            $(this).addClass('active');
            var r = app.utils.duration(parseFloat($('#distance p').text()),"walk");
            $("#time p").html(new Number(r).toTime());
        }); 

        $("#buttonb").on("click", function(){
            $("#buttons a").removeClass('active');
            $(this).addClass('active');
            var r = app.utils.duration(parseFloat($('#distance p').text()),"bike");
            $("#time p").html(new Number(r).toTime());
        });

        $("#buttonc").on("click", function(){
            $("#buttons a").removeClass('active');
            $(this).addClass('active');
            var r = app.utils.duration(parseFloat($('#distance p').text()),"car");
            $("#time p").html(new Number(r).toTime());
        });

        $("#button-prev").on("click", function(){
            currentPoi -= 1;
            app.refreshPoi();
        });

        $("#button-next").on("click", function(){
            currentPoi += 1;
            app.refreshPoi();
        });



        console.log('Received Event: ' + id);
     
    }

};

var currentPoi = 10;






$(document).ready(function() {
    app.receivedEvent('evf');
});
