var appUtils = {

    getDistance: function(lat1, lat2, lon1, lon2) {
        var R = 6371.0,
            dLat = app.utils.toRad(lat2-lat1),
            dLon = app.utils.toRad(lon2-lon1);

        lat1 = app.utils.toRad(parseFloat(lat1));
        lat2 = app.utils.toRad(parseFloat(lat2));

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +      
              Math.sin(dLon/2) * Math.sin(dLon/2) *
              Math.cos(lat1) * Math.cos(lat2),
            c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)),
            d = R * c;
        return d;
    },


    toRad: function (nr) {
        return nr * Math.PI / 180.0;
    },

    duration: function (distance,way){
        if(way === "walk"){
            return distance / 4;
        }
        if(way === "bike"){
            return distance / 10;
        }
        if(way === "car") {
            return distance / 50;
        }
    },

    toMinutes: function (hour){
        return hour * 60;
    },

    toKm: function (radians){
        return Math.floor(radians * 100)/100 ;
    }

};


Number.prototype.toTime = function(){
     var self = this
     var hours = (self) << 0;
     var min = ((self * 60) % 60) << 0;
     var sec = ((self*3600) % 60) << 0;
     if (sec <= 9) sec = '0' + sec;
     if (min <= 9) min = '0' + min;

     return hours + ':' + min + ':' + sec
};