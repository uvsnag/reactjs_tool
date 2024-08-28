import React from 'react';
import { useState } from 'react';
import { useImageUploader } from './useImageUploader';
import '../../common/style.css';

const ImageGridGenerator = () => {
    const [cols, setCols] = useState(5);
    const [rows, setRows] = useState(6);
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [gridImages, setGridImages] = useState([]);
    const handleCangeCols = (e) => {
        setCols(e.target.value);
    };
    const handleSetRows = (e) => {
        setRows(e.target.value);
    };

    const handleImage1Upload = (e) => {
        setImage1(URL.createObjectURL(e.target.files[0]));
    };

    const handleImage2Upload = (e) => {
        setImage2(URL.createObjectURL(e.target.files[0]));
    };

    const generateGrid = () => {
        if (!image1 || !image2) return;

        let images = Array(cols*rows-1).fill(image1);  // Create an array of 8 image1
        const randomIndex = Math.floor(Math.random() * (cols*rows));
        images.splice(randomIndex, 0, image2);  // Insert image2 at a random position
        setGridImages(images);
    };


    return (
        <div >
            {/* <h1>Image Grid Generator</h1> */}
            <div>

               <div>cols</div> <input type="number" value = {cols} onChange={handleCangeCols} /><br/>
               <div>rows</div><input type="number" value = {rows}  onChange={handleSetRows} /><br/>
                <input type="file" accept="image/*" onChange={handleImage1Upload} /><br/>
                <input type="file" accept="image/*" onChange={handleImage2Upload} />
            </div>
            <button onClick={generateGrid}>
                Generate
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '10px', marginTop: '20px' ,marginLeft: '50px' ,marginBottom: '50px' , width: '100px'}}>
                {gridImages.map((imgSrc, index) => (
                    <div key={index} style={{ border: '0px solid #ddd', padding: '0px' }}>
                        <img src={imgSrc} alt={`grid-item-${index}`} style={{ width: '120px', height: 'auto' }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGridGenerator;
