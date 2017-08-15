"use strict";
//create a common context to be used by the synth, keyboard and visualizers
let context = new AudioContext;
let mixNode = context.createGain();
mixNode.connect(context.destination)

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
	hljs.initHighlightingOnLoad()

	let synth = new SubstandardSynth({
		context:context,
		outNode:mixNode,
		export:true,
		pageRoot:'https://atactionpark.github.io/SecondRateAudioTools/',
		ID:'synth',
		voices:8,
		//the oscillator, noises, and filter can accept multiple objects
		//oscillator object: {wave: wave type, detune:freq in hz}
		
	});
	setUpKeyboard(keyboard,synth,'keyboard');
	setUpVisualizers(context,mixNode);
}, false);




















