console.log('lets go')

//Here let us stream the video

var mapPeers = {};

var webSocket;

const roomName = JSON.parse(document.getElementById('json-roomname').textContent);

const username = JSON.parse(document.getElementById('json-username').textContent);

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


//The share screen

var localStream = new MediaStream();

const constraints = {
    video: {
    cursor: "always"
    },
    audio: false
}

let startSharing = document.getElementById('startSending');

let stopSharing = document.getElementById('stopSending');


$('#stopSending').hide();

startSharing.addEventListener('click', ()=> {

    $('#stopSending').show(200);

    $('#startSending').hide(200);


    let userMedia = navigator.mediaDevices.getDisplayMedia(constraints)

        .then(stream => {

            localStream = stream;

            localVideo.srcObject = localStream

            dumpOptionsInfo();
            
            //localVideo.muted = true;

        })
        .catch(error => {
            console.log(error);
        })


    function dumpOptionsInfo() {
        const videoTrack = localVideo.srcObject.getVideoTracks()[0];
        
        console.info("Track settings:");
        console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
        console.info("Track constraints:");
        console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
    }

    stopSharing.addEventListener('click', (evt)=> {

        let tracks = localStream.getTracks();
              
        tracks.forEach((track) => track.stop());
    
        localStream = null;

        $('#startSending').show(200);

        $('#stopSending').hide(200);
    
    }, false);

    
}, false);



const localVideo = document.getElementById('my-local-video');


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



