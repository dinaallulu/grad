import { useState } from 'react';
import PropTypes from 'prop-types';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAnswer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div style={styles.container}>
            <div style={styles.questionBox} onClick={toggleAnswer}>
                <h3 style={styles.question}>{question}</h3>
                <span
                    style={{
                        ...styles.icon,
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                >
                    {isOpen ? '−' : '+'}
                </span>
            </div>
            <div
                style={{
                    ...styles.answerContainer,
                    maxHeight: isOpen ? '200px' : '0',
                }}
            >
                <p style={styles.answer}>{answer}</p>
            </div>
        </div>
    );
};

// Styles for the component
const styles = {
    container: {
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        marginBottom: '10px',
        padding: '1rem 1.5rem',
        background: '#C4C7E3',
        color: '#071754',
        boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",

    },
    questionBox: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
    },
    question: {
        fontSize: '1.3rem',
        fontWeight: '600',
    },
    icon: {
        fontSize: '2rem',
        transition: 'transform 0.3s ease', // Adds a smooth rotation effect
    },
    answerContainer: {
        overflow: 'hidden',
        transition: 'max-height 0.3s ease',
    },
    answer: {
        marginTop: '10px',
        marginLeft: '10px',
        fontSize: '1.2rem',
        color: '#071754',
    },
};

FAQItem.propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
};

export default FAQItem;
