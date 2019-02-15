!function(e){function n(){var e,n,t,r=navigator.userAgent,o=navigator.appName,a=""+parseFloat(navigator.appVersion),i=parseInt(navigator.appVersion,10);(n=r.indexOf("Opera"))!=-1?(o="Opera",a=r.substring(n+6),(n=r.indexOf("Version"))!=-1&&(a=r.substring(n+8))):(n=r.indexOf("MSIE"))!=-1?(o="Microsoft Internet Explorer",a=r.substring(n+5)):(n=r.indexOf("Trident"))!=-1?(o="Microsoft Internet Explorer",a=(n=r.indexOf("rv:"))!=-1?r.substring(n+3):"0.0"):(n=r.indexOf("Chrome"))!=-1?(o="Chrome",a=r.substring(n+7)):(n=r.indexOf("Android"))!=-1?(o="Android",a=r.substring(n+8)):(n=r.indexOf("Safari"))!=-1?(o="Safari",a=r.substring(n+7),(n=r.indexOf("Version"))!=-1&&(a=r.substring(n+8))):(n=r.indexOf("Firefox"))!=-1?(o="Firefox",a=r.substring(n+8)):(e=r.lastIndexOf(" ")+1)<(n=r.lastIndexOf("/"))&&(o=r.substring(e,n),a=r.substring(n+1),o.toLowerCase()==o.toUpperCase()&&(o=navigator.appName)),(t=a.indexOf(";"))!=-1&&(a=a.substring(0,t)),(t=a.indexOf(" "))!=-1&&(a=a.substring(0,t)),i=parseInt(""+a,10),isNaN(i)&&(a=""+parseFloat(navigator.appVersion),i=parseInt(navigator.appVersion,10));var s=new Object;return s.browserName=o,s.fullVersion=a,s.majorVersion=i,s.appName=navigator.appName,s.userAgent=navigator.userAgent,s.platform=navigator.platform,s}function t(e,n){var t=document.getElementsByTagName("script")[0],r=document.createElement("script");r.onreadystatechange=function(){"loaded"!==r.readyState&&"complete"!==r.readyState||(r.onreadystatechange=null,n())},r.onload=function(){n()},r.onerror=function(){x("Error: Cannot load  JavaScript file "+e)},r.src=e,r.type="text/javascript",t.parentNode.insertBefore(r,t)}function r(e){if(R=Module.ccall("mid_song_read_wave","number",["number","number","number","number"],[F,A,2*V,z]),0==R)return void I();for(var n=Math.pow(2,15),t=0;t<V;t++)t<R?e.outputBuffer.getChannelData(0)[t]=Module.getValue(A+2*t,"i16")/n:e.outputBuffer.getChannelData(0)[t]=0;0==W&&(W=k.currentTime)}function o(e,n,t){var o=new XMLHttpRequest;o.open("GET",n+t,!0),o.responseType="arraybuffer",o.onerror=function(){x("Error: Cannot retrieve patch file "+n+t)},o.onload=function(){if(200!=o.status)return void x("Error: Cannot retrieve patch file "+n+t+" : "+o.status);if(B--,FS.createDataFile("pat/",t,new Int8Array(o.response),!0,!0),MIDIjs.message_callback&&B>0&&MIDIjs.message_callback("Instruments to be loaded: "+B),x("Instruments to be loaded: "+B),0==B){var a=Module.ccall("mid_istream_open_mem","number",["number","number","number"],[O,C.length,!1]),s=32784,u=Module.ccall("mid_create_options","number",["number","number","number","number"],[k.sampleRate,s,1,2*V]);F=Module.ccall("mid_song_load","number",["number","number"],[a,u]);Module.ccall("mid_istream_close","number",["number"],[a]);Module.ccall("mid_song_start","void",["number"],[F]),N=k.createScriptProcessor(V,0,1),A=Module._malloc(2*V),N.onaudioprocess=r,N.connect(k.destination),P=setInterval(i,X),MIDIjs.message_callback&&MIDIjs.message_callback("Playing: "+e),x("Playing: "+e+" ...")}},o.send()}function a(e){var n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="arraybuffer",n.onerror=function(){x("Error: Cannot preload file "+e)},n.onload=function(){if(200!=n.status)return void x("Error: Cannot preload file "+e+" : "+n.status)},n.send()}function i(){var e=new Object;0!=W?e.time=k.currentTime-W:e.time=0,MIDIjs.player_callback&&MIDIjs.player_callback(e)}function s(){null!=k&&k.resume()}function u(e){p(),z=!1,V=L,l(e)}function l(e){k.resume().then(c(e))}function c(e){W=0,i();for(var n=0;n<document.scripts.length;n++){var r=document.scripts[n].src;if(E==r)return void d(e)}x("Loading libtimidity ... "),t(E,function(){d(e)})}function d(e){if(-1!=e.indexOf("data:")){var n=e.indexOf(",")+1,t=atob(e.substring(n));C=new Uint8Array(new ArrayBuffer(t.length));for(var r=0;r<t.length;r++)C[r]=t.charCodeAt(r);return void m("data:audio/x-midi ...",C)}x("Loading MIDI file "+e+" ..."),MIDIjs.message_callback("Loading MIDI file "+e+" ...");var o=new XMLHttpRequest;o.open("GET",e,!0),o.responseType="arraybuffer",o.onerror=function(){x("Error: Cannot retrieve MIDI file "+e)},o.onload=function(){return 200!=o.status?void x("Error: Cannot retrieve MIDI file "+e+" : "+o.status):(x("MIDI file loaded: "+e),C=new Int8Array(o.response),void m(e,C))},o.send()}function m(e,n){O=Module._malloc(n.length),Module.writeArrayToMemory(n,O);var t=Module.ccall("mid_init","number",[],[]),a=Module.ccall("mid_istream_open_mem","number",["number","number","number"],[O,n.length,!1]),s=32784,u=Module.ccall("mid_create_options","number",["number","number","number","number"],[k.sampleRate,s,1,2*V]);if(F=Module.ccall("mid_song_load","number",["number","number"],[a,u]),t=Module.ccall("mid_istream_close","number",["number"],[a]),B=Module.ccall("mid_song_get_num_missing_instruments","number",["number"],[F]),0<B)for(var l=0;l<B;l++){var c=Module.ccall("mid_song_get_missing_instrument","string",["number","number"],[F,l]);o(e,H+"pat/",c)}else Module.ccall("mid_song_start","void",["number"],[F]),N=k.createScriptProcessor(V,0,1),A=Module._malloc(2*V),N.onaudioprocess=r,N.connect(k.destination),P=setInterval(i,X),MIDIjs.message_callback&&MIDIjs.message_callback("Playing: "+e),x("Playing: "+e+" ...")}function f(e,n,t){z||(z=!0,V=S,l(H+"../midi/initsynth.midi")),0!=F&&Module.ccall("mid_song_note_on","void",["number","number","number","number"],[F,e,n,t])}function b(){MIDIjs.noteOn(0,60,0)}function I(){N&&(N.disconnect(),N.onaudioprocess=0,N=0),F&&(Module._free(A),Module._free(O),Module.ccall("mid_song_free","void",["number"],[F]),Module.ccall("mid_exit","void",[],[]),F=0)}function p(){I(),clearInterval(P),x(q)}function g(e){return"undefined"==typeof T&&(T=document.createElement("a")),T.href=e,T.href}function M(e){if(e.indexOf("http:")!=-1)return e;var n=g(e),t=n.replace("https:","http:");return t}function v(){var e=new Object;0==W&&(W=(new Date).getTime()),e.time=((new Date).getTime()-W)/1e3,MIDIjs.player_callback&&MIDIjs.player_callback(e)}function _(e){y(),url=M(e);var n=document.getElementById("scorioMIDI");n?n.lastChild.setAttribute("src",url):(n=document.createElement("div"),n.setAttribute("id","scorioMIDI"),n.innerHTML='&nbsp;<bgsound src="'+url+'" volume="0"/>',document.body&&document.body.appendChild(n)),P=setInterval(v,X),W=0,N=n,x("Playing "+url+" ...")}function y(){if(N){var e=N;e.lastChild.setAttribute("src",M(H)+"silence.mid"),clearInterval(P),N=0}x(q)}function j(e){D();var n=document.getElementById("scorioMIDI");n?n.lastChild.setAttribute("data",e):(n=document.createElement("div"),n.setAttribute("id","scorioMIDI"),n.innerHTML='<object data="'+e+'" autostart="true" volume="0" type="audio/mid"></object>',document.body&&document.body.appendChild(n)),P=setInterval(v,X),W=0,N=n,x("Playing "+e+" ...")}function D(){if(N){var e=N;e.parentNode.removeChild(e),clearInterval(P),N=0}x(q)}function h(){for(var e=0;e<document.scripts.length;e++){var n=document.scripts[e].src,t=n.lastIndexOf("midi.js");if(t==n.length-7)return n.substr(0,t)}return null}function x(e){G&&console.log(e)}try{e.MIDIjs=new Object,e.MIDIjs.initError="initializing ...";var w,A,O,C,E,T,P,k=null,N=0,S=512,L=8192,V=L,B=0,R=0,F=0,H="",W=0,q="",z=!1,G=!1,X=100;H=h(),E=H+"libtimidity.js";var U=n();try{("iPhone"==U.platform||"iPod"==U.platform||"iPad"==U.platform)&&U.majorVersion<=6?w="none":(window.AudioContext=window.AudioContext||window.webkitAudioContext,k=new AudioContext,w="WebAudioAPI")}catch(J){w="Microsoft Internet Explorer"==U.browserName?"bgsound":"Android"==U.browserName?"none":"object"}e.MIDIjs.set_logging=function(e){G=e},e.MIDIjs.get_loggging=function(){return G},e.MIDIjs.player_callback=function(e){},e.MIDIjs.message_callback=function(e){},e.MIDIjs.get_audio_status=function(){return q},e.MIDIjs.resumeWebAudioContext=s,"WebAudioAPI"==w?(t(E,function(){}),e.MIDIjs.play=u,e.MIDIjs.stop=p,q="audioMethod: WebAudioAPI, sampleRate (Hz): "+k.sampleRate+", audioBufferSize (Byte): "+V,e.MIDIjs.noteOn=f,e.MIDIjs.startSynth=b):"bgsound"==w?(e.MIDIjs.play=_,e.MIDIjs.stop=y,q="audioMethod: &lt;bgsound&gt;"):"object"==w?(e.MIDIjs.play=j,e.MIDIjs.stop=D,q="audioMethod: &lt;object&gt;"):(e.MIDIjs.play=function(e){},e.MIDIjs.stop=function(e){},q="audioMethod: No method found"),"Microsoft Internet Explorer"==U.browserName&&"https:"==location.protocol.toLowerCase()&&setTimeout(function(){_(M(H)+"silence.mid"),clearInterval(P)},1),-1==location.href.indexOf("scorio.com")&&-1==location.href.indexOf("weblily.net")&&-1==location.href.indexOf("local")||"WebAudioAPI"==w&&(a(H+"pat/arachno-127.pat"),a(H+"pat/MT32Drums/mt32drum-41.pat"),a(E)),e.MIDIjs.initError=null}catch(K){e.MIDIjs=new Object,e.MIDIjs.initError=K}}(this);
//# sourceMappingURL=/lib/midi.js.map