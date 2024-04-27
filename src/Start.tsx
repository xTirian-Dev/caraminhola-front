import './App.css'

const Start = ({ setIsStarted }: StartProps) => {
  return <div className="start-container">
    <button onClick={() => setIsStarted(true)}>Start</button>
  </div>;
};

export default Start;

interface StartProps {
  setIsStarted: (status: boolean) => void;
}
