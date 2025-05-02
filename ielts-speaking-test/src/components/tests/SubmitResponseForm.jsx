import React, { useState } from 'react';
import axios from 'axios';

const SubmitResponseForm = ({ testId }) => {
  const [response, setResponse] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (!response.trim()) {
      setError('Response cannot be empty.');
      return;
    }
    
    setIsSubmitting(true);
    setError(''); // Clear previous errors
    
    try {
      const API_URL = `http://localhost:5000/api/speaking-tests/${testId}/submit`;
      console.log(`Submitting to URL: ${API_URL}`);
      
      const res = await axios.post(API_URL, {
        response: response
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response:', res.data);
      
      // Show success message
      setMessage('Response submitted successfully!');
      setResponse(''); // Clear the form
      
      // Refresh the page after 1.5 seconds to show the updated response
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (err) {
      console.error('Error submitting response:', err);
      const errorMsg = err.response?.data?.message || 'Failed to submit response. Please try again.';
      setError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: '1px solid #e9ecef',
      marginTop: '20px',
      marginBottom: '20px'
    }}>
      <h4 style={{
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '15px',
        color: '#495057'
      }}>Submit Your Response</h4>
      
      <form onSubmit={handleSubmit}>
        <textarea
          style={{
            width: '100%',
            minHeight: '150px',
            padding: '12px',
            borderRadius: '6px',
            border: '1px solid #ced4da',
            fontSize: '16px',
            marginBottom: '15px',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
            resize: 'vertical',
            transition: 'border-color 0.3s'
          }}
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Enter your response to this speaking test question..."
          disabled={isSubmitting}
        />
        
        <button 
          type="submit" 
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s, transform 0.1s',
            opacity: isSubmitting ? 0.7 : 1,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            display: 'block',
            width: '100%',
            maxWidth: '200px',
            marginBottom: '15px'
          }}
          disabled={isSubmitting}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0069d9'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Response'}
        </button>
        
        {message && (
          <div style={{
            marginTop: '15px',
            padding: '12px',
            backgroundColor: '#d4edda',
            color: '#155724',
            borderRadius: '6px',
            border: '1px solid #c3e6cb',
            fontWeight: '500'
          }}>
            <strong>Success!</strong> {message}
          </div>
        )}
        
        {error && (
          <div style={{
            marginTop: '15px',
            padding: '12px',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            borderRadius: '6px',
            border: '1px solid #f5c6cb',
            fontWeight: '500'
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default SubmitResponseForm;