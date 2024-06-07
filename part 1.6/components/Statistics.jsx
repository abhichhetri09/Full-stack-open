const Statistics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral;
  const avearge = (good - bad) / all;
  const positivePercentage = (good / all) * 100;
  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {avearge}</p>
      <p>positive {positivePercentage} %</p>
    </div>
  );
};

export default Statistics;
