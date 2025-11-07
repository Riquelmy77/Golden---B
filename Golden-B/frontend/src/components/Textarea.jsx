import React from 'react';

export default function Textarea({ 
  label, 
  error,
  helpText,
  rows = 4,
  ...textareaProps 
}) {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      {label && <br />}
      <textarea rows={rows} {...textareaProps} />
      {helpText && <small style={{ display: 'block', marginTop: 4, color: 'rgba(212,175,55,0.6)' }}>{helpText}</small>}
      {error && <div className="error">{error}</div>}
    </div>
  );
}
