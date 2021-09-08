const Text = ({ text }) => {
  const textR = text.split('\n');
  return (
    <>
      {textR.map((arr) => (
        <p key={Math.random().toString()}>
          {arr} <br />
        </p>
      ))}
    </>
  );
};
export default Text;
