export function Input(props) {
  const { handleChange, inputValue } = props;
  return <input onChange={handleChange} value={inputValue} />;
}

export default Input;
