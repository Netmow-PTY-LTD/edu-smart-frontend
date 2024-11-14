import { useCustomCheckout } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const PromotionCode = () => {
  const { applyPromotionCode, removePromotionCode } = useCustomCheckout();
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setDraft(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await applyPromotionCode(draft);
      if (result.error) {
        setError('Invalid promotion code. Please try again.');
      } else {
        setSuccess('Promotion code applied successfully!');
      }
    } catch (err) {
      setError('An error occurred while applying the promotion code.');
    } finally {
      setDraft('');
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await removePromotionCode();
      setSuccess('Promotion code removed successfully.');
    } catch (err) {
      setError('An error occurred while removing the promotion code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="input-group mb-3">
        <input
          type="text"
          value={draft}
          onChange={handleChange}
          placeholder="Enter promotion code"
          className="form-control"
          disabled={loading}
        />
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={loading || !draft}
        >
          {loading ? 'Applying...' : 'Apply'}
        </button>
        <button
          className="btn btn-secondary ms-2"
          onClick={handleRemove}
          disabled={loading}
        >
          Remove
        </button>
      </div>

      {error && <div className="text-danger">{error}</div>}
      {success && <div className="text-success">{success}</div>}
    </div>
  );
};

export default PromotionCode;
