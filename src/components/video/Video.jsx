import './Video.css'

const Video = (props) => {
    return (
        <div className="video-container" style={{"zIndex":10}} onClick={() => console.log("IM CLICKD")}>
        <video controls autoPlay playsInline width={props.width} height={props.height} style={
            {"marginTop":"10vh", "marginLeft": "10vw"}
        }>
            <source src={props.url} type='video/mp4' />
        </video>
        </div>
    );
};

export default Video;