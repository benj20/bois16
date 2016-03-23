$(function() {




	// fontSize adapté à la largeur de la page
	var obj = $('#chargement span');
	$(window).on( 'resize', function() {
		obj.css( { 'fontSize': ( parseInt( obj.css( 'fontSize' ) ) * ( obj.parent().width() / obj.width() ) ) / 6 + 'px' } );
	} ).resize();







	// Selection des images en src="
	var elements = $('body').find('img[src]');
	
	
	
	var chargement = $('#chargement');
	var chargementInfos = $('#chargement-infos');
	var elementsCharges = 0;
	var dureeMs = 1000;
	
	function animateStep(now, fx) {
		chargementInfos.text(parseInt(now)+'%');
	}
	
	function chargementEnCours() {
		var pourcentage = 0;
		if(elements.length) {
			pourcentage = parseInt((elementsCharges / elements.length) * 100);
		}
		
		// Affichage du pourcentage
		chargementInfos
			.stop() // stop les anciennes animations
			.animate({width:pourcentage + '%'}, dureeMs);
		chargement
			.stop() // stop les anciennes animations
			.animate({pourcentage:pourcentage}, {
				duration: dureeMs,
				step: animateStep
			});
	}
		
	function chargementTermine() {
		var pourcentage = 100;
		
		// Affichage du pourcentage
		chargementInfos
			.stop() // stop les anciennes animations
			.animate({width:pourcentage + '%'}, (dureeMs / 2));
		chargement
			.stop() // stop les anciennes animations
			.animate({pourcentage:pourcentage}, {
				duration: (dureeMs / 2),
				step: animateStep
			})
			// Disparition du chargement et affichage de la page
			.css({opacity: 1})
			.animate({opacity: 0}, function() {
				// La page est prete
				chargement.css({display:'none'});
				$('#contenu')
					.css({
						opacity: 0,
						display:'visible'
					})
					.show()
					.animate({opacity:1});
				$('nav').show();
			});
		
	}
		
	// La page contient des elements permettant d'afficher une barre de progression
	if(elements.length) {
		chargementEnCours();
		
		elements.load(function() {
			$(this).off('load');
			elementsCharges++;
			chargementEnCours();
		});
	}
	
	$(window).load(function() {
		// La page est integralement chargee
		chargementTermine();
	});
		
	








	// Animation 				
	function hauteur_fenetre()
		{
			if (window.innerHeight) return window.innerHeight  ;
			else if (document.body && document.body.offsetHeight) return document.body.offsetHeight;
			else return 0;
		};


	var Hfenetre = hauteur_fenetre();



	$(window).on('touchmove scroll onscroll', function() {

		var Y = (parseInt(window.pageYOffset/30));

		
		if (Y < 1){
			Y = 1;
		}
		
		else if (Y > 74){
			Y = 74;
		};

		var src = 'animation_jpeg/Grume5_00'+Y+'.jpg';
		
		$('#v0').attr('src', src);
		

		var positionSection = (parseInt(document.getElementById("section").offsetTop)) + 'px';
		var HBlanc = parseInt(document.getElementById("blanc").offsetTop - Hfenetre);
		var pY = window.pageYOffset;
	

		if (pY < 0) {
			$('#v0').css({
				position: 'relative',
				top: '0px'
			});
		}
	
		else if (pY > HBlanc){
			$('#v0').css({
				position: 'relative',
				top: HBlanc + 'px'
			});
		}
		
		else if (pY < HBlanc && pY > 0){
			$('#v0').css({
				position: 'fixed',
				top: positionSection
			});
		};

		
	});








	// Active utilisation de google maps
	$('#planContainer').click(function () {
	    $('#planContainer iframe').css("pointer-events", "auto");
	});







	
	
});