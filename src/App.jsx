import { useRef, useState } from 'react';
import './App.css';
import html2canvas from 'html2canvas';
import { WhatsappShareButton } from 'react-share';

function App() {
  const divRef = useRef(null);

  const [name, setName] = useState("")
  const [wishes, setWishes] = useState("")
  const [image, setImage] = useState("")
  const [convertedImg, setConvertedImg] = useState("")

  const captureDivAsImage = () => {
    if (divRef.current) {
      html2canvas(divRef.current).then((canvas) => {
        const imageData = canvas.toDataURL('image/png');
        // Now you can use imageData as needed (e.g., save it, display it, share it)
        setConvertedImg(imageData)
      });
    }
  };

  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    // console.log(e.target.files[0]);

    const fl = e.target.files[0];
    if (fl) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFile(reader.result);
      };

      // Read the fl as a data URL
      reader.readAsDataURL(fl);
    }

  };

  return (
    <div style={{ background: 'url("https://media.macphun.com/img/uploads/macphun/blog/1247/christmasphoto.jpg") no-repeat', height: '100vh' }}>
      <div style={{ backgroundColor: '#fff', opacity: '0.8' }}>
        <a href='#' className='btn btn-warning m-2' onClick={captureDivAsImage}>Share Now</a>
        <div className="mx-auto text-center" style={{ width: '350px', border: '1px solid #fff' }} ref={divRef}>
          <div className='d-flex'>
            <img src="img/red-ball.png" alt="" style={{ width: '200px', textAlign: 'center' }} />
            <img src="img/red-ball.png" alt="" style={{ width: '200px', textAlign: 'center' }} />
          </div>
          <div className="mx-auto" style={{ height: '150px', width: '150px', backgroundColor: 'transparent', borderRadius: '100px', marginTop: '-20px' }}>
            <img src={file} className="image-responsive" style={{ width: '80%', borderRadius: '30%' }} alt="" />
            {/* <img src="img/user.png" className="image-responsive" style={{ width: '80%', borderRadius: '40%' }} alt="" /> */}
          </div>
          <h2 className="wish">
            Merry Christmas &amp; <br /> Happy new year</h2>
          <p style={{ color: 'green', fontFamily: 'greet, "Times New Roman", serif' }}>{wishes}.</p>
          <p>by: <span style={{ fontWeight: 'bold', color: 'red' }}>{name}.</span></p>
          <img src="img/cap.png" style={{ width: '100px', textAlign: 'center' }} alt="" />
        </div>
      </div>
      <hr />
      <a href={convertedImg} target='_blank'>
        <img src={convertedImg} /></a>
      <button type="button" className="btn btn-success" style={{ position: 'absolute', top: 10, right: 10 }} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Create Your Design
      </button>
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Design</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Your Wishes</label>
                <textarea maxLength={230} className="form-control" id="exampleInputEmail1" onChange={(e) => setWishes(e.target.value)} aria-describedby="emailHelp"></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Your Name</label>
                <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputPassword1" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Your Image</label>
                <input type="file" className='form-control' id="image" required accept="image/*" onChange={handleFileChange} />
              </div>

              <button type="button" className="btn btn-primary" onClick={captureDivAsImage}>Generate</button>
            </div>
            <hr />
            {convertedImg && (<div className='d-flex container'>
              <a href={convertedImg} target='_blank'>
                <img src={convertedImg} /></a>
            </div>)}

          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
