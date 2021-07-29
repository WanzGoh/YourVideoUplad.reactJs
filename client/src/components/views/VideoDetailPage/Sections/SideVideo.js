import React, {useEffect , useState} from 'react';
import Axios from 'axios';

function SideVideo() {

	const [sideVideos, setsideVideos] = useState([])

	useEffect(() => {
		Axios.get('/api/video/getVideos')
		.then(response => {
		    if (response.data.success) {
			console.log(response.data.videos)
			setsideVideos(response.data.videos)
		    } else {
			alert('no video')
		    }
		})
	    }, [])

	    const renderSideVideo= sideVideos.map((video,index)=>{

		//video running time 00:00
		var minutes = Math.floor(video.duration /60);
        	var seconds = Math.floor(video.duration - minutes * 60);
        	function str_pad_left(string,pad,length) {
            	return (new Array(length+1).join(pad)+string).slice(-length);
        	}
        
        	var finalTime = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
		 //video running time end

		return <div key={index} style= {{display: 'flex', marginBottom: "1rem", padding:'0 2rem'}}>
		<div style={{ width: ' 40%', marginRight :"1rem"}}>
			<a href={`/video/${video._id}`}  style={{ color:'gray' }}>
				<img style={{ width: '100%', height : '100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail"/>
			</a>
		</div>
		<div style={{ width: '50%' }}>
		<a href={`/video/${video._id}`} style={{ color:'gray' }}>
			<span style={{ fontSize: '1rem', color: 'black'}}> {video.title}</span><br />
			<span>{video.writer.name}</span><br />
			<span>{video.views}</span><br />
			<span>{finalTime}</span>
		</a>
		</div>

	</div>
	    })

	return (
		
		<React.Fragment>
			<div style= {{ marginTop : '3rem'}} />
			{renderSideVideo}
		</React.Fragment>

		
	)
}

export default SideVideo
