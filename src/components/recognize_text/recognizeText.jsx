// import React, { useEffect, useState } from "react";
// import SpeechRecognition from 'react-speech-recognition';
// import _ from 'lodash';

// const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
// const recognition = new SpeechRecognition();

// recognition.continous = true;
// recognition.interimResults = true;
// recognition.lang = 'en-US' ;
// // nếu bạn nhập ở đây là vn-VN để chuyển qua thành tiếng việt 
// // thì không chính xác đâu nhé,
// // lúc viết bài này, mình có tra qua bảng những ngôn ngữ hỗ trợ thì 
// // không thấy tiếng Việt nó có ghi trên đó
// // nhưng apply vào dự án thì cũng không cần nhập dữ liệu vào 
// // biến này thì nó vẫn nhận dạng được 
// // tiếng việt và tiếng Anh (yaoming) (thatvidieu)

// //------------------------COMPONENT-----------------------------

// const SpeechRecognition = ({ transcript, startListening, stopListening }) => {
//   const [content, setContent] = useState(null);
  
//   useEffect(() => {
//       setContent(transcript);
//   }, [transcript])

//   return (
//     <div className='container'>
//       <button className='button' onClick={() => startListening()}>
//           Start
//       </button>
//       <button className='button' onClick={() => stopListening()}>
//           Stop
//       </button>
//       <div className='content'>
//           {this.state.content}
//       </div>
//     </div>
//   )
// }

// SearchVoice.propTypes = {
//   // Props injected by SpeechRecognition
//   transcript: PropTypes.string,
//   resetTranscript: PropTypes.func,
//   browserSupportsSpeechRecognition: PropTypes.bool,
//   startListening: PropTypes.func,
//   abortListening: PropTypes.func,
//   recognition: PropTypes.object,
// };

// const options = {
//   autoStart: false
// }

// export default SpeechRecognition(options)(SpeechRecognition)