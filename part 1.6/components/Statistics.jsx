import StatisticsLine from "./StatisticsLine";

const Statistics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral;
  const avearge = (good - bad) / all;
  const positivePercentage = (good / all) * 100;
  if (all === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={all} />
          <StatisticsLine text="average" value={avearge.toFixed(1)} />
          <StatisticsLine text="positive" value={positivePercentage} />
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
