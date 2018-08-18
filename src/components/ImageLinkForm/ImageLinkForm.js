import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = () => {
	return (
		<div>
			<p className='f3' style={{color: 'white'}}> 
				{'This little brain can detect faces in your pictures like magic! Wanna bet?'}
			</p>
			<div className='center'>
				<div className='center form pa4 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' type='text' placeholder='Enter Image Link' />
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-blue' >Detect</button>
				</div>
			</div>	
		</div>
	);
}

export default ImageLinkForm;
