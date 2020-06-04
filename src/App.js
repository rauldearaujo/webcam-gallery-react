import React from 'react';
import Webcam from "react-webcam";
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import TextField from '@material-ui/core/TextField';
import AddAPhoto from '@material-ui/icons/AddAPhoto';
import './App.css';

const videoConstraints = {
  width: 640,
  height: 360,
  facingMode: "user"
};

// var photos = [];

function App() {

  const galleryRef = React.createRef();

  const webcamRef = React.useRef(null);
  
  const capture = React.useCallback(
    () => {
      galleryRef.current.addPhoto(webcamRef.current.getScreenshot());
    },
    [webcamRef, galleryRef]
  );



  return (
    <div className="App">
      <div className="App-header">
        <Webcam
          className="webcam-area"
          audio={false}
          width={320}
          height={180}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
        <br/>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<AddAPhoto />}
          onClick={capture}
        >
          Take a photo
        </Button>
        <br/>
        <Gallery ref={galleryRef} webcamRef={webcamRef} />

      </div>
    </div>
  );

}

class Gallery extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      photos: []
    }
  }

  addPhoto(photo) {
    this.setState({
      photos: this.state.photos.concat([photo])
    });
  }

  render() {
    return (
      <GridList cols={4}>
        {this.state.photos.reverse().map((photo, index) => (
          <GridListTile key={index}>
            <img src={photo} alt={index} />
            <GridListTileBar
              title="Blah"
            />
          </GridListTile>
        ))}
      </GridList>
    );
  }
}

export default App;
