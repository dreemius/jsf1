(function (){
    var internalData = [],
        maxCount = 0,
        currentCount = 0,
        count = 0;

    var createCustomElement = function (config) {
        var el 			                    = document.createElement(config.type);
    el.className 	                        = config.class;
        if (config.src) {el.src             = config.src}
        if (config.innerHTML) {el.innerHTML = config.innerHTML}
        if (config.href) {el.hrefL          = config.href}
        config.parentElement.appendChild(el);
        return el;
    };

    var updateCounts = function(event) {
            event.id == 'addObj' ? (currentCount == maxCount ? currentCount = 0 : currentCount++, count++) :
                                   (currentCount--, count--);
        document.querySelector('#count').innerHTML = count;
    };

    var newDate = function(date){
            var tmpDate = new Date(date);
            return tmpDate.getFullYear() + "/" +
                   tmpDate.getMonth() + "/" +
                   tmpDate.getDate() + " " +
                   tmpDate.getHours() + ":" +
                   tmpDate.getMinutes();
    };

    var processNewElement = function(){
        var mainDiv = document.querySelector("#test");

        var secondDiv = createCustomElement ({
            type 			: 'div',
            class			: 'col-sm-3 col-xs-6',
            parentElement 	: mainDiv
        });

        var imgURL = createCustomElement ({
            type 			: 'img',
            class			: 'img-thumbnail',
            parentElement 	: secondDiv,
            src				: internalData[currentCount].url
        });

        var thirdDiv = createCustomElement ({
            type 			: 'div',
            class			: 'info-wrapper',
            parentElement 	: secondDiv
        });

        var lastDiv1 = createCustomElement ({
            type 			: 'div',
            class			: 'text-muted',
            innerHTML       : internalData[currentCount].id + ' ' + internalData[currentCount].name,
            parentElement 	: thirdDiv
        });

        var lastDiv2 = createCustomElement ({
            type 			: 'div',
            class			: 'text-muted',
            innerHTML       : internalData[currentCount].description,
            parentElement 	: thirdDiv
        });

        var lastDiv3 = createCustomElement ({
            type 			: 'div',
            class			: 'text-muted',
            innerHTML       : newDate(internalData[currentCount].date),
            parentElement 	: thirdDiv
        });

        var delDiv = createCustomElement ({
            type 			: 'div',
            class			: 'text-muted',
            parentElement 	: thirdDiv
        });

        var delLink = createCustomElement ({
            type 			: 'a',
            href			: '#',
            class			: 'remove',
            innerHTML       : 'Удалить',
            parentElement 	: delDiv
        });

        updateCounts(this);
    };

    var delteElement = function(event) {
        if (event.target.className == 'remove') {
            document.querySelector('#test').removeChild(event.target.closest('.col-sm-3'));
            updateCounts(this)
        }
    };

	var attachListeners = function() {
		document.querySelector('#addObj').addEventListener("click", processNewElement);
        document.querySelector('#test').addEventListener("click", delteElement);
	};
	
	var init = function(){
        internalData = data;
        maxCount = (internalData.length-1);
		attachListeners();
	};
	
	window.init = init;
}());

init(data);

