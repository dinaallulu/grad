// // will delete later

// import  { useState } from 'react';
// import PropTypes from 'prop-types';
// import styles from './ui/modal.module.css';

// function Modal({ isOpen, onClose, onSubmit }) {
//   const [pageName, setPageName] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (pageName.trim()) {
//       onSubmit(pageName);
//       setPageName('');
//       onClose();
//     } else {
//       alert("Page name cannot be empty.");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modalContent}>
//         <h2>Add New Page</h2>
//         <div onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={pageName}
//             onChange={(e) => setPageName(e.target.value)}
//             placeholder="Enter page name"
//             required
//           />
//           <button type="submit">Add Page</button>
//           <button type="button" onClick={onClose}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// Modal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   onSubmit: PropTypes.func.isRequired,
// };

// export default Modal;
