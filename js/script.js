"use strict";
//create a common context to be used by the synth, keyboard and visualizers
let context = new AudioContext;
let mixNode = context.createGain();
mixNode.gain.value = 1;
mixNode.connect(context.destination)
let keyboard

function setUpKeyboard(name,source,div){
	name = new TolerableKeyboard({
            divID: div, 
            octaves:5,
            width:1200,
            showKey:true, 
            autoSetUp:false, 
            firstNote:'C1'
       })

	name.pressNote = function(frequency){
		source.playNote(frequency,0)
	}
	name.releaseNote = function(frequency){
		source.stopNote(frequency,0)
	}
}
function setUpVisualizers(context,mixNode){
	let visualizerVolume = new InadequateVisualizer({context:context,divID:'volumeID',type:'Volume'})
	visualizerVolume.connectAndDraw(mixNode)
	let visualizerFreq = new InadequateVisualizer({context:context,divID:'freqID',type:'Frequency'})
	visualizerFreq.connectAndDraw(mixNode)
	let visualizerScope = new InadequateVisualizer({context:context,divID:'scopeID',type:'Oscilloscope'})
	visualizerScope.connectAndDraw(mixNode)
}
document.addEventListener('DOMContentLoaded', function(){ 

	let synth = new SubstandardSynth({
		context:context,
		outNode:mixNode,
		export:true,
		pageRoot:'https://atactionpark.github.io/SecondRateAudioTools/',
		ID:'synth',
		voices:8,
		//the oscillator, noises, and filter can accept multiple objects
		//oscillator object: {wave: wave type, detune:freq in hz}
		defaultOscillators:[{wave: 'square', detune: 0},{wave: 'triangle', detune: 2}],
		//noise object: {type: noise type, filterType: filter type, cutoff:filter cutoff frequency, volume: noise volume}
		defaultNoises:[],
		//filter object:{type: filter type,frequency: filter cutoff frequency,q: quality factor}
		defaultFilters:[{type:'lowpass',frequency:3000,q:2}],
		//envelope parameters in second
		defaultEnvelope:{peakLevel:0.6,
						sustainLevel:0.2,
						attackTime:0.1,
						decayTime:0.1,
						releaseTime:0.1,
						//for sustain time, 10 codes for infinite sustain
						sustainTime:10},
		distortion:10,
		//show the synth panels
		display:true,
		//The size is in theory changeable, but most of the positions are hard coded
		// so big changes will mostly look bad
		height:400,
		width:800,
		topCaseSize:40,
		caseSize:20,
		outBorderSize:3,
		panelBorderSize:1,
		panelTitleHeight:20,
		panelBorderColor:'white',
		outBorderColor:'white',
		panelTextColor:'black',
		caseColor:'black',
		panelColor:'grey',
		panelTitleColor:'green'
	});
	setUpKeyboard(keyboard,synth,'keyboard');
	setUpVisualizers(context,mixNode);
}, false);




















