const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  placeholder,
  pattern,
  min,
  max,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        min={min}
        max={max}
        placeholder={placeholder}
        pattern={pattern}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
