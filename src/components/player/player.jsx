import './Player.css'
import React from 'react' 

class Player extends React.Component {
    
    audio_checkpoints = [
		[0.0, "...", null],
		[1.443, "Da casa de praia ao terreno maior", "Dorinha"],
		[4.784, "Eu planejei", "Mari"],
		[6.455, "Os desejos mais vazios", "Ana"],
		[9.226, "Que já encheram minha mente", "Lua"],
		[11.467, "Só que o tempo aqui me perguntou melhor", "Siquino"],
		[14.390, "Quantos tetos são de alguém", "Tui"],
		[17.086, "Que tem morada em tanta gente?", "Kakau"],
		[19.706, "Às vezes somos noções erradas", "Yuri"],
		[22.630, "Tipo chamar de poesia", "Julio"],
		[24.604, "Essa rima fraca e mal acabada", "Joy"],
		[27.641, "Mas se cada loucura programada", "Lys"],
		[30.147, "Render um sarau a alma cantada", "Arantes"],
		[32.957, "Paramos noutra avenida estrelada", "Bia"],
		[36.071, "Peguem nossos desalinhos e montem estradas", "Tiba"],
		[39.298, "Com buracos no caminho, meia-faixa, sem calçadas", "Luísa"],
		[43.550, "Com uma dança desimpedida", "Paulo"],
		[46.208, "E sem risadas controladas", "Lari"],
		[48.866, "Bom, hoje eu acho que é assim", "Drecoy"],
		[51.676, "Que as pessoas mais interessantes", "Ju"],
		[54.789, "São lembradas.", "Ju&Ana"],
		[57.029, "Se depender de um devaneio tolo", "If"],
		[59.687, "Ou de encontrarmos tesouro", "Kakau"],
		[62.003, "Em um trejeito infantil", "Luísa"],
		[64.206, "Seremos zonas de conforto em liberdade", "Tui"],
		[67.851, "De um modo que o mundo de verdade", "Lua"],
		[70.546, "Nunca viu", "Tiba"],
		[72.255, "Seja bem-vinda a sua casa, à nossa", "Lys"],
		[75.406, "Das que, se estranha, se admite", "Arantes"],
		[78.330, "Devaneios tortos nas portas", "Mari"],
		[80.760, "Pisos de passos dançados em hit", "Siquino"],
		[83.726, "Experiências novas em ouro", "Bia"],
		[85.278, "E humildade em madeirite", "Yuri"],
		[88.354, "Assim como a vida ensina", "Ju"],
		[91.050, "O que a maioria das mães já insiste", "Julio"],
		[94.353, "Do nosso jeito, diremos", "Dorinha"],
		[97.011, "Você é mais do que admite.", "Joy&Luísa"],
		[99.479, "Você é mais do que admite.", "Drecoy&Paulo"],
		[101.491, "Você é mais do que admite.", "Lari"]
	];

    constructor(props) {
        super(props);
        this.state = {
            i: 0,
            name: "-",
            lyric: "...",
            playProgress: 0,
            trackAlbumClass: "",
            iPlayClasses: "fa fa-pause"
        };
        this.audio = React.createRef();
        this.seekBar = React.createRef();
        this.albumArt = React.createRef();
        this.playerTrack = React.createRef();
    }

    profilePic(name) {
        // TODO: Dynamically render pictures when name.includes("&")
        return `https://raw.githubusercontent.com/jcezarms/strangers/master/assets/img/users/${name}/profile.jpg`
    }

    currentName(name) {
        return name.includes('&') ? name.replace('&', ' & ') : name;
    }

    updateAudio(_this) {
        if (!_this.audio.current.paused) {
            _this.setState({
                playProgress: (_this.audio.current.currentTime / _this.audio.current.duration) * 100
            })

            if (_this.state.playProgress === 100) {
                _this.setState({
                    payProgress: 0,
                    trackAlbumClass: "active",
                    iPlayClasses: "fa fa-pause"
                })
            }

            const next = _this.state.i + 1;
            if (next < _this.audio_checkpoints.length) {
                // TODO: Create in constructor to use below:
                // this.timestamps = this.audio_checkpoints.forEach(chkp => chkp[0]);
                // this.lyrics = this.audio_checkpoints.forEach(chkp => chkp[1]);
                // this.names = this.audio_checkpoints.forEach(chkp => chkp[2]);
                if (_this.audio.current.currentTime >= _this.audio_checkpoints[next][0]) {
                    _this.setState({
                        i: next,
                        name: _this.audio_checkpoints[next][2],
                        lyric: _this.audio_checkpoints[next][1]
                    })
                } else {
                    // console.log(_this.audio)
                    // console.log(_this.audio_checkpoints[next])
                }
            }
        }
    }

    playPause(_this) {
        setTimeout(() => {
            if (_this.audio.current.paused) {
                _this.setState({
                    trackAlbumClass: "active",
                    iPlayClasses: "fa fa-pause"
                })
                _this.audio.current.play();
            } else {
                _this.setState({
                    trackAlbumClass: "",
                    iPlayClasses: "fa fa-play"
                })
                _this.audio.current.pause();
            }
        }, 300);
    }

    componentDidMount() {
        // this.audio.ontimeupdate(this.updateAudio);
        this.audio.current.addEventListener('timeupdate', () => this.updateAudio(this));
        this.audio.current.loop = false;
    }

    render() {
        return (
            <div id="app-cover">
                <audio ref={this.audio} src={this.props.url} style={{visibility:'hidden'}} />
                <div id="bg-artwork"></div>
                <div id="bg-layer"></div>
                <div id="player">
                    <div id="player-track" className={this.state.trackAlbumClass}>
                    <div id="lyrics">
                        {this.state.lyric}
                    </div>
                    <div id="s-area">
                        <div id="ins-time"></div>
                        <div id="s-hover"></div>
                        <div id="seek-bar" style={{width: `${this.state.playProgress}%`}}></div>
                    </div>
                    </div>
                    <div id="player-content">
                    <div id="album-art" className={this.state.trackAlbumClass}>
                        <img src={this.profilePic(this.state.name)} className="active" id="_1" alt="Voz Estranha"/>
                        <div id="buffer-box">Carregando ...</div>
                    </div>
                    <div id="player-controls">
                        <div className="control">
                            <div className="button" id="play-pause-button" onClick={() => this.playPause(this)}>
                                <i className="fas fa-play" className={this.iPlayClasses}></i>
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

export default Player