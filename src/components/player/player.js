import './player.css'

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lyric: "[ — ]",
            name: "-",
            playClass: "fas fa-play",
            trackStatus: "",
            albumArtStatus: ""
        };
        let audio_checkpoints = require("../../data/audio_checkpoints.json");
        this.timestamps = audio_checkpoints.forEach(chkp => chkp[0]);
        this.lyrics = audio_checkpoints.forEach(chkp => chkp[1]);
        this.names = audio_checkpoints.forEach(chkp => chkp[2]);
        this.audio = new Audio(this.props.url)
    }

    profilePic(name) {
        return `https://raw.githubusercontent.com/jcezarms/assets/img/users/${name}/profile.jpg`
    }

    playPause() {
        setTimeout(() => {
            if (this.audio.paused) {
                this.setState(prevState => ({
                    trackStatus: `${prevState.trackStatus} active`,
                    albumArtStatus: `${prevState.albumArtStatus} active`
                }));
                checkBuffering();
                this.setState({
                    playClass: "fas fa-pause"
                });
                this.audio.play();
            } else {
                this.setState(prevState => ({
                    trackStatus: prevState.trackStatus.replace(" active", ""),
                    albumArtStatus: prevState.albumArtStatus.replace(" active", "")
                }));
                clearInterval(buffInterval);
                this.setState({
                    playClass: "fas fa-play",
                    albumArtStatus: prevState.albumArtStatus.replace("buffering", "")
                });
                this.audio.pause();
            }
        }, 300);
    }

    render() {
        return (
            <div id="app-cover">
            <div id="bg-artwork"></div>
            <div id="bg-layer"></div>
            <div id="player">
                <div id="player-track" className={this.state.trackStatus}>
                <div id="album-name"></div>
                <div id="track-name"></div>
                <div id="track-time">
                    <div id="current-time"></div>
                    <div id="track-length"></div>
                </div>
                <div id="s-area">
                    <div id="ins-time"></div>
                    <div id="s-hover"></div>
                    <div id="seek-bar"></div>
                </div>
                </div>
                <div id="player-content">
                <div id="album-art">
                    <img src={this.profilePic(this.state.name)} class="active" id="_1" />
                    <div id="buffer-box">Buffering ...</div>
                </div>
                <div id="player-controls">
                    <div class="control">
                        <div class="button" id="play-pause-button" onClick={this.playPause()}>
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="control-name">
                        {this.state.name}
                    </div>
                </div>
                </div>
            </div>
            </div>
        );
    }
}