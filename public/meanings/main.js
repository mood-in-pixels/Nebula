 $(document).ready(function(){
  // Grandim https://sarcadass.github.io/granim.js/index.html
var granimInstance = new Granim({
    element: '#canvas-interactive',
    name: 'interactive-gradient',
    elToSetClassOn: '.canvas-interactive-wrapper',
    direction: 'diagonal', // left-right, radial, diagonal
    opacity: [1, 1],
    isPausedWhenNotInView: true,
    stateTransitionSpeed: 500, 
    states : {
        "default-state": {
            gradients: [
                ['#e5e5e5', '#ffefd6'],
                ['#ada996', '#f2f2f2'],
                ['#dbdbdb', '#eaeaea']
            ],
            // set loop to true/false for static/dynamic
            // or transitionSpeed for animation
            transitionSpeed: 5000
        },
        "pink-state": {
            gradients: [
                ['#FF5BB8', '#D60076'],
                ['#AA3E82', '#BA295D'],
                ['#FF76BA', '#FFBBF2']
            ],
            transitionSpeed: 5000
        },
        "violet-state": {
            gradients: [
                ['#9D50BB', '#B300A1'],
                ['#6441a5', '#480048'],
                ['#6E48AA', '#9D50BB']
            ],
            transitionSpeed: 5000
        },
        "blue-state": {
            gradients: [ 
                ['#1A2980', '#bbe4ff'], 
                ['#0098ee', '#c2f7ff'],
               ['#bbe4ff', '#1A2980']
            ],
            transitionSpeed: 5000,
            loop: true
        },
        "green-state": {
            gradients: [ 
                ['#B3FFAB', '#ADD100'],
                ['#38ef7d','#11998e'],
                ['#B3FFAB', '#ADD100']
            ],
            transitionSpeed: 5000,
            loop: true
        },
        "yellow-state": {
            gradients: [ 
                ['#ffeb00', '#ffc200'],
                ['#cac531', '#f3f9a7'],
              ['#ffeb00', '#ffc200']
            ],
            transitionSpeed: 5000,
            loop: true
        },
        "orange-state": {
            gradients: [ 
                ['#FF4E50', '#F9D423'], 
                ['#FE8C00', '#F83600'],
              ['#F9D423', '#FF4E50']
            ],
            transitionSpeed: 5000,
            loop: true
        },
        "teal-state": {
            gradients: [ 
                ['#6FE0ED', '#DAE9F4'], 
                ['#fff', '#5EA8B6'],
              ['#6FE0ED', '#DAE9F4']
            ],
            transitionSpeed: 5000,
            loop: true
        },
        "red-state": {
            gradients: [ 
                ['#6F0003', '#FABFC1'],
                ['#8e0e00', '#ef6f63'],
              ['#FABFC1', '#FF0009']
            ],
            transitionSpeed: 5000,
            loop: true
        }
    }
});


// Default
$('#default-state-cta').on('click', function(event) {
     $('.grid').empty();
      $('.text').empty();
    event.preventDefault();
    granimInstance.changeState('default-state');
    setClass('#default-state-cta');
    
});

// Violet
$('#violet-state-cta').on('click', function(event) {
    $('.grid').empty();
    $('.text').empty(); 
    event.preventDefault();
    granimInstance.changeState('violet-state');
    setClass('#violet-state-cta');
    document.getElementById('violet').innerHTML = "<span style='font-size:20px'> VIOLET <br /><br /> Positive: Spiritual awareness, containment, vision, luxury, authenticity, truth, quality. <br /><br /> Negative: Introversion, decadence, suppression, inferiority. <br /><br /> The shortest wavelength is violet, often described as purple. It takes awareness to a higher level of thought, <br>\ even into the realms of spiritual values. It is highly introvertive and encourages deep contemplation, or <br>\ meditation. It has associations with royalty and usually communicates the finest possible quality. <br>\ Being the last visible wavelength before the ultra-violet ray, it has associations with time and space and the <br>\ cosmos. Excessive use of purple can bring about too much introspection and the wrong tone of it communicates something cheap and nasty, faster than any other colour.";
});

// Pink
$('#pink-state-cta').on('click', function(event) {
     $('.grid').empty();
     $('.text').empty();
    event.preventDefault();
    granimInstance.changeState('pink-state');
    setClass('#pink-state-cta');
    document.getElementById('pink').innerHTML = "<span style='font-size:20px'> PINK <br /><br />  Positive: Physical tranquillity, nurture, warmth, femininity, love, sexuality. <br /><br /> Negative: Inhibition, emotional claustrophobia, emasculation, physical weakness. <br /><br /> Being a tint of red, pink also affects us physically, but it soothes, rather than stimulates. Pink is a powerful colour, psychologically. It represents the feminine principle, and survival of the species; it is nurturing and physically <br>\ soothing. Too much pink is physically draining and can be somewhat emasculating.";
});

// Blue
$('#blue-state-cta').on('click', function(event) {
     $('.grid').empty();
     $('.text').empty();
    event.preventDefault();
    granimInstance.changeState('blue-state');
    setClass('#blue-state-cta');
    document.getElementById('blue').innerHTML = "<span style='font-size:20px'> BLUE <br /><br /> Positive: Intelligence, communication, efficiency, duty, logic, coolness. <br /><br /> Negative: Coldness, aloofness, lack of emotion, unfriendliness. <br /><br /> Blue is the colour of the mind and is essentially soothing; it affects us mentally, rather than the physical <br>\ reaction we have to red. Strong blues will stimulate clear thought and lighter, soft blues will calm the mind <br>\ and aid concentration. Consequently it is serene and mentally calming. It is the colour of clear communication. <br>\ Blue objects do not appear to be as close to us as red ones. Time and again in research, blue is the world's <br>\ favourite colour. However, it can be perceived as cold, unemotional and unfriendly.";
});

// Green
$('#green-state-cta').on('click', function(event) {
     $('.grid').empty();
     $('.text').empty();
    event.preventDefault();
    granimInstance.changeState('green-state');
    setClass('#green-state-cta');
    document.getElementById('green').innerHTML = "<span style='font-size:20px'> GREEN <br /><br /> Positive: Harmony, balance, refreshment, universal love, rest, restoration, reassurance, environmental <br>\ awareness, equilibrium, peace. <br /><br /> Negative: Boredom, stagnation, blandness, enervation. <br /><br /> Green strikes the eye in such a way as to require no adjustment whatever and is, therefore, restful. <br>\ Being in the centre of the spectrum, it is the colour of balance - a more important concept than many <br>\ people realise. When the world about us contains plenty of green, this indicates the presence of water, <br>\ and little danger of famine, so we are reassured by green, on a primitive level. Negatively, it can indicate <br>\ stagnation and, incorrectly used, will be perceived as being too bland.";
});

// Yellow
$('#yellow-state-cta').on('click', function(event) {
     $('.grid').empty();
     $('.text').empty();
    event.preventDefault();
    granimInstance.changeState('yellow-state');
    setClass('#yellow-state-cta');
    document.getElementById('yellow').innerHTML = "<span style='font-size:20px'> YELLOW <br /><br /> Positive: Optimism, confidence, self-esteem, extraversion, emotional strength, friendliness, creativity. <br /><br /> Negative: Irrationality, fear, emotional fragility, depression, anxiety. <br /><br /> The yellow wavelength is relatively long and essentially stimulating. In this case the stimulus is emotional, <br>\ therefore yellow is the strongest colour, psychologically. The right yellow will lift our spirits and our self-esteem; <br>\ it is the colour of confidence and optimism. Too much of it, or the wrong tone in relation to the other tones in a <br>\ colour scheme, can cause self-esteem to plummet, giving rise to fear and anxiety. Our yellow streak can surface.";
});

// Orange
$('#orange-state-cta').on('click', function(event) {
     $('.grid').empty();
     $('.text').empty();
    event.preventDefault();
    granimInstance.changeState('orange-state');
    setClass('#orange-state-cta');
    document.getElementById('orange').innerHTML = "<span style='font-size:20px'> ORANGE <br /><br /> Positive: Physical comfort, food, warmth, security, sensuality, passion, abundance, fun. <br /><br /> Negative: Deprivation, frustration, frivolity, immaturity. <br /><br /> Since it is a combination of red and yellow, orange is stimulating and reaction to it is a combination of the <br>\ physical and the emotional. It focuses our minds on issues of physical comfort - food, warmth, shelter etc. <br>\ - and sensuality. It is a 'fun' colour. Negatively, it might focus on the exact opposite - deprivation. This is <br>\ particularly likely when warm orange is used with black. Equally, too much orange suggests frivolity and <br>\ a lack of serious intellectual values.";
});

// Teal (content)
$('#teal-state-cta').on('click', function(event) {
     $('.grid').empty();
     $('.text').empty();
    event.preventDefault();
    granimInstance.changeState('teal-state');
    setClass('#teal-state-cta');
    document.getElementById('teal').innerHTML = "<span style='font-size:20px'> TEAL <br /><br /> Positive: Trust, serenity, reflection, calm, wisdom, balance. <br /><br /> Negative: Analytical, fussy, egocentric. <br /><br /> Teal, a blend of the color blue and the color green, has some of the same cool and calming attributes.";
});

// Red (anger)
$('#red-state-cta').on('click', function(event) {
     $('.grid').empty();
     $('.text').empty();
    event.preventDefault();
    granimInstance.changeState('red-state');
    setClass('#red-state-cta');
    document.getElementById('red').innerHTML = "<span style='font-size:20px'> RED <br /><br /> Positive: Physical courage, strength, warmth, energy, basic survival, fight or flight, stimulation, <br>\ masculinity, excitement. <br /><br /> Negative: Defiance, aggression, visual impact, strain. <br /><br /> Being the longest wavelength, red is a powerful colour. Although not technically the most visible, it has <br>\ the property of appearing to be nearer than it is and therefore it grabs our attention first. Hence its <br>\ effectiveness in traffic lights the world over. Its effect is physical; it stimulates us and raises the pulse rate, <br>\ giving the impression that time is passing faster than it is. It relates to the masculine principle and can <br>\ activate the fight or flight instinct. Red is strong, and very basic. Pure red is the simplest colour, with no <br>\ subtlety. It is stimulating and lively, very friendly. At the same time, it can be perceived as demanding and <br>\ aggressive.";
    
});

function setClass(element) {
    $('.canvas-interactive-wrapper a').removeClass('active');
    $(element).addClass('active');

    
};


  
  //------------------------------------//
  //Navbar//
  //------------------------------------//
    	var menu = $('.navbar');
    	$(window).bind('scroll', function(e){
    		if($(window).scrollTop() > 140){
    			if(!menu.hasClass('open')){
    				menu.addClass('open');
    			}
    		}else{
    			if(menu.hasClass('open')){
    				menu.removeClass('open');
    			}
    		}
    	});
  
 });

