var watson_RightNow;
var watson_Watson;
var watson_Common;
var watson_ConversationPanel;
var watson_EnvioEnlace;
var watson_Chat;
var consultaFibraScope;
var otherLocation = false;
var captureNumber = false;
var resetOther = false;
var scrollGrid = 0;
var scrollRepeat = false;
var resultRow = '';
var autocomplete;
var autocomplete2;
var dobleGrid = 0;
var contextInitial;
var initialID;
var conversationStart = false;
var firstTextInput = 0;
var sent = false;
var permissionDenied = false;
var otrasOpciones = false;
var vuelta = false;
var codPromo;
var lead = false;

var textContentBodyChat = '<div class="segments load">'
	+ '<div class="from-watson top"><div class="message-inner"><p>Hola, soy tu <strong>asistente virtual</strong>.</br>¿En qué dirección quieres consultar la cobertura de Fibra?</p></div></div>'
	+ '</div>'
	+ '<p class="mensajeInfo">Tienes dos opciones:'
	+ '<ol class="mensajeInfo">'
	+ '<li>Pulsando el bot&oacute;n "Capturar Mi Ubicación", tu navegador activar&aacute; el servicio de ubicación para conocer tu dirección actual. Para que funcione correctamente debes permitir su activación.'
	+ '<li>Puedes escribir manualmente la dirección que deseas consultar pulsando en "Escribir Dirección".</li>'
	+ '</ol>'
	+ '<div class="botonesubicacionWatson">'
	+ '<button type="button" id="miubicacionWatson" class="miubicacionWatson" onclick="watson_Location.currentLocation()">Capturar Mi Ubicaci\u00f3n</button>'
	+ '<button type="button" id="otraubicacionWatson" class="otraubicacionWatson" onclick="watson_Location.locationForm()">Escribir Direcci\u00f3n</button>'
	+ '</div>'
	+ '<form name="f1" id="oculto" class="formulario1Watson" style="display:none;">'
	+ '<div class="formulario2Watson">'
	+ '<h2>Mi ubicaci\u00f3n</h2>'
	+ '<div class="labelBox"><p>Tipo de v&iacute;a</p><p>Nombre de v&iacute;a</p></div>'
	+ '<div class="formu1Watson">'
	+ '<input type="text" id="tipoV" placeholder="Tipo de v\u00eda">'
	+ '<input type="text" id="listacalles" list="calle" placeholder="Nombre de la v\u00eda">'
	+ '</div>'
	+ '<div class="labelBox"><p>N\u00famero</p><p>Localidad</p></div>'
	+ '<div class="formu2Watson">'
	+ '<input type="text" id="numero" name="numero" placeholder="N\u00famero">'
	+ '<input type="text" id="listalocalidades" list="localidad" placeholder="Localidad">'
	+ '</div>'
	+ '<div class="labelBox"><p>C\u00f3digo Postal</p><p>Provincia</p></div>'
	+ '<div class="formu3Watson">'
	+ '<input type="text" id="cpWatson" placeholder="CP">'
	+ '<input type="text" id="listaprovincias" list="provincias" placeholder="Provincia">'
	+ '</div>'
	+ '<p class="mensajeInfo">Puedes modificar la informaci\u00f3n mostrada pulsando sobre la caja que quieras modificar.<br>Pulsa el bot\u00f3n "Confirmar" para iniciar la consulta de cobertura.</p>'
	+ '<div id="faltaCampo" class="mensajeInfo"></div>';
	
var textContentBodyChat2 = '</div>'
	+ '</form>'
	+ '<div id="oculto2" class="segments load" style="display:none;">'
	+ '<div class="from-watson top"><div class="message-inner"><p>Por favor, escribe abajo el NOMBRE DE LA V&Iacute;A, N&Uacute;MERO Y LOCALIDAD d&oacute;nde quieres que comprobemos la cobertura.</p></div></div>'
	+ '</div>'
	+ '<div id="oculto3" class="segments load" style="display:none;"> </div>'
	+ '<div id="watsoncliente" style="display:none;"><div class="segments load"><div class="from-user top"><div class="message-inner" id="textodireccion"></div></div></div></div>';

// -----------------------------------------------------------------------------
// Inicio del Chat
// -----------------------------------------------------------------------------
$(document)
	.ready(
	function () {
		$('html').toggleClass('watson-active');
		$('body')
			.append(
			'<div id="watsonContainer" data-canal="web" data-url="URL_VAR">'
			+ '<div id="watsonButton" class="IconoWatson watsonHidden">'
			+ '<a id="popupabrirWatson" href="#watsonPopUp">Te ayudamos a comprobar tu cobertura<i class="oH-icon oH-icon-arrow-down oH_itemDropdownicon" id="flecha_arribaWatson"></i></a>'
			+ '</div>'
			+ '<div class="modal-wrapperWatson" id="watsonPopUp">'
			+ '<div class="watsonPopUpContainer">'
			+ '<div id="cabeceraWatson">'
			+ '<div class="cabeceraWatson__title">'
			// + '<a id="popupcerrarWatson" href="#watsonPopUp">Te ayudamos a
			// comprobar tu cobertura<i class="oH-icon oH-icon-arrow-down
			// oH_itemDropdownicon" id="flecha_abajoWatson"></i></a>'
			+ 'Te ayudamos a comprobar tu cobertura'
			+ '</div>'
			+ '<button type="button" id="resetWatson">'
			+ '<span class="resetWatson__icon">&#8635;</span>'
			+ 'Reiniciar chat'
			+ '</button>'
			+ '</div>'
			+ '<div id="watson__body__chat">'
			+ textContentBodyChat
			+ '<button type="button" id="watson__confirm__btn" class="confirmarWatson" onclick="watson_Location.showTextBox(), watson_Location.submitFormDir()">Confirmar</button>'
			+ textContentBodyChat2
			+ '</div>'
			+ '</div>'
			+ '<label for="textInputchat" id="escribeaqui" style="display:none;" class="inputOutline">'
			+ '<textarea rows="1" data-min-rows="1" id="textInputchat" class="watson__input__field autoExpand" value="" placeholder="Escribe aqu\u00ed..."></textarea>'
			+ '<button id="watson__input__btn">Enviar<label id="countChar"></label></button>'
			+ '</label>'
			+ '</div>'
			+ '<div id="modal-overlay-Watson-img"><strong class="closeModalWatson">\u00d7</strong></div>'
			+ '<div class="modal-overlay-Watson" style="display: block;"></div>'
			+ '</div>');
		//Recogemos el Cod_promo
		var Url = window.location.href;
		var Url2 = Url.split("?", 1);
		var Url3 = Url.split("?", 2);
		Url3 = Url3.toString();
		codPromo = Url3.replace(Url2+",","");
		// Envio de datos a initial_Conversation
		var input = "EVENT_SALUDO_INICIAL";
		contextInitial = {
			"output": "EVENT_SALUDO_INICIAL"
		};

		initial_Conversation.sendRequestInitial(input,
			contextInitial);
	});
// Inicializaciï¿½n de googlemaps para el autocomplete
function init() {
	var textUser;
	var options = {
		types: ['geocode'],
		componentRestrictions: {
			country: "ES"
		},
	};
	var textInputchat = document.getElementById('textInputchat');
	autocomplete = new google.maps.places.Autocomplete(textInputchat, options);
	google.maps.event.addListener(autocomplete, 'place_changed', function () {
		google.maps.event.clearInstanceListeners(textInputchat);
		$(".pac-container").remove();
		document.getElementById("textInputchat").disabled = true;

		if (otherLocation) {
			watson_Location.searchAddress();
			otherLocation = false;
		} else {
			// Retrieve the context from the previous server response
			var context;
			var latestResponse = watson_Watson.getResponsePayload();

			if (latestResponse) {
				context = latestResponse.context;
			}

			// Send the user message
			if (watson_RightNow.getContext().rightnow) {
				watson_RightNow.envioMensaje(textUser);
			} else {

				var s = watson_Watson.getStatus();

				if (s && s == 'default') {
					var canal = $('#watsonContainer').attr('data-canal');
					var urlHTML = $('#watsonContainer').attr('data-url');
					var context = {
						"canal": canal,
						"initialID": initialID
					};

					watson_Watson.setStatus('to-watson');
				}
				watson_Watson.sendRequestReset(textUser, context);
			}

			// Clear input box for further messages
			inputBox.val('');

			// Reset Textarea
			document.getElementById('textInputchat').value = "";
			$(".respuestaboton").addClass("enlaceInhabilitado");
			$('#textInputchat').attr('rows', '1');
			$('#watson__body__chat').css('bottom', '125');
			$('#watsonPopUp  .inputOutline').css('height', '48px');
			$('.pac-container ').css('bottom', '50px');
		}
	});
}

// Verificar que el usuario solo introduce numeros por teclado (en el caso de
// que sea ese dato el que nos falte en la direccion).
function isNumber(evt) {
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	return true;
}

// -----------------------------------------------------------------------------
// Modulo Right Now (actualmente en el canal online no se utiliza)
// -----------------------------------------------------------------------------
watson_RightNow = (function () {

	var debug = false;

	if (debug) {
		var peticionDeChatEndpoint = 'http://localhost:8080/peticionDeChatConRightNow';
		var envioMensajeEndpoint = 'http://localhost:8080/envioMensajeConRightNow';
		var lecturaMensajeEndpoint = 'http://localhost:8080/lecturaMensajeConRightNow';
		var terminarChatEndpoint = 'http://localhost:8080/terminarChatConRightNow';
	} else {
		var peticionDeChatEndpoint = 'https://peticionDeChatConRightNow.eu-gb.mybluemix.net/peticionDeChatConRightNow';
		var envioMensajeEndpoint = 'https://EnvioMensajeConRightNow.eu-gb.mybluemix.net/envioMensajeConRightNow';
		var lecturaMensajeEndpoint = 'https://LecturaMensajeConRightNow.eu-gb.mybluemix.net/lecturaMensajeConRightNow';
		var terminarChatEndpoint = 'https://TerminarChatConRightNow.eu-gb.mybluemix.net/terminarChatConRightNow';
	}

	var context = {};

	var retries = 0;
	var max_retries = 5;

	return {
		check: check,
		getContext: getContext,
		setContext: setContext,
		envioMensaje: envioMensaje,
		terminarChat: terminarChat,
		terminarChatReset: terminarChatReset,
		terminarChatOKReset: terminarChatOKReset
	};

	function logmsg(msg) {
		if (debug) {
			console.log(msg);
		}
	}
	;

	function check(data) {
		logmsg('check - data = ');
		logmsg(data);

		if (data.output && data.output.text && data.output.text.length > 0
			&& data.output.text[0].toUpperCase().match(/&&AGENTE&&/)) {
			logmsg('check - change to agent?');

			if (data.output.text[0].toUpperCase().match(/TRUE/)) {
				logmsg('check - agent = true');

				var c = getContext();
				c.watson = data.context;
				c.returnwatson = {};
				c.returnwatson.status = 'default';
				c.returnwatson.idfaq = 'IdFAQ:agente';
				setContext(c);

				peticionDeChat();
			} else if (data.output.text[0].toUpperCase().match(/FALSE/)) {
				logmsg('check - agent = false');

			}
		}
	}
	;

	function getContext() {
		logmsg('getContext - context = ');
		logmsg(context);

		return context;
	}
	;

	function setContext(c) {
		logmsg('setContext - c = ');
		logmsg(c);

		context = c;
	}
	;

	function peticionDeChat() {
		logmsg('peticionDeChat');

		var data = getContext().user;

		if (retries < max_retries) {
			retries++;
			logmsg('peticionDeChat - retries = ' + retries);

			httpPost(peticionDeChatEndpoint, data, peticionDeChatOK,
				peticionDeChatKO);
		}
	}
	;

	function peticionDeChatOK(reqdata, resdata) {
		logmsg('peticionDeChatOK - reqdata = ');
		logmsg(reqdata);
		logmsg('peticionDeChatOK - resdata = ');
		logmsg(resdata);

		var c = getContext();
		c.rightnow = {};
		c.rightnow.SiteName = resdata.SiteName;
		c.rightnow.transactionID = resdata.transactionID;
		c.rightnow.sesionID = resdata.sesionID;
		c.rightnow.url = resdata.url;
		setContext(c);

		if (resdata.error) {
			switch (resdata.error) {
				case 'FAIL_HOLIDAY':
					displayMsg(
						'agent',
						'Lo sentimos, en estos momentos el servicio no se encuentra disponible. Nuestro horario de atenci&oacute;n es de Lunes a Domingo de 09:00 a 22:00');
					terminarChat();
					break;
				case 'FAIL_NO_AGENTS_AVAIL':
					switch (retries) {
						case 1:
							displayMsg('agent',
								'Bienvenido al Chat de Orange. En breve te atender&aacute; un agente.');
							setTimeout(peticionDeChat, 5000);
							break;
						case max_retries:
							displayMsg('agent',
								'En estos momentos no podemos atenderle, int&eacute;ntelo m&aacute;s tarde.');
							terminarChat();
							break;
						default:
							setTimeout(peticionDeChat, 5000);
					}

					break;
				case 'FAIL_OUT_OF_HOURS':
					displayMsg(
						'agent',
						'Lo sentimos, en estos momentos el servicio no se encuentra disponible. Si lo deseas, puedes enviarnos tu consulta a trav&eacute;s del formulario contacta con nosotros (http://contacta.orange.es/)');
					terminarChat();
					break;
				default:
					displayMsg('agent',
						'Error al hacer la petici&oacute;n con el agente de Orange');
					terminarChat();
			}
		} else {
			lecturaMensaje();
		}
	}
	;

	function peticionDeChatKO(reqdata, resdata) {
		logmsg('peticionDeChatKO - reqdata = ');
		logmsg(reqdata);
		logmsg('peticionDeChatKO - resdata = ');
		logmsg(resdata);
	}
	;

	function lecturaMensaje() {
		logmsg('lecturaMensaje');

		var data = getContext().rightnow;

		httpPost(lecturaMensajeEndpoint, data, lecturaMensajeOK,
			lecturaMensajeKO);
	}
	;

	function lecturaMensajeOK(reqdata, resdata) {
		if (!String.prototype.startsWith) {
			String.prototype.startsWith = function (searchString, position) {
				position = position || 0;
				return this.substr(position, searchString.length) === searchString;
			};
		}
		logmsg('lecturaMensajeOK - reqdata = ');
		logmsg(reqdata);
		logmsg('lecturaMensajeOK - resdata = ');
		logmsg(resdata);

		var c = getContext();

		if (c && c.returnwatson) {
			var status = c.returnwatson.status;
			logmsg('lecturaMensajeOK - status = ' + status);

			if (status == 'default' || status.startsWith('user')) {
				if (resdata.error) {
					displayMsg('agent', resdata.error);
					terminarChat();
				} else {
					if (resdata.mensajes && resdata.mensajes.length > 0) {
						for (var i = 0; i < resdata.mensajes.length; i++) {
							logmsg('lecturaMensajeOK - i = ' + i
								+ ' - mensaje = ');
							logmsg(resdata.mensajes[i]);

							if (resdata.mensajes[i].position) {
								if (status == 'user-wait') {
									watson_ConversationPanel
										.removeLastAgentMessage();
								}

								c.returnwatson = {};
								c.returnwatson.status = 'user-wait';
								c.returnwatson.idfaq = 'IdFAQ:agenteCancela';
								setContext(c);

								displayMsg(
									'agent',
									'Estas en la posici&oacute;n '
									+ resdata.mensajes[i].position
									+ '. El tiempo estimado de espera es de '
									+ resdata.mensajes[i].expectedWaitTimeSeconds
									+ ' s.<div id="rnwaiting"></div>No quiero esperar. Quiero volver a mi consulta.<br><br><button type="button" class="btn btn-default" onclick="watson_RightNow.terminarChat()">Volver</button>');
								lecturaMensaje();
							} else if (resdata.mensajes[i].greeting) {
								if (status == 'user-wait') {
									watson_ConversationPanel
										.removeLastAgentMessage();
								}

								c.returnwatson = {};
								c.returnwatson.status = 'default';
								c.returnwatson.idfaq = 'IdFAQ:agente';
								setContext(c);

								displayMsg('agent',
									resdata.mensajes[i].greeting);
								lecturaMensaje();
							} else if (resdata.mensajes[i].body) {
								displayMsg('agent', resdata.mensajes[i].body);
								lecturaMensaje();
							} else if (resdata.mensajes[i].reason
								&& resdata.mensajes[i].reason == "AGENT_CONCLUDED") {
								displayMsg('agent',
									'El agente ha finalizado la conversaci&oacute;n');
								terminarChat();
							}
						}
					} else {
						lecturaMensaje();
					}
				}
			}
		}
	}
	;

	function lecturaMensajeKO(reqdata, resdata) {
		logmsg('lecturaMensajeKO - reqdata = ');
		logmsg(reqdata);
		logmsg('lecturaMensajeKO - resdata = ');
		logmsg(resdata);
	}
	;

	function envioMensaje(mensaje) {
		logmsg('envioMensaje');

		var data = getContext().rightnow;
		data.mensaje = mensaje;

		displayMsg('user', mensaje);

		httpPost(envioMensajeEndpoint, data, envioMensajeOK, envioMensajeKO);
	}
	;

	function envioMensajeOK(reqdata, resdata) {
		logmsg('lecturaMensajeOK - reqdata = ');
		logmsg(reqdata);
		logmsg('lecturaMensajeOK - resdata = ');
		logmsg(resdata);

		if (resdata.error) {
			displayMsg('user', resdata.error);
		}
	}
	;

	function envioMensajeKO(reqdata, resdata) {
		logmsg('envioMensajeKO - reqdata = ');
		logmsg(reqdata);
		logmsg('envioMensajeKO - resdata = ');
		logmsg(resdata);
	}
	;

	function terminarChat() {
		logmsg('terminarChat');

		var data = getContext().rightnow;

		httpPost(terminarChatEndpoint, data, terminarChatOK, terminarChatKO);
	}
	;

	function terminarChatReset() {
		logmsg('terminarChat');

		var data = getContext().rightnow;

		httpPost(terminarChatEndpoint, data, terminarChatOKReset,
			terminarChatKO);
	}
	;

	function terminarChatOK(reqdata, resdata) {
		logmsg('terminarChatOK - reqdata = ');
		logmsg(reqdata);
		logmsg('terminarChatOK - resdata = ');
		logmsg(resdata);

		var c = getContext();

		if (c) {
			var status = c.returnwatson.status;
			logmsg('terminarChatOK - status = ' + status);

			if (status == 'user-wait') {
				watson_ConversationPanel.removeLastAgentMessage();
				watson_Watson.setStatus('default');
			} else {
				watson_Watson.setStatus('to-agent');
			}

			watson_Watson.sendRequest(c.returnwatson.idfaq, c.watson);

			setContext({});
		}
	}
	;

	function terminarChatOKReset(reqdata, resdata) {
		logmsg('terminarChatOK - reqdata = ');
		logmsg(reqdata);
		logmsg('terminarChatOK - resdata = ');
		logmsg(resdata);

		var c = getContext();

		if (c) {
			var status = c.returnwatson.status;
			logmsg('terminarChatOK - status = ' + status);

			if (status == 'user-wait') {
				watson_ConversationPanel.removeLastAgentMessage();
				watson_Watson.setStatus('default');
			} else {
				watson_Watson.setStatus('to-agent');
			}

			setContext({});
		}
	}
	;

	function terminarChatKO(reqdata, resdata) {
		logmsg('terminarChatKO - reqdata = ');
		logmsg(reqdata);
		logmsg('terminarChatKO - resdata = ');
		logmsg(resdata);
	}
	;

	function httpPost(url, data, onSuccess, onFailure) {
		logmsg('httpPost - url = ' + url);
		logmsg('httpPost - data = ');
		logmsg(data);

		var xmlhttp = new XMLHttpRequest();

		xmlhttp.open('POST', url, true);
		xmlhttp.setRequestHeader('Content-Type',
			'application/json;charset=utf-8');

		xmlhttp.onreadystatechange = function () {
			if (this.readyState == 4) {
				if (this.status == 200) {
					onSuccess(data, JSON.parse(this.responseText));
				} else {
					watson_ConversationPanel.captureErrorWatson();
				}
			}
		};

		xmlhttp.send(JSON.stringify(data));
	}
	;

	function displayMsg(type, msg) {
		logmsg('displayMsg - type = ' + type);
		logmsg('displayMsg - msg = ' + msg);

		if (msg.match(/(http(s?))\:\/\//)) {
			var array = msg.split(/\s+/);
			logmsg('displayMsg - array = ');
			logmsg(array);

			for (var i = 0; i < array.length; i++) {
				if (array[i].match(/(http(s?))\:\/\//)) {
					msg = msg.replace(array[i], '<a href="' + array[i]
						+ '">Pulse aqu&iacute;</a>');
				}
			}
		}

		var data = {};
		data.input = {};
		data.output = {};

		if (type == 'user') {
			data.input.text = [msg];
		} else if (type == 'agent' || type == 'watson') {
			data.output.text = [msg];
		}

		watson_ConversationPanel.displayMessage(data, type);
	}
	;
}());

// -----------------------------------------------------------------------------
// API Conversacion Inicial
// -----------------------------------------------------------------------------

initial_Conversation = (function () {
	// {$ env-pre $}
var comunicacionInicialEndpoint = 'https://chatconwatson.eu-gb.mybluemix.net/conversacion-inicial';
	// {$ end-env-pre $}
	// {$ env-prod $}
// var comunicacionInicialEndpoint = 'https://chatconwatson.eu-de.mybluemix.net/conversacion-inicial';
	// {$ end-env-prod $}
	var requestPayload = new Object();
	var responsePayload = new Object();

	var c = {
		"input": {
			"text": ""
		},
		"context": {
			"initialID": "",
			"output": ""
		}
	};

	requestPayload = c;

	return {
		sendRequestInitial: sendRequestInitial,

		getRequestPayload: function () {
			return requestPayload;
		},
		setRequestPayload: function (newPayloadStr) {
			requestPayload = JSON.parse(newPayloadStr);
		},
		getResponsePayload: function () {
			return responsePayload;
		},
		setResponsePayload: function (newPayloadStr) {
			if ((null != newPayloadStr) && (newPayloadStr != '')) {
				responsePayload = JSON.parse(newPayloadStr);
			} else {
				watson_ConversationPanel.captureErrorWatson();
			}
		}
	};

	function sendRequestInitial(text, context) {
		// Build request payload
		var payloadToWatson = {};
		if (text) {
			payloadToWatson.input = {
				text: text
			};
		}
		if (context) {
			payloadToWatson.context = context;
		}

		// Built http request
		var http = new XMLHttpRequest();
		http.open('POST', comunicacionInicialEndpoint, true);
		http.setRequestHeader('Content-type', 'application/json');
		http.onreadystatechange = function () {
			if (http.readyState === 4 && http.status === 200
				&& http.responseText) {
				initial_Conversation.setResponsePayload(http.responseText);
				document.getElementById('countChar').style.fontSize = "small";
				$('#countChar').html('</br>0/140');
			}
		};

		var params = JSON.stringify(payloadToWatson);
		// Stored in variable (publicly visible through Api.getRequestPayload)
		// to be used throughout the application
		if (Object.getOwnPropertyNames(payloadToWatson).length !== 0) {
			initial_Conversation.setResponsePayload(params);
		}

		// Send request
		http.send(params);
	}

}());

// -----------------------------------------------------------------------------
// WATSON MODULE
//
// Communication with Watson
// -----------------------------------------------------------------------------
watson_Watson = (function () {

	// {$ env-pre $}
var messageEndpoint = 'https://chatconwatson.eu-gb.mybluemix.net/comunicacionConWatson';
var comunicacionEndpoint = 'https://chatconwatson.eu-gb.mybluemix.net/comunicacionConWatson';
	// {$ end-env-pre $}
	// {$ env-prod $}
// var messageEndpoint = 'https://chatconwatson.eu-de.mybluemix.net/comunicacionConWatson';
// var comunicacionEndpoint = 'https://chatconwatson.eu-de.mybluemix.net/comunicacionConWatson';
	// {$ end-env-prod $}
	var status = 'default';
	var conversationId = '';
	var requestPayload = new Object();
	var url = window.location.href;

	var c = {
		"canal": "No Data",
		// "logado": "false",
		// "IdFAQ_Original": url,
	};

	requestPayload = c;

	var responsePayload = new Object();

	return {
		getStatus: getStatus,
		setStatus: setStatus,
		sendRequest: sendRequest,
		sendLocation: sendLocation,
		sendRequestReset: sendRequestReset,
		// The request/response getters/setters are defined here to prevent
		// internal methods
		// from calling the methods without any of the callbacks that are added
		// elsewhere
		getRequestPayload: function () {
			return requestPayload;
		},
		setRequestPayload: function (newPayloadStr) {
			requestPayload = JSON.parse(newPayloadStr);
		},
		getResponsePayload: function () {
			return responsePayload;
		},
		setResponsePayload: function (newPayloadStr) {
			if ((null != newPayloadStr) && (newPayloadStr != '')) {
				responsePayload = JSON.parse(newPayloadStr);
			} else {
				watson_ConversationPanel.captureErrorWatson();
			}
		}
	};

	function getStatus() {
		// console.log('getStatus - status = ' + status);
		return status;
	}
	;

	function setStatus(s) {
		status = s;
	}
	;

	// Envio de la direcciï¿½n a watson. En consultaFibra almacenamos los datos
	// que necesita el microservicio para validar la direccion.
	function sendLocation(text, context, consultaFibra) {
		// Build request payload
		var payloadToWatson = {};
		if (text) {
			payloadToWatson.input = {
				text: text
			};
		}
		if (context) {
			payloadToWatson.context = context;
			context.initialID = initialID;
		}

		if (consultaFibra) {
			payloadToWatson.consultaFibra = consultaFibra;
		}

		// Built http request
		var http = new XMLHttpRequest();
		http.open('POST', messageEndpoint, true);
		http.setRequestHeader('Content-type', 'application/json');
		http.onreadystatechange = function () {
			if (http.readyState === 4 && http.status === 200
				&& http.responseText) {
				document.getElementById("resetWatson").disabled = false;
				document.getElementById("textInputchat").disabled = false;
				setTimeout(function () {
					document.getElementById('textInputchat').focus();
				}, 5);
				// $( "#textInputchat" ).focus();
				$('#resetWatson').removeClass('enlaceInhabilitado');
				watson_Watson.setResponsePayload(http.responseText);
			}
		};

		var params = JSON.stringify(payloadToWatson);
		// Stored in variable (publicly visible through Api.getRequestPayload)
		// to be used throughout the application
		if (Object.getOwnPropertyNames(payloadToWatson).length !== 0) {
			watson_Watson.setRequestPayload(params);
		}

		// Send request
		http.send(params);
		if (!conversationStart) {
			var input = "EVENT_INICIO_CONVERSACION";
			contextInitial.output = "EVENT_INICIO_CONVERSACION";
			initial_Conversation.sendRequestInitial(input, contextInitial);
			conversationStart = true;
		}
	}
	;

	// Send a message request to the server
	function sendRequest(text, context) {
		if (!conversationStart) {
			var input = "EVENT_INICIO_CONVERSACION";
			contextInitial.output = "EVENT_INICIO_CONVERSACION";
			initial_Conversation.sendRequestInitial(input, contextInitial);
			conversationStart = true;
		}
		if (!String.prototype.startsWith) {
			String.prototype.startsWith = function (searchString, position) {
				position = position || 0;
				return this.substr(position, searchString.length) === searchString;
			};
		}
		// Build request payload
		var payloadToWatson = {};

		var c = watson_RightNow.getContext();

		if (text.indexOf('<!datosFormFeedback>') > -1) {
			text = text.replace("<!datosFormFeedback>", "");
			payloadToWatson.noPintar = {
				noPintar: "true"
			};
		} else if (text.startsWith('IdFAQ:')) {
			payloadToWatson.noPintar = {
				noPintar: "true"
			};
		} else if (text.startsWith('EVENT_ENVIAR_FORMULARIO')
			|| text.startsWith('EVENT_NO_GRACIAS_FORMULARIO')
			|| text.startsWith('EVENT_CONFIRMAR_VIVIENDA_GRID')
			|| text.startsWith('EVENT_NO_ES_MI_VIVIENDA_GRID')
			|| text.startsWith('EVENT_CONFIRMAR_DIRECCION_GRID')
			|| text.startsWith('EVENT_NO_ES_MI_DIRECCION_GRID')) {
			payloadToWatson.noPintar = {
				noPintar: "true"
			};
		}
		if (text) {
			payloadToWatson.input = {
				text: text
			};
		}

		if (context) {
			payloadToWatson.context = context;
			context.initialID = initialID;
		}

		if (consultaFibraScope) {
			payloadToWatson.consultaFibra = consultaFibraScope;
		}

		var latestResponse = watson_Watson.getResponsePayload();
		contextold = latestResponse.context;

		if ((context != null) && (contextold != null)
			&& (context != contextold) && !(c && c.rightnow)) {
			conversationId = context.conversation_id;
			return conversationId;
		} else {
			payloadToWatson.context = context;
		}

		// Si se ha reseteado el chat inicializamos valores
		if (conversationId == '1' || resetOther) {
			var canal = $('#watsonContainer').attr('data-canal');
			var urlHTML = $('#watsonContainer').attr('data-url');
			if (conversationId != ''){
				var context = {
					"canal": canal,
					"conversation_id": contextold.conversation_id
				};	
			}
//				else{
//				var context = {
//					"canal": canal
//				};
//			}

			if(initialID){
				context.initialID = initialID;
			}
			payloadToWatson.context = context;
			conversationId = '';
			resetOther = false;
		}

		// Built http request
		var http = new XMLHttpRequest();

		http.open('POST', comunicacionEndpoint, true);
		http.setRequestHeader('Content-type', 'application/json');

		http.onreadystatechange = function () {
			if (http.readyState === 4) {
				document.getElementById('countChar').style.fontSize = "small";
				$('#countChar').html('</br>0/140');
				document.getElementById("resetWatson").disabled = false;
				document.getElementById("textInputchat").disabled = false;
				setTimeout(function () {
					document.getElementById('textInputchat').focus();
				}, 5);
				// $( "#textInputchat" ).focus();
				$('#resetWatson').removeClass('enlaceInhabilitado');
				if ((http.status === 200 && http.responseText
					&& null != http.responseText && http.responseText != '')) {
					watson_RightNow.check(JSON.parse(http.responseText));
					if (!watson_RightNow.getContext().user) {
						watson_Watson.setResponsePayload(http.responseText);
					}
				} else {
					watson_ConversationPanel.captureErrorWatson();
				}
				
				var latestResponse = watson_Watson.getResponsePayload();
				var redireccionATienda; // Boolean
				var enlaceaTienda; // Enlace al que redirigir
				if (latestResponse) {
					console.log('latestResponse', latestResponse);
					context = latestResponse.context;

					if (context && context != "undefined" && context != ''){
						redireccionATienda=context.redirigirATienda;
						enlaceaTienda = context.enlaceaTienda;		
					}
				}
				
				if (redireccionATienda){
					var data = {};
					data.output = {};
					data.output.text = ["¡Ya tenemos todo lo necesario! Te estamos redirigiendo a la tienda para continuar"];
					var type = 'watson';
					watson_ConversationPanel.displayMessage(data, type);
					watson_ConversationPanel.showLoading();
					setTimeout(delay, 3000);
					function delay() {
						window.open(enlaceaTienda, '_self');
						}
				}
			}
		};
		var params = JSON.stringify(payloadToWatson);

		if (Object.getOwnPropertyNames(payloadToWatson).length !== 0) {
			watson_Watson.setRequestPayload(params);
		}

		http.send(params);
		watson_ConversationPanel.showLoading();
		document.getElementById("escribeaqui").disabled = true;
		document.getElementById("resetWatson").disabled = true;
		watson_ConversationPanel.scrollToChatBottom();
	};

	// Send a message request to the server if the chat has been reset
	function sendRequestReset(text, context) {
		if (!String.prototype.startsWith) {
			String.prototype.startsWith = function (searchString, position) {
				position = position || 0;
				return this.substr(position, searchString.length) === searchString;
			};
		}
		if ($('.btn-block').length) {
			$(".btn-block").addClass("enlaceInhabilitado");
			$(".btn-block").prop('disabled', true);
		}
		// Build request payload
		var payloadToWatson = {};

		var c = watson_RightNow.getContext();

		if (text.indexOf('<!datosFormFeedback>') > -1) {
			text = text.replace("<!datosFormFeedback>", "");
			payloadToWatson.noPintar = {
				noPintar: "true"
			};
		} else if (text.startsWith('IdFAQ:')) {
			payloadToWatson.noPintar = {
				noPintar: "true"
			};
		}

		if (text) {
			payloadToWatson.input = {
				text: text
			};
		}
		console.log(context);
		if (context) {
			payloadToWatson.context = context;
			context.initialID = initialID;
		}

		if (consultaFibraScope) {
			payloadToWatson.consultaFibra = consultaFibraScope;
		}

		var latestResponse = watson_Watson.getResponsePayload();
		contextold = latestResponse.context;

		if ((context != null) && (contextold != null)
			&& (context != contextold)) {
			conversationId = context.conversation_id;
			return conversationId;
		} else {
			payloadToWatson.context = context;
		}

		if (conversationId == '1') {
			var canal = $('#watsonContainer').attr('data-canal');
			var urlHTML = $('#watsonContainer').attr('data-url');
			console.log(context);
			var context = {
				"canal": canal,
			};
			console.log(initialID);
			if(initialID){
				context.initialID = initialID;
			}
			payloadToWatson.context = context;
			conversationId = '';
		}

		// Built http request
		var http = new XMLHttpRequest();

		http.open('POST', comunicacionEndpoint, true);
		http.setRequestHeader('Content-type', 'application/json');

		http.onreadystatechange = function () {
			if (http.readyState === 4) {
				document.getElementById('countChar').style.fontSize = "small";
				$('#countChar').html('</br>0/140');
				document.getElementById("resetWatson").disabled = false;
				document.getElementById("textInputchat").disabled = false;
				setTimeout(function () {
					document.getElementById('textInputchat').focus();
				}, 5);
				// $( "#textInputchat" ).focus();
				$('#resetWatson').removeClass('enlaceInhabilitado');
				watson_Watson.setResponsePayload(http.responseText);
				// -Inicio- RedirecciÃ³n cuando se introduce el nÃºmero fijo
				var context;
				var latestResponse = watson_Watson.getResponsePayload();
				var redireccionATienda; // Boolean
				var enlaceaTienda; // Enlace al que redirigir
				//-INICIO- Quitamos el textInput y el boton enviar cuando se nos cargue el formulario C2C
				if (latestResponse.context.text[1].includes("feedbackSmartFormSi")){
					document.getElementById('escribeaqui').style.display = 'none';
					}
				//-FIN- Quitamos el textInput y el boton enviar cuando se nos cargue el formulario C2C
				if (latestResponse) {
					console.log('latestResponse', latestResponse);
					context = latestResponse.context;
					if (context && context != "undefined" && context != ''){
						redireccionATienda=context.redirigirATienda;
						enlaceaTienda = context.enlaceaTienda;		
					}
				}
				console.log('vamos a la tienda');
				if (redireccionATienda){
					var data = {};
					data.output = {};
					data.output.text = ["¡Ya tenemos todo lo necesario! Te estamos redirigiendo a la tienda para continuar"];
					var type = 'watson';
					watson_ConversationPanel.displayMessage(data, type);
					watson_ConversationPanel.showLoading();
					setTimeout(delay, 3000);
					function delay() {
						window.open(enlaceaTienda, '_self');
						}
				}
				// -Fin-
			}
		};

		var params = JSON.stringify(payloadToWatson);

		if (Object.getOwnPropertyNames(payloadToWatson).length !== 0) {
			watson_Watson.setRequestPayload(params);
		}

		http.send(params);
		watson_ConversationPanel.showLoading();
		document.getElementById("escribeaqui").disabled = true;
		document.getElementById("resetWatson").disabled = true;
		watson_ConversationPanel.scrollToChatBottom();
	};
}());

// -----------------------------------------------------------------------------
// COMMON MODULE
//
// The Common module is designed as an auxiliary module
// to hold functions that are used in multiple other modules
// -----------------------------------------------------------------------------
watson_Common = (function () {
	return {
		buildDomElement: buildDomElementFromJson,
		listForEach: listForEach,
		openWatson: openWatson,
		closeWatson: closeWatson,
		resetWatson: resetWatson,
		submitForm: submitForm,
		checkFormLocation: checkFormLocation,
		checkFormLocationOther: checkFormLocationOther,
		noSubmitForm: noSubmitForm,
		sendCookie: sendCookie
	};

	function buildDomElementFromJson(domJson) {
		// Create a DOM element with the given tag name
		var element = document.createElement(domJson.tagName);

		// Fill the "content" of the element
		if (domJson.text) {
			element.innerHTML = domJson.text;
		} else if (domJson.html) {
			element.insertAdjacentHTML('beforeend', domJson.html);
		}

		// Add classes to the element
		if (domJson.classNames) {
			for (var i = 0; i < domJson.classNames.length; i++) {
				element.classList.add(domJson.classNames[i]);
			}
		}

		// Add attributes to the element
		if (domJson.attributes) {
			for (var j = 0; j < domJson.attributes.length; j++) {
				var currentAttribute = domJson.attributes[j];
				element.setAttribute(currentAttribute.name,
					currentAttribute.value);
			}
		}

		// Add children elements to the element
		if (domJson.children) {
			for (var k = 0; k < domJson.children.length; k++) {
				var currentChild = domJson.children[k];
				element.appendChild(buildDomElementFromJson(currentChild));
			}
		}

		return element;
	}

	// A function that runs a for each loop on a List, running the callback
	// function for each one
	function listForEach(list, callback) {
		for (var i = 0; i < list.length; i++) {
			callback.call(null, list[i]);
		}
	}

	// Open Watson
	function openWatson() {
		var latestResponse = initial_Conversation.getResponsePayload();
		if (latestResponse) {
			initialID = latestResponse.initialID;
			contextInitial.initialID = initialID;
		}
		var input = "EVENT_MAXIMIZAR";
		contextInitial.output = "EVENT_MAXIMIZAR";
		initial_Conversation.sendRequestInitial(input, contextInitial);

		document.getElementById("resetWatson").disabled = true;
		$("#watsonButton").toggleClass('watsonHidden');
		$("#watsonPopUp").toggleClass('watsonHidden');
		$('html').toggleClass('watson-active');

		if ($("#watsonPopUp").hasClass('watsonHidden')) {
			$('.modal-overlay-Watson').fadeOut();
		} else {
			$('.modal-overlay-Watson').fadeIn();
		}
	}

	// Close Watson
	function closeWatson() {

		var latestResponse = initial_Conversation.getResponsePayload();
		if (latestResponse) {
			initialID = latestResponse.initialID;
			contextInitial.initialID = initialID;
		}
		var input = "EVENT_MINIMIZAR";
		contextInitial.output = "EVENT_MINIMIZAR";
		initial_Conversation.sendRequestInitial(input, contextInitial);

		var c = watson_RightNow.getContext();

		if (c && c.rightnow) {
			c.returnwatson = {};
			c.returnwatson.status = 'user-close';
			c.returnwatson.idfaq = 'IdFAQ:agente';
			watson_RightNow.setContext(c);
			watson_RightNow.terminarChat();
			return false;
		} else {
			$("#watsonButton").toggleClass('watsonHidden');
			$("#watsonPopUp").toggleClass('watsonHidden');
			$('html').toggleClass('watson-active');

			if ($("#watsonPopUp").hasClass('watsonHidden')) {
				$('.modal-overlay-Watson').fadeOut();

			} else {
				$('.modal-overlay-Watson').fadeIn();
			}
		}
	}

	// Reset Watson
	function resetWatson() {
		//-Inicio- NÃºmero no informado o no encontrado (Reseteo de variable)
		vuelta = false;
		//-Fin- NÃºmero no informado o no encontrado (Reseteo de variable)
		var input = "EVENT_SALUDO_INICIAL_RESET";
		contextInitial = {
			"output": "EVENT_SALUDO_INICIAL",
		};

		initial_Conversation.sendRequestInitial(input, contextInitial);

		conversationStart = false;
		scrollRepeat = false;
		dobleGrid = 0;
		otherLocation = false;
		captureNumber = false;
		scrollGrid = 0;
		resetOther = true;
		firstTextInput++;
		$('#escribeaqui').removeClass('animationPulse');

		$('#textInputchat').removeAttr('onkeypress');
		document.getElementById('escribeaqui').style.display = 'none';
		$('.inputOutline').css('display', 'none');
		document.getElementById('textInputchat').value = "";

		// Insertar contentHTML
		$('#watson__body__chat').html(textContentBodyChat
			+ '<button type="button" id="watson__confirm__btn" class="confirmarWatson" onclick="watson_Location.submitFormDirReset()">Confirmar</button>'
			+ textContentBodyChat2);

		// Cierre
		var c = watson_RightNow.getContext();

		if (c && c.rightnow) {
			c.returnwatson = {};
			c.returnwatson.status = 'user-reset';
			c.returnwatson.idfaq = 'IdFAQ:agente';
			watson_RightNow.setContext(c);
			watson_RightNow.terminarChatReset();
		}

		// Inicializaciï¿½n
		var canal = $('#watsonContainer').attr('data-canal');
		var urlHTML = $('#watsonContainer').attr('data-url');
		var context = {
			"canal": canal,
			// "logado":"false",
			// "IdFAQ_Original": urlHTML,
//			"nombre": "",
//			"email": "",
//			"telefono": ""
		};

		watson_Watson.setStatus('to-init');
		// watson_Watson.sendRequestReset('', context);

		$('#textInputchat').removeAttr('disabled');
	}

	// Validate contact-form
	function checkForm(name, phone) {
		var validation = true;

		// Name
		if (name == '') {
			$('#nameFeedback').addClass('watsonInputNovalid');
			validation = false;
		}

		// Phone - [0-9]{9}
		var regexPhone = new RegExp($('#phoneFeedback').attr('pattern'));

		if (!regexPhone.test(phone)) {
			$('#phoneFeedback').addClass('watsonInputNovalid');
			validation = false;
		}

		return validation;
	}

	// Validate address-form
	function checkFormLocation(listaprovincias, listalocalidades, cpWatson,
		tipoV, listacalles, numero) {
		var validation = true;

		// Name
		if (listaprovincias == '') {
			$('#listaprovincias').addClass('watsonInputNovalid');
			validation = false;
		}

		if (listalocalidades == '') {
			$('#listalocalidades').addClass('watsonInputNovalid');
			validation = false;
		}

		if (cpWatson == '') {
			$('#cpWatson').addClass('watsonInputNovalid');
			validation = false;
		}

		if (tipoV == '') {
			$('#tipoV').addClass('watsonInputNovalid');
			validation = false;
		}

		if (listacalles == '') {
			$('#listacalles').addClass('watsonInputNovalid');
			validation = false;
		}

		if (numero == '') {
			$('#numero').addClass('watsonInputNovalid');
			validation = false;
		}

		return validation;
	}

	// Validate address-form reset
	function checkFormLocationOther(listaprovincias, listalocalidades,
		cpWatson, tipoV, listacalles, numero) {
		var validation = true;

		// Name
		if (listaprovincias == '') {
			$('#provincia').addClass('watsonInputNovalid');
			validation = false;
		}

		if (listalocalidades == '') {
			$('#localidad').addClass('watsonInputNovalid');
			validation = false;
		}

		if (cpWatson == '') {
			$('#cpW').addClass('watsonInputNovalid');
			validation = false;
		}

		if (tipoV == '') {
			$('#tipoVia').addClass('watsonInputNovalid');
			validation = false;
		}

		if (listacalles == '') {
			$('#nombreVia').addClass('watsonInputNovalid');
			validation = false;
		}

		if (numero == '') {
			$('#numeroW').addClass('watsonInputNovalid');
			validation = false;
		}

		return validation;
	}

	// Send contact-form Right Now
	function submitForm() {
		scrollRepeat = true;
		// Reset style validation
		$('#nameFeedback').removeClass('watsonInputNovalid');
		$('#phoneFeedback').removeClass('watsonInputNovalid');

		var nameFeedback = $('#nameFeedback').val();
		var phoneFeedback = $('#phoneFeedback').val();

		var textoFormFeed = "EVENT_ENVIAR_FORMULARIO";

		var latestResponse = watson_Watson.getResponsePayload();

		var validation = checkForm(nameFeedback, phoneFeedback);

		if (validation) {
			$('#validateFormResultLocation').html('');

			// Define context
			if (latestResponse) {
				context = latestResponse.context;
			}

			context["nombreCliente"] = nameFeedback;
			context["telefonoContacto"] = phoneFeedback;

			// Send the user message
			watson_Watson.sendRequest(textoFormFeed, context);
			// Disable options
			document.getElementById("nameFeedback").disabled = true;
			document.getElementById("phoneFeedback").disabled = true;
			document.getElementById("feedbackSmartFormNo").disabled = true;
			document.getElementById("feedbackSmartFormSi").disabled = true;
			$("#feedbackSmartFormNo").addClass("enlaceInhabilitado");
			$("#feedbackSmartFormSi").addClass("enlaceInhabilitado");

		} else {
			$("div")
				.find('#feedbackSmartFormResult')
				.html(
				'<span class="errorValidityForm">Debes introducir tu nombre y tel&eacute;fono en formato correcto.</span>');
			watson_ConversationPanel.scrollToChatBottom();
		}
		return false;

	}

	// Deny sending contact-form Right Now
	function noSubmitForm() {
		scrollRepeat = true;
		var context;
		var textoFormFeed = "EVENT_NO_GRACIAS_FORMULARIO";
		var latestResponse = watson_Watson.getResponsePayload();

		if (latestResponse) {
			context = latestResponse.context;
		}

		// Send the user message
		watson_Watson.sendRequest(textoFormFeed, context);
		document.getElementById("nameFeedback").disabled = true;
		document.getElementById("phoneFeedback").disabled = true;
		document.getElementById("feedbackSmartFormNo").disabled = true;
		$("#feedbackSmartFormNo").addClass("enlaceInhabilitado");
		document.getElementById("feedbackSmartFormSi").disabled = true;
		$("#feedbackSmartFormSi").addClass("enlaceInhabilitado");
	}

	// Send cookies
	function sendCookie() {
		var latestResponse = watson_Watson.getResponsePayload();
		contextForm = latestResponse.context.TarifaLinea_movil;
		if (latestResponse) {
			if (!contextForm) {
				document.cookie = "ws_normalizacion_tipovia" + "="
					+ consultaFibra.tipoVia + ";domain=.orange.es;path=/";
				document.cookie = "ws_normalizacion_calle" + "="
					+ consultaFibra.nombreVia + ";domain=.orange.es;path=/";
				document.cookie = "ws_normalizacion_numero" + "="
					+ consultaFibra.numero + ";domain=.orange.es;path=/";
				document.cookie = "ws_normalizacion_provincia" + "="
					+ consultaFibra.provincia + ";domain=.orange.es;path=/";
				document.cookie = "ws_normalizacion_localidad" + "="
					+ consultaFibra.localidad + ";domain=.orange.es;path=/";
				document.cookie = "ws_normalizacion_cp" + "="
					+ consultaFibra.cp + "; domain=.orange.es;path=/";
				document.cookie = "ws_normalizacion_bloque" + "="
					+ latestResponse.context.bloque
					+ ";domain=.orange.es;path=/";
				document.cookie = "ws_normalizacion_id_finca" + "="
					+ latestResponse.context.portal
					+ ";domain=.orange.es;path=/";
				document.cookie = "ws_normalizacion_escalera" + "="
					+ latestResponse.context.escalera
					+ ";domain=.orange.es;path=/";
				document.cookie = "ws_normalizacion_escalera_trad" + "="
					+ latestResponse.context.escalera
					+ ";domain=.orange.es;path=/";
				document.cookie = "ws_normalizacion_planta" + "="
					+ latestResponse.context.planta
					+ ";domain=.orange.es;path=/";
				document.cookie = "ws_normalizacion_portal" + "="
					+ latestResponse.context.portal
					+ ";domain=.orange.es;path=/";
				document.cookie = "ws_normalizacion_id_escalera" + "="
					+ latestResponse.context.escalera
					+ ";domain=.orange.es;path=/";
				document.cookie = "ws_normalizacion_num_finca" + "="
					+ consultaFibra.numero + ";domain=.orange.es;path=/";
				document.cookie = "ws_normalizacion_mano1" + "="
					+ latestResponse.context.tipoPuerta
					+ ";domain=.orange.es;path=/";
				document.cookie = "ws_normalizacion_mano2" + "="
					+ latestResponse.context.puerta
					+ ";domain=.orange.es;path=/";
				if (latestResponse.context.telefonoFijo != '') {
					document.cookie = "telefono" + "="
						+ latestResponse.context.telefonoFijo
						+ ";domain=.orange.es;path=/";
					document.cookie = "c_number" + "="
						+ latestResponse.context.telefonoFijo
						+ ";domain=.orange.es;path=/";
				} else {
					document.cookie = "telefono" + "=" + "910000000"
						+ ";domain=.orange.es;path=/";
					document.cookie = "c_number" + "=" + "910000000"
						+ ";domain=.orange.es;path=/";
				}
			}
		}
		var context;
		var textoFormFeed = "<!datosFormFeedback>"
			+ "boton de enlace a tienda pulsado - fin de chat";
		var latestResponse = watson_Watson.getResponsePayload();

		if (latestResponse) {
			context = latestResponse.context;
		}
		context.subfaseCob = "bot\u00f3n de enlace a tienda pulsado - fin de chat";
		// Send the user message
		watson_Watson.sendRequest(textoFormFeed, context);
		watson_Common.resetWatson();
	}

}());

// -----------------------------------------------------------------------------
// CONVERSATIONPANEL MODULE
//
// The ConversationPanel module is designed to handle
// all display and behaviors of the conversation column of the app
// -----------------------------------------------------------------------------
watson_ConversationPanel = (function () {
	var settings = {
		selectors: {
			chatBox: '#watson__body__chat',
			fromUser: '.from-user',
			fromWatson: '.from-watson',
			fromAgent: '.from-watson.from-agent',
			botonesOtherLocation: '.botonesOtherLocation',
			latest: '.latest'
		},
		authorTypes: {
			user: 'user',
			watson: 'watson',
			agent: 'agent'
		}
	};

	// Publicly accessible methods defined
	return {
		init: init,
		inputKeyDown: inputKeyDown,
		buttonClick: buttonClick,
		scrollToChatBottom: scrollToChatBottom,
		displayMessage: displayMessage,
		removeLastAgentMessage: removeLastAgentMessage,
		captureRow4: captureRow4,
		captureRow6: captureRow6,
		locationRefuse4: locationRefuse4,
		locationRefuse6: locationRefuse6,
		confirmLocation4: confirmLocation4,
		confirmLocation6: confirmLocation6,
		captureErrorWatson: captureErrorWatson,
		resetTextArea: resetTextArea,
		meInteresaOferta: meInteresaOferta,
		mantenerFijoCheck: mantenerFijoCheck,
		verOtrasOpciones: verOtrasOpciones,
		showLoading: showLoading
	};

	// Initialize the module
	function init() {
		chatUpdateSetup();
	}
	
	function mantenerFijoCheck(){
		
		var check = $('.checkNumFijo:last input')[0];
		if(check.checked){
			
		var context;
		var latestResponse = watson_Watson.getResponsePayload();

		if (latestResponse) {
			context = latestResponse.context;
			context.noesmidireccion = true;
		}
		if (includes(codPromo,"PROMO_CODE")){
			context.enlaceaTienda = context.enlaceaTienda+"&"+codPromo;
		}
		function includes(codPromo, value) {
			var returnValue = false;
			var pos = codPromo.indexOf(value);
			if (pos >= 0) {
				returnValue = true;
			}
			return returnValue;
		}		
		var text = $(".meInteresaBtn:last").data('msg');
		text = '<!datosFormFeedback>' + text;
		watson_Watson.sendRequest(text, context);
		document.getElementById('escribeaqui').style.display = 'block';
		document.getElementById('textInputchat').disabled = true;
		$('.meInteresaBtn:last')[0].disabled = true;
		$('.verMasOpcionesBtn:last')[0].disabled = true;	
		}
	}

	// INCIO -Nueva funcion para los botones "Me interesa" y "Ver otras
	// opciones"
	function meInteresaOferta() {
		
		var context;
		var latestResponse = watson_Watson.getResponsePayload();

		if (latestResponse) {
			context = latestResponse.context;
			context.noesmidireccion = true;
		}
		// -Inicio- RedirecciÃ³n cuando se introduce el nÃºmero fijo
		var enlaceaTienda; // Enlace al que redirigir
		if (context && context != "undefined" && context != ''){
				enlaceaTienda = context.enlaceaTienda;		
		}
		if (includes(codPromo,"PROMO_CODE")){
			enlaceaTienda = enlaceaTienda+"&"+codPromo;
		}
		function includes(codPromo, value) {
			var returnValue = false;
			var pos = codPromo.indexOf(value);
			if (pos >= 0) {
				returnValue = true;
			}
			return returnValue;
		}
			$('#watson__input__btn').addClass("enlaceInhabilitado");
			$('#textInputchat').addClass("enlaceInhabilitado");
			var data = {};
			data.output = {};
			data.output.text = ["¡Ya tenemos todo lo necesario! te estamos redirigiendo a la tienda para continuar con el proceso de contrataci&oacute;n"];
			var type = 'watson';
			watson_ConversationPanel.displayMessage(data, type);
			watson_ConversationPanel.showLoading();
			setTimeout(delay, 3000);
			function delay() {
				window.open(enlaceaTienda, '_self');
				}
	}

	function verOtrasOpciones() {
		$(".mantenerFijoCheck:last")[0].checked = false;
		otrasOpciones = true;
		var text = $(".verMasOpcionesBtn:last").data('msg');
		text = '<!datosFormFeedback>' + text;
		var context;
		var latestResponse = watson_Watson.getResponsePayload();

		if (latestResponse) {
			context = latestResponse.context;
			context.noesmidireccion = true;
			conversationId = '';
			resetOther = false;
		}
		watson_Watson.sendRequest(text, context);
		document.getElementById('escribeaqui').style.display = 'block';
		document.getElementById('textInputchat').disabled = true;
		$('.meInteresaBtn:last')[0].disabled = true;
		$('.verMasOpcionesBtn:last')[0].disabled = true;
	}
	// FIN

	function showLoading() {
		$(".segments:last").after('<div id="watsonWaiting"><div id="loadingLogo"></div><div id="loadingMessage"><div id="watson-style"><div id="messageLoading"><p>Espera un momento, esto puede tardar un poco.</p></div></div></div></div>');
		setTimeout(function () {
			$('#loadingMessage').show();
			watson_ConversationPanel.scrollToChatBottom();
		}, 5000);
	}

	// Set up callbacks on payload setters in Watson module
	// This causes the displayMessage function to be called when messages are
	// sent/received
	function chatUpdateSetup() {
		var currentRequestPayloadSetter = watson_Watson.setRequestPayload;

		watson_Watson.setRequestPayload = function (newPayloadStr) {
			currentRequestPayloadSetter.call(watson_Watson, newPayloadStr);
			if (null == JSON.parse(newPayloadStr).noPintar
				|| undefined == JSON.parse(newPayloadStr).noPintar) {
				displayMessage(JSON.parse(newPayloadStr),
					settings.authorTypes.user);
			}
		};

		var currentResponsePayloadSetter = watson_Watson.setResponsePayload;

		watson_Watson.setResponsePayload = function (newPayloadStr) {
			if ((null != newPayloadStr) && (newPayloadStr != '')) {
				currentResponsePayloadSetter.call(watson_Watson, newPayloadStr);
				displayMessage(JSON.parse(newPayloadStr),
					settings.authorTypes.watson);
				var context;
				var latestResponse = watson_Watson.getResponsePayload();
			} else {
				watson_ConversationPanel.captureErrorWatson();
			}
			if (latestResponse) {
				contextFin = latestResponse.context.finConversacion;
				contextBlockInput = latestResponse.context.BloqueaInput;
				contextForm = latestResponse.context.ErrorCode;
				// en caso de que watson nos devuelva un ErrorCode 4
				if (contextForm == '4') {
					dobleGrid++;
					var direcccionesAlternativas = latestResponse.context.direcccionesAlternativas;
					var cadenaDireccionRecuperar = "Planta:Planta|Mano1:Tipo de puerta|Mano2:Puerta|IdFinca:Portal|BisDuplicado:Bis|Escalera:Escalera|Bloque:Bloque";

					$(".segments:last")
						.after(
						"<div class='segments load confirmFlat'><h3>Por favor, selecciona exactamente tu vivienda para poder comprobar la cobertura:</h3>"
						+"<span class='myDirectionWatson'><p>"
						+ consultaFibra.tipoVia + " "
						+ consultaFibra.nombreVia + " "
						+ consultaFibra.numero + ", "
						+ consultaFibra.localidad + "("
						+ consultaFibra.provincia + ") "
						+ consultaFibra.cp + "</p></span>"
						+ generarTablaDireccionesError4(direcccionesAlternativas, cadenaDireccionRecuperar).innerHTML
						+ "</div>"
						);

					$("#confirmLocation4").addClass("botonInhabilitado");
					watson_ConversationPanel.scrollToChatBottom('.confirmFlat');
				}
				// en caso de que watson nos devuelva un ErrorCode 6
				if (contextForm == '6') {
					dobleGrid++;
					var direcccionesAlternativas = latestResponse.context.direcccionesAlternativas;
					var cadenaDireccionRecuperar = "TipoVia:Tipo de v\u00eda|NombreVia:Nombre de la v\u00eda|Numero:N\u00famero|CP:CP|CodigoArvato:CodigoArvato";
					var cadenaElementosEscondidos = "CodigoArvato";
					$(".segments:last")
						.after(
						"<div class='segments load confirmDirection'><h3>Por favor, selecciona exactamente tu direcci\u00f3n:</h3>"
						+ "<span class='myDirectionWatson'><p>"
						+ consultaFibra.tipoVia + " "
						+ consultaFibra.nombreVia + " "
						+ consultaFibra.numero + ", "
						+ consultaFibra.localidad + "("
						+ consultaFibra.provincia + ") "
						+ consultaFibra.cp + "</p></span>"
						+ generarTablaDireccionesError6(direcccionesAlternativas, cadenaDireccionRecuperar, cadenaElementosEscondidos).innerHTML
						+ "</div>"
						);
					$("#confirmLocation6").addClass("botonInhabilitado");
					watson_ConversationPanel.scrollToChatBottom();
				}
				// en caso de que watson nos devuelva un ErrorCode 5
				if (contextForm == '5') {
					$(".segments:last")
						.after(
						"<div class='from-watson top'><div class='message-inner'><p>No se han encontrado viviendas en la direcci\u00f3n indicada.<br> Por favor pulsa aqu\u00ed <button type=\"button\" id=\"resetWatsonIcon\"><span>\u21bb</span></button> para comprobar la cobertura en otra direcci\u00f3n o llama al 900 263 176 para que te ayudemos.<br> Muchas gracias.</p></div></div>"
						);
					watson_ConversationPanel.scrollToChatBottom();
					document.getElementById('escribeaqui').style.display = 'none';
					if (null != document.getElementById('watsonWaiting')) {
						// document.getElementById('watsonWaiting').remove();
						$("div").find('#watsonWaiting').remove();
						document.getElementById("escribeaqui").disabled = false;
						document.getElementById("resetWatson").disabled = false;
					}
				}
				if (contextForm == '21') {
					console.log(context)
					$("div").find('#watsonWaiting').remove();
					document.getElementById('escribeaqui').style.display = 'none';
					document.getElementById("escribeaqui").disabled = true;
					document.getElementById("resetWatson").disabled = false;
				}
				if ((contextForm != null) && (contextForm != '4')
					&& (contextForm != '6') && (contextForm != '5')
					&& (contextForm != '0') && (contextForm != '21')) {
					watson_ConversationPanel.captureErrorWatson();
				}

				// en caso de que watson nos devuelva el dato de contexto de fin
				// de conversaciï¿½n
				if ((contextFin != null) && (contextFin)) {
					document.getElementById('escribeaqui').style.display = 'none';
				}
				// en caso de que watson nos indique en el contexto que tenemos
				// que ocultar el texbox
				if ((contextBlockInput != null) && (contextBlockInput == true)) {
					$('#textInputchat').attr('disabled', 'disabled');
				} else {
					$('#textInputchat').removeAttr('disabled');
				}
				if (null != document.getElementById('watsonWaiting')) {
					$("div").find('#watsonWaiting').remove();
					// document.getElementById('watsonWaiting').remove();
					document.getElementById("escribeaqui").disabled = false;
					document.getElementById("resetWatson").disabled = false;
				}
			}
		};
	}

	function generarTablaDireccionesError4(cadenaDirecciones,
		cadenaDireccionRecuperar) {
		// Mapeo. NombreElementoCadena:NombreElementoTabla. Si no tiene
		// NombreElementoTabla, coge por defecto el que viene en la cadena
		var divContenedorTabla = document.createElement("div");
		var contadorFilas = 0;
		var listaCabecera = getListaCabecera(cadenaDirecciones,
			cadenaDireccionRecuperar);
		var listaItemsCabecera = listaCabecera.split("|");
		var contadorCabecera = 0;
		var tamanioScroll = 5;
		if (listaCabecera != "") {
			contadorCabecera = listaItemsCabecera.length;
		}
		var anchoPorCelda = 100;
		if (contadorCabecera > 0) {
			anchoPorCelda = anchoPorCelda / contadorCabecera - 0;
		}

		// var altoPorCelda = 24;

		// Rellena la cabecera
		var trCabecera = document.createElement("tr");
		for (var n = 0; n < contadorCabecera; n++) {
			var itemCabecera = document.createElement("th");
			itemCabecera.innerHTML = mapeoCabeceraTabla(listaItemsCabecera[n],
				cadenaDireccionRecuperar);
			$(trCabecera).addClass('cabeceraForm');
			$(itemCabecera).addClass(listaItemsCabecera[n]);
			itemCabecera.style.width = anchoPorCelda
				- (tamanioScroll / contadorCabecera) + '%';
			trCabecera.appendChild(itemCabecera);
		}

		// CREAR AQUI La tabla
		var divContenedor = document.createElement("table");
		$(divContenedor).addClass('tableOther');
		$(divContenedor).attr("id", "tableOther");
		var thead = document.createElement("thead");
		thead.appendChild(trCabecera);
		divContenedor.appendChild(thead);
		var splitPipes = cadenaDirecciones.split("|");
		var tb = document.createElement("tbody");
		$(tb).attr("id", "tableBodyOther");
		if (null != splitPipes && splitPipes.length > 0) {
			for (var i = 0; i < splitPipes.length; i++) {
				// CREAR TR
				var tr = document.createElement("tr");
				var contadorColumnas = 0;
				var splitCommas = splitPipes[i].split(",");
				if (null != splitCommas && splitCommas.length > 0) {
					for (var l = 0; l < contadorCabecera; l++) {
						var encontrado = false;
						for (var j = 0; j < splitCommas.length; j++) {
							var splitDots = splitCommas[j].split(":");
							if (null != splitDots && splitDots.length > 1) {
								if (splitDots[0] == listaItemsCabecera[l]) {
									encontrado = true;
									var td = document.createElement("td");
									td.innerHTML = splitDots[1];
									var clave = splitDots[0];
									var valor = splitDots[1];
									$(td).addClass(clave);
									td.style.width = anchoPorCelda + '%';
									td.id = "tdDirec_" + contadorFilas + "_"
										+ contadorColumnas;
									tr
										.setAttribute('onclick',
										"watson_ConversationPanel.captureRow4(this)");
									tr.appendChild(td);
									contadorColumnas++;
									break;
								}
							}
						}
						if (!encontrado) {
							var td = document.createElement("td");
							td.style.width = anchoPorCelda + '%';
							td.id = "tdDirec_" + contadorFilas + "_"
								+ contadorColumnas;
							tr.appendChild(td);
							contadorColumnas++;
						}
					}
					while (contadorColumnas < contadorCabecera) {
						var td = document.createElement("td");
						td.style.width = anchoPorCelda + '%';
						td.id = "tdDirec_" + contadorFilas + "_"
							+ contadorColumnas;
						tr.appendChild(td);
						contadorColumnas++;
					}
				}
				tr.id = "trDirec_" + contadorFilas;
				tb.appendChild(tr);

				contadorFilas++;
			}
		}
		// Automarcado de una Ãºnica opciÃ³n
		if (splitPipes.length == 1) {
			setTimeout(function () {
				$('#trDirec_0').click();
			}, 500);
		}
		// altoPorCelda = (altoPorCelda * contadorFilas);
		// tb.style.height = altoPorCelda+'px';
		divContenedor.appendChild(tb);
		divContenedorTabla.appendChild(divContenedor);
		$(divContenedorTabla)
			.html(
			''
			+ $(divContenedorTabla).html()
			+ '<div class="botonesOtherLocation">'
			+ '<button type="button" id="refuseLocation4" class="refuseLocationWatson" onclick="watson_ConversationPanel.locationRefuse4()">No encuentro mi vivienda</button>'
			+ '<button type="button" id="confirmLocation4" class="confirmLocationWatson" onclick="watson_ConversationPanel.confirmLocation4()" disabled>Confirmar</button>'
			+ '</div>');
		document.getElementById('escribeaqui').style.display = 'none';
		return divContenedorTabla;
	}

	function generarTablaDireccionesError6(cadenaDirecciones,
		cadenaDireccionRecuperar, cadenaElementosEscondidos) {
		// Mapeo. NombreElementoCadena:NombreElementoTabla. Si no tiene
		// NombreElementoTabla, coge por defecto el que viene en la cadena
		var divContenedorTabla = document.createElement("div");
		var contadorFilas = 0;
		var listaCabecera = getListaCabecera(cadenaDirecciones,
			cadenaDireccionRecuperar);
		var listaItemsCabecera = listaCabecera.split("|");
		var listaElementosEscondidos = cadenaElementosEscondidos.split("|");
		var contadorCabecera = 0;
		var tamanioScroll = 5;
		if (listaCabecera != "") {
			contadorCabecera = listaItemsCabecera.length;
		}

		// Calcular el ancho de las columnas
		var anchoPorCelda = 100;
		var numItemsRealesCabecera = calcularNumItemsRealesCabecera(
			listaItemsCabecera, listaElementosEscondidos);
		if (numItemsRealesCabecera > 0) {
			anchoPorCelda = anchoPorCelda / numItemsRealesCabecera - 0;
		}

		// Rellena la cabecera
		var trCabecera = document.createElement("tr");
		for (var n = 0; n < contadorCabecera; n++) {
			var escondido = false;
			for (var m = 0; m < listaElementosEscondidos.length; m++) {
				if (listaElementosEscondidos[m] == listaItemsCabecera[n]) {
					escondido = true;
				}
			}
			if (!escondido) {
				var itemCabecera = document.createElement("th");
				itemCabecera.innerHTML = mapeoCabeceraTabla(
					listaItemsCabecera[n], cadenaDireccionRecuperar);
				$(trCabecera).addClass('cabeceraForm');
				// $(itemCabecera).addClass('itemCabecera');
				$(itemCabecera).addClass(listaItemsCabecera[n]);
				itemCabecera.style.width = anchoPorCelda
					- (tamanioScroll / numItemsRealesCabecera) + "%"
				// itemCabecera.style.width =
				// anchoPorCelda-(tamanioScroll/contadorCabecera)+'%';
				trCabecera.appendChild(itemCabecera);
			}
		}

		// CREAR AQUI La tabla
		var divContenedor = document.createElement("table");
		$(divContenedor).addClass('tableAlternative');
		$(divContenedor).attr("id", "tableAlternative");
		var thead = document.createElement("thead");
		thead.appendChild(trCabecera);
		divContenedor.appendChild(thead);
		var splitPipes = cadenaDirecciones.split("|");
		var tb = document.createElement("tbody");
		$(tb).attr("id", "tableBodyAlternative");
		if (null != splitPipes && splitPipes.length > 0) {
			for (var i = 0; i < splitPipes.length; i++) {
				// CREAR TR
				var tr = document.createElement("tr");
				var contadorColumnas = 0;
				var splitCommas = splitPipes[i].split(",");
				if (null != splitCommas && splitCommas.length > 0) {
					for (var l = 0; l < contadorCabecera; l++) {
						var encontrado = false;
						for (var j = 0; j < splitCommas.length; j++) {
							var splitDots = splitCommas[j].split(":");
							if (null != splitDots && splitDots.length > 1) {
								if (splitDots[0] == listaItemsCabecera[l]) {
									var escondido = false;
									for (var q = 0; q < listaElementosEscondidos.length; q++) {
										if (listaElementosEscondidos[q] == splitDots[0]) {
											escondido = true;
										}
									}
									if (!escondido) {
										encontrado = true;
										var td = document.createElement("td");
										td.innerHTML = splitDots[1];
										var clave = splitDots[0];
										var valor = splitDots[1];
										$(td).addClass(clave);
										td.style.width = anchoPorCelda + '%';
										td.id = "tdDirec_" + contadorFilas
											+ "_" + contadorColumnas;
										tr
											.setAttribute('onclick',
											"watson_ConversationPanel.captureRow6(this)");
										tr.appendChild(td);
										contadorColumnas++;
										break;
									} else {
										encontrado = true;
										var hidden = document
											.createElement("input");
										hidden.id = "hidden" + splitDots[0]
											+ "_" + contadorFilas;
										hidden.type = "hidden";
										hidden.value = splitDots[1];
										divContenedor.appendChild(hidden);
										break;
									}
								}
							}
						}
						if (!encontrado) {
							var td = document.createElement("td");
							td.style.width = anchoPorCelda + '%';
							td.id = "tdDirec_" + contadorFilas + "_"
								+ contadorColumnas;
							tr.appendChild(td);
							contadorColumnas++;
						}
					}
					while (contadorColumnas < numItemsRealesCabecera) {
						var td = document.createElement("td");
						td.style.width = anchoPorCelda + '%';
						td.id = "tdDirec_" + contadorFilas + "_"
							+ contadorColumnas;
						tr.appendChild(td);
						contadorColumnas++;
					}
				}
				tr.id = "trDirec_" + contadorFilas;
				tb.appendChild(tr);

				contadorFilas++;
			}
		}
		// altoPorCelda = (altoPorCelda * contadorFilas);
		// tb.style.height = altoPorCelda+'px';
		divContenedor.appendChild(tb);
		divContenedorTabla.appendChild(divContenedor);
		$(divContenedorTabla)
			.html(
			''
			+ $(divContenedorTabla).html()
			+ '<div class="botonesOtherLocation6">'
			+ '<button type="button" id="refuseLocation6" class="refuseLocationWatson" onclick="watson_ConversationPanel.locationRefuse6()">No es mi direcci&oacute;n</button>'
			+ '<button type="button" id="confirmLocation6" class="confirmLocationWatson" onclick="watson_ConversationPanel.confirmLocation6()" disabled>Confirmar</button>'
			+ '</div>');
		document.getElementById('escribeaqui').style.display = 'none';

		return divContenedorTabla;
	}

	function calcularNumItemsRealesCabecera(listaItemsCabecera,
		listaElementosEscondidos) {
		var tamanioLista = listaItemsCabecera.length;
		for (var n = 0; n < listaItemsCabecera.length; n++) {
			for (var m = 0; m < listaElementosEscondidos.length; m++) {
				if (listaItemsCabecera[n] == listaElementosEscondidos[m]) {
					tamanioLista--;
					break;
				}
			}
		}
		return tamanioLista;
	}

	// Capturar datos de la fila que seleccionemos de los datos obtenidos con el
	// ErrorCode4
	function captureRow4(currentRow) {
		$("#tableOther tr").removeClass("highlight");
		for (j = 0; j < currentRow.getElementsByTagName("td").length; j++) {
			var selected = $(currentRow).hasClass("highlight");
			if (!selected)
				$(currentRow).addClass("highlight");
			var cell = currentRow.getElementsByTagName("td")[j];
			var id = cell.innerHTML;
			var clase = cell.className;
			currentRow1 = currentRow.id;
			parts = currentRow1.split("_");
			if (null != document.getElementById('hiddenCodigoArvato_'
				+ parts[1])) {
				consultaFibraScope.CodigoArvato = document
					.getElementById('hiddenCodigoArvato_' + parts[1]).value;
			}

			if (clase == "Planta") {
				consultaFibraScope.planta = id;
			}
			if (clase == "Mano1") {
				consultaFibraScope.mano = id;
			}
			if (clase == "Mano2") {
				consultaFibraScope.mano2 = id;
			}
			if (clase == "IdFinca") {
				consultaFibraScope.id_finca = id;
			}
			if (clase == "BisDuplicado") {
				consultaFibraScope.bis = id;
			}
			if (clase == "Escalera") {
				consultaFibraScope.escalera = id;
			}
			if (clase == "Bloque") {
				consultaFibraScope.bloque = id;
			}
			if (clase == "TipoVia") {
				consultaFibraScope.tipoVia = id;
			}
			if (clase == "NombreVia") {
				consultaFibraScope.nombreVia = id;
			}
			if (clase == "Numero") {
				consultaFibraScope.numero = id;
			}
			if (clase == "CP") {
				consultaFibraScope.cp = id;
			}
		}
		document.getElementById('confirmLocation4').disabled = false;
		$("#confirmLocation4").attr('class', 'confirmLocationCheckedWatson');
		return consultaFibraScope;

	}

	// Capturar datos de la fila que seleccionemos de los datos obtenidos con el
	// ErrorCode6
	function captureRow6(currentRow) {
		$("#tableAlternative tr").removeClass("highlight");
		for (j = 0; j < currentRow.getElementsByTagName("td").length; j++) {
			var selected = $(currentRow).hasClass("highlight");
			if (!selected)
				$(currentRow).addClass("highlight");
			var cell = currentRow.getElementsByTagName("td")[j];
			var id = cell.innerHTML;
			var clase = cell.className;
			currentRow1 = currentRow.id;
			parts = currentRow1.split("_");
			if (null != document.getElementById('hiddenCodigoArvato_'
				+ parts[1])) {
				consultaFibraScope.CodigoArvato = document
					.getElementById('hiddenCodigoArvato_' + parts[1]).value;
			}

			if (clase == "Planta") {
				consultaFibraScope.planta = id;
			}
			if (clase == "Mano1") {
				consultaFibraScope.mano = id;
			}
			if (clase == "Mano2") {
				consultaFibraScope.mano2 = id;
			}
			if (clase == "IdFinca") {
				consultaFibraScope.id_finca = id;
			}
			if (clase == "BisDuplicado") {
				consultaFibraScope.bis = id;
			}
			if (clase == "Escalera") {
				consultaFibraScope.escalera = id;
			}
			if (clase == "Bloque") {
				consultaFibraScope.bloque = id;
			}
			if (clase == "TipoVia") {
				consultaFibraScope.tipoVia = id;
			}
			if (clase == "NombreVia") {
				consultaFibraScope.nombreVia = id;
			}
			if (clase == "Numero") {
				consultaFibraScope.numero = id;
			}
			if (clase == "CP") {
				consultaFibraScope.cp = id;
			}
		}
		document.getElementById('confirmLocation6').disabled = false;
		$("#confirmLocation6").attr('class', 'confirmLocationCheckedWatson');
		return consultaFibraScope;

	}

	function getListaCabecera(cadenaDirecciones, cadenaDireccionRecuperar) {
		var elemDireccionRecuperar = cadenaDireccionRecuperar.split("|");
		var splitPipes = cadenaDirecciones.split("|");
		var listaCabecera = "";
		if (null != splitPipes && splitPipes.length > 0) {
			for (var i = 0; i < splitPipes.length; i++) {
				// CREAR tr
				var splitCommas = splitPipes[i].split(",");
				if (null != splitCommas && splitCommas.length > 0) {
					for (var j = 0; j < splitCommas.length; j++) {
						var splitDots = splitCommas[j].split(":");
						if (splitDots[0] != "") {
							for (var v = 0; v < elemDireccionRecuperar.length; v++) {
								var elemRecupDots = elemDireccionRecuperar[v]
									.split(":");
								var elementoRecuperar = elemRecupDots[0];
								// El campo estï¿½ en la lista de los que queremos
								// recuperar
								if (elementoRecuperar == splitDots[0]
									&& splitDots[1] != '') {
									// Hay elementos de cabecera ya encontrados
									if (listaCabecera != "") {
										var encontrado = false;
										var elementosCabecera = listaCabecera
											.split("|");
										// Si no se ha encontrado previamente el
										// mismo elemento, se mete
										for (var m = 0; m < elementosCabecera.length; m++) {
											if (elementosCabecera[m] == elementoRecuperar) {
												encontrado = true;
											}
										}
										if (!encontrado) {
											listaCabecera += elementoRecuperar
												+ "|";
										}
									}
									// No hay elementos de cabecera ya
									// encontrados => metemos el primero
									else {
										listaCabecera = elementoRecuperar + "|";
									}
								}
							}
						}
					}
				}
			}
		}
		// Si la cadena no esta vacia, quitamos el ultimo pipe
		if (listaCabecera != "") {
			listaCabecera = listaCabecera
				.substring(0, listaCabecera.length - 1);
			// La cabecera no necesariamente esta ordenada en el orden deseado
			// aqui, por lo tanto la ordenamos
			listaCabecera = ordenarCadenaCabecera(listaCabecera,
				cadenaDireccionRecuperar);
		}
		return listaCabecera;
	}

	function ordenarCadenaCabecera(listaCabecera, cadenaDireccionRecuperar) {
		var cadenaOrdenada = "";
		if (listaCabecera != "" && cadenaDireccionRecuperar != "") {
			var elementosBuscados = cadenaDireccionRecuperar.split("|");
			var elementos = listaCabecera.split("|");
			for (var i = 0; i < elementosBuscados.length; i++) {
				var elementoBuscado = elementosBuscados[i].split(":")[0];
				for (var j = 0; j < elementos.length; j++) {
					if (elementos[j] == elementoBuscado) {
						cadenaOrdenada += elementoBuscado + "|";
						break;
					}
				}
			}
		}
		if (cadenaOrdenada != "") {
			cadenaOrdenada = cadenaOrdenada.substring(0,
				cadenaOrdenada.length - 1);
		}
		return cadenaOrdenada;
	}

	function mapeoCabeceraTabla(valorElementoCabecera, cadenaDireccionRecuperar) {
		var nombreElemento = "";
		var elementosRecuperar = cadenaDireccionRecuperar.split("|");
		if (null != elementosRecuperar && elementosRecuperar.length > 0) {
			for (var i = 0; i < elementosRecuperar.length; i++) {
				var splitDots = elementosRecuperar[i].split(":");
				if (null != splitDots && splitDots[0] == valorElementoCabecera) {
					if (splitDots.length > 0 && splitDots != "") {
						nombreElemento = splitDots[1];
					} else {
						nombreElemento = splitDots[0];
					}
				}
			}
		}
		return nombreElemento;
	}

	// Boton no es mi direccion con el error 4
	function locationRefuse4() {
		$("#tableOther").find('tr').prop("onclick", null);
		$("#tableBodyOther").find('tr').addClass("trOther");
		$("#tableBodyOther").find('.trOther').addClass("tablaInhabilitada");
		$('#tableOther').attr('disabled', 'disabled');
		var texto = "EVENT_NO_ES_MI_VIVIENDA_GRID";
		var context;
		var latestResponse = watson_Watson.getResponsePayload();

		if (latestResponse) {
			context = latestResponse.context;
			context.noesmidireccion = true;
		}
		watson_Watson.sendRequest(texto, context);
		document.getElementById('escribeaqui').style.display = 'block';
		document.getElementById('textInputchat').disabled = true;
		document.getElementById('confirmLocation4').disabled = true;
		document.getElementById('refuseLocation4').disabled = true;
		$("#confirmLocation4").addClass("enlaceInhabilitado");
		$("#refuseLocation4").addClass("enlaceInhabilitado");
	}

	// Boton no es mi direccion con el error 6
	function locationRefuse6() {
		$("#tableAlternative").find('tr').prop("onclick", null);
		$("#tableBodytableAlternative").find('tr').addClass("trOther");
		$("#tableBodytableAlternative").find('.trOther').addClass(
			"tablaInhabilitada");
		$('#tableAlternative').attr('disabled', 'disabled');
		var texto = "EVENT_NO_ES_MI_DIRECCION_GRID";
		var context;
		var latestResponse = watson_Watson.getResponsePayload();

		if (latestResponse) {
			context = latestResponse.context;
			context.noesmidireccion = true;
		}
		watson_Watson.sendRequest(texto, context);
		document.getElementById('escribeaqui').style.display = 'block';
		document.getElementById('textInputchat').disabled = true;
		document.getElementById('confirmLocation6').disabled = true;
		document.getElementById('refuseLocation6').disabled = true;
		$("#confirmLocation6").addClass("enlaceInhabilitado");
		$("#refuseLocation6").addClass("enlaceInhabilitado");
	}

	// Boton Confirmar con el error 4
	function confirmLocation4() {
		$("#tableOther").find('tr').prop("onclick", null);
		$("#tableBodyOther").find('tr').addClass("trOther");
		$("#tableBodyOther").find('.trOther').addClass("tablaInhabilitada");
		$('#tableOther').attr('disabled', 'disabled');
		var texto = "EVENT_CONFIRMAR_VIVIENDA_GRID";
		var context;
		var latestResponse = watson_Watson.getResponsePayload();

		if (latestResponse) {
			context = latestResponse.context;
		}
		watson_Watson.sendRequest(texto, context);
		document.getElementById('escribeaqui').style.display = 'block';
		document.getElementById('textInputchat').disabled = true;
		document.getElementById('confirmLocation4').disabled = true;
		document.getElementById('refuseLocation4').disabled = true;
		$("#confirmLocation4").addClass("enlaceInhabilitado");
		$("#refuseLocation4").addClass("enlaceInhabilitado");
	}

	// Boton Confirmar con el error 6
	function confirmLocation6() {
		$("#tableAlternative").find('tr').prop("onclick", null);
		$("#tableBodyAlternative").find('tr').addClass("trAlternative");
		$("#tableBodyOther").find('.trAlternative').addClass(
			"tablaInhabilitada");
		$('#tableAlternative').attr('disabled', 'disabled');
		var texto = "EVENT_CONFIRMAR_DIRECCION_GRID";
		var context;
		var latestResponse = watson_Watson.getResponsePayload();

		if (latestResponse) {
			context = latestResponse.context;
		}
		watson_Watson.sendRequest(texto, context);
		document.getElementById('escribeaqui').style.display = 'block';
		document.getElementById('textInputchat').disabled = true;
		document.getElementById('confirmLocation6').disabled = true;
		document.getElementById('refuseLocation6').disabled = true;
		$("#confirmLocation6").addClass("enlaceInhabilitado");
		$("#refuseLocation6").addClass("enlaceInhabilitado");
	}

	// Error generico para la mayoria de errores
	function captureErrorWatson() {
		$(".segments:last")
			.append(
			"<div class='from-watson top'><div class='message-inner'><p>Lo siento, no podemos consultar tu cobertura en estos momentos.<br>Por favor int\u00e9ntalo m\u00e1s tarde o llama al 900 263 176</p></div></div>");
		watson_ConversationPanel.scrollToChatBottom();
		document.getElementById('escribeaqui').style.display = 'none';
		if (null != document.getElementById('watsonWaiting')) {
			// document.getElementById('watsonWaiting').remove();
			$("div").find('#watsonWaiting').remove();
			document.getElementById("escribeaqui").disabled = false;
			document.getElementById("resetWatson").disabled = false;
		}
	}

	function resetTextArea() {
		document.getElementById('textInputchat').value = "";
		$('#textInputchat').attr('rows', '1');
		$('#watson__body__chat').css('bottom', '125');
		$('#watsonPopUp  .inputOutline').css('height', '48px');
		$('.pac-container ').css('bottom', '50px');
		document.body.style.cursor = 'default';
		$('#watson__input__btn').removeClass('sendButton');
	}

	// Display a user or Watson or Agent message that has just been sent /
	// received
	function displayMessage(newPayload, typeValue) {
		var isUser = isUserMessage(typeValue);

		// Get input if user / output if Watson / Agent
		var textExists = (newPayload.input && newPayload.input.text)
			|| (newPayload.output && newPayload.output.text);

		if (isUser !== null && textExists) {
			// Create new message DOM element
			var messageDivs = buildMessageDomElements(newPayload, isUser);
			var chatBoxElement = document
				.querySelector(settings.selectors.chatBox);
			var previousLatest = chatBoxElement
				.querySelectorAll(getSelector(typeValue)
				+ settings.selectors.latest);

			// Previous "latest" message is no longer the most recent
			if (previousLatest) {
				watson_Common.listForEach(previousLatest, function (element) {
					element.classList.remove('latest');
				});
			}

			messageDivs.forEach(function (currentDiv) {
				chatBoxElement.appendChild(currentDiv);

				// Class to start fade in animation
				currentDiv.classList.add('load');
			});

			// Move chat to the most recent messages when new messages are added
			watson_ConversationPanel.scrollToChatBottom();
		}
	}

	function getSelector(typeValue) {
		var selector = null;

		if (typeValue === settings.authorTypes.user) {
			selector = settings.selectors.fromUser;
		} else if (typeValue === settings.authorTypes.watson) {
			selector = settings.selectors.fromWatson;
		} else if (typeValue === settings.authorTypes.agent) {
			selector = settings.selectors.fromAgent;
		}

		return selector;
	}

	function removeLastAgentMessage() {
		var x = document.querySelectorAll(settings.selectors.fromAgent);

		if (x.length > 0) {
			x[x.length - 1].remove();
		}
	}

	// Checks if the given typeValue matches with the user "name", the Watson
	// "name", the Agent "name", or neither
	// Returns true if user, watson if Watson, agent if Agent and null if
	// neither
	// Used to keep track of whether a message was from the user or Watson or
	// Agent
	function isUserMessage(typeValue) {
		if (typeValue === settings.authorTypes.user) {
			return true;
		} else if (typeValue === settings.authorTypes.watson
			|| typeValue === settings.authorTypes.agent) {
			return typeValue;
		}

		return null;
	}

	// Constructs new DOM element from a message payload
	function buildMessageDomElements(newPayload, isUser) {
		var textArray = (isUser === true) ? newPayload.input.text
			: newPayload.output.text;

		if (Object.prototype.toString.call(textArray) !== '[object Array]') {
			textArray = [textArray];
		}

		var currentText = null;
		var messageArray = [];
		var arrayTexts = [];

		// Join messages -> currentText
		if (textArray.length > 1) {
			currentText = textArray.join('<br>');
		} else {
			currentText = textArray[0];
		}

		// Process message
		var patronRespuestaBoton = '<span class="' + 'respuestaboton' + '">';
		var patronRespuestaBotonFin = "</span>";
		var patronEnlaceInicio = "href=";
		var patronEnlaceOferta = 'href="#"';
		var patronEnlaceFin = "</a>";
		var patronContactForm = '<form id="' + 'formfeedback' + '">';
		if (currentText != null) {
			currentText = currentText.toString();
		}

		// No se da esta opciï¿½n en Canal Online, es para Faqs en el caso de que
		// llegue un enlace en la conversacion
		if ((currentText != null && currentText.indexOf(patronEnlaceInicio) > -1)
			&& !(currentText.indexOf(patronEnlaceOferta) > -1)) {
			var nextSubString = currentText;

			while (nextSubString.indexOf(patronEnlaceInicio) > -1) {
				var index = nextSubString.indexOf(patronEnlaceInicio);
				var indexFin = nextSubString.indexOf(patronEnlaceFin);
				var enlace = nextSubString.substr(index, indexFin - index
					+ patronEnlaceFin.length);

				nextSubString = nextSubString.substr(index,
					nextSubString.length);

				var finenlace = nextSubString.indexOf(patronEnlaceFin);
				var url = "";

				url = fixUrl(nextSubString.substr(0, finenlace + 4));

				arrayTexts.push({
					originText: enlace,
					replaceText: url
				});

				nextSubString = nextSubString.substr(finenlace + 4,
					nextSubString.length - 1);
			}
		}

		// En el caso de que nos llegue un span en la conversacion lo
		// transformamos a boton
		if (currentText != null
			&& currentText.indexOf(patronRespuestaBoton) > -1) {
			var nextSubString = currentText;

			while (nextSubString.indexOf(patronRespuestaBoton) > -1) {
				var index = nextSubString.indexOf(patronRespuestaBoton);
				var indexFin = nextSubString.indexOf(patronRespuestaBotonFin);
				var respuestaBoton = nextSubString.substr(index, indexFin
					- index + patronRespuestaBotonFin.length);

				index = index + patronRespuestaBoton.length;

				var finenlace = nextSubString.indexOf(patronRespuestaBotonFin);
				var nombre = nextSubString.substr(index, finenlace - index);
				var span = fixOpcion(nombre);

				arrayTexts.push({
					originText: respuestaBoton,
					replaceText: span
				});

				nextSubString = nextSubString.substr(finenlace + 7,
					nextSubString.length - 1);
			}
		}

		// Si detectamos que nos llega el Formulario de contacto ocultamos el
		// textarea
		if (currentText != null && currentText.indexOf(patronContactForm) > -1) {
			var nextSubString = currentText;

			while (nextSubString.indexOf(patronContactForm) > -1) {
				var index = nextSubString.indexOf(patronContactForm);

				index = index + patronContactForm.length;

				var finenlace = nextSubString.indexOf(patronRespuestaBotonFin);

				nextSubString = nextSubString.substr(finenlace + 7,
					nextSubString.length - 1);
			}
			document.getElementById('escribeaqui').style.display = 'none';
		}

		textoResult = currentText;

		for (var i = 0; i < arrayTexts.length; i++) {
			textoResult = textoResult.replace(arrayTexts[i].originText,
				arrayTexts[i].replaceText);
		}

		// ClassName
		var className;

		switch (isUser) {
			case 'agent':
				className = 'from-agent';
				break
			case 'watson':
				className = 'from-watson';
				break;
			default:
				className = 'from-user';
		}

		if (textoResult) {
			var messageJson = {
				'tagName': 'div',
				'classNames': ['segments'],
				'children': [{
					'tagName': 'div',
					'classNames': [
						className,
						'latest',
						((messageArray.length === 0) ? 'top' : 'sub'),
						(className == 'from-agent') ? 'from-watson'
							: 'watsonBox'],
					'children': [{
						'tagName': 'div',
						'classNames': ['message-inner'],
						'children': [{
							'tagName': 'p',
							'text': textoResult
						}]
					}]
				}]
			};

			messageArray.push(watson_Common.buildDomElement(messageJson));
		}
		// /});

		return messageArray;
	}

	// No se usa en el canal online solo en las faqs para aï¿½adir utm a las url
	function fixUrl(text) {
		var index = text.indexOf("http");
		var url = text.substr(0, text.indexOf(">")).trim();

		url = url.substr(index, url.length).trim();

		var utm = "?utm_source=orange&utm_medium=watson&utm_term=watsonCanalWeb\" target='_blank'";

		var indexCom = text.indexOf("=");
		var index = url.indexOf(text.charAt(indexCom + 1));

		if (index == 0) {
			index = url.length;
		}

		if (url.substr(0, index).indexOf("?") > -1) {
			utm = utm.replace("?", "&");
		}

		var urlNueva = url.substr(0, index).trim() + utm;
		var nombreEnlace = text.substr(text.indexOf(">"));

		return text.replace(url, urlNueva);
	}

	// No se usa en el canal online solo en las faqs para convertir los span en
	// botones
	function fixOpcion(text) {
		text = "<span class=\"" + 'respuestaboton'
			+ "\"onclick=\"watson_EnvioEnlace(this, '" + text + "');\">"
			+ text + "</span>";

		return text;
	}

	// Scroll to the bottom of the chat window (to the most recent messages)
	function scrollToChatBottom(node) {
		node = '#watson__body__chat > div'
		var nodes = document.querySelectorAll(node);
		var scrollElement = nodes[nodes.length - 1];
		var offsetTopSize = scrollElement.offsetTop;
		$('#watson__body__chat').animate({
			scrollTop: offsetTopSize
		}, 1000);
	}

	// Handles the submission of input
	function inputKeyDown(event, inputBox) {	
		$(document).ready(function () {		
			document.getElementById('countChar').style.fontSize = "small";
			$('#countChar').html('</br>'+textUser.length+'/140');
			});
		//-Inicio- Comprobar campos vacÃ­os
		var faltaCampoTexto = "No he podido capturar tu ubicaci&oacute;n completa. Por favor, completa los datos que faltan y que aparecen resaltados";
		$(document).ready(function () {
			if (inputBox.val().length == 0) {
				if (document.getElementById("tipoV").value==''){
					$('#tipoV').addClass('watsonInputNovalid');
				}
				if (document.getElementById("listacalles").value==''){
					$('#listacalles').addClass('watsonInputNovalid');
				}
				if (document.getElementById("numero").value==''){
					$('#numero').addClass('watsonInputNovalid');
				}
				if (document.getElementById("listalocalidades").value==''){
					$('#listalocalidades').addClass('watsonInputNovalid');
				}
				if (document.getElementById("cpWatson").value==''){
					$('#cpWatson').addClass('watsonInputNovalid');
				}
				if (document.getElementById("listaprovincias").value==''){
					$('#listaprovincias').addClass('watsonInputNovalid');
				}
				$('#faltaCampo').html(faltaCampoTexto);
				$(".confirmarWatson").addClass("enlaceInhabilitado");
				document.getElementById("watson__confirm__btn").style.visibility = "visible";
				document.getElementById("watson__confirm__btn").disabled = true;
			  }else{
			  	if (document.getElementById("tipoV").value!=''){
					$('#tipoV').removeClass('watsonInputNovalid');
				}
				if (document.getElementById("listacalles").value!=''){
					$('#listacalles').removeClass('watsonInputNovalid');
				}
				if (document.getElementById("numero").value!=''){
					$('#numero').removeClass('watsonInputNovalid');
				}
				if (document.getElementById("listalocalidades").value!=''){
					$('#listalocalidades').removeClass('watsonInputNovalid');
				}
				if (document.getElementById("cpWatson").value!=''){
					$('#cpWatson').removeClass('watsonInputNovalid');
				}
				if (document.getElementById("listaprovincias").value!=''){
					$('#listaprovincias').removeClass('watsonInputNovalid');
				}
// $(".confirmarWatson").addClass("confirmarWatson");
			  document.getElementById("watson__confirm__btn").style.visibility = "hidden";
			  $('#faltaCampo').html('<button type="button" id="watson__confirm__btn" class="confirmarWatson" onclick="watson_Location.submitFormDirReset()">Confirmar</button>');
			  }
		});		
		// -Fin-
		// Submit on enter key, dis-allowing blank messages
		var espacio_blanco = /[a-z,0-9]/i;
		var textUser = inputBox.val();

		if (textUser.length > 0) {
			var positionPacContainer = (($("#escribeaqui").css("height")) + ($(
				"div").find(".pac-container").css("height")));
			$('#watson__input__btn').addClass('sendButton');
		} else {
			$('#watson__input__btn').removeClass('sendButton');
		}

		if (event.keyCode === 13 && textUser.length > 0
			&& (espacio_blanco.test(textUser))) {
			google.maps.event.clearInstanceListeners(textInputchat);
			$(".pac-container").remove();
			document.getElementById("textInputchat").disabled = true;
			document.getElementById('countChar').style.fontSize = "small";
			$('#countChar').html('</br>0/140');

			if (otherLocation) {
				// document.getElementById('escribeaqui').style.display =
				// 'none';
				watson_Location.searchAddress();
				otherLocation = false;
			} else {
				// Retrieve the context from the previous server response
				var context;
				var latestResponse = watson_Watson.getResponsePayload();

				if (latestResponse) {
					context = latestResponse.context;
				}

				// Send the user message
				if (watson_RightNow.getContext().rightnow) {
					watson_RightNow.envioMensaje(textUser);
				} else {

					var s = watson_Watson.getStatus();

					if (s && s == 'default') {
						var canal = $('#watsonContainer').attr('data-canal');
						var urlHTML = $('#watsonContainer').attr('data-url');
						var context = {
							"canal": canal,
							// "logado": "false",
							// "IdFAQ_Original": urlHTML
						};

						watson_Watson.setStatus('to-watson');
					}
					watson_Watson.sendRequestReset(textUser, context);
				}

				// Clear input box for further messages
				inputBox.val('');

				// Reset Textarea
				watson_ConversationPanel.resetTextArea();
				$(".respuestaboton").addClass("enlaceInhabilitado");
			}
		}
	}

	// Boton enviar textarea
	function buttonClick(event, inputBox) {
		// Submit onclick
		// Retrieve the context from the previous server response
		var context;
		var textUser = inputBox.val();
		var latestResponse = watson_Watson.getResponsePayload();
		var espacio_blanco = /[a-z,0-9]/i;

		if (latestResponse) {
			context = latestResponse.context;
		}

		if (textUser.length > 0 && (espacio_blanco.test(textUser))) {
			// Send the user message
			if (watson_RightNow.getContext().rightnow) {
				watson_RightNow.envioMensaje(textUser);
			} else {

				var s = watson_Watson.getStatus();

				if (s && s == 'default') {
					var canal = $('#watsonContainer').attr('data-canal');
					var urlHTML = $('#watsonContainer').attr('data-url');
					var context = {
						"canal": canal,
						// "logado": "false",
						// "IdFAQ_Original": urlHTML
					};

					watson_Watson.setStatus('to-watson');
				}
				watson_Watson.sendRequest(textUser, context);
			}

			$(".respuestaboton").addClass("enlaceInhabilitado");

			// Clear input box for further messages
			inputBox.val('');

			// Reset Textarea
			watson_ConversationPanel.resetTextArea();
		}
	}

}());

// -----------------------------------------------------------------------------
// Modulo para gestionar las direcciones del usuario
// -----------------------------------------------------------------------------
watson_Location = (function () {

	// Publicly accessible methods defined
	return {
		submitFormDir: submitFormDir,
		submitFormDirReset: submitFormDirReset,
		submitFormOther: submitFormOther,
		currentLocation: currentLocation,
		locationForm: locationForm,
		searchAddress: searchAddress,
		removeAccents: removeAccents,
		showTextBox: showTextBox
	};

	// Guardamos la direcciÃ³n del cliente
	function submitFormDir() {

		// Enviamos datos a initial_Conversation
		var latestResponse = initial_Conversation.getResponsePayload();
		var input = "EVENT_CONFIRMAR_MIUBICACION";
		contextInitial.output = "EVENT_CONFIRMAR_MIUBICACION";
		initial_Conversation.sendRequestInitial(input, contextInitial);

		// Reset style validation
		$('#listaprovincias').removeClass('watsonInputNovalid');
		$('#listalocalidades').removeClass('watsonInputNovalid');
		$('#cpWatson').removeClass('watsonInputNovalid');
		$('#tipoV').removeClass('watsonInputNovalid');
		$('#listacalles').removeClass('watsonInputNovalid');
		$('#numero').removeClass('watsonInputNovalid');

		var form = document.getElementById('oculto');
		var listaprovincias = form.elements['listaprovincias'].value;
		var listalocalidades = form.elements['listalocalidades'].value;
		var cpWatson = form.elements['cpWatson'].value;
		var tipoV = form.elements['tipoV'].value;
		var listacalles = form.elements['listacalles'].value;
		var numero = form.elements['numero'].value;
		var textodir = document.getElementById('textodireccion');
		textodir.innerHTML = "<p>" + tipoV + " " + listacalles + " " + numero
			+ ", " + listalocalidades + "&nbsp;" + cpWatson + " ("
			+ listaprovincias + ") "
		"</p>";
		var scrollingChat = document.querySelector('#watson__body__chat');

		var scrollEl = scrollingChat.querySelector('.from-watson' + '.latest');
		if (scrollEl) {
			scrollingChat.scrollTop = scrollEl.offsetTop;
		}
	}

	function submitFormOther() {

		// Reset style validation
		$('#provincia').removeClass('watsonInputNovalid');
		$('#localidad').removeClass('watsonInputNovalid');
		$('#cpW').removeClass('watsonInputNovalid');
		$('#tipoVia').removeClass('watsonInputNovalid');
		$('#nombreVia').removeClass('watsonInputNovalid');
		$('#numeroW').removeClass('watsonInputNovalid');

		var form = document.getElementById('otherform');
		var listaprovincias = form.elements['provincia'].value;
		var listalocalidades = form.elements['localidad'].value;
		var cpWatson = form.elements['cpW'].value;
		var tipoV = form.elements['tipoVia'].value;
		var listacalles = form.elements['nombreVia'].value;
		var numero = form.elements['numeroW'].value;
		var textodir = tipoV + " " + listacalles + " " + numero + " "
			+ listalocalidades + " " + listaprovincias + " " + cpWatson;
		var context;
		var latestResponse = watson_Watson.getResponsePayload();

		var espacio_blanco = /[a-z,0-9]/i;

		var validation = watson_Common.checkFormLocationOther(listaprovincias,
			listalocalidades, cpWatson, tipoV, listacalles, numero);

		if (validation) {

			document.body.style.cursor = 'wait';
			var content = document
				.getElementById('validateFormResultLocationOther');
			var geocoder = new google.maps.Geocoder();

			geocoder
				.geocode(
				{
					address: textodir
				},
				function (results, status) {

					if (status === google.maps.GeocoderStatus.OK) {
						if (results) {

							var provincia = '';
							var localidad = '';
							var cpW = '';
							var tipoVia = '';
							var nombreVia = '';
							var numeroW = '';

							for (var i = 0; i < results[0].address_components.length; i++) {
								if (results[0].address_components[i].types[0] == 'administrative_area_level_2') {
									provincia = results[0].address_components[i].long_name;
								}
								if (results[0].address_components[i].types[0] == 'locality') {
									localidad = results[0].address_components[i].long_name;
								}
								if (results[0].address_components[i].types == 'postal_code') {
									cpW = results[0].address_components[i].long_name;
								}
								if (results[0].address_components[i].types == 'route') {
									tipoVia = results[0].address_components[i].long_name
										.split(' ')[0];
								}
								if (results[0].address_components[i].types == 'route') {
									nombreVia = results[0].address_components[i].long_name
										.split(' ').splice(1)
										.join(' ');
								}
								if (results[0].address_components[i].types == 'street_number') {
									numeroW = results[0].address_components[i].long_name;
								}
							}

							if (provincia == ''
								|| removeAccents(provincia
									.toUpperCase()) != removeAccents(listaprovincias
										.toUpperCase())) {
								$(
									'#validateFormResultLocationOther')
									.html(
									'<p class="errorValidity">Provincia incorrecta</p>');
								$('#provincia').addClass(
									'watsonInputNovalid');
								watson_ConversationPanel
									.scrollToChatBottom();

							} else if (localidad == ''
								|| removeAccents(localidad
									.toUpperCase()) != removeAccents(listalocalidades
										.toUpperCase())) {
								$(
									'#validateFormResultLocationOther')
									.html(
									'<p class="errorValidity">Localidad incorrecta</p>');
								$('#localidad').addClass(
									'watsonInputNovalid');
								watson_ConversationPanel
									.scrollToChatBottom();

							} else if (cpW == '' || cpW != cpWatson) {
								$(
									'#validateFormResultLocationOther')
									.html(
									'<p class="errorValidity">C\u00f3digo Postal incorrecto</p>');
								$('#cpW').addClass(
									'watsonInputNovalid');
								watson_ConversationPanel
									.scrollToChatBottom();

							} else if (tipoVia == ''
								|| removeAccents(tipoVia
									.toUpperCase()) != removeAccents(tipoV
										.toUpperCase())) {
								$(
									'#validateFormResultLocationOther')
									.html(
									'<p class="errorValidity">Tipo de v\u00eda incorrecta</p>');
								$('#tipoVia').addClass(
									'watsonInputNovalid');
								watson_ConversationPanel
									.scrollToChatBottom();

							} else if (nombreVia == ''
								|| removeAccents(nombreVia
									.toUpperCase()) != removeAccents(listacalles
										.toUpperCase())) {
								$(
									'#validateFormResultLocationOther')
									.html(
									'<p class="errorValidity">Nombre de la v\u00eda incorrecta</p>');
								$('#nombreVia').addClass(
									'watsonInputNovalid');
								watson_ConversationPanel
									.scrollToChatBottom();

							} else if (numeroW == ''
								|| numeroW != numero) {
								$(
									'#validateFormResultLocationOther')
									.html(
									'<p class="errorValidity">N\u00famero incorrecto</p>');
								$('#numeroW').addClass(
									'watsonInputNovalid');
								watson_ConversationPanel
									.scrollToChatBottom();
							} else {
								// Reset Textarea
								watson_ConversationPanel
									.resetTextArea();
								document
									.getElementById('escribeaqui').style.display = 'block';
								$(
									'#validateFormResultLocationOther')
									.html('');

								if (latestResponse) {
									context = latestResponse.context;
								}

								if (textodir.length > 0
									&& (espacio_blanco
										.test(textodir))) {
									// Send the user message
									var s = watson_Watson
										.getStatus();

									if (s && s == 'default') {
										var canal = $(
											'#watsonContainer')
											.attr('data-canal');
										var urlHTML = $(
											'#watsonContainer')
											.attr('data-url');
										var context = {
											"canal": canal,
											// "logado": "false",
											// "IdFAQ_Original": urlHTML
										};
										watson_Watson
											.setStatus('to-watson');
									}
									var canal = $(
										'#watsonContainer')
										.attr('data-canal');
									var urlHTML = $(
										'#watsonContainer')
										.attr('data-url');
									var context = {
										"canal": canal,
										// "logado":"false",
										// "IdFAQ_Original":
										// urlHTML,
										"nombre": "",
										"email": "",
										"telefono": ""
									};
									consultaFibra = {
										"tipoVia": tipoVia,
										"nombreVia": nombreVia,
										"localidad": localidad,
										"cp": cpW,
										"numero": numeroW,
										"provincia": provincia
									};
									consultaFibraScope = consultaFibra;
									watson_Watson.sendLocation(
										textodir, context,
										consultaFibra);
									document
										.getElementById("provincia").disabled = true;
									document
										.getElementById("localidad").disabled = true;
									document.getElementById("cpW").disabled = true;
									document
										.getElementById("tipoVia").disabled = true;
									document
										.getElementById("nombreVia").disabled = true;
									document
										.getElementById("numeroW").disabled = true;
									watson_ConversationPanel.showLoading();
									document
										.getElementById("escribeaqui").disabled = true;
									document
										.getElementById("resetWatson").disabled = true;
									watson_ConversationPanel
										.scrollToChatBottom();

									// Reset Textarea
									watson_ConversationPanel
										.resetTextArea();
								}

								var scrollingChat = document
									.querySelector('#watson__body__chat');

								var scrollEl = scrollingChat
									.querySelector('.from-watson'
									+ '.latest');
								if (scrollEl) {
									scrollingChat.scrollTop = scrollEl.offsetTop;
								}

								$(".miubicacionWatson").addClass(
									"enlaceInhabilitado");
								document
									.getElementById("miubicacionWatson").disabled = true;

								$(".otraubicacionWatson").addClass(
									"enlaceInhabilitado");
								document
									.getElementById("otraubicacionWatson").disabled = true;

								$(".confirmarWatson").addClass(
									"enlaceInhabilitado");
								document
									.getElementById("watson__confirm__other").disabled = true;

							}
						} else {
							content.innerHTML = "<p style=\"color:red\"><strong>No results found</p>";
							content.style.display = 'block';
						}
					} else {
						watson_ConversationPanel
							.captureErrorWatson();
					}

				});
			// Reset Textarea
			watson_ConversationPanel.resetTextArea();

		} else {
			$("div")
				.find('#validateFormResultLocationOther')
				.html(
				'<p class="errorValidity">Por favor, completa los datos que faltan.</p>');
			watson_ConversationPanel.scrollToChatBottom();
		}

	}

	function removeAccents(str) {
		// acentos agudos
		str = str.replace('\u00C0', 'A').replace('\u00C8', 'E').replace(
			'\u00CC', 'I').replace('\u00D2', 'O').replace('\u00D9', 'U');
		str = str.replace('\u00E0', 'a').replace('\u00E8', 'e').replace(
			'\u00EC', 'i').replace('\u00F2', 'o').replace('\u00F9', 'u');
		// acentos graves
		str = str.replace('\u00C1', 'A').replace('\u00C9', 'E').replace(
			'\u00CD', 'I').replace('\u00D3', 'O').replace('\u00DA', 'U');
		str = str.replace('\u00E1', 'a').replace('\u00E9', 'e').replace(
			'\u00ED', 'i').replace('\u00F3', 'o').replace('\u00FA', 'u');
		// acentos circunflejos
		str = str.replace('\u00c2', 'A').replace('\u00ca', 'E').replace(
			'\u00ce', 'I').replace('\u00d4', 'O').replace('\u00db', 'U');
		str = str.replace('\u00e2', 'a').replace('\u00ea', 'e').replace(
			'\u00ee', 'i').replace('\u00f4', 'o').replace('\u00fb', 'u');
		// ï¿½/
		str = str.replace('\u00f1', 'n').replace('\u00d1', 'N');
		// ï¿½//
		str = str.replace('\u00e7', 'c').replace('\u00c7', 'C');
		// diï¿½resis //
		str = str.replace('\u00c4', 'A').replace('\u00cb', 'E').replace(
			'\u00cf', 'I').replace('\u00d6', 'O').replace('\u00dc', 'U');
		str = str.replace('\u00e4', 'a').replace('\u00eb', 'e').replace(
			'\u00ef', 'i').replace('\u00f6', 'o').replace('\u00fc', 'u');

		return str;

	}

	function submitFormDirReset() {

		// Enviamos datos a initial_Conversation
		var latestResponse = initial_Conversation.getResponsePayload();
		var input = "EVENT_CONFIRMAR_MIUBICACION";
		contextInitial.output = "EVENT_CONFIRMAR_MIUBICACION";
		initial_Conversation.sendRequestInitial(input, contextInitial);
		// Reset style validation
		$('#listaprovincias').removeClass('watsonInputNovalid');
		$('#listalocalidades').removeClass('watsonInputNovalid');
		$('#cpWatson').removeClass('watsonInputNovalid');
		$('#tipoV').removeClass('watsonInputNovalid');
		$('#listacalles').removeClass('watsonInputNovalid');
		$('#numero').removeClass('watsonInputNovalid');

		var form = document.getElementById('oculto');
		var listaprovincias = form.elements['listaprovincias'].value;
		var listalocalidades = form.elements['listalocalidades'].value;
		var cpWatson = form.elements['cpWatson'].value;
		var tipoV = form.elements['tipoV'].value;
		var listacalles = form.elements['listacalles'].value;
		var numero = form.elements['numero'].value;

		var textodir = tipoV + " " + listacalles + " " + numero
			+ ", " + listalocalidades + "&nbsp;" + cpWatson + " ("
			+ listaprovincias + ") ";

		var context;
		var latestResponse = watson_Watson.getResponsePayload();

		var espacio_blanco = /[a-z,0-9]/i;

		var validation = watson_Common.checkFormLocation(listaprovincias,
			listalocalidades, cpWatson, tipoV, listacalles, numero);

		if (validation) {
			document.getElementById('escribeaqui').style.display = 'block';
			$('#validateFormResultLocation').html('');
			$('#validateFormResultLocationOther').html('');

			if (latestResponse) {
				context = latestResponse.context;
			}

			if (textodir.length > 0 && (espacio_blanco.test(textodir))) {
				// Send the user message
				var s = watson_Watson.getStatus();

				if (s && s == 'default') {
					var canal = $('#watsonContainer').attr('data-canal');
					var urlHTML = $('#watsonContainer').attr('data-url');
					var context = {
						"canal": canal,
						// "logado": "false",
						// "IdFAQ_Original": urlHTML
					};
					watson_Watson.setStatus('to-watson');
				}
				var canal = $('#watsonContainer').attr('data-canal');
				var urlHTML = $('#watsonContainer').attr('data-url');
				var context = {
					"canal": canal
					// "logado":"false",
					// "IdFAQ_Original": urlHTML,
//					"nombre": "",
//					"email": "",
//					"telefono": ""
				};
				consultaFibra = {
					"tipoVia": tipoV,
					"nombreVia": listacalles,
					"localidad": listalocalidades,
					"cp": cpWatson,
					"numero": numero,
					"provincia": listaprovincias
				};
				consultaFibraScope = consultaFibra;
				watson_Watson.sendLocation(textodir, context, consultaFibra);
				$(".respuestaboton").addClass("enlaceInhabilitado");

				// Reset Textarea
				watson_ConversationPanel.resetTextArea();
			}

			var scrollingChat = document.querySelector('#watson__body__chat');

			var scrollEl = scrollingChat.querySelector('.from-watson'
				+ '.latest');
			if (scrollEl) {
				scrollingChat.scrollTop = scrollEl.offsetTop;
			}

			$(".miubicacionWatson").addClass("enlaceInhabilitado");
			document.getElementById("miubicacionWatson").disabled = true;

			$(".otraubicacionWatson").addClass("enlaceInhabilitado");
			document.getElementById("otraubicacionWatson").disabled = true;

			$(".confirmarWatson").addClass("enlaceInhabilitado");
			document.getElementById("watson__confirm__btn").disabled = true;
		} else {
			$('#validateFormResultLocation')
				.html(
				'<p class="errorValidity">Por favor, completa los datos que faltan.</p>');
			watson_ConversationPanel.scrollToChatBottom();
		}
		watson_ConversationPanel.showLoading();

		document.getElementById("escribeaqui").disabled = true;
		document.getElementById("resetWatson").disabled = true;
		watson_ConversationPanel.scrollToChatBottom();
	}

	// Mostrar ubicaciï¿½n actual
	function currentLocation() {
		// Comprobar campos vacÃ­os
		var faltaCampoTexto = "No he podido capturar tu ubicaciÃ³n completa. Por favor, completa los datos que faltan y que aparecen resaltados";
		$('#tipoV').on('keydown keyup', function (event) {	
			watson_ConversationPanel.inputKeyDown(event, $(this));
		});
		$('#listacalles').on('keydown keyup', function (event) {	
			watson_ConversationPanel.inputKeyDown(event, $(this));
		});
		$('#numero').on('keydown keyup', function (event) {	
			watson_ConversationPanel.inputKeyDown(event, $(this));
		});
		$('#listalocalidades').on('keydown keyup', function (event) {	
			watson_ConversationPanel.inputKeyDown(event, $(this));
		});
		$('#cpWatson').on('keydown keyup', function (event) {	
			watson_ConversationPanel.inputKeyDown(event, $(this));
		});
		$('#listaprovincias').on('keydown keyup', function (event) {	
			watson_ConversationPanel.inputKeyDown(event, $(this));
		});
			
		if (permissionDenied) {
			watson_Common.resetWatson();
		}

		// Enviamos datos a initial_Conversation
		var latestResponse = initial_Conversation.getResponsePayload();
		if (latestResponse) {
			initialID = latestResponse.initialID;
			contextInitial.initialID = initialID;
		}
		var input = "EVENT_MI_UBICACION";
		contextInitial.output = "EVENT_MI_UBICACION";
		initial_Conversation.sendRequestInitial(input, contextInitial);

		document.body.style.cursor = 'wait';
		var content = document.getElementById('validateFormResultLocation');
		if (navigator.geolocation) {
			navigator.geolocation
				.getCurrentPosition(
				function (objPosition) {
					var lon = objPosition.coords.longitude;
					var lat = objPosition.coords.latitude;
					var geocoder = new google.maps.Geocoder();
					var latlng = new google.maps.LatLng(lat, lon);
					geocoder
						.geocode(
						{
							'latLng': latlng
						},
						function (results, status) {
							if (status === google.maps.GeocoderStatus.OK) {
								if (results
									&& (results[0].types == 'street_address'
										|| results[0].types == 'route'
										|| results[0].types == 'premise' || results[0].types == 'subpremise')) {
									var provincia = '';
									var localidad = '';
									var cpW = '';
									var tipoVia = '';
									var nombreVia = '';
									var numeroW = '';

									for (var i = 0; i < results[0].address_components.length; i++) {			
										if (results[0].address_components[i].types[0] == 'administrative_area_level_2') {
											provincia = results[0].address_components[i].long_name;
										}
										if (results[0].address_components[i].types[0] == 'locality') {
											localidad = results[0].address_components[i].long_name;
										}
										if (results[0].address_components[i].types == 'postal_code') {
											cpW = results[0].address_components[i].long_name;
										}
										if (results[0].address_components[i].types == 'route') {
											tipoVia = results[0].address_components[i].long_name.split(' ')[0];
										}
										if (results[0].address_components[i].types == 'route') {
											nombreVia = results[0].address_components[i].long_name.split(' ').splice(1).join(' ');
										}
										if (results[0].address_components[i].types == 'street_number') {
											numeroW = results[0].address_components[i].long_name;
										}
									}
									// -Inicio- IntroducciÃ³n de mensajes de
									// aviso que falta algunos de los campos
										if (!provincia || provincia == '' || provincia === "undefined"){
											listaprovincias = provincia;
										}
										if (!localidad || localidad == '' || localidad === "undefined"){
											listalocalidades = localidad;
										}
										if (!cpW || cpW == '' || cpW === "undefined"){
											cpWatson = cpW;
										}
										if (!tipoVia || tipoVia == '' || tipoVia === "undefined"){
											tipoV = tipoVia;
										}
										if (!nombreVia || nombreVia == '' || nombreVia === "undefined"){
											listacalles = nombreVia;
										}
										if (!numeroW || numeroW == '' || numeroW === "undefined"){
											numero = numeroW;
										}
										var validation = watson_Common.checkFormLocation(listaprovincias, listalocalidades, cpWatson, tipoV, listacalles, numero)	
										if(!validation) {
										    if (tipoVia==''){
										    	$('#tipoV').addClass('watsonInputNovalid');
										    	$(".confirmarWatson").addClass("enlaceInhabilitado");
												document.getElementById("watson__confirm__btn").disabled = true;
												$('#faltaCampo').html(faltaCampoTexto);
										    }
										    if (nombreVia==''){
										    	$('#listacalles').addClass('watsonInputNovalid');
										    	$(".confirmarWatson").addClass("enlaceInhabilitado");
												document.getElementById("watson__confirm__btn").disabled = true;
												$('#faltaCampo').html(faltaCampoTexto);
										    }
										    if (numeroW==''){
										    	$('#numero').addClass('watsonInputNovalid');
										    	$(".confirmarWatson").addClass("enlaceInhabilitado");
												document.getElementById("watson__confirm__btn").disabled = true;
												$('#faltaCampo').html(faltaCampoTexto);
										    }
										    if (localidad==''){
										    	$('#listalocalidades').addClass('watsonInputNovalid');
										    	$(".confirmarWatson").addClass("enlaceInhabilitado");
												document.getElementById("watson__confirm__btn").disabled = true;
												$('#faltaCampo').html(faltaCampoTexto);
										    }
										    if (cpW==''){
										    	$('#cpWatson').addClass('watsonInputNovalid');
										    	$(".confirmarWatson").addClass("enlaceInhabilitado");
												document.getElementById("watson__confirm__btn").disabled = true;
												$('#faltaCampo').html(faltaCampoTexto);
										    }
										    if (provincia==''){
										    	$('#listaprovincias').addClass('watsonInputNovalid');
										    	$(".confirmarWatson").addClass("enlaceInhabilitado");
												document.getElementById("watson__confirm__btn").disabled = true;
												$('#faltaCampo').html(faltaCampoTexto);
										    }
										}										
									// -Fin-
									
									mostrarformRelleno(
										provincia,
										localidad,
										cpW,
										tipoVia,
										nombreVia,
										numeroW);
								} else {
									
									content.innerHTML = "<p style=\"color:red\"><strong>No results found</p>";
									content.style.display = 'block';
								}
							} else {
								watson_ConversationPanel
									.captureErrorWatson();
							}
						});
					document.body.style.cursor = 'default';

				},
				function (objPositionError) {
					switch (objPositionError.code) {
						case objPositionError.PERMISSION_DENIED:
							// content.innerHTML = "<p
							// style=\"color:red\"><strong>Latitud:</strong>No
							// se ha permitido el acceso a la posiciï¿½n del
							// usuario.</p>";
							// Bloqueo en el navegador del permiso de buscar la
							// ubicaciÃ³n
							var data = {};
							data.output = {};
							data.output.text = ["Lo siento, no ha sido posible capturar tu ubicaciÃ³n de forma automÃ¡tica pues no tienes habilitada esta funcionalidad en tu navegador. Puedes habilitarla e intentarlo de nuevo o escribir la direcciÃ³n pulsando en 'Escribir DirecciÃ³n'"];
							var type = 'watson';
							watson_ConversationPanel.displayMessage(data, type);
							document.body.style.cursor = 'default';
							permissionDenied = true;
							// console.log("No se ha permitido la ubicaciÃ³n");
							break;
						case objPositionError.POSITION_UNAVAILABLE:
							// content.innerHTML = "<p
							// style=\"color:red\"><strong>Latitud:</strong>No
							// se ha podido acceder a la informaciï¿½n de su
							// posiciï¿½n.</p>";
							// No se ha podido encontrar la ubicaciÃ³n
							var data = {};
							data.output = {};
							data.output.text = ["Lo siento, no ha sido posible capturar tu ubicaciÃ³n de forma automÃ¡tica pues no tienes habilitada esta funcionalidad en tu navegador. Puedes habilitarla e intentarlo de nuevo o escribir la direcciÃ³n pulsando en 'Escribir DirecciÃ³n'"];
							var type = 'watson';
							watson_ConversationPanel.displayMessage(data, type);
							document.body.style.cursor = 'default';
							permissionDenied = true;
							break;
						case objPositionError.TIMEOUT:
							// content.innerHTML = "<p
							// style=\"color:red\"><strong>Latitud:</strong>El
							// servicio ha tardado demasiado tiempo en
							// responder.</p>";
							// Se excede el tiempo en permitir o no (navegador)
							// el acceso a la busqueda automÃ¡tica
							var data = {};
							data.output = {};
							data.output.text = ["Lo siento, no ha sido posible capturar tu ubicaciÃ³n de forma automÃ¡tica pues no tienes habilitada esta funcionalidad en tu navegador. Puedes habilitarla e intentarlo de nuevo o escribir la direcciÃ³n pulsando en 'Escribir DirecciÃ³n'"];
							var type = 'watson';
							watson_ConversationPanel.displayMessage(data, type);
							document.body.style.cursor = 'default';
							permissionDenied = true;
							break;
						default:
							if (!permissionDenied) {
								watson_ConversationPanel
									.captureErrorWatson();
								permissionDenied = true;
							}
					}
					content.style.display = 'block';
					document.body.style.cursor = 'default';
				}, {
					maximumAge: 75000,
					timeout: 15000
				});
			firstTextInput++;

		} else {
			content.innerHTML = "Su navegador no soporta la API de geolocalizaciï¿½n.";
			context.output = "Su navegador no soporta la API de geolocalizacion";
			initial_Conversation.sendRequestInitial(opcion, context);
			document.body.style.cursor = 'default';
		}
	}

	// mostrar formulario relleno mi ubicacion
	function mostrarformRelleno(provicia, localidad, cp, tipoVia, calle, numero) {
		document.getElementById('oculto').style.display = 'block';
		document.getElementById('listaprovincias').value = provicia;
		document.getElementById('listalocalidades').value = localidad;
		document.getElementById('cpWatson').value = cp;
		document.getElementById('tipoV').value = tipoVia;
		document.getElementById('listacalles').value = calle;
		document.getElementById('numero').value = numero;
		var div = document.getElementById('watson__body__chat');
		div.scrollTop = '9999';
	}

	// mostrar formulario relleno mi ubicacion tras reset
	function mostrarOtraDir(provicia, localidad, cp, tipoVia, calle, numero) {
		document.getElementById('provincia').value = provicia;
		document.getElementById('localidad').value = localidad;
		document.getElementById('cpW').value = cp;
		document.getElementById('tipoVia').value = tipoVia;
		document.getElementById('nombreVia').value = calle;
		document.getElementById('numeroW').value = numero;
		var div = document.getElementById('watson__body__chat');
		div.scrollTop = '9999';
	}

	// Mostrar formulario ubicacion
	function locationForm() {
		if (permissionDenied) {
			watson_Common.resetWatson();
		}
		// Enviamos datos a initial_Conversation
		var latestResponse = initial_Conversation.getResponsePayload();
		if (latestResponse) {
			initialID = latestResponse.initialID;
			contextInitial.initialID = initialID;
		}
		var input = "EVENT_OTRA_UBICACION";
		contextInitial.output = "EVENT_OTRA_UBICACION";
		initial_Conversation.sendRequestInitial(input, contextInitial);

		autocomplete2 = google.maps.event.addListener(document
			.getElementById("textInputchat"), init());
		document.getElementById("resetWatson").disabled = false;
		$('#resetWatson').removeClass('enlaceInhabilitado');
		document.getElementById('escribeaqui').style.display = 'block';

		/* AnimaciÃ³n para atraer el foco de atenciÃ³n en la primera interacciÃ³n */
		if (firstTextInput === 0) {
			$('#escribeaqui').addClass('animationPulse');
			firstTextInput++;
		}

		document.getElementById('oculto2').style.display = 'block';
		document.getElementById('oculto').style.display = 'none';
		setTimeout(function () {
			document.getElementById('textInputchat').focus();
		}, 5);
		// $( "#textInputchat" ).focus();
		$('#watson__body__chat').animate({
			scrollTop: 150
		}, 1000);

		$(".miubicacionWatson").addClass("enlaceInhabilitado");
		document.getElementById("miubicacionWatson").disabled = true;

		$(".otraubicacionWatson").addClass("enlaceInhabilitado");
		document.getElementById("otraubicacionWatson").disabled = true;

		otherLocation = true;
	}

	// Verificar contra google si la direccion es valida
	function searchAddress() {

		document.body.style.cursor = 'wait';
		var content = document.getElementById('validateFormResultLocation');

		var addressInput = document.getElementById('textInputchat').value;

		var geocoder = new google.maps.Geocoder();
		// En caso de que falte solo el numero a la direcciï¿½n
		if (captureNumber) {
			consultaFibra.numero = addressInput;
			$('#textInputchat').removeAttr('onkeypress');
			addressInput = consultaFibra.tipoVia + " "
				+ consultaFibra.nombreVia + " " + consultaFibra.numero
				+ ", " + consultaFibra.localidad + "("
				+ consultaFibra.provincia + ") " + consultaFibra.cp;
		}

		geocoder
			.geocode(
			{
				address: addressInput,
				componentRestrictions: {
					country: "ES"
				}
			},
			function (results, status) {

				if (status === google.maps.GeocoderStatus.OK) {
					// limitamos la busqueda
					if (results
						&& (results[0].types == 'street_address'
							|| results[0].types == 'route'
							|| results[0].types == 'premise' || results[0].types == 'subpremise')) {

						var provincia = '';
						var localidad = '';
						var cpW = '';
						var tipoVia = '';
						var nombreVia = '';
						var numeroW = '';

						for (var i = 0; i < results[0].address_components.length; i++) {
							if (results[0].address_components[i].types[0] == 'administrative_area_level_2') {
								provincia = results[0].address_components[i].long_name;
							}
							if (results[0].address_components[i].types[0] == 'locality') {
								localidad = results[0].address_components[i].long_name;
							}
							if (results[0].address_components[i].types == 'postal_code') {
								cpW = results[0].address_components[i].long_name;
							}
							if (results[0].address_components[i].types == 'route') {
								tipoVia = results[0].address_components[i].long_name
									.split(' ')[0];
							}
							if (results[0].address_components[i].types == 'route') {
								nombreVia = results[0].address_components[i].long_name
									.split(' ').splice(1).join(
									' ');
							}
							if (results[0].address_components[i].types == 'street_number') {
								numeroW = results[0].address_components[i].long_name;
							//-Inicio- NÃºmero no informado o no encontrado
							}else if (vuelta && numeroW == ''){
										if (consultaFibra.numero > 0 && consultaFibra.numero < 999999){
											numeroW = consultaFibra.numero;	
										}
								}
							//-Fin- NÃºmero no informado o no encontrado
						}
						// si falta solo el numero de la calle
						if (provincia != '' && localidad != ''
							&& tipoVia != '' && nombreVia != ''
							&& numeroW == '') {
								
							vuelta = true;
							var data = {};
							var dataU = {};
							data.output = {};
							dataU.input = {};
							data.output.text = ["Ind\u00edcame ahora el n\u00famero de la calle"];
							dataU.input.text = [addressInput];
							var type = 'watson';
							var typeU = 'user';
							watson_ConversationPanel
								.displayMessage(dataU, typeU);
							watson_ConversationPanel
								.displayMessage(data, type);

							// Enviamos datos a initial_Conversation
							var latestResponse = initial_Conversation
								.getResponsePayload();
							var input = addressInput;
							contextInitial.output = "Ind\u00edcame ahora el n\u00famero de la calle";
							initial_Conversation
								.sendRequestInitial(input,
								contextInitial);

							document
								.getElementById("textInputchat").disabled = false;
							consultaFibra = {
								"tipoVia": tipoVia,
								"nombreVia": nombreVia,
								"localidad": localidad,
								"cp": cpW,
								"provincia": provincia
							};
							setTimeout(function () {
								document.getElementById(
									'textInputchat').focus();
							}, 5);
							// $( "#textInputchat" ).focus();
							otherLocation = true;
							captureNumber = true;
							$("#textInputchat").attr('onkeypress',
								'return isNumber(event)');
							watson_ConversationPanel
								.scrollToChatBottom();

						} else {
							consultaFibra = {
								"tipoVia": tipoVia,
								"nombreVia": nombreVia,
								"localidad": localidad,
								"cp": cpW,
								"numero": numeroW,
								"provincia": provincia
							};
							consultaFibraScope = consultaFibra;

							var context;
							var latestResponse = watson_Watson
								.getResponsePayload();
							var espacio_blanco = /[a-z,0-9]/i;

							if (latestResponse) {
								context = latestResponse.context;
							}

							if (addressInput.length > 0
								&& (espacio_blanco
									.test(addressInput))) {
								// Send the user message
								if (watson_RightNow.getContext().rightnow) {
									watson_RightNow
										.envioMensaje(addressInput);
								} else {

									var s = watson_Watson
										.getStatus();

									if (s && s == 'default') {
										var canal = $(
											'#watsonContainer')
											.attr('data-canal');
										var urlHTML = $(
											'#watsonContainer')
											.attr('data-url');
										var context = {
											"canal": canal,
											// "logado": "false",
											// "IdFAQ_Original": urlHTML
										};

										watson_Watson
											.setStatus('to-watson');
									}
									watson_Watson.sendRequest(
										addressInput, context);
									document
										.getElementById('escribeaqui').style.display = 'block';
									$(".respuestaboton").addClass(
										"enlaceInhabilitado");

									// Clear input box for further
									// messages
									document
										.getElementById('textInputchat').value = "";

									// Reset Textarea
									watson_ConversationPanel
										.resetTextArea();
								}
							}
						}
					} else {
						// si no da por valida la direccion
						var data = {};
						var dataU = {};
						data.output = {};
						dataU.input = {};
						data.output.text = ["No he entendido la direcci\u00f3n que indicas. Por favor, vuelve a indicarme el NOMBRE DE LA V&Iacute;A, N&Uacute;MERO Y LOCALIDAD donde quieres que comprobemos la cobertura"];
						dataU.input.text = [addressInput];
						var type = 'watson';
						var typeU = 'user';
						watson_ConversationPanel.displayMessage(
							dataU, typeU);
						watson_ConversationPanel.displayMessage(
							data, type);
						autocomplete2 = google.maps.event
							.addListener(
							document
								.getElementById("textInputchat"),
							init());

						// Enviamos datos a initial_Conversation
						var latestResponse = initial_Conversation
							.getResponsePayload();
						var input = addressInput;
						contextInitial.output = "No he entendido la direcci\u00f3n que indicas. Por favor, vuelve a indicarme el NOMBRE DE LA V\u00cdA, N\u00daMERO Y LOCALIDAD donde quieres que comprobemos la cobertura";
						initial_Conversation.sendRequestInitial(
							input, contextInitial);

						document.getElementById("textInputchat").disabled = false;
						setTimeout(
							function () {
								document.getElementById(
									'textInputchat')
									.focus();
							}, 5);
						// $( "#textInputchat" ).focus();
						otherLocation = true;
						watson_ConversationPanel
							.scrollToChatBottom();
						return false;
					}
				} else {
					// si falla google
					var data = {};
					var dataU = {};
					data.output = {};
					dataU.input = {};
					data.output.text = ["No he entendido la direcci\u00f3n que indicas. Por favor, vuelve a indicarme el NOMBRE DE LA V\u00cdA, N\u00daMERO Y LOCALIDAD donde quieres que comprobemos la cobertura"];
					dataU.input.text = [addressInput];
					var type = 'watson';
					var typeU = 'user';
					watson_ConversationPanel.displayMessage(dataU,
						typeU);
					watson_ConversationPanel.displayMessage(data,
						type);
					autocomplete2 = google.maps.event
						.addListener(
						document
							.getElementById("textInputchat"),
						init());
					// Enviamos datos a initial_Conversation
					var latestResponse = initial_Conversation
						.getResponsePayload();
					var input = addressInput;
					contextInitial.output = "No he entendido la direcci\u00f3n que indicas. Por favor, vuelve a indicarme el NOMBRE DE LA V\u00cdA, N\u00daMERO Y LOCALIDAD donde quieres que comprobemos la cobertura";
					initial_Conversation.sendRequestInitial(input,
						contextInitial);

					document.getElementById("textInputchat").disabled = false;
					setTimeout(function () {
						document.getElementById('textInputchat')
							.focus();
					}, 5);
					// $( "#textInputchat" ).focus();
					otherLocation = true;
					watson_ConversationPanel.scrollToChatBottom();
					return false;
				}

			});
		// Reset Textarea
		watson_ConversationPanel.resetTextArea();
	}

	// Mostrar texbox
	function showTextBox() {
		document.getElementById('escribeaqui').style.display = 'block';
	}

}());

// Envio de la opciï¿½n marcada haciendo click
watson_EnvioEnlace = function (span, texto) {
	// Retrieve the context from the previous server response
	if (!$(span).hasClass("enlaceInhabilitado")) {
		$(".respuestaboton").addClass("enlaceInhabilitado");

		var context;
		var latestResponse = watson_Watson.getResponsePayload();

		if (latestResponse) {
			context = latestResponse.context;
		}

		// Send the user message
		watson_Watson.sendRequest(texto, context);
	}
}

// Autoexpand input
watson_Chat = function () {
	var w = $('.modal-wrapperWatson');
	return w;
}

watson_Chat.resizeChat = function (size) {
	$('#watson__body__chat').css('bottom', size);
	return this;
};

$(document).one('focus.autoExpand', 'textarea.autoExpand', function () {
	var savedValue = this.value;
	this.value = '';
	this.baseScrollHeight = this.scrollHeight;
	this.value = savedValue;
}).on('input.autoExpand', 'textarea.autoExpand', function () {
	rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
	scrollChatValue = $('#watson__body__chat').scrollTop();

	if (rows > 1) {
		this.rows = rows;
		$('#watson__body__chat').scrollTop(scrollChatValue + rows * 18);
		$('#escribeaqui ').css('height', 'auto');
		var alturaT = $('#escribeaqui').height();
		$('.pac-container ').css('bottom', alturaT);
	}

	watson_Chat.resizeChat(this.scrollHeight - 20);
});

$(function () {

	if (window.location.href.indexOf('&utm_medium=watson&') != -1) {
		$('#watsonButton').hide();
	} else {
		// Initialize all modules
		watson_ConversationPanel.init();

		// Open-Close buttons
		$('#popupabrirWatson').on('click', watson_Common.openWatson);
		$('#popupcerrarWatson').on('click', watson_Common.closeWatson);

		// Reset
		$('#resetWatson').on('click', watson_Common.resetWatson);

		// Input user
		$('#textInputchat').on('keydown keyup', function (event) {
			watson_ConversationPanel.inputKeyDown(event, $(this));
			$('#escribeaqui').removeClass('animationPulse');
		});

		$('#watson__input__btn')
			.on(
			'click',
			function (event) {
				var espacio_blanco = /[a-z,0-9]/i;
				var textUser = document
					.getElementById('textInputchat').value;

				if (textUser.length > 0) {
					$('#watson__input__btn').addClass('sendButton');
				} else {
					$('#watson__input__btn').removeClass(
						'sendButton');
				}

				if (textUser.length > 0
					&& (espacio_blanco.test(textUser))) {
					document.getElementById("textInputchat").disabled = true;

					if (otherLocation) {
						watson_Location.searchAddress();
						otherLocation = false;
					} else {

						// Retrieve the context from the previous
						// server response
						var context;
						var latestResponse = watson_Watson
							.getResponsePayload();

						if (latestResponse) {
							context = latestResponse.context;
						}

						// Send the user message
						if (watson_RightNow.getContext().rightnow) {
							watson_RightNow.envioMensaje(textUser);
						} else {

							var s = watson_Watson.getStatus();

							if (s && s == 'default') {
								var canal = $('#watsonContainer')
									.attr('data-canal');
								var urlHTML = $('#watsonContainer')
									.attr('data-url');
								var context = {
									"canal": canal,
									// "logado": "false",
									// "IdFAQ_Original": urlHTML
								};

								watson_Watson
									.setStatus('to-watson');
							}
							watson_Watson.sendRequestReset(
								textUser, context);
							document
								.getElementById('textInputchat').value = "";

						}

						// Clear input box for further messages
						inputBox.val('');

						// Reset Textarea
						$(".respuestaboton").addClass(
							"enlaceInhabilitado");
						watson_ConversationPanel.resetTextArea();
					}
				}
			});

		$('#watson__confirm__btn')
			.on(
			'click',
			function (event) {

				var form = document.getElementById('oculto');
				var listaprovincias = form.elements['listaprovincias'].value;
				var listalocalidades = form.elements['listalocalidades'].value;
				var cpWatson = form.elements['cpWatson'].value;
				var tipoV = form.elements['tipoV'].value;
				var listacalles = form.elements['listacalles'].value;
				var numero = form.elements['numero'].value;
				var textodir = document
					.getElementById('textodireccion').textContent;
				var context;
				var latestResponse = watson_Watson
					.getResponsePayload();
				var espacio_blanco = /[a-z,0-9]/i;

				var validation = watson_Common.checkFormLocation(
					listaprovincias, listalocalidades,
					cpWatson, tipoV, listacalles, numero);

				if (validation) {
					document.getElementById('escribeaqui').style.display = 'block';
					$('#validateFormResultLocation').html('');

					if (latestResponse) {
						context = latestResponse.context;
					}

					if (textodir.length > 0
						&& (espacio_blanco.test(textodir))) {
						// Send the user message
						var s = watson_Watson.getStatus();

						if (s && s == 'default') {
							var canal = $('#watsonContainer').attr(
								'data-canal');
							var urlHTML = $('#watsonContainer')
								.attr('data-url');
							var context = {
								"canal": canal,
								// "logado": "false",
								// "IdFAQ_Original": urlHTML
							};
							consultaFibra = {
								"tipoVia": tipoV,
								"nombreVia": listacalles,
								"localidad": listalocalidades,
								"cp": cpWatson,
								"numero": numero,
								"provincia": listaprovincias
							};
							consultaFibraScope = consultaFibra;
							watson_Watson.setStatus('to-watson');
						}

						watson_Watson.sendLocation(textodir,
							context, consultaFibra);
						document.getElementById("oculto").disabled = true;
						$(".respuestaboton").addClass(
							"enlaceInhabilitado");

						// Reset Textarea
						watson_ConversationPanel.resetTextArea();

						// Disabled buttons
						$(".miubicacionWatson").addClass(
							"enlaceInhabilitado");
						document
							.getElementById("miubicacionWatson").disabled = true;

						$(".otraubicacionWatson").addClass(
							"enlaceInhabilitado");
						document
							.getElementById("otraubicacionWatson").disabled = true;

						$(".confirmarWatson").addClass(
							"enlaceInhabilitado");
						document
							.getElementById("watson__confirm__btn").disabled = true;
					}
				} else {
					$('#validateFormResultLocation')
						.html(
						'<p class="errorValidity">Por favor, completa los datos que faltan.</p>');
					watson_ConversationPanel.scrollToChatBottom();
				}
				watson_ConversationPanel.showLoading();
				document.getElementById("escribeaqui").disabled = true;
				document.getElementById("resetWatson").disabled = true;
			});

		// Collapsible text
		$("#watson__body__chat").on("click", ".collapseButton",
			function (event) {
				event.preventDefault();
				$(".collapsed").slideToggle();

				if ($(".collapseButton").hasClass('active')) {
					$(".collapseButton").removeClass('active');
				} else {
					$(".collapseButton").addClass('active');
				}
			});

		// Collapsible text offers
		$("#watson__body__chat").on(
			"click",
			".btn-block",
			function (event) {
				event.preventDefault();
				// $(".respuesta-desple").slideToggle();
				//
				// if ($(".respuesta-desple").hasClass('active')){
				// $(".respuesta-desple").removeClass('active');
				// } else {
				// $(".respuesta-desple").addClass('active');
				// }
				$(".latest").find(".respuesta-desple").clone().appendTo(
					'#modal-overlay-Watson-img');
				$('#modal-overlay-Watson-img').addClass('displayModal');
			});

		$('#modal-overlay-Watson-img').on('click', function () {
			$('#modal-overlay-Watson-img').removeClass('displayModal');
			$('#modal-overlay-Watson-img .respuesta-desple').remove();
			setTimeout(function () {
				document.getElementById('textInputchat').focus();
			}, 5);
			// $( "#textInputchat" ).focus();
		});

		// Modal img
		$('#watsonPopUp').on('click', '.from-watson img', function () {
			$(this).clone().appendTo('#modal-overlay-Watson-img');
			$('#modal-overlay-Watson-img').addClass('displayModal');
		});

		$('#modal-overlay-Watson-img').on('click', function () {
			$('#modal-overlay-Watson-img').removeClass('displayModal');
			$('#modal-overlay-Watson-img img').remove();
		});

		// Feedback form
		$("#watson__body__chat").on("click", '#feedbackSmartFormSi',
				envioFormulario);
		$("#watson__body__chat").on("click", '#feedbackSmartFormNo',
			watson_Common.noSubmitForm);
		$("#watson__body__chat").on("click", '#clickHere',
			watson_Common.sendCookie);
		$("#watson__body__chat").on("click", '#resetWatsonIcon',
			watson_Common.resetWatson);
		$("#watsonPopUp").on("contextmenu", function (e) {
			return false;
		});
	}
});

function setHeightWatson(){
	var screenHeight =  $('body').height();
	var screenWidth =  $(window).width();
	var heightHeader = $('.oH-container').height();
	var heightFooter = $('#oF').height();
	if ( screenWidth > 768) {
		$('#watsonPopUp').css({'height': screenHeight - heightHeader - heightFooter - 2 + 'px', top: heightHeader + 'px'});
	}	
}

/* $(document).ready(function () {
	setHeightWatson();
});

$(window).resize(function() {
  	setHeightWatson();
}); */
// }(sya.$);

function envioFormulario(){
	var clientConfig = { 
		    timeoutTooltip: 3, 
		    lang: 'es', 
		    pos: 'topLeft', 
		    recovery: true, 
		    sendHidden: false, 
		    map: { 
		        param1 : document.getElementById('nameFeedback').value, 
		        param2 : document.getElementById('phoneFeedback').value 
		    } 
		};
	var urlDelio = "https://ws.walmeric.com/provision/wsclient/client_addlead.html?idTag=29842f94d414949bf95fb2e6109142cfef1fb2a78114c2c536a36bf5a65b953a2224d083b82556f420edd64168d5fd904d9e4fa7221a95c03a6f0110864d9e6a9f1bcc982f49e8e7b5377e50143aa1bbe341aaec655f7666e755114f87c6e9f3b42792780ae793bf157e928ce3e0fcd5&name="+clientConfig.map.param1+"&phone="+clientConfig.map.param2;
	console.log(urlDelio);
	var toDelio;
	$.ajax({
        url: urlDelio,//esto o con un archivo php
        type: 'GET',//tipo de petición
        dataType: 'jsonp',//tipo de datos
        jsonp: toDelio,//nombre de la variable get para reconocer la petición
        error: function(xhr, status, error) {
        	lead = false;
			mensajeFinal();
			console.log("Error en la petición a DELIO");
        },
        success: function(jsonp) { 
        	lead = true;
			mensajeFinal();
			console.log("La petición ha sido satisfactoria");
        }
   });
}
	function mensajeFinal(){
		if (lead){
			$('#watson__body__chat').html('<div class="llamadmeTextoFinal">Su solicitud ha sido recibida.</br>'
					+'En breve uno de nuestros agente se pondr&aacute; en contacto con usted.</br>'
					+'Gracias.</div>');
		}else{
			$('#watson__body__chat').html('<div class="llamadmeTextoFinal">Su solicitud no se ha podido tramitar correctamente.</br>'
					+'Vuelva a intentarlo en unos instantes.</br>'
					+'Gracias.</div>');
		}
	}
// -FIN- C2C












