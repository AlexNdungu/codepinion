console.log('lets go')

//Here let us stream the video

var mapPeers = {};

var webSocket;

const roomName = JSON.parse(document.getElementById('json-roomname').textContent);

const username = JSON.parse(document.getElementById('json-username').textContent);


//This is my websocket connecting path

//const connectSocket = 

//Here we create on open fuction



//Here we start the video chat

let startSending = document.getElementById('startSending');

let mainVideoSec = document.getElementById('mainVideoSec');

let remotVid = document.getElementById('them-local-video');


//startSending.addEventListener('click', ()=> {

webSocket = new WebSocket(
    'ws://'
    + window.location.host
    + '/'
    + roomName
    + '/'
);

webSocket.addEventListener('open', (e) => {
    console.log('connection is open');

    sendSignal('new-peer', {})

});

webSocket.addEventListener('message', webSocketOnMessage);

webSocket.addEventListener('close', (e) => {
    console.log('connection is Closed')
});

webSocket.addEventListener('error', (e) => {
    console.log('Error ocured')
});


console.log(roomName)

var localStream = new MediaStream();

const constraints = {
    'video':true,
    'Audio':true
}

const localVideo = document.getElementById('my-local-video');

var userMedia = navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {

        localStream = stream;

        localVideo.srcObject = localStream
        
        localVideo.muted = true;

    })
    .catch(error => {
        console.log(error);
    })



function webSocketOnMessage(event){
    var parseData = JSON.parse(event.data)

    //console.log(parseData)

    //console.log(parseData['data']['message']['receiver_channel_name'])

    var peerUsername = parseData['data']['peer'];

    var action = parseData['data']['action'];

    //console.log(peerUsername)

    if(username == peerUsername){
        return;
    }

    var receiver_channel_name = parseData['data']['message']['receiver_channel_name'];

    //console.log(receiver_channel_name)

    if(action == 'new-peer'){
        createOffer(peerUsername, receiver_channel_name);

        return;
    }

    if(action == 'new-offer'){
        var offer = parseData['data']['message']['sdp'];

        createAnswer(offer, peerUsername, receiver_channel_name);
    }
    
    if(action =='new-answer'){
        var answer = parseData['data']['message']['sdp'];

        var peer = mapPeers[peerUsername][0];

        peer.setRemoteDescription(answer);

        return;
    }

    //var message = parseData['message']
}


function sendSignal(action, message){

    var jsonStr = JSON.stringify({
        'peer':username,
        'username': username,
        'room':roomName,
        'action':action,
        'message':message
    });

    webSocket.send(jsonStr);

};

function createOffer(peerUsername, receiver_channel_name){
    var peer = new RTCPeerConnection(null);

    addLocalTracks(peer);

    var dc = peer.createDataChannel('channel');

    dc.addEventListener('open', ()=> {
        console.log('connection open')
    });


    //var remoteVideo = createVideo(peerUsername);

    setOnTrack(peer);

    mapPeers[peerUsername] = [peer, dc];

    peer.addEventListener('iceconnectionstatechange', () => {
        var iceConnectionState = peer.iceConnectionState;

        if(iceConnectionState === 'failed' || iceConnectionState === 'disconnected' || iceConnectionState === 'closed'){
            delete mapPeers[peerUsername];

            if(iceConnectionState != 'closed'){
                peer.close();
            }

        }
    });

    peer.addEventListener('icecandidate', (event) => {
        if(event.candidate){
            console.log(JSON.stringify(peer.localDescription));

            return;
        }

        sendSignal('new-offer', {
            'sdp':peer.localDescription,
            'receiver_channel_name':receiver_channel_name
        })

    });

    peer.createOffer()
        .then(o => peer.setLocalDescription(o))
        .then(() => {
            console.log('Local Desc Set Succefully');
        });

};


function createAnswer(offer, peerUsername, receiver_channel_name){
    var peer = new RTCPeerConnection(null);

    addLocalTracks(peer);


    //var remoteVideo = createVideo(peerUsername);

    setOnTrack(peer);

    peer.addEventListener('datachannel', e => {
        peer.dc = e.channel;
        peer.dc.addEventListener('open', ()=> {
            console.log('connection open')
        });

        mapPeers[peerUsername] = [peer, peer.dc];

    });


    peer.addEventListener('iceconnectionstatechange', () => {
        var iceConnectionState = peer.iceConnectionState;

        if(iceConnectionState === 'failed' || iceConnectionState === 'disconnected' || iceConnectionState === 'closed'){
            delete mapPeers[peerUsername];

            if(iceConnectionState != 'closed'){
                peer.close();
            }

        }
    });

    peer.addEventListener('icecandidate', (event) => {
        if(event.candidate){
            console.log(JSON.stringify(peer.localDescription));

            return;
        }

        sendSignal('new-answer', {
            'sdp':peer.localDescription,
            'receiver_channel_name':receiver_channel_name
        })

    });

    peer.setRemoteDescription(offer)
        .then(() => {
            console.log('Remote Desc Set Succ for %s', peerUsername);

            return peer.createAnswer();
        })
        .then(a => {
            console.log('Answer Created');

            peer.setLocalDescription(a);
        })
}


function addLocalTracks(peer){
    localStream.getTracks().forEach(track => {
        peer.addTrack(track, localStream)
    });

    return;
};

//function createVideo(peerUsername){

    //var themVideo = document.getElementById('them-local-video');

//}

function setOnTrack(peer){

    var themVideo = document.getElementById('them-local-video');

    var remoteStream = new MediaStream()

    themVideo.srcObject = remoteStream;

    peer.addEventListener('track', async (event)=> {
        remoteStream.addTrack(event.track, remoteStream);
    });

}
    
    

//});



