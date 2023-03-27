import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading } from 'react-accessible-accordion';
import './Forecast.css'

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const Forecast = ({ data }) => {

    const dayInAWeek = new Date().getDay();
    const forcastdays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));
    console.log(forcastdays);
    return (
        <>
            <label className='title'>Daily</label>
            <Accordion allowZeroExpanded>
                {data.list.splice(0, 7).map((item, idx) => (
                    <AccordionItem key={idx}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className='daily-item'>
                                    <img alt="icon" className='icon-small' src={`animated/${item.weather[0].icon}.svg`} />
                                    <label className='day'>{forcastdays[idx]}</label>
                                    <label className='description'>{item.weather[0].description}</label>
                                    <label className='min-max'>{Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C </label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    );
};

export default Forecast