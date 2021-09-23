import React from "react";
import Dropzone from 'react-dropzone';
import axios from 'axios';

function DropZone(props) {
  const {images, setImages, margin, setDetailImageFile, detailImageFile} = props;
  const styles = {margin};
  const dropHandler = (files) =>{
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImages([...images, base64.toString()]);
      }
    };
    if (files[0]) {
      reader.readAsDataURL(files[0]);
      setDetailImageFile([...detailImageFile, files[0]]);
    }
  }
  const deleteHandler = (image) =>{
    const currentIndex = images.indexOf(image);
    let newImages = [...images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
  }

  return (
    <div style={{display: "flex", justifyContent: "space-between", ...styles}}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
            <div 
              style={{
                width: 300, height: 240, border: "1px solid lightgray",
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
              {...getRootProps()}>
              <input {...getInputProps()} />
              <i className="fas fa-plus"></i>
            </div>
        )}
      </Dropzone>

      <div style={{display: 'flex', width: '350px', height: '240px', overflowX: 'auto'}}>
        {
          images.map((image, index) =>(
            <div onClick={() => deleteHandler(image)} key={index}>
              <img style={{ minWidth: '300px', width: '300px', height: '240px'}} 
              src={image} 
              />
            </div>
          ))  
        }
      </div>
    </div>
  )
}

export default DropZone;