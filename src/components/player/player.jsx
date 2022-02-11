import './player.css'
import React from 'react' 

class Player extends React.Component {
    

    constructor(props) {
        super(props);
        this.state = {
            i: 0,
            lyric: "...",
            name: "[ — ]"
        };
        let audio_checkpoints = require("../../data/audio_checkpoints.json");
        this.timestamps = audio_checkpoints.forEach(chkp => chkp[0]);
        this.lyrics = audio_checkpoints.forEach(chkp => chkp[1]);
        this.names = audio_checkpoints.forEach(chkp => chkp[2]);
        this.audio = new Audio(this.props.url);
        this.iPlay = React.createRef();
        this.seekBar = React.createRef();
        this.albumArt = React.createRef();
        this.playerTrack = React.createRef();
    }

    profilePic(name) {
        // TODO: Dynamically render pictures when name.includes("&")
        return `https://raw.githubusercontent.com/jcezarms/assets/img/users/${name}/profile.jpg`
    }

    currentName(name) {
        return name.includes('&') ? name.replace('&', ' & ') : name;
    }

    updateAudio() {
        playProgress = (this.audio.currentTime / this.audio.duration) * 100;
        this.seekBar.current.width(playProgress + "%");

        if (playProgress == 100) {
            this.iPlay.current.attr("class", "fa fa-play");
            this.seekBar.current.width(0);
            this.albumArt.current.removeClass("active");
        }

        next = this.state.i + 1;
        if (next < this.timestamps.length) {
            if (this.audio.currentTime >= this.timestamps[next]) {
                this.setState({
                    i: next,
                    name: this.names[next],
                    lyric: this.lyrics[next]
                })
            }
        }
    }

    playPause() {
        setTimeout(() => {
            if (this.audio.paused) {
                this.albumArt.current.addClass("active");
                this.playerTrack.current.addClass("active");
                this.iPlay.current.attr("class", "fa fa-pause");
                this.audio.play();
            } else {
                this.albumArt.current.removeClass("active");
                this.playerTrack.current.removeClass("active");
                this.iPlay.current.attr("class", "fa fa-play");
                this.audio.pause();
            }
        }, 300);
    }

    componentDidMount() {
        this.audio.ontimeupdate(this.updateAudio);
        this.audio.loop = false;
    }

    render() {
        return (
            <div id="app-cover">
                <div id="bg-artwork"></div>
                <div id="bg-layer"></div>
                <div id="player">
                    <div id="player-track" ref={this.playerTrack}>
                    <div id="lyrics"></div>
                    <div id="s-area">
                        <div id="ins-time"></div>
                        <div id="s-hover"></div>
                        <div id="seek-bar" ref={this.seekBar}></div>
                    </div>
                    </div>
                    <div id="player-content">
                    <div id="album-art" ref={this.albumArt}>
                        <img src={this.profilePic(this.state.name)} className="active" id="_1" />
                        <div id="buffer-box">Carregando ...</div>
                    </div>
                    <div id="player-controls">
                        <div className="control">
                            <div className="button" id="play-pause-button" onClick={this.playPause()}>
                                <i className="fas fa-play" ref={this.iPlay}></i>
                            </div>
                        </div>
                        <div className="control-name">
                            {this.currentName(this.state.name)}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}