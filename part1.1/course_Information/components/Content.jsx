import Part from './Part';

const Content = ({part1, exercise1,part2,exercise2, part3,exercise3}) =>{
    return(
    <div>
            <Part name={part1} exercise={exercise1} />
            <Part name={part2} exercise={exercise2} />
            <Part name= {part3} exercise={exercise3} />

       
    </div>
    )
}
export default Content