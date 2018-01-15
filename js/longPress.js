(function ($, window, undefined){
    
    var nomPlugin = 'AppLong', document = window.document, defaults = {};
	var caracteres={
        //Tous les caractères
		// Majuscules
		'A':'ĀĂÀÁÂÃÄÅĄⱭ∀Æ',
		'B':'Ɓ',
		'C':'ÇĆĈĊČƆ',
		'D':'ÐĎĐḎƊ',
		'E':'ÈÉÊËĒĖĘẸĚƏÆƎƐ€',
		'F':'ƑƩ',
		'G':'ĜĞĠĢƢ',
		'H':'ĤĦ',
		'I':'ÌÍÎÏĪĮỊİIƗĲ',
		'J':'ĴĲ',
		'K':'ĶƘ',
		'L':'ĹĻĽŁΛ',
		'N':'ÑŃŅŇŊƝ₦',
		'O':'ÒÓÔÕÖŌØŐŒƠƟ',
		'P':'Ƥ¶',
		'R':'ŔŘɌⱤ',
		'S':'ßſŚŜŞṢŠÞ§',
		'T':'ŢŤṮƬƮ',
		'U':'ÙÚÛÜŪŬŮŰŲɄƯƱ',
		'V':'Ʋ',
		'W':'ŴẄΩ',
		'Y':'ÝŶŸƔƳ',
		'Z':'ŹŻŽƵƷẔ',
		// Minuscules
		'a':'āăàáâãäåąɑæαª',
		'b':'ßβɓ',
		'c':'çςćĉċč¢ɔ',
		'd':'ðďđɖḏɖɗ',
		'e':'èéêëēėęẹěəæεɛ€',
		'f':'ƒʃƭ',
		'g':'ĝğġģɠƣ',
		'h':'ĥħɦẖ',
		'i':'ìíîïīįịiiɨĳι',
		'j':'ĵɟĳ',
		'k':'ķƙ',
		'l':'ĺļľłλ',
		'n':'ñńņňŋɲ',
		'o':'òóôõöōøőœơɵ°',
		'p':'ƥ¶',
		'r':'ŕřɍɽ',
		's':'ßſśŝşṣšþ§',
		't':'ţťṯƭʈ',
		'u':'ùúûüūŭůűųưμυʉʊ',
		'v':'ʋ',
		'w':'ŵẅω',
		'y':'ýŷÿɣyƴ',
		'z':'źżžƶẕʒƹ',
		// Autres
		'$':'£¥€₩₨₳Ƀ¤',
		'!':'¡‼‽',
		'?':'¿‽',
		'%':'‰',
		'.':'…••',
		'-':'±‐–—|6⁶₆',
		'+':'±†‡',
        '&':'1¹₁',
        'é':'~2²₂',
        '"':'“”„‟#3³₃',
		'\'':'′″‴‘’‚‛{4⁴₄',
		'(':'[5⁵₅',
        ')':']°',
        'è':'`7⁷₇',
        '_':'\\8⁸₈',
        'ç':'9⁹₉',
        'à':'@0⁰₀',
		'<':'≤‹',
		'>':'≥›',
		'=':'≈≠≡+',
        //caracteres alt
        '0':'φδσΦΘ∞√ⁿ½¼⁰₀',
        '1':'☺☻♂♀♪♫¹₁',
        '2':'♥♦♣♠²₂',
        '3':'•◘○◙×³₃',
        '4':'↑↓→←∟↔↕↨▲▼►◄⁴₄',
        '5':'⁵₅',
        '6':'⁶₆',
        '7':'⁷₇',
        '8':'⁸₈',
        '9':'⁹₉',
	};
    
	var caractereSelect;
	var Carac;
	var timer;
	var activeElement;
	var popup = $('<a class=appuiLong-popup />');

	$(window).keyup(toucheRelachee);

    //on appuie sur une touche
	function toucheEnfoncee(event){		
		activeElement=event.target;
        
		if(event.which == Carac){
			event.preventDefault();
			if(!timer) timer = setTimeout(onTimer, 5);
			return;
		}
		Carac=event.which;
	}
	
    //on relache la touche
	function toucheRelachee(){	
		if(activeElement == null) return;
		Carac=null;
		timer=null;
		cacherPopup();
	}
	
	function onTimer(){
		var CaractAppuye=$(activeElement).val().split('')[getPositionCurseur(activeElement)-1];

		if(caracteres[CaractAppuye]){
			afficherPopup((caracteres[CaractAppuye]));
		}else{
			cacherPopup();
		}
	}

    //afficher popup
	function afficherPopup(caract){
		popup.empty();
		var lettre;
        var i;
		for(i=0; i<caract.length; i++){
			lettre=$('<a class=appuiLong-lettre />').text(caract[i]);
			lettre.mouseenter(activerLettre);
			popup.append(lettre);
		}
		$('body').append(popup);
		caractereSelect=-1;
	}
	
	function activerLettre(event){
		selectCarIndex($(event.target).index());
	}
	
    //cacher popup
	function cacherPopup(){
		popup.detach();
	}
	
    //
	function selectCarIndex(i){
		$('.appuiLong-lettre.selected').removeClass('selected');
		$('.appuiLong-lettre').eq(i).addClass('selected');
		caractereSelect=i;
		updateCar();
	}
    
    //remplacer le caractère par celui sélectionné dans la popup
	function updateCar(){
		var newCar=$('.appuiLong-lettre.selected').text();
		var position=getPositionCurseur(activeElement);
		var arVal=$(activeElement).val().split('');
		arVal[position-1]=newCar;
		$(activeElement).val(arVal.join(''));
		setPositionCurseur(activeElement, position);
	}

    function AppLong(element, options){
        this.element = element;
		this.options = $.extend({}, defaults, options) ;
        this._defaults = defaults;
        this._name = nomPlugin;
        this.init();
    }
    
    AppLong.prototype = {
		init: function () {
			$(this.element).keydown(toucheEnfoncee);
        }
	};
	
	$(function(){
		$('body').first().AppLong();
	});
    
    //définir la position du curseur
    function setPositionCurseur(ctrl, position) {
        if (ctrl.setSelectionRange) {
            ctrl.focus();
            ctrl.setSelectionRange(position,position);
        }
    }
	
    //récupérer la position du curseur
	function getPositionCurseur(ctrl){
		if(ctrl.selectionStart || ctrl.selectionStart == '0'){
			positionCurseur = ctrl.selectionStart;
		}
		return positionCurseur;
	}

    $.fn[nomPlugin] = function (options){
        return this.each(function(){
            if(!$.data(this, 'plugin_' + nomPlugin)){
                $.data(this, 'plugin_' + nomPlugin, new AppLong(this, options));
            }
        });
    };
}(jQuery, window));